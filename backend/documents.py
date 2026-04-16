from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import os
import uuid
from . import database, models, document_processor, vector_store

router = APIRouter()

UPLOAD_DIR = "uploads"
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...), 
    db: Session = Depends(database.get_db)
):
    # For MVP, we'll use a hardcoded user_id=1 until auth is fully wired in frontend
    user_id = 1 
    
    file_extension = os.path.splitext(file.filename)[1]
    if file_extension.lower() != ".pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}{file_extension}")
    
    with open(file_path, "wb") as f:
        f.write(await file.read())
    
    # Save to SQL DB
    db_doc = models.Document(
        user_id=user_id,
        filename=file.filename,
        file_url=file_path,
        status="processing"
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    
    # Process PDF
    try:
        pages = document_processor.extract_text_from_pdf(file_path)
        chunks = document_processor.chunk_text(pages)
        
        # Store in Vector DB
        vector_store.add_documents(chunks, doc_id=str(db_doc.id))
        
        # Extract Entities for Knowledge Graph
        from .agents.entity_agent import EntityAgent
        entity_agent = EntityAgent()
        all_text = "\n\n".join([p["content"] for p in pages[:5]]) # Process first 5 pages for MVP
        graph_data = entity_agent.run(all_text)
        
        for e in graph_data.get("entities", []):
            db_entity = models.Entity(doc_id=db_doc.id, name=e["name"], type=e["type"])
            db.add(db_entity)
        
        for r in graph_data.get("relations", []):
            db_rel = models.Relation(doc_id=db_doc.id, subject=r["subject"], relation=r["relation"], object=r["object"])
            db.add(db_rel)
        
        db_doc.status = "ready"
        db.commit()
    except Exception as e:
        db_doc.status = "error"
        db.commit()
        raise HTTPException(status_code=500, detail=str(e))
    
    return {"id": db_doc.id, "filename": db_doc.filename, "status": db_doc.status}

@router.get("/list")
def list_documents(db: Session = Depends(database.get_db)):
    user_id = 1
    docs = db.query(models.Document).filter(models.Document.user_id == user_id).all()
    return docs

@router.get("/entities")
def list_entities(db: Session = Depends(database.get_db)):
    return db.query(models.Entity).all()

@router.get("/relations")
def list_relations(db: Session = Depends(database.get_db)):
    return db.query(models.Relation).all()

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

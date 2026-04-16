from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database, models, schemas, auth
from agents.coordinator import MultiAgentSystem
from agents.decision_agent import DecisionAgent
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()
agent_system = MultiAgentSystem()
decision_engine = DecisionAgent()

class ChatRequest(BaseModel):
    query: str
    doc_id: Optional[str] = None

@router.post("/query")
async def handle_query(request: ChatRequest, db: Session = Depends(database.get_db)):
    # user_id = 1
    
    # Run multi-agent system
    result = agent_system.query(request.query)
    
    # Save query to DB
    # db_query = models.Query(user_id=1, query_text=request.query, response_text=result["answer"])
    # db.add(db_query)
    # db.commit()
    
    return result

@router.post("/decide")
async def handle_decision(request: ChatRequest, db: Session = Depends(database.get_db)):
    # Retrieve context first
    chunks = agent_system.retriever.run(request.query)
    context = "\n\n".join([c["content"] for c in chunks])
    
    decision = decision_engine.run(context)
    return decision

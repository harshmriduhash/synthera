from agents.retriever_agent import RetrieverAgent
from agents.extractor_agent import ExtractorAgent
from agents.reasoning_agent import ValidatorAgent, ReasoningAgent
from typing import Dict

class MultiAgentSystem:
    def __init__(self):
        self.retriever = RetrieverAgent()
        self.extractor = ExtractorAgent()
        self.validator = ValidatorAgent()
        self.reasoner = ReasoningAgent()

    def query(self, user_query: str) -> Dict:
        # 1. Retrieve
        chunks = self.retriever.run(user_query)
        
        # 2. Extract
        extracted_info = self.extractor.run(user_query, chunks)
        
        # 3. Validate
        validation = self.validator.run(extracted_info, chunks)
        
        # 4. Reason
        reasoning = self.reasoner.run(extracted_info, chunks)
        
        return {
            "answer": extracted_info,
            "validation": validation,
            "reasoning": reasoning,
            "sources": [
                {"page": c["metadata"]["page"], "snippet": c["content"][:200]} 
                for c in chunks
            ]
        }

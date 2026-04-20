from .retriever_agent import RetrieverAgent
from .extractor_agent import ExtractorAgent
from .reasoning_agent import ValidatorAgent, ReasoningAgent
from .scraper_agent import ScraperAgent
from typing import Dict

class MultiAgentSystem:
    def __init__(self):
        self.retriever = RetrieverAgent()
        self.extractor = ExtractorAgent()
        self.validator = ValidatorAgent()
        self.reasoner = ReasoningAgent()
        self.scraper = ScraperAgent()

    def query(self, user_query: str) -> Dict:
        # 1. Retrieve
        chunks = self.retriever.run(user_query)
        
        # 2. Extract
        extracted_info = self.extractor.run(user_query, chunks)
        
        # 3. Scrape (Real-time external data)
        scraped_info = self.scraper.run(user_query, extracted_info)
        
        # 4. Validate
        validation = self.validator.run(scraped_info, chunks)
        
        # 5. Reason
        reasoning = self.reasoner.run(scraped_info, chunks)
        
        return {
            "answer": scraped_info,
            "validation": validation,
            "reasoning": reasoning,
            "sources": [
                {"page": c["metadata"]["page"], "snippet": c["content"][:200]} 
                for c in chunks
            ]
        }

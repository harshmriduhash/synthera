from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from typing import List, Dict
import os
import json

class EntityAgent:
    def __init__(self):
        self.llm = ChatGroq(model="llama3-8b-8192", api_key=os.getenv("GROQ_API_KEY"))
        self.prompt = ChatPromptTemplate.from_template("""
        You are a knowledge graph builder. 
        Extract key entities (Company, Person, Metric, Date) and their RELATIONS from the context.
        
        Context: {context}
        
        Output MUST be a JSON list of:
        {{
            "entities": [{{ "name": "Company A", "type": "Company" }}],
            "relations": [{{ "subject": "Company A", "relation": "reported", "object": "Revenue of $10M" }}]
        }}
        """)

    def run(self, context: str) -> Dict:
        response = self.llm.invoke(self.prompt.format(context=context))
        try:
            # Clean response if it contains markdown
            content = response.content.replace("```json", "").replace("```", "").strip()
            return json.loads(content)
        except Exception as e:
            print(f"Error parsing entity JSON: {e}")
            return {"entities": [], "relations": []}

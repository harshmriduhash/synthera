from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from typing import List, Dict
import os

class ExtractorAgent:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))
        self.prompt = ChatPromptTemplate.from_template("""
        You are an expert financial data extractor. 
        Extract key structured information from the following context based on the user's query.
        
        Query: {query}
        Context: {context}
        
        Provide the answer in a clear, structured format.
        """)

    def run(self, query: str, chunks: List[Dict]) -> str:
        context = "\n\n".join([c["content"] for c in chunks])
        response = self.llm.invoke(self.prompt.format(query=query, context=context))
        return response.content

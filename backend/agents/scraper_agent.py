from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import os

class ScraperAgent:
    def __init__(self):
        # Fallback to a simple search if Tavily is not configured
        self.search = TavilySearchResults(api_key=os.getenv("TAVILY_API_KEY")) if os.getenv("TAVILY_API_KEY") else None
        self.llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))
        self.prompt = ChatPromptTemplate.from_template("""
        You are a research analyst. 
        Supplement the following information with real-time data found online.
        
        Original Context: {context}
        Query: {query}
        External Data: {external_data}
        
        Synthesize a comprehensive report.
        """)

    def run(self, query: str, context: str) -> str:
        external_data = ""
        if self.search:
            try:
                results = self.search.invoke(query)
                external_data = "\n\n".join([r["content"] for r in results])
            except Exception as e:
                print(f"Scraping error: {e}")
        
        response = self.llm.invoke(self.prompt.format(query=query, context=context, external_data=external_data))
        return response.content

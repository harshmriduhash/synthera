from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
import os

class ScraperAgent:
    def __init__(self):
        self.search = TavilySearchResults(api_key=os.getenv("TAVILY_API_KEY")) if os.getenv("TAVILY_API_KEY") else None
        self.llm = ChatGroq(model="llama3-70b-8192", api_key=os.getenv("GROQ_API_KEY"))
        self.prompt = ChatPromptTemplate.from_template("""
        You are a senior financial research analyst. 
        Your goal is to provide high-fidelity, real-time intelligence by supplementing internal document context with external web data.
        
        INTERNAL CONTEXT: {context}
        USER QUERY: {query}
        EXTERNAL SEARCH DATA: {external_data}
        
        TASKS:
        1. If external data is available, cross-reference it with internal context.
        2. Identify any contradictions or newer information in the external data.
        3. Synthesize a unified, concise strategic insight.
        4. If no external data is found, rely solely on internal context but note the limitation.
        
        Output format: Clear, professional markdown.
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

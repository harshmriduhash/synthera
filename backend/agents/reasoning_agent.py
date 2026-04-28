from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from typing import List, Dict
import os

class ValidatorAgent:
    def __init__(self):
        self.llm = ChatGroq(model="llama-3.1-8b-instant", api_key=os.getenv("GROQ_API_KEY"))
        self.prompt = ChatPromptTemplate.from_template("""
        You are a fact-checker. 
        Validate if the following answer is fully supported by the provided context.
        If there are any hallucinations or unsupported claims, point them out.
        
        Answer: {answer}
        Context: {context}
        
        Return "VALID" if it's correct, or provide a corrected version.
        """)

    def run(self, answer: str, chunks: List[Dict]) -> str:
        context = "\n\n".join([c["content"] for c in chunks])
        response = self.llm.invoke(self.prompt.format(answer=answer, context=context))
        return response.content

class ReasoningAgent:
    def __init__(self):
        # Use 70b for deeper reasoning quality
        self.llm = ChatGroq(model="llama-3.3-70b-versatile", api_key=os.getenv("GROQ_API_KEY"))
        self.prompt = ChatPromptTemplate.from_template("""
        You are a senior financial analyst with 20 years of experience.
        Based on the extracted information and the context, provide a deep reasoning or trend analysis.
        What does this mean for the business or the user's query?
        
        Extracted Info: {extracted_info}
        Context: {context}
        """)

    def run(self, extracted_info: str, chunks: List[Dict]) -> str:
        context = "\n\n".join([c["content"] for c in chunks])
        response = self.llm.invoke(self.prompt.format(extracted_info=extracted_info, context=context))
        return response.content

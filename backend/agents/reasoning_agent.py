from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from typing import List, Dict
import os

class ValidatorAgent:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))
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
        self.llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))
        self.prompt = ChatPromptTemplate.from_template("""
        You are a financial analyst.
        Based on the extracted information and the context, provide a deep reasoning or trend analysis.
        What does this mean for the business or the user's query?
        
        Extracted Info: {extracted_info}
        Context: {context}
        """)

    def run(self, extracted_info: str, chunks: List[Dict]) -> str:
        context = "\n\n".join([c["content"] for c in chunks])
        response = self.llm.invoke(self.prompt.format(extracted_info=extracted_info, context=context))
        return response.content

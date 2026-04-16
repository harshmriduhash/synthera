from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import os
import json

class DecisionAgent:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o-mini", api_key=os.getenv("OPENAI_API_KEY"))
        self.prompt = ChatPromptTemplate.from_template("""
        You are a strategic decision engine.
        Based on the provided financial signals and context, make a recommendation.
        
        Signals: {signals}
        Context: {context}
        
        Output MUST be in JSON format:
        {{
            "decision": "BUY/SELL/HOLD/PROCEED/ABANDON",
            "confidence": 0.0-1.0,
            "drivers": ["reason1", "reason2"],
            "risks": ["risk1", "risk2"]
        }}
        """)

    def run(self, context: str, signals: str = "Standard growth and risk signals") -> dict:
        response = self.llm.invoke(self.prompt.format(signals=signals, context=context))
        try:
            return json.loads(response.content)
        except:
            return {
                "decision": "UNCERTAIN",
                "confidence": 0.0,
                "drivers": ["Error parsing AI response"],
                "risks": []
            }

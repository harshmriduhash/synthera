from . import vector_store
from typing import List, Dict

class RetrieverAgent:
    def __init__(self):
        pass

    def run(self, query: str) -> List[Dict]:
        """
        Retrieves the most relevant chunks for a given query.
        """
        chunks = vector_store.query_documents(query)
        return chunks

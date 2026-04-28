import chromadb
from chromadb.utils import embedding_functions
import os
from typing import List, Dict

CHROMA_DATA_PATH = "chroma_data"
if not os.path.exists(CHROMA_DATA_PATH):
    os.makedirs(CHROMA_DATA_PATH)

client = chromadb.PersistentClient(path=CHROMA_DATA_PATH)

# Always use local sentence-transformers embeddings (free, no API key required)
# This uses the all-MiniLM-L6-v2 model which is downloaded automatically on first run
emb_fn = embedding_functions.DefaultEmbeddingFunction()

# Get or create collection — delete and recreate if embedding config has changed
try:
    collection = client.get_or_create_collection(
        name="synthera_docs",
        embedding_function=emb_fn
    )
except Exception as e:
    print(f"Collection load error (likely embedding mismatch), recreating: {e}")
    try:
        client.delete_collection("synthera_docs")
    except:
        pass
    collection = client.create_collection(
        name="synthera_docs",
        embedding_function=emb_fn
    )

def add_documents(chunks: List[Dict], doc_id: str):
    ids = [f"{doc_id}_{i}" for i in range(len(chunks))]
    documents = [c["content"] for c in chunks]
    metadatas = [c["metadata"] for c in chunks]
    for m in metadatas:
        m["doc_id"] = doc_id

    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas
    )

def query_documents(query_text: str, n_results: int = 5) -> List[Dict]:
    results = collection.query(
        query_texts=[query_text],
        n_results=n_results
    )

    formatted_results = []
    if results["documents"]:
        for i in range(len(results["documents"][0])):
            formatted_results.append({
                "content": results["documents"][0][i],
                "metadata": results["metadatas"][0][i],
                "id": results["ids"][0][i]
            })
    return formatted_results

import fitz  # PyMuPDF
from typing import List, Dict

def extract_text_from_pdf(file_path: str) -> List[Dict]:
    doc = fitz.open(file_path)
    pages = []
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        pages.append({
            "page": page_num + 1,
            "content": text
        })
    return pages

def chunk_text(pages: List[Dict], chunk_size: int = 1000, overlap: int = 200) -> List[Dict]:
    chunks = []
    for page in pages:
        content = page["content"]
        page_num = page["page"]
        
        # Simple chunking by characters for MVP
        for i in range(0, len(content), chunk_size - overlap):
            chunk_content = content[i:i + chunk_size]
            chunks.append({
                "content": chunk_content,
                "metadata": {
                    "page": page_num
                }
            })
    return chunks

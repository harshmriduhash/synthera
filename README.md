# 🧠 SYNTHERA AI — The Intelligence Layer for Modern Finance

[![Synthera](https://img.shields.io/badge/Synthera-AI-blue?style=for-the-badge)](https://synthera.ai)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![ChromaDB](https://img.shields.io/badge/Vector_DB-Chroma-green?style=for-the-badge)](https://www.trychroma.com)

> **"Know What Matters. Decide What’s Next."**

Synthera AI is a production-grade, AI-native intelligence platform designed to replace the manual labor of document analysis with a sophisticated multi-agent reasoning system. It transforms unstructured financial reports into structured insights, strategic recommendations, and relational memory.

---

## 🚀 Core Value Proposition

In a world of information overload, Synthera provides clarity through:

*   **Document Intelligence**: Automated high-fidelity parsing of complex financial PDFs.
*   **Explainable Multi-Agent RAG**: Not just an answer, but a reasoned output backed by direct citations and snippets.
*   **Decision Engine**: A strategic layer that processes 3-5 key financial signals to provide standardized recommendations.
*   **Intelligence Feed**: Continuous monitoring and anomaly detection across your entire document repository.
*   **Relational Memory**: A growing Knowledge Graph that remembers entities and relationships across documents.

---

## 🎨 Design Philosophy: "Steel & Shadow"

Synthera features a curated high-fidelity interface built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**. The design is optimized for deep work, featuring a premium dark aesthetic (#0B0F1A), glassmorphism, and subtle micro-animations that reflect a "State of the Art" enterprise experience.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Typography**: Inter (Modern Geometric Sans)
- **Styling**: Tailwind CSS (Steel & Shadow palette)
- **Components**: shadcn/ui (Enterprise-Grade primitives)
- **Icons**: Lucide React

### Backend
- **Core**: FastAPI (Asynchronous, High-Performance)
- **Object Parsing**: Pydantic V2
- **Document Processing**: PyMuPDF (fitz)
- **AI Orchestration**: LangChain + Multi-Agent System
- **LLM Context**: GPT-4o (Reasoning, Extraction, Decision)
- **Embeddings**: OpenAI `text-embedding-3-small`

### Infrastructure & Storage
- **Primary Database**: PostgreSQL (Relational metadata)
- **Vector Database**: ChromaDB (Semantic memory)
- **Authentication**: JWT-based Secure Auth
- **Environment**: Container-ready / Vercel + Railway optimized

---

## 🏗 System Architecture

Synthera operates on a **Decoupled Agentic Pattern**:

1.  **Retriever Agent**: Performs semantic search on vectorized document chunks.
2.  **Extractor Agent**: Distills structured data from retrieved context.
3.  **Validator Agent**: Fact-checks outputs against source documents to eliminate hallucinations.
4.  **Reasoning Agent**: Conducts trend analysis and identifies strategic implications.
5.  **Decision Engine**: Finalizes outputs into actionable BUY/HOLD/SELL or strategic recommendations.

---

## 📦 Getting Started

### 1. Configure APIs
Synthera requires several API keys to function (Clerk, OpenAI, Tavily). 
Refer to [API_CONFIG.md](API_CONFIG.md) in the project root for a full list and placeholders.

### 2. Backend Setup
The backend is a FastAPI application that handles document processing and agent reasoning.
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Copy .env.example to .env and add your keys
cp .env.example .env
uvicorn main:app --reload
```

### 3. Frontend Setup
The frontend is a Next.js application with Clerk authentication.
```bash
cd frontend
npm install
# Copy .env.example to .env.local and add your keys
cp .env.example .env.local
npm run dev
```

---

## 📊 Roadmap

- [x] **V1 (MVP)**: Core RAG, Multi-Agent System, Document Pipeline, Explainability.
- [x] **Clerk Auth**: Secure authentication with custom dark theme.
- [x] **Catch-all Routes**: Fixed routing for seamless login/signup experience.
- [ ] **V1.5**: Integrated Voice AI (mic input), Shared Knowledge Graphs.
- [ ] **V2.0**: Real-time external scraping, Advanced Eval Dashboard, Enterprise SSO.

---

## 🔒 Security & Privacy

Synthera implements Enterprise-grade security out of the box:
- **AES-256** encryption for document storage.
- **JWT-based Auth** for secure API communication.
- **Audit Logs** for every AI interaction.
- **PII Redaction** during chunking.

---

<div align="center">
  <p>Built for the next generation of financial intelligence.</p>
  <p><strong>© 2026 Synthera AI.</strong></p>
</div>

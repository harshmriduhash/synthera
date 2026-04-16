# 🧠 SYNTHRA AI — PRD (Production-Grade)

---

# 1. 🚀 Product Overview

**SYNTHRA AI** is an AI-native intelligence platform that:

* Converts unstructured financial data into structured insights
* Provides explainable outputs
* Generates recommendations (Decision Engine)
* Continuously surfaces insights (Intelligence Feed)
* Builds a memory layer (Knowledge Graph)

---

# 2. 🎯 Vision

> Build an AI Analyst that doesn’t just answer — it tracks, reasons, remembers, and recommends.

---

# 3. 🧩 Core Modules

1. Document Intelligence
2. Retrieval (RAG)
3. Multi-Agent System
4. Decision Engine
5. Intelligence Feed
6. Explainability Layer
7. Memory + Knowledge Graph
8. Eval & Observability
9. Security Layer

---

# 4. 👤 Target Users

* Analysts
* Founders
* Consultants

---

# 5. 🧭 User Journey

## First-time user:

Landing → Signup → Upload → Query → Insight → Export

## Returning users:

Login → Dashboard → Feed → Query → Decision → Save

---

# 6. 🎨 Branding

Tagline:
**“Know What Matters. Decide What’s Next.”**

Colors:

* Background: #0B0F1A
* Primary: #1F6FEB
* Accent: #22C55E

Fonts:

* Headings: Satoshi / Inter
* Body: Inter

---

# 7. 🌐 Landing Page (Wireframe)

## Hero

Headline:
Stop Reading 100-Page Reports. Start Getting Answers.

CTA:
Try Free

---

## Problem

* Too much data
* Too much noise
* Too little clarity

---

## Solution

Upload → Ask → Get structured insights

---

## Features

* AI Document Intelligence
* Decision Engine
* Intelligence Feed
* Explainability

---

## CTA

Start Free

---

# 8. 🔐 Authentication

* Email/password
* Google OAuth

Security:

* JWT + refresh tokens
* HttpOnly cookies
* Rate limiting

---

# 9. 🧱 Database Schema

Users(id, email, password_hash)
Documents(id, user_id, file_url)
Chunks(id, doc_id, content, embedding)
Queries(id, user_id, query, response)
FeedItems(id, user_id, content, type)
Entities(id, name, type)
Relations(id, entity1, relation, entity2)

---

# 10. 🧠 Multi-Agent System

Agents:

* Retriever
* Extractor
* Validator
* Reasoner
* Decision Agent
* Feed Generator
* Memory Updater
* Explainability Agent

---

# 11. ⚙️ Core Pipeline

Upload → Parse → Chunk → Embed → Store → Query → Agents → Output

---

# 12. 🔥 Decision Engine (V1)

* Uses 3–5 financial signals
* Outputs:

  * decision
  * confidence
  * drivers

---

# 13. ⚡ Intelligence Feed (V1)

* Generated every 6–12 hours
* Based on user data

Types:

* events
* anomalies
* trends

---

# 14. 🧠 Explainability Layer

Each output includes:

* source doc
* page number
* snippet

UI:

* “View Source” modal

---

# 15. 🧬 Memory System (V1)

* Store entities + relationships
* Queryable

---

# 16. 📊 Eval Dashboard

Metrics:

* accuracy
* hallucination rate
* latency

---

# 17. 🎤 Voice AI

* Speech input
* text output

---

# 18. 💬 Conversational AI

* Chat interface
* context-aware

---

# 19. 🧑‍🎨 UI System

## Navbar

Logo | Features | Pricing | Login

## Dashboard

Sidebar:

* Chat
* Documents
* Feed
* Insights
* Graph

Main:

* Chat UI
* Results panel

---

# 20. 💰 Pricing

Free:

* 5 docs

Pro:

* ₹2499/month

Enterprise:

* custom

---

# 21. 🔐 Security

* HTTPS
* input validation
* prompt injection defense
* encryption
* RLS
* audit logs

---

# 22. ⚙️ Tech Stack

Frontend:
Next.js + Tailwind

Backend:
FastAPI

DB:
PostgreSQL

Vector:
Chroma

---

# 23. 🚀 Deployment

Frontend: Vercel
Backend: Railway/Render

---

# 24. 📈 Metrics

* <10s response
* > 85% accuracy

---

# 25. 🧠 Build Priority

1. Core pipeline
2. Explainability
3. Decision
4. Feed
5. Memory

---

# 26. 🧪 MVP Scope 

## 🎯 MVP Goal

Deliver a **working, reliable AI analyst system** with strong differentiation, not a bloated feature set.

---

## ✅ Included in MVP

### 1. Core Pipeline

* PDF upload
* Text extraction (PyMuPDF)
* Chunking + embeddings
* Vector search

---

### 2. RAG + Agent Workflow

* Retriever
* Extractor
* Validator
* Reasoner

---

### 3. Explainability (CRITICAL)

* Source document
* Page number
* Snippet
* UI modal

---

### 4. Decision Engine (V1)

* 3–5 signals
* JSON output
* Confidence score

---

### 5. Chat Interface

* Query input
* Structured output
* Smooth UX

---

### 6. Auth

* Email/password
* JWT

---

### 7. Minimal Dashboard

* Chat
* Documents

---

## ⚡ Partial (Lightweight)

### Intelligence Feed

* Based on uploaded docs
* Cron job

### Memory System

* Store entities
* Simple relations

---

## Extra features

* Full graph visualization
* Advanced eval dashboard
* Real-time external scraping
* Enterprise infra scaling

---

## 🎯 Success Criteria

* End-to-end system works
* Explainability present
* Decision output consistent
* UI smooth
* Works on 3–5 docs reliably

---
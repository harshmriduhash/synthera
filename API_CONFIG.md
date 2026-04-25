# 🔑 Synthera AI — API Configuration Guide

To make the Synthera AI platform fully functional, you need to configure the following API keys and environment variables.

## 1. Authentication (Clerk)
Clerk is used for the frontend identity layer and user sessions.
- **Where to get**: [Clerk Dashboard](https://dashboard.clerk.com)
- **Placeholders**:
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: [Add Here]
  - `CLERK_SECRET_KEY`: [Add Here]

## 2. Large Language Model (OpenAI)
The backend agents use OpenAI for document extraction, reasoning, and chat.
- **Where to get**: [OpenAI Platform](https://platform.openai.com)
- **Placeholders**:
  - `OPENAI_API_KEY`: [Add Here]

## 3. Web Search (Tavily)
Tavily is used by the Retriever Agent to perform external web searches when document context is insufficient.
- **Where to get**: [Tavily AI](https://tavily.com)
- **Placeholders**:
  - `TAVILY_API_KEY`: [Add Here]

## 4. Internal Security
- `JWT_SECRET`: A secure random string for signing internal backend tokens.
- `DATABASE_URL`: Connection string for the metadata database (defaults to local SQLite).

---

### How to Apply
1. Copy the **Frontend** keys into `frontend/.env.local`
2. Copy the **Backend** keys into `backend/.env`
3. Restart both servers.

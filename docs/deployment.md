# Deployment Guide

## Prerequisites

- Node.js 20+
- PostgreSQL
- Git
- Google Gemini API Key

---

# Clone Repository

```bash
git clone <repository-url>
```

---

# Install Backend

```bash
cd server
npm install
```

---

# Install Frontend

```bash
cd client
npm install
```

---

# Environment Variables

Create a `.env` file inside the `server` folder.

```env
DATABASE_URL=your_database_url
GEMINI_API_KEY=your_gemini_api_key
```

---

# Run Backend

```bash
npm run dev
```

---

# Run Frontend

```bash
npm run dev
```

---

# Open Browser

```
http://localhost:5173
```

---

# Production

Recommended platforms:

- Vercel (Frontend)
- Railway / Render (Backend)
- Neon PostgreSQL

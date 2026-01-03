# Globe Trotter

A comprehensive travel planning application built with **FastAPI** (Python) and **React** (TypeScript).

## Project Structure

```
/backend
  /app
    /core          - Config, database, security
    /models        - SQLAlchemy models
    /schemas       - Pydantic schemas
    /api           - FastAPI routers
    /services      - Business logic
  /tests           - Pytest tests
  main.py          - FastAPI entry point

/frontend
  /src
    /components    - Reusable UI components
    /features      - Feature modules
      /auth        - Login, Register
      /trip-builder - Dashboard, Itinerary
      /community   - Public trips feed
      /dashboard   - Profile, Analytics
    /hooks         - Custom React hooks
    /lib           - API client, utilities
    App.tsx        - Main router
```

## Tech Stack

### Backend
- FastAPI (Async)
- PostgreSQL + SQLAlchemy 2.0 (Async)
- Alembic (Migrations)
- Pydantic V2 (Validation)
- OAuth2 + JWT (Auth)
- Pytest (Testing)

### Frontend
- React + TypeScript (Vite)
- Tailwind CSS + ShadcnUI (Styling)
- TanStack Query v5 (Data Fetching + Offline)
- React Hook Form + Zod (Forms)
- @dnd-kit (Drag-and-Drop)
- Recharts (Analytics)

## Getting Started

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## License

MIT

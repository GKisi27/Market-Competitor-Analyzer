# Backend (FastAPI)

This directory contains the FastAPI backend application.

## 📁 Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       └── endpoints/    # API route handlers
│   ├── core/                 # Core configs (settings, security)
│   ├── models/               # Database models (ORM)
│   ├── schemas/              # Pydantic schemas
│   ├── services/             # Business logic layer
│   ├── utils/                # Utility functions
│   └── middlewares/          # Custom middlewares
├── tests/
│   ├── unit/                 # Unit tests
│   └── integration/          # Integration tests
├── migrations/               # Database migrations
└── requirements.txt          # Python dependencies
```

## 🎯 Key Responsibilities

- RESTful API endpoints for competitor data
- User authentication & authorization (JWT)
- Database operations (async CRUD)
- Celery task dispatching
- Data validation with Pydantic

## 📦 Key Dependencies

- FastAPI
- Uvicorn (ASGI server)
- Pydantic (validation)
- SQLAlchemy / Motor (database)
- python-jose (JWT)
- Celery (task queue client)

## 🔐 Authentication

JWT-based authentication with:
- Login/Register endpoints
- Token refresh mechanism
- Role-based access control

## 📝 For Interns

Start with:
1. Understanding FastAPI app structure in `app/main.py`
2. Review API versioning in `app/api/v1/`
3. Learn Pydantic schemas in `app/schemas/`
4. Study dependency injection patterns

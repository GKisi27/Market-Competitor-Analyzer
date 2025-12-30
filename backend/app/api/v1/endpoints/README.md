# API Endpoints

This directory contains all API route handlers organized by version.

## Structure

```
endpoints/
├── __init__.py
├── auth.py           # Authentication endpoints
├── users.py          # User management
├── competitors.py    # Competitor CRUD
├── analysis.py       # Analysis endpoints
└── jobs.py           # Background job management
```

## API Versioning

All endpoints are versioned under `/api/v1/` to allow future breaking changes.

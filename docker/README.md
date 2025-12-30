# Docker Configuration

This directory contains Docker configurations for all services.

## 📁 Structure

```
docker/
├── frontend/       # Frontend Dockerfile
├── backend/        # Backend Dockerfile
├── workers/        # Celery worker Dockerfile
└── nginx/          # Nginx reverse proxy config
```

## 🐳 Services

| Service | Port | Description |
|---------|------|-------------|
| frontend | 3000 | Next.js application |
| backend | 5000 | Flask API |
| workers | - | Celery workers |
| redis | 6379 | Message broker |
| postgres/mongo | 5432/27017 | Database |
| nginx | 80/443 | Reverse proxy |

## 📝 For Interns

Start with:
1. Understanding Docker fundamentals
2. Learn docker-compose multi-container setup
3. Study environment variable patterns
4. Review health checks and dependencies

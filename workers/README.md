# Workers (Celery)

This directory contains Celery background workers for async task processing.

## 📁 Structure

```
workers/
├── tasks/          # Celery task definitions
├── utils/          # Worker utility functions
└── tests/          # Worker tests
```

## 🎯 Key Responsibilities

- Background job processing
- Scheduled tasks (beat)
- Web scraping job orchestration
- Data processing pipelines
- Email notifications

## 📦 Key Dependencies (To Be Added)

- Celery
- Redis (broker)
- Flower (monitoring - optional)

## 🔄 Task Flow

```
Flask API → Redis Broker → Celery Worker → Database Update
```

## 📝 For Interns

Start with:
1. Understanding Celery basics and task decorators
2. Learn how tasks connect to the crawler module
3. Study error handling and retry mechanisms
4. Review task result storage patterns

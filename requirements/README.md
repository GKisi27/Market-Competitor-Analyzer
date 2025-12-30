# Requirements

All Python dependencies organized by environment.

## 📁 Structure

```
requirements/
├── dev.txt      # All deps + dev/test/lint tools
├── stage.txt    # All deps + minimal testing
└── prod.txt     # All deps only (no dev tools)
```

## 🔧 Usage

```bash
# Development
pip install -r requirements/dev.txt

# Staging
pip install -r requirements/stage.txt

# Production
pip install -r requirements/prod.txt
```

## 📦 What's Included

All files include dependencies for:
- FastAPI (backend)
- Celery + Redis (workers)
- Crawl4AI + Playwright (crawler)

## 🔍 Environment Differences

| Package | Dev | Stage | Prod |
|---------|-----|-------|------|
| pytest | ✅ | ✅ | ❌ |
| black, flake8 | ✅ | ❌ | ❌ |
| flower (Celery UI) | ✅ | ✅ | ❌ |
| sentry-sdk | ❌ | ❌ | optional |

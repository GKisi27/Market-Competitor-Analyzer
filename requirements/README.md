# Requirements

All Python dependencies organized by component and environment.

## 📁 Structure

```
requirements/
├── backend-dev.txt       # Backend + dev/test tools
├── backend-stage.txt     # Backend + minimal testing
├── backend-prod.txt      # Backend only (no dev tools)
├── workers-dev.txt       # Celery workers + dev tools
├── workers-stage.txt     # Celery workers + testing
├── workers-prod.txt      # Celery workers only
├── crawler-dev.txt       # Crawl4AI + dev tools
├── crawler-stage.txt     # Crawl4AI + testing
└── crawler-prod.txt      # Crawl4AI only
```

## 🔧 Usage

```bash
# Install for development
pip install -r requirements/backend-dev.txt

# Install for production
pip install -r requirements/backend-prod.txt
```

## 📦 Environment Differences

| Environment | Testing | Linting | Monitoring |
|-------------|---------|---------|------------|
| **dev** | ✅ Full | ✅ Full | ❌ |
| **stage** | ✅ Basic | ❌ | ❌ |
| **prod** | ❌ | ❌ | ✅ Optional |

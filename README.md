# Market Competitor Analyzer

A full-stack web application for analyzing market competitors using modern web scraping and data analysis techniques.

## 🏗️ Project Architecture

This project follows the **12-Factor App Methodology** for building scalable, maintainable applications.

```
Market-Competitor-Analyzer/
├── frontend/          # Next.js/React frontend
├── backend/           # FastAPI backend
├── workers/           # Celery background workers
├── crawler/           # Crawl4AI web scraping
├── docker/            # Docker configurations
├── requirements/      # Python dependencies (dev/stage/prod)
├── configs/           # Environment configs (.properties)
├── docs/              # Documentation
├── scripts/           # Utility scripts
└── .github/workflows/ # CI/CD pipelines
```

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, React, TypeScript |
| Backend | FastAPI, Pydantic, SQLAlchemy |
| Task Queue | Celery + Redis |
| Web Scraping | Crawl4AI, Playwright |
| Database | PostgreSQL / MongoDB (TBD) |
| Deployment | Docker, AWS |
| CI/CD | GitHub Actions |

## 🌿 Branch Strategy

| Branch | Purpose | Environment |
|--------|---------|-------------|
| `prod` | Production releases | Production |
| `stage` | Pre-production testing | Staging |
| `dev` | Active development | Development |

**Workflow:** `dev` → `stage` → `prod`

## 📦 Requirements

```bash
# Development (includes testing & linting)
pip install -r requirements/dev.txt

# Staging
pip install -r requirements/stage.txt

# Production
pip install -r requirements/prod.txt
```

## ⚙️ Environment Setup

Environment configs are in `configs/` folder:
- `configs/dev/dev.properties`
- `configs/staging/stage.properties`
- `configs/prod/prod.properties`

## 🐳 Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

## 📝 For Interns

Each folder contains a `README.md` explaining:
- Purpose of the folder
- Key files to be created
- Dependencies and relationships

**Start here:** Read `docs/guides/README.md` for onboarding.

## 📄 License

*To be determined*
## 🏃‍♂️ How to Run the Project (Local Development)

### 1. Frontend (React / Vite)
The frontend is located in the root directory and uses Vite.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will typically run on `http://localhost:5173`.

### 2. Backend (FastAPI)
The backend requires setting up a Python environment and running the FastAPI server.

```bash
# Using Conda (Recommended based on user preferences)
conda create -n WebCrawlerEnv python=3.10  # If not created
conda activate WebCrawlerEnv

# Install requirements
pip install -r requirements/dev.txt

# Run the FastAPI server in the background/terminal
# Assuming the entrypoint is in backend/app/main.py (adjust if needed)
uvicorn backend.app.main:app --reload --port 8000
```
The backend API docs will be available at `http://localhost:8000/docs`.

### 3. Crawler Worker (Crawl4AI)
The crawler runs separately.

```bash
conda activate CrawlerMode

# Install requirements
pip install -r requirements/dev.txt

# Run the crawler script (example)
python crawler/run_scraper.py
```

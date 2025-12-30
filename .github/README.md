# GitHub Actions (CI/CD)

This directory contains GitHub Actions workflow configurations.

## 📁 Structure

```
.github/
└── workflows/
    ├── ci.yml              # Continuous Integration (all branches)
    ├── cd-staging.yml      # Deploy to staging (stage branch)
    └── cd-prod.yml         # Deploy to production (prod branch)
```

## 🔄 Pipeline Overview

```
Push to dev    → CI (lint, test, build)
Push to stage  → CI + Deploy to Staging
Push to prod   → CI + Deploy to Production
```

## 📋 Workflows

### CI (`ci.yml`)
- **Triggers:** Push/PR to `dev`, `stage`, `prod`
- **Jobs:** Lint → Test Backend → Test Frontend → Build Docker

### Staging Deploy (`cd-staging.yml`)
- **Triggers:** Push to `stage`
- **Actions:** Build → Push to ECR → Deploy to AWS

### Production Deploy (`cd-prod.yml`)
- **Triggers:** Push to `prod`
- **Actions:** Build → Push to ECR → Deploy to AWS → Smoke Tests

## 📝 For Interns

1. Every push triggers automated checks
2. Failing tests block merges
3. Successful builds auto-deploy to respective environments

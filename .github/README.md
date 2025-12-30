# GitHub Actions (CI/CD)

This directory contains GitHub Actions workflow configurations.

## 📁 Structure

```
.github/
└── workflows/
    ├── ci.yml              # Continuous Integration
    ├── cd-staging.yml      # Deploy to staging
    ├── cd-production.yml   # Deploy to production
    └── tests.yml           # Run test suite
```

## 🔄 Pipeline Overview

```
Push → Lint → Test → Build → Deploy
```

### Stages

1. **CI (ci.yml)**: Runs on every push
   - Linting (ESLint, Flake8)
   - Unit tests
   - Build verification

2. **Staging Deploy (cd-staging.yml)**: On merge to `develop`
   - Deploy to AWS staging

3. **Production Deploy (cd-production.yml)**: On merge to `main`
   - Deploy to AWS production

## 📝 For Interns

Understanding CI/CD:
1. Every push triggers automated checks
2. Failing tests block merges
3. Successful builds auto-deploy

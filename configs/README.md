# Environment Configurations

This directory contains environment-specific configuration files.

## 📁 Structure

```
configs/
├── dev/           # Development environment
├── staging/       # Staging environment
└── prod/          # Production environment
```

## 🔐 12-Factor App: Environment Variables

Following the 12-factor methodology, configurations are:
- Stored as environment variables
- Never committed to version control
- Different per environment

## 📄 Files Per Environment

Each environment folder will contain:
- `.env.example` - Template (committed)
- `.env` - Actual values (NOT committed)

## 📝 For Interns

**Never commit actual credentials!**
1. Copy `.env.example` to `.env`
2. Fill in your local development values
3. Ask team lead for staging/prod values if needed

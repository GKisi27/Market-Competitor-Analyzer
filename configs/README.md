# Environment Configurations

This directory contains environment-specific configuration files.

## 📁 Structure

```
configs/
├── dev/
│   └── dev.properties       # Development environment
├── staging/
│   └── stage.properties     # Staging environment
└── prod/
    └── prod.properties      # Production environment
```

## 🔐 12-Factor App: Environment Variables

Following the 12-factor methodology, configurations are:
- Stored as environment variables
- Different per environment (dev/stage/prod)
- **Never commit actual secrets!**

## 📦 Requirements Files (per environment)

Each service has environment-specific requirements:
- `requirements-dev.txt` - Includes testing & linting tools
- `requirements-stage.txt` - Includes minimal testing
- `requirements-prod.txt` - Production only, no dev tools

## 📝 For Interns

1. Copy the appropriate `.properties` file
2. Fill in your local development values
3. Ask team lead for staging/prod values if needed

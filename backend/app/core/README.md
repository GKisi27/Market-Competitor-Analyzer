# Core Configuration

Core application settings and security utilities.

## Files

```
core/
├── __init__.py
├── config.py        # Application settings (12-factor)
├── security.py      # JWT, password hashing
└── database.py      # Database connection
```

## 12-Factor: Config

All configuration loaded from environment variables.

# Components

Reusable React components for the application.

## Structure

```
components/
├── common/        # Shared components (Button, Input, Modal)
├── layout/        # Layout components (Header, Footer, Sidebar)
├── dashboard/     # Dashboard-specific components
├── charts/        # Data visualization components
└── auth/          # Authentication components (LoginForm, etc.)
```

## Guidelines

- Each component should have its own folder with:
  - `ComponentName.tsx` - Main component
  - `ComponentName.module.css` - Styles
  - `ComponentName.test.tsx` - Tests
  - `index.ts` - Export

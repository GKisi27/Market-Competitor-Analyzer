# Market Competitor Analyzer — Frontend

React web application for the **Market Competitor Analyzer** project. It provides dashboards, competitor insights, price index, gap analysis, and user authentication.

## Tech Stack

- **React 19** — UI library
- **Vite 7** — build tool and dev server
- **React Router DOM 7** — client-side routing
- **Tailwind CSS 4** — styling
- **Chart.js** & **react-chartjs-2** — charts and visualizations
- **Font Awesome** — icons

## Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (or yarn/pnpm)

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the port Vite prints in the terminal).

### Build for production

```bash
npm run build
```

Output is written to the `dist/` folder.

### Preview production build locally

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, SVGs
│   ├── components/      # Reusable UI components
│   │   ├── competitors/       # Competitor list & report
│   │   ├── competitorsDetails/
│   │   ├── dashboard/        # Charts, reports, welcome, word cloud
│   │   ├── gapAnalysis/
│   │   ├── homepage/        # Hero, nav, footer
│   │   ├── priceIndex/
│   │   └── Profile/
│   ├── pages/           # Route-level pages
│   ├── App.jsx          # Root component & routes
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## Routes

| Path                | Page             | Description                    |
|---------------------|------------------|--------------------------------|
| `/`                 | Homepage         | Landing page                   |
| `/login`            | Login            | User login                     |
| `/signup`           | Sign Up          | User registration              |
| `/dashboard`        | Dashboard        | Overview and charts            |
| `/price-index`      | Price Index      | Price index views              |
| `/gap-analysis`     | Gap Analysis     | Gap analysis charts            |
| `/competitors`      | Competitors      | Competitor list                |
| `/competitors-details` | Competitors Details | Competitor detail view   |
| `/Profile`          | Profile          | User profile and settings      |

## Integration

This frontend is intended to work with the **Market Competitor Analyzer** backend API. Configure the API base URL in your environment or in the app’s API client as needed.

For Docker-based deployment, see the root `docker/` and `docker-compose.yml` in the project root.

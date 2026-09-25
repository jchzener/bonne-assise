# BONNE ASSISE — v0.1 Destination Architecture

This repository is the deployable monorepo for Bonne Assise.

## Product direction

The destination is no longer treated as a long information page. A destination is a **navigable world** connecting:

- the place itself
- experiences
- stories
- food
- nearby destinations
- the traveller's journey

Ouidah is the first complete destination implementation.

## Routes

### Home
- `/en`
- `/fr`

### Destinations
- `/en/destinations`
- `/fr/destinations`
- `/en/destinations/ouidah`
- `/fr/destinations/ouidah`
- `/en/ouidah`
- `/fr/ouidah` (legacy-compatible route)

### Experiences
- `/en/experiences`
- `/fr/experiences`
- `/en/experiences/market-to-fire`
- `/fr/experiences/market-to-fire`
- `/en/experiences/life-on-the-water`
- `/fr/experiences/life-on-the-water`
- `/en/experiences/the-first-table`
- `/fr/experiences/the-first-table`
- `/en/experiences/five-first-tables`
- `/fr/experiences/five-first-tables`

### Editorial cross-links
- `/en/stories`
- `/fr/stories`
- `/en/stories/[slug]`
- `/fr/stories/[slug]`
- `/en/food`
- `/fr/food`
- `/en/food/[slug]`
- `/fr/food/[slug]`

These are intentionally lightweight foundations. Long-form editorial content and CMS-backed entities come later.

## Local development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend falls back to local mock data if `NEXT_PUBLIC_API_BASE_URL` is empty or the API is unavailable.

### Backend

```bash
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

API:

- `GET /health`
- `GET /api/v1/destinations/ouidah?locale=en`
- `GET /api/v1/destinations/ouidah?locale=fr`

## Render deployment

A `render.yaml` Blueprint is included at the repository root.

It defines:

1. `bonne-assise-api` — FastAPI service
2. `bonne-assise-web` — Next.js service

The frontend's `NEXT_PUBLIC_API_BASE_URL` is intentionally an unsynced Render environment variable because its value depends on the public Render URL assigned to the API service.

If left empty, the frontend remains fully functional using local mock data. For production API usage, set it to the deployed API origin, for example:

```text
https://bonne-assise-api.onrender.com
```

Do not commit secrets.

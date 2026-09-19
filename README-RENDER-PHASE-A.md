# BONNE ASSISE — Phase A Public Preview (Render)

This deployment is intentionally temporary and free. It creates one Render Web Service that serves both the React/Vite frontend and the FastAPI API from the same public `onrender.com` URL.

## Architecture

`Render Web Service (Docker, Free)`
- React/Vite build copied into `/app/frontend-dist`
- FastAPI serves `/api/*`
- FastAPI serves `/uploads/*`
- FastAPI serves the React app at `/`
- SQLite + uploads use `/tmp/bonne-assise/...` for preview only

## Important Phase A limitation

The Free Render filesystem is ephemeral. Uploaded images, the SQLite database, and CMS changes are lost whenever the service restarts, spins down, or redeploys. This is intentional for the preview phase. Do not treat this environment as production.

Free Render web services can also spin down after 15 minutes without inbound traffic, so the first request after idle may take about a minute to wake the service.

## Deploy via GitHub + Render Blueprint

1. Put the contents of this directory at the root of a GitHub repository. Do not commit `.env` or production secrets.
2. In Render, connect GitHub and create a **Blueprint** from the repository. Render reads the root `render.yaml`.
3. Keep the service on the `Free` plan for Phase A.
4. When Render asks for secret values, set:
   - `BA_ADMIN_EMAIL`
   - `BA_ADMIN_PASSWORD`
   `BA_SESSION_SECRET` is generated automatically by Render.
5. Render builds the Docker image and deploys it.
6. The service receives a public URL such as `https://bonne-assise-preview.onrender.com`.

## Live checks

- `GET https://<service>.onrender.com/` → website loads
- `GET https://<service>.onrender.com/api/health` → `ok: true`
- `https://<service>.onrender.com/#/edit` → CMS login page
- Login with the configured admin credentials
- Create/update a content item
- Upload an image
- Verify API and CMS requests stay on the same origin

## Phase B migration

Move to a persistent deployment later:
- paid Render Web Service + Persistent Disk for transitional SQLite/uploads, or preferably
- Render Web Service + Render Postgres + object storage (R2/S3) for a more robust production architecture
- custom professional domain + managed TLS

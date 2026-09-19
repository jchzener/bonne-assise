# BONNE ASSISE — Phase A: Deploy to Render now

## Target

Public preview URL supplied by Render:

`https://bonne-assise-preview.onrender.com`

The exact hostname may differ if the Render service name is already taken.

## 1. Create the GitHub repository

Create a new repository, e.g. `bonne-assise`.

The **contents of this folder** must be the repository root, so `render.yaml` and `Dockerfile` are visible at the top level.

Do not commit a `.env` file or secrets.

## 2. Push the code

From this folder:

```bash
git init
git add .
git commit -m "Deploy BONNE ASSISE Phase A preview"
git branch -M main
git remote add origin git@github.com:YOUR_GITHUB_USER/bonne-assise.git
git push -u origin main
```

If the repository already exists, use its normal remote instead.

## 3. Create the Render service

In Render:

1. New → Blueprint
2. Connect GitHub
3. Select the `bonne-assise` repository
4. Render detects `/render.yaml`
5. Review the single service `bonne-assise-preview`
6. Keep compute plan `Free`
7. Provide `BA_ADMIN_EMAIL`
8. Provide `BA_ADMIN_PASSWORD`
9. Keep the generated `BA_SESSION_SECRET`
10. Create/Apply the Blueprint

## 4. Wait for the first deploy

Render builds the root `Dockerfile`.

The container:
- builds the React/Vite frontend,
- copies `dist` into the FastAPI image,
- starts FastAPI on Render's `PORT`,
- serves React at `/`,
- serves API at `/api/*`,
- serves uploads at `/uploads/*`.

## 5. Open the public URL

Open the URL shown by Render, typically:

`https://bonne-assise-preview.onrender.com`

Then check:

`https://bonne-assise-preview.onrender.com/api/health`

Expected JSON:

```json
{"ok":true,"service":"bonne-assise-api","version":"2.0.0"}
```

CMS:

`https://bonne-assise-preview.onrender.com/#/edit`

## 6. Phase A limitation

This is deliberately a disposable preview.

The Free Render filesystem is ephemeral. SQLite, uploaded images, and CMS changes are lost when the service redeploys, restarts, or spins down.

The Free web service also spins down after 15 minutes of inactivity; the next request can take about a minute while it wakes up.

Do not enter important production data.

## 7. Phase A acceptance checklist

- [ ] Public `onrender.com` URL works
- [ ] Home loads
- [ ] Mobile navigation/pages load
- [ ] `/api/health` returns `ok: true`
- [ ] CMS route opens
- [ ] CMS login succeeds
- [ ] Content can be edited during the live session
- [ ] Upload works during the live session
- [ ] No console/network errors that block core navigation
- [ ] First-load wake-up behavior understood and documented

## 8. Phase B later

Do not redesign the application around the temporary filesystem.

For the persistent deployment, migrate toward:

`Render paid Web Service + Render Postgres + object storage (R2/S3) + professional domain + managed TLS`

A transitional persistent Render disk can be used for SQLite/uploads, but Postgres + object storage is the stronger long-term architecture.

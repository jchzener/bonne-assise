# BONNE ASSISE API

FastAPI + SQLite API with authenticated editorial CMS.

## Production
The container stores the SQLite database in `/data` and uploaded media in `/uploads`.
Those paths are mapped to persistent Docker volumes by the root `docker-compose.yml`.

Required production environment:
```text
BA_ENV=production
BA_ADMIN_EMAIL=...
BA_ADMIN_PASSWORD=...
BA_SESSION_SECRET=...
BA_DB_PATH=/data/bonne_assise.db
BA_UPLOAD_DIR=/uploads
BA_ALLOWED_ORIGINS=https://example.com
```

The production session cookie is Secure + HttpOnly + SameSite=Lax.

## Local
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

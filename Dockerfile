# BONNE ASSISE — Phase A public preview on Render
# Single-service image: React static build + FastAPI API in one public origin.

FROM node:22-alpine AS frontend-build
WORKDIR /frontend
COPY Frontend/package*.json ./
RUN npm install --no-audit --no-fund
COPY Frontend/ ./
RUN npm run build

FROM python:3.13-slim
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    BA_ENV=production \
    BA_DB_PATH=/tmp/bonne-assise/data/bonne_assise.db \
    BA_UPLOAD_DIR=/tmp/bonne-assise/uploads \
    BA_FRONTEND_DIR=/app/frontend-dist

WORKDIR /app
COPY Backend/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY Backend/app ./app
COPY --from=frontend-build /frontend/dist ./frontend-dist

RUN mkdir -p /tmp/bonne-assise/data /tmp/bonne-assise/uploads

EXPOSE 10000
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-10000}"]

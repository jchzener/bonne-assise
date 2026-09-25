from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.home import router as home_router
from app.api.travel import router as travel_router
from app.api.destinations import router as destinations_router
from app.api.experiences import router as experiences_router

app = FastAPI(title="Bonne Assise API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(home_router, prefix="/api/v1")
app.include_router(travel_router, prefix="/api/v1")
app.include_router(destinations_router, prefix="/api/v1")
app.include_router(experiences_router, prefix="/api/v1")

@app.get("/health")
def health():
    return {"status": "ok", "service": "bonne-assise-api", "version": "0.1.0"}

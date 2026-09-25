from pydantic import BaseModel, Field

class TravelResponse(BaseModel):
    place_id: str
    origin: tuple[float, float]
    distance_km: float = Field(ge=0)
    estimated_minutes: int = Field(ge=1)
    mode: str
    source: str = "estimate"

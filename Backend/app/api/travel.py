from math import asin, cos, radians, sin, sqrt
from fastapi import APIRouter, HTTPException, Query
from app.schemas.travel import TravelResponse

router = APIRouter(tags=["travel"])

PLACES = {
    "ouidah": (6.3631, 2.0851),
    "ganvie": (6.4667, 2.4167),
    "abomey": (7.1850, 1.9911),
    "natitingou": (10.3042, 1.3796),
}

def haversine_km(a: tuple[float, float], b: tuple[float, float]) -> float:
    radius = 6371.0
    d_lat = radians(b[0] - a[0])
    d_lon = radians(b[1] - a[1])
    lat1 = radians(a[0])
    lat2 = radians(b[0])
    value = sin(d_lat / 2) ** 2 + sin(d_lon / 2) ** 2 * cos(lat1) * cos(lat2)
    return 2 * radius * asin(sqrt(value))

def profile(distance_km: float) -> tuple[str, float]:
    if distance_km < 15:
        return "Moto-taxi or taxi", 25
    if distance_km < 80:
        return "Car or shared taxi", 45
    return "Car or intercity bus", 55

@router.get("/places/{place_id}/travel", response_model=TravelResponse)
def get_travel(
    place_id: str,
    origin_lat: float = Query(..., ge=-90, le=90),
    origin_lon: float = Query(..., ge=-180, le=180),
) -> TravelResponse:
    destination = PLACES.get(place_id)
    if destination is None:
        raise HTTPException(status_code=404, detail="Place not found")
    origin = (origin_lat, origin_lon)
    distance = haversine_km(origin, destination)
    mode, speed = profile(distance)
    minutes = max(1, round((distance / speed) * 60))
    return TravelResponse(
        place_id=place_id,
        origin=origin,
        distance_km=round(distance, 1),
        estimated_minutes=minutes,
        mode=mode,
    )

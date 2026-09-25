from fastapi import APIRouter, HTTPException
from app.schemas.destination import DestinationResponse

router = APIRouter(prefix="/destinations", tags=["destinations"])

OUIDAH = {
    "id": "ouidah",
    "name": "Ouidah",
    "region": "South",
    "hero": {
        "eyebrow": "SOUTH BENIN · ATLANTIC COAST",
        "title": "Ouidah, where memory meets the sea.",
        "subtitle": "A city of sacred traditions, ocean air, living history and stories that ask you to slow down.",
        "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=2400&q=90",
        "coordinates": [6.3631, 2.0851],
    },
    "intro": "Ouidah is not a place to rush through. Its routes connect the Atlantic, living spiritual traditions, markets, courtyards and memories that continue to shape Benin.",
    "threads": [
        {"id":"memory","label":"MEMORY","title":"Follow the road to the Atlantic.","description":"The Route of the Enslaved is a memorial landscape, not simply a sightseeing route. Move through its stages slowly, from the historic city toward the Door of No Return."},
        {"id":"architecture","label":"ARCHITECTURE","title":"Read the city in its façades.","description":"Afro-Brazilian architecture adds another layer to Ouidah, reflecting the histories of return, trade and cultural exchange that shaped the city."},
        {"id":"living-traditions","label":"LIVING TRADITIONS","title":"Encounter belief without reducing it.","description":"The Temple of Pythons, Kpassè Sacred Forest and Vodun traditions are part of a living cultural landscape. Context and local guidance matter."},
        {"id":"atlantic","label":"ATLANTIC","title":"Let the city open toward the sea.","description":"The final stretch of the historic route reaches the coast, where Ouidah’s memory and the Atlantic meet."},
    ],
    "experiences": [
        {"id":"route-des-esclaves","title":"Walk the Route of the Enslaved","category":"MEMORY","duration":"Half day","description":"Follow the last stretch of a historic route from the city toward the Atlantic. The experience should leave room for remembrance, context and reflection.","image":"https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=90"},
        {"id":"history-museum","title":"Enter the history of Ouidah","category":"HISTORY","duration":"1–2 hours","description":"Visit the Musée d’Histoire de Ouidah in the former Portuguese fort and use its collections to understand the city, the Dahomey Kingdom and the history of enslavement.","image":"https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1800&q=90"},
        {"id":"sacred-landscape","title":"Walk through the sacred landscape","category":"LIVING TRADITIONS","duration":"2–3 hours","description":"Explore Kpassè Sacred Forest and the Temple of Pythons with local context. These are places of belief and cultural practice, not props for an exotic itinerary.","image":"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=90"},
        {"id":"afro-brazilian","title":"Look up at Ouidah","category":"ARCHITECTURE","duration":"1–2 hours","description":"Slow down through the historic streets and notice the Afro-Brazilian architectural traces that give Ouidah another visual and historical language.","image":"https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1800&q=90"},
        {"id":"atlantic","title":"End at the Atlantic","category":"COAST","duration":"Late afternoon","description":"Continue toward the coast and the Door of No Return, allowing the landscape to become part of the story rather than an afterthought.","image":"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90"},
    ],
    "stories": [
        {"id":"route-memory","eyebrow":"MEMORY","title":"The road to the Door of No Return","description":"A memorial route shaped by the forced journeys of enslaved people and by the city’s continuing work of remembrance.","image":"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=88"},
        {"id":"two-traditions","eyebrow":"CITY","title":"Two traditions, one street","description":"The Temple of Pythons faces the Basilica of the Immaculate Conception — a striking glimpse of the many religious histories that coexist in Ouidah.","image":"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=88"},
        {"id":"living-vodun","eyebrow":"LIVING TRADITIONS","title":"A tradition that is still alive","description":"Vodun is part of Benin’s living cultural and spiritual heritage. Approach it through people, places and context rather than spectacle.","image":"https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1400&q=88"},
    ],
    "foods": [
        {"name":"Amiwo","description":"A deeply colored corn-based staple often served with sauce and grilled protein.","image":"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=88"},
        {"name":"Akassa","description":"Soft fermented maize dough, a classic southern Beninese table staple.","image":"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=88"},
        {"name":"Grilled fish","description":"Fresh Atlantic fish, smoke, spice and simple accompaniments by the coast.","image":"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=88"},
    ],
    "practical": ["Give Ouidah at least a full day if you want to understand its historic core rather than collect a few sights.", "The Route of the Enslaved is best approached as a memorial journey; leave time to pause at its major stages.", "For sacred and spiritual places, follow local guidance and photography rules. Ask before entering, touching or photographing.", "November to February is commonly described by travel sources as a drier, more comfortable period for exploring southern Benin."],
    "nearby": ["Cotonou", "Ganvié", "Porto-Novo", "Abomey"],
}

@router.get("/{destination_id}", response_model=DestinationResponse)
def get_destination(destination_id: str) -> DestinationResponse:
    if destination_id != "ouidah":
        raise HTTPException(status_code=404, detail="Destination not found")
    return DestinationResponse.model_validate(OUIDAH)

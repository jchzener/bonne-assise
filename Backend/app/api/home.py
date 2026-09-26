from fastapi import APIRouter, Query
from app.schemas.home import HomeResponse

router = APIRouter(tags=["home"])

IMAGES = {
    "hero": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=88",
    "culture": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
    "nature": "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
    "food": "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    "history": "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
    "spirituality": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    "atlantic": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=88",
    "heartlands": "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1800&q=88",
    "north": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88",
    "tables": "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=88",
    "market": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=88",
    "ganvie": "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=88",
}

COPY = {
    "en": {
        "hero": ("BENIN · WEST AFRICA", "Come closer to the stories.", "A living country of water, memory, ritual, food and extraordinary encounters."),
        "discovery": [
            ("culture", "Culture", "Meet the traditions that still shape everyday life."),
            ("nature", "Nature", "From the Atlantic coast to forests, lagoons and savannah."),
            ("food", "Food", "Taste a country through markets, fire and family tables."),
            ("history", "History", "Walk through stories that connect Benin to the world."),
            ("spirituality", "Spirituality", "Explore beliefs, rituals and living traditions with respect and context."),
        ],
        "regions": [
            ("atlantic", "ATLANTIC", "The Atlantic", "Cities, lagoons, memory, living traditions and the ocean.", ["Ouidah", "Porto-Novo", "Ganvié", "Grand-Popo", "Cotonou"]),
            ("heartlands", "ROYAL HEARTLANDS", "The Royal Heartlands", "Kingdoms, heritage, craft, landscapes and living culture.", ["Abomey", "Dassa", "Kétou", "Allada"]),
            ("north", "NORTHERN HERITAGE AND LANDSCAPE", "The Northern Heritage and Landscape", "Mountains, wildlife, Tata Somba, royal traditions and northern cultures.", ["Natitingou", "Boukoumbé", "Tanguiéta", "Nikki"]),
        ],
        "products": [
            ("arrival-tables", "THE FIRST TABLES", "Five evenings at the table.", "Five carefully chosen dinners for your first nights in Benin — with the table, the menu and the details already taken care of.", "Cotonou · Ouidah · Porto-Novo", "5 evenings", "5 reservations · WhatsApp confirmation", "tables"),
            ("market-to-fire", "MARKET → FIRE", "Buy with a local. Cook. Sit down.", "A morning at the market, an afternoon around the fire and a shared meal built from what you chose together.", "Ouidah", "3–4 hours", "Market · cooking · shared meal", "market"),
            ("life-on-the-water", "LIFE ON THE WATER", "Ganvié, beyond the postcard.", "Leave the sightseeing boat behind. Spend a morning on the lake with a local host, a simple table and the rhythm of daily life.", "Ganvié", "Morning", "Pirogue · local host · lunch", "ganvie"),
        ],
    },
    "fr": {
        "hero": ("BÉNIN · AFRIQUE DE L'OUEST", "Entrez dans les histoires.", "Un pays vivant d'eau, de mémoire, de rituels, de cuisine et de rencontres singulières."),
        "discovery": [
            ("culture", "Culture", "Rencontrez les traditions qui façonnent encore la vie quotidienne."),
            ("nature", "Nature", "De la côte atlantique aux forêts, lagunes et savanes."),
            ("food", "Cuisine", "Goûtez un pays à travers les marchés, le feu et les tables familiales."),
            ("history", "Histoire", "Parcourez des récits qui relient le Bénin au monde."),
            ("spirituality", "Spiritualité", "Approchez les croyances et traditions vivantes avec respect et contexte."),
        ],
        "regions": [
            ("atlantic", "ATLANTIQUE", "L'Atlantique", "Villes, lagunes, mémoire, traditions vivantes et océan.", ["Ouidah", "Porto-Novo", "Ganvié", "Grand-Popo", "Cotonou"]),
            ("heartlands", "ROYAUMES CENTRAUX", "Les terres royales", "Royaumes, patrimoine, savoir-faire, paysages et culture vivante.", ["Abomey", "Dassa", "Kétou", "Allada"]),
            ("north", "PATRIMOINE ET PAYSAGES DU NORD", "Le patrimoine et les paysages du Nord", "Montagnes, faune, Tata Somba, traditions royales et cultures du Nord.", ["Natitingou", "Boukoumbé", "Tanguiéta", "Nikki"]),
        ],
        "products": [
            ("arrival-tables", "LES PREMIÈRES TABLES", "Cinq soirs à table.", "Cinq dîners choisis pour vos premières soirées au Bénin — la table, le menu et les détails sont déjà pris en charge.", "Cotonou · Ouidah · Porto-Novo", "5 soirs", "5 réservations · confirmation WhatsApp", "tables"),
            ("market-to-fire", "MARCHÉ → FEU", "Acheter avec un local. Cuisiner. S'asseoir.", "Un matin au marché, un après-midi autour du feu et un repas partagé construit à partir de ce que vous aurez choisi ensemble.", "Ouidah", "3–4 h", "Marché · cuisine · repas partagé", "market"),
            ("life-on-the-water", "LIFE ON THE WATER", "Ganvié, au-delà de la carte postale.", "Quittez le bateau touristique. Passez une matinée sur le lac avec un hôte local, une table simple et le rythme de la vie quotidienne.", "Ganvié", "Matinée", "Pirogue · hôte local · déjeuner", "ganvie"),
        ],
    },
}


def get_home(locale: str) -> HomeResponse:
    locale = locale if locale in COPY else "en"
    c = COPY[locale]
    hero = c["hero"]
    discovery = [{"id": x[0], "label": x[1], "description": x[2], "image": IMAGES[x[0]]} for x in c["discovery"]]
    regions = [{"id": x[0], "kicker": x[1], "title": x[2], "description": x[3], "destinations": x[4], "image": IMAGES[x[0]]} for x in c["regions"]]
    products = [{"id": x[0], "name": x[1], "title": x[2], "promise": x[3], "place": x[4], "duration": x[5], "format": x[6], "image": IMAGES[x[7]], "href": "#prendre-place"} for x in c["products"]]
    return HomeResponse.model_validate({
        "locale": locale,
        "hero": {"eyebrow": hero[0], "title": hero[1], "subtitle": hero[2], "image": IMAGES["hero"]},
        "discovery": discovery,
        "regions": regions,
        "places": [
            {"id":"ouidah","name":"Ouidah","region":"Sud","description":"Ici se rencontrent mémoire, spiritualité et Atlantique.","coordinates":[6.3631,2.0851],"image":"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1400&q=85","href":"/"+locale+"/destinations/ouidah"} if locale == "fr" else {"id":"ouidah","name":"Ouidah","region":"South","description":"Memory, spirituality and the Atlantic meet here.","coordinates":[6.3631,2.0851],"image":"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1400&q=85","href":"/"+locale+"/destinations/ouidah"},
            {"id":"ganvie","name":"Ganvié","region":"Sud" if locale == "fr" else "South","description":"Un village lacustre où la vie avance avec l’eau." if locale == "fr" else "A lake village where life moves with the water.","coordinates":[6.4667,2.4167],"image":IMAGES["ganvie"]},
            {"id":"abomey","name":"Abomey","region":"Sud" if locale == "fr" else "South","description":"Histoire royale, savoir-faire et mémoire du Dahomey." if locale == "fr" else "Royal history, craft and the memory of Dahomey.","coordinates":[7.1850,1.9911],"image":"https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1400&q=85"},
            {"id":"natitingou","name":"Natitingou","region":"Nord" if locale == "fr" else "North","description":"Porte d’entrée des paysages et communautés de l’Atacora." if locale == "fr" else "Gateway to the Atakora landscapes and communities.","coordinates":[10.3042,1.3796],"image":"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85"},
        ],
        "experiences": [],
        "prendrePlace": products,
        "stories": [
            {"id":"story-1","eyebrow":"NOTES DE TERRAIN" if locale == "fr" else "FIELD NOTES","title":"Pourquoi Ouidah reste avec vous" if locale == "fr" else "Why Ouidah stays with you","description":"Une ville de portes, de routes, de tambours et de mémoire — à comprendre lentement." if locale == "fr" else "A city of doors, routes, drums and memory — best understood slowly.","image":"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=88","place":"Ouidah"},
            {"id":"story-2","eyebrow":"PERSONNES" if locale == "fr" else "PEOPLE","title":"La vie sur l’eau" if locale == "fr" else "Life on the water","description":"Passer une matinée là où le lac est route, marché et maison." if locale == "fr" else "Spend a morning where the lake is road, market and home.","image":"https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=88","place":"Ganvié"},
            {"id":"story-3","eyebrow":"TABLE","title":"Un pays raconté par le feu" if locale == "fr" else "A country told through fire","description":"Les marchés et les cuisines familiales dessinent une autre carte du Bénin." if locale == "fr" else "Markets and family kitchens reveal another map of Benin.","image":"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=88","place":"Abomey"},
        ],
    })


@router.get("/home", response_model=HomeResponse)
def home(locale: str = Query("en", pattern="^(en|fr)$")) -> HomeResponse:
    return get_home(locale)

from fastapi import APIRouter, HTTPException
from app.schemas.destination import DestinationResponse

router = APIRouter(prefix="/destinations", tags=["destinations"])

BASE = {
    "id": "ouidah", "name": "Ouidah", "region": "The Atlantic",
    "hero": {
        "image": "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=90",
        "coordinates": [6.3631, 2.0851],
    },
    "experiences": [
        {"id":"route-des-esclaves","title":"Walk the Route of the Enslaved","category":"MEMORY","duration":"Half day","description":"Follow the historic route toward the Atlantic with room for remembrance, context and reflection.","image":"https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=90","href":"/stories/route-to-the-door-of-no-return"},
        {"id":"history-museum","title":"Enter the history of Ouidah","category":"HISTORY","duration":"1–2 hours","description":"Use the former Portuguese fort and its collections to read Ouidah through trade, kingdom, return and enslavement.","image":"https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1800&q=90","href":"/stories/ouidah-history"},
        {"id":"sacred-landscape","title":"Walk through the sacred landscape","category":"LIVING TRADITIONS","duration":"2–3 hours","description":"Explore sacred places with local context. These are places of belief and practice, not props for an exotic itinerary.","image":"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=90","href":"/experiences/living-traditions-ouidah"},
        {"id":"afro-brazilian","title":"Look up at Ouidah","category":"ARCHITECTURE","duration":"1–2 hours","description":"Slow down through the historic streets and notice the Afro-Brazilian traces that add another language to the city.","image":"https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1800&q=90","href":"/stories/afro-brazilian-ouidah"},
        {"id":"atlantic","title":"End at the Atlantic","category":"COAST","duration":"Late afternoon","description":"Continue toward the coast and let the landscape become part of the story rather than an afterthought.","image":"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90","href":"/stories/door-of-no-return"},
    ],
    "stories": [
        {"id":"route-memory","eyebrow":"MEMORY","title":"The road to the Door of No Return","description":"A memorial route shaped by the forced journeys of enslaved people and by the city’s continuing work of remembrance.","image":"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=88","href":"/stories/route-to-the-door-of-no-return"},
        {"id":"two-traditions","eyebrow":"CITY","title":"Two traditions, one street","description":"A glimpse of the many religious histories that coexist in Ouidah’s urban fabric.","image":"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=88","href":"/stories/two-traditions-one-street"},
        {"id":"living-vodun","eyebrow":"LIVING TRADITIONS","title":"A tradition that is still alive","description":"Approach Vodun through people, places and context rather than spectacle.","image":"https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1400&q=88","href":"/stories/living-vodun"},
    ],
    "foods": [
        {"name":"Amiwo","description":"A southern corn-based staple, often paired with sauce and grilled or braised protein.","image":"https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=88","href":"/food/amiwo"},
        {"name":"Akassa","description":"Soft fermented maize dough that belongs to the culinary vocabulary of southern Benin.","image":"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=88","href":"/food/akassa"},
        {"name":"Atlantic fish","description":"Fresh fish, smoke, spice and simple accompaniments connect the southern table to the coast.","image":"https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=88","href":"/food/atlantic-fish"},
    ],
    "nearby": [
        {"id":"cotonou","name":"Cotonou","region":"The Atlantic","href":"/destinations"},
        {"id":"ganvie","name":"Ganvié","region":"The Atlantic","href":"/destinations"},
        {"id":"porto-novo","name":"Porto-Novo","region":"The Atlantic","href":"/destinations"},
        {"id":"abomey","name":"Abomey","region":"Royal Heartlands","href":"/destinations"},
    ],
}

COPY = {
    "en": {
        "region": "The Atlantic",
        "hero": {"eyebrow":"SOUTH BENIN · ATLANTIC COAST","title":"Ouidah, a city of memory and living traditions.","subtitle":"A historic Atlantic city where memory, architecture, spiritual life and the road to the sea meet."},
        "intro":"Ouidah asks to be understood in layers. Its historic routes lead toward the Atlantic; Afro-Brazilian buildings sit beside older Beninese stories; churches and sacred places share the same urban fabric; and the city continues to carry living traditions.",
        "threads":[
            {"id":"memory","label":"MEMORY","title":"Follow the road to the Atlantic.","description":"The Route of the Enslaved is a memorial landscape, not simply a sightseeing route. Move through its stages slowly, from the historic city toward the Door of No Return."},
            {"id":"architecture","label":"ARCHITECTURE","title":"Read the city in its façades.","description":"Afro-Brazilian architecture adds another layer to Ouidah, reflecting histories of return, trade and cultural exchange."},
            {"id":"living-traditions","label":"LIVING TRADITIONS","title":"Encounter belief without reducing it.","description":"Sacred places and Vodun traditions are part of a living cultural landscape. Context and local guidance matter."},
            {"id":"atlantic","label":"ATLANTIC","title":"Let the city open toward the sea.","description":"The final stretch reaches the coast, where Ouidah’s memory and the Atlantic meet."},
        ],
        "practical":["Give Ouidah at least a full day if you want to understand its historic core rather than collect a few sights.","Approach the Route of the Enslaved as a memorial journey; leave time to pause at its major stages.","For sacred and spiritual places, follow local guidance and photography rules. Ask before entering, touching or photographing.","Use the city as a base for a slower southern journey rather than trying to compress every sight into one afternoon."],
        "journeyText":"Save Ouidah as a place in your journey. We can connect its experiences, stories and food to the other places you choose."
    },
    "fr": {
        "region": "L’Atlantique",
        "hero": {"eyebrow":"SUD DU BÉNIN · CÔTE ATLANTIQUE","title":"Ouidah, une ville de mémoire et de traditions vivantes.","subtitle":"Une ville historique de l’Atlantique où mémoire, architecture, vie spirituelle et route vers la mer se rencontrent."},
        "intro":"Ouidah demande à être comprise par couches. Ses routes historiques vont vers l’Atlantique ; les architectures afro-brésiliennes côtoient des histoires béninoises plus anciennes ; églises et lieux sacrés partagent le même tissu urbain ; et la ville continue de porter des traditions vivantes.",
        "threads":[
            {"id":"memory","label":"MÉMOIRE","title":"Suivre la route jusqu’à l’Atlantique.","description":"La Route de l’Esclave est un paysage mémoriel, pas une simple succession de sites. Parcourez-la lentement, de la ville vers la Porte du Non-Retour."},
            {"id":"architecture","label":"ARCHITECTURE","title":"Lire la ville dans ses façades.","description":"Les architectures afro-brésiliennes ajoutent une autre couche à Ouidah et racontent des histoires de retour, de commerce et d’échanges culturels."},
            {"id":"living-traditions","label":"TRADITIONS VIVANTES","title":"Rencontrer le spirituel sans le réduire.","description":"Les lieux sacrés et les traditions Vodun appartiennent à un paysage culturel vivant. Le contexte et les indications locales comptent."},
            {"id":"atlantic","label":"ATLANTIQUE","title":"Laisser la ville s’ouvrir vers la mer.","description":"La dernière partie du parcours atteint la côte, là où la mémoire d’Ouidah rencontre l’Atlantique."},
        ],
        "practical":["Accordez au moins une journée à Ouidah si vous souhaitez comprendre son centre historique plutôt que collectionner quelques sites.","Abordez la Route de l’Esclave comme un parcours mémoriel et prenez le temps de vous arrêter.","Dans les lieux sacrés et spirituels, suivez les indications locales et demandez avant d’entrer, toucher ou photographier.","Pensez Ouidah comme une étape d’un voyage plus lent dans le Sud plutôt que comme une liste à boucler en quelques heures."],
        "journeyText":"Enregistrez Ouidah dans votre voyage. Nous pourrons relier ses expériences, ses histoires et sa table aux autres lieux que vous choisissez."
    }
}

@router.get("/{destination_id}", response_model=DestinationResponse)
def get_destination(destination_id: str, locale: str = "en") -> DestinationResponse:
    if destination_id != "ouidah":
        raise HTTPException(status_code=404, detail="Destination not found")
    if locale not in COPY:
        locale = "en"
    content = COPY[locale]
    payload = {**BASE, **content, "hero": {**BASE["hero"], **content["hero"]}, "locale": locale}
    return DestinationResponse.model_validate(payload)

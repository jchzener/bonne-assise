from fastapi import APIRouter, HTTPException, Query
from app.schemas.experience import ExperienceProductDetail

router = APIRouter(tags=["experiences"])

DATA = {
    "market-to-fire": {
        "type":"HOSTED_EXPERIENCE", "name":"MARKET → FIRE", "place":"Ouidah", "region":"The Atlantic",
        "duration":"3–4 hours", "format":"Small group · local host", "hero":"https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2400&q=90",
        "host":{"name":"Your host", "role":"Cook & local guide", "bio":"A local cook who knows the market by its sounds, seasons and relationships — and turns what you choose into a shared table.", "image":"https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85"},
        "steps":[
            {"time":"09:00","title":"Meet your host","description":"Start with a simple introduction and learn what is worth looking for today."},
            {"time":"09:30","title":"Enter the market","description":"Choose ingredients together, ask questions and follow the logic of a real shopping trip."},
            {"time":"11:00","title":"Back to the kitchen","description":"Wash, cut, season and prepare the dishes with the gestures that make them familiar."},
            {"time":"12:30","title":"Sit down","description":"Share the meal, compare tastes and leave with the recipes and the memory of making them."},
        ],
        "included":["Local market visit","Ingredients for the session","Hands-on cooking","Shared meal","Recipe booklet"],
        "not_included":["Transport to Ouidah","Personal market purchases"],
        "practical":["Wear comfortable shoes","Small groups only","Dietary requirements can be discussed before booking"],
        "price_note":"Price shown at booking · per person", "availability_note":"Selected mornings · subject to host availability", "booking_label":"Reserve your place",
        "related":[{"id":"ouidah","label":"Explore Ouidah","href":"/destinations/ouidah"},{"id":"life-on-the-water","label":"Life on the Water","href":"/experiences/life-on-the-water"}]
    },
    "life-on-the-water": {
        "type":"HOSTED_EXPERIENCE", "name":"LIFE ON THE WATER", "place":"Ganvié", "region":"The Atlantic",
        "duration":"Morning", "format":"Small group · local host", "hero":"https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2400&q=90",
        "host":{"name":"Your host", "role":"Fisher & lake guide", "bio":"Meet someone whose daily life follows the water — not a staged performance of it.", "image":"https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85"},
        "steps":[
            {"time":"06:30","title":"Meet at the lake","description":"Begin early, when the lake is already moving with work and daily routines."},
            {"time":"07:00","title":"Take the pirogue","description":"Move through the waterways with a local host and learn how the lake connects homes, work and trade."},
            {"time":"09:00","title":"Spend time, not just time passing","description":"Pause with your host, listen and see the lake beyond the sightseeing circuit."},
            {"time":"10:30","title":"A simple table","description":"Finish with a meal shaped by what is available that day."},
        ],
        "included":["Pirogue and local host","Time on the lake","Shared lunch","Local context and conversation"],
        "not_included":["Transport to Ganvié","Personal purchases"],
        "practical":["Early start recommended","Small groups only","Bring sun protection and water"],
        "price_note":"Price shown at booking · per person", "availability_note":"Morning departures · weather and host dependent", "booking_label":"Reserve your place",
        "related":[{"id":"atlantic","label":"Explore The Atlantic","href":"/regions/atlantic"},{"id":"market-to-fire","label":"Market → Fire","href":"/experiences/market-to-fire"}]
    },
    "the-first-table": {
        "type":"EVENT", "name":"THE FIRST TABLE", "place":"Ouidah", "region":"The Atlantic",
        "duration":"January 1", "format":"Annual gathering · limited places", "hero":"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2400&q=90",
        "host":{"name":"A shared table", "role":"Beninese & Haitian culinary voices", "bio":"A gathering shaped with people who carry the histories, food traditions and memories this day brings together.", "image":"https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=85"},
        "steps":[
            {"time":"Morning","title":"Remember the place","description":"Begin with context about Ouidah, the history of the slave trade and the place the gathering inhabits."},
            {"time":"Late morning","title":"Prepare the table","description":"Cook and share the story of Joumou with Haitian and Beninese contributors."},
            {"time":"Midday","title":"Eat together","description":"A communal meal centred on Joumou, freedom, memory and the act of gathering."},
            {"time":"Afternoon","title":"Listen and exchange","description":"Conversation, music and testimony are shaped with the communities involved — never as spectacle."},
        ],
        "included":["Joumou meal","Cultural mediation","Shared gathering","Recipe and contextual notes"],
        "not_included":["Transport to Ouidah","Accommodation"],
        "practical":["January 1 only","Limited capacity","The programme is co-created with community and cultural partners","The experience is not a historical re-enactment"],
        "price_note":"Annual event · final price announced with the programme", "availability_note":"Places open ahead of January 1 · waiting list between editions", "booking_label":"Join the waiting list",
        "related":[{"id":"ouidah","label":"Explore Ouidah","href":"/destinations/ouidah"},{"id":"market-to-fire","label":"Market → Fire","href":"/experiences/market-to-fire"}]
    },
}

COPY = {
    "en": {
        "eyebrow":"PRENDRE PLACE", "intro_label":"THE EXPERIENCE", "why":"Why this experience matters", "host":"Meet the person behind the experience", "journey":"The experience", "includes":"Your place includes", "not_included":"Not included", "practical":"Before you come", "related":"Keep exploring", "reserve":"Your place", "price":"Price", "availability":"Availability", "book":"Reserve your place", "waiting":"Join the waiting list"
    },
    "fr": {
        "eyebrow":"PRENDRE PLACE", "intro_label":"L'EXPÉRIENCE", "why":"Pourquoi cette expérience compte", "host":"Rencontrez la personne qui vous accueille", "journey":"L'expérience", "includes":"Votre place comprend", "not_included":"Non compris", "practical":"Avant de venir", "related":"Continuez à explorer", "reserve":"Votre place", "price":"Prix", "availability":"Disponibilité", "book":"Réserver votre place", "waiting":"Rejoindre la liste d'attente"
    }
}

TEXT = {
    "en": {
      "market-to-fire": ("Buy with a local. Cook what you found. Sit down together.", "Food is not simply prepared in Benin. It is bought, negotiated, carried, transformed and shared. This morning-to-table experience lets you enter that chain instead of watching it from the outside.", "The value is not a cooking lesson alone. It is the relationship between market, ingredient, gesture and table — with a host who can explain what you are seeing and why it matters."),
      "life-on-the-water": ("Ganvié, beyond the postcard.", "Ganvié is not a floating attraction. It is a lived environment where the lake is road, workplace, market and home. This experience deliberately slows the visit down.", "The experience shifts the focus from seeing the lake to spending time with someone whose life is organised around it. The pirogue is a way into the relationship, not the destination itself."),
      "the-first-table": ("A January 1st table where food, memory and freedom meet.", "Joumou carries a powerful place in Haitian memory: a soup associated with January 1st and the independence of Haiti. Ouidah carries another history — the routes of enslavement and their remembrance. The First Table brings these histories into a contemporary gathering, without reenactment or spectacle.", "The experience is deliberately co-created with Haitian and Beninese voices. Its purpose is not to turn memory into tourism, but to create a place for food, conversation, remembrance and connection."),
    },
    "fr": {
      "market-to-fire": ("Acheter avec un local. Cuisiner ce que l'on a choisi. S'asseoir ensemble.", "Au Bénin, la cuisine ne commence pas dans la casserole. Elle commence au marché, dans les choix, les relations, les gestes et la table. Cette expérience permet d'entrer dans cette chaîne plutôt que de la regarder de l'extérieur.", "La valeur n'est pas seulement celle d'un cours de cuisine. C'est le lien entre marché, ingrédient, geste et table — avec un hôte capable d'expliquer ce que vous voyez et pourquoi cela compte."),
      "life-on-the-water": ("Ganvié, au-delà de la carte postale.", "Ganvié n'est pas une attraction flottante. C'est un environnement vécu où le lac est à la fois route, lieu de travail, marché et maison. Cette expérience choisit volontairement de ralentir.", "L'expérience déplace le regard : il ne s'agit plus seulement de voir le lac, mais de passer du temps avec quelqu'un dont la vie s'organise autour de lui. La pirogue est une porte d'entrée, pas la destination."),
      "the-first-table": ("Une table du 1er janvier où se rencontrent nourriture, mémoire et liberté.", "La soupe Joumou occupe une place forte dans la mémoire haïtienne : elle est associée au 1er janvier et à l'indépendance d'Haïti. Ouidah porte une autre histoire, celle des routes de la traite et de leur mémoire. The First Table met ces histoires en relation dans un rassemblement contemporain, sans reconstitution ni spectacle.", "L'expérience doit être co-construite avec des voix haïtiennes et béninoises. Son objectif n'est pas de transformer la mémoire en produit touristique, mais de créer un espace de nourriture, de conversation, de mémoire et de lien."),
    }
}

@router.get("/experiences/{slug}", response_model=ExperienceProductDetail)
def experience(slug: str, locale: str = Query("en")):
    if slug not in DATA:
        raise HTTPException(status_code=404, detail="Experience not found")
    locale = locale if locale in COPY else "en"
    item = DATA[slug].copy()
    title, intro, why = TEXT[locale][slug]
    c = COPY[locale]
    return ExperienceProductDetail.model_validate({**item, "title":title, "promise":intro, "intro":intro, "why_it_matters":why, "eyebrow":c["eyebrow"], "locale":locale})

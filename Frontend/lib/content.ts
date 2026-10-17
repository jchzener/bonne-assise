import type { Page } from "./types";

export const photos = {
  cotonou: "/images/benin/cotonou-3-1024x575.jpg.jpeg",
  portoNovo: "/images/benin/porto-novo-1-1024x683.jpg.jpeg",
  ganvie: "/images/benin/ganvie-1536x864.jpg.jpeg",
  ouidah: "/images/benin/ouidah-1024x683.jpg.jpeg",
  abomey: "/images/benin/abomey-1024x683.jpg.jpeg",
  natitingou: "/images/benin/natiitingou-1024x576.jpg.jpeg",
  grandPopo: "/images/benin/grand-popo-1024x576.jpg.jpeg",
  wagassi:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Couscous_au_fromage_wagassi.jpg?width=1400",
  amiwo:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Un_plats_d%27amiwo_au_poisson_au_benin.jpg?width=1400",
  market:
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=85",
  street:
    "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=85",
  cook: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=85",
  women:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=85",
  grill:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=85",
  coast:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85",
  boats:
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85",
  fisherman:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=85",
  city: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=85",
  waterfall:
    "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1600&q=85",
  wildlife:
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=85",
  temple:
    "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=85",
  palace:
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=85",
};

// keep pages export
export const pages: Page[] = [
  "home",
  "explore",
  "place",
  "food",
  "experience",
  "trip",
  "saved",
  "story",
];

export const placeCatalog: Record<
  string,
  {
    title: string;
    location: string;
    image: string;
    intro: string;
    bestTime: string;
    duration: string;
    from: string;
    note: string;
    heading: string;
    paragraph: string;
  }
> = {
  ganvie: {
    title: "Ganvié",
    location: "Lake Nokoué · Atlantique",
    image: photos.ganvie,
    intro:
      "A city held above water, where canoes are streets and every crossing carries a story. Ganvié is not a spectacle—it is home.",
    bestTime: "Early morning",
    duration: "Half a day",
    from: "45 min + boat",
    note: "Visit with a local guide",
    heading: "Life follows the rhythm of water.",
    paragraph:
      "Come early, when the floating market gathers almost without ceremony. The lake remains road, market, playground and pantry.",
  },
  cotonou: {
    title: "Cotonou",
    location: "Littoral · Southern Benin",
    image: photos.cotonou,
    intro:
      "A fast-moving coastal city best understood through its markets, street kitchens, music and the people who give each neighborhood its rhythm.",
    bestTime: "Early morning or evening",
    duration: "1–3 days",
    from: "Main urban hub",
    note: "Explore with time to stop",
    heading: "A city that moves by appetite.",
    paragraph:
      "Start at the market, follow the scent of charcoal and leave room for conversations. Cotonou reveals itself through small encounters as much as landmarks.",
  },
  "porto-novo": {
    title: "Porto-Novo",
    location: "Ouémé · Southern Benin",
    image: photos.portoNovo,
    intro:
      "A capital of layered histories, shaded streets, distinctive architecture and a daily life that rewards an unhurried visit.",
    bestTime: "Morning",
    duration: "A full day",
    from: "About 45 min from Cotonou",
    note: "Discover the city with a local",
    heading: "Meet the city before breakfast.",
    paragraph:
      "At first light, Ouando is already in conversation: baskets changing hands, zemidjans passing and breakfast ladled from enamel pots.",
  },
  ouidah: {
    title: "Ouidah",
    location: "Atlantique · Southern Benin",
    image: photos.ouidah,
    intro:
      "A place of memory, spiritual life, art and the Atlantic coast, where history remains present in the streets and ceremonies.",
    bestTime: "Morning",
    duration: "A full day",
    from: "West of Cotonou",
    note: "Visit sites with historical context",
    heading: "History still in motion.",
    paragraph:
      "Move slowly between memorial places, living cultural practices and the coast, making space for local voices and context.",
  },
  abomey: {
    title: "Abomey",
    location: "Zou · Southern Benin",
    image: photos.abomey,
    intro:
      "The historic heart of the Dahomey Kingdom, where royal memory, craft and contemporary life meet in a landscape of red earth.",
    bestTime: "Morning",
    duration: "A full day",
    from: "Inland from the coast",
    note: "Choose a knowledgeable guide",
    heading: "Memory in the red earth.",
    paragraph:
      "Explore the royal heritage with care, listening to the histories, objects and traditions that connect the past to the present.",
  },
  "grand-popo": {
    title: "Grand-Popo",
    location: "Mono · Southwestern Benin",
    image: photos.grandPopo,
    intro:
      "A quieter coastal landscape where the Mono estuary, fishing communities and Atlantic shoreline shape the pace of the day.",
    bestTime: "First light or late afternoon",
    duration: "1–2 days",
    from: "Southwestern coast",
    note: "Respect fishing routines and tides",
    heading: "Where river meets sea.",
    paragraph:
      "Follow the estuary with a local guide and learn how water, tides, work and meals are woven together.",
  },
  natitingou: {
    title: "Natitingou",
    location: "Atacora · Northern Benin",
    image: photos.natitingou,
    intro:
      "A gateway to northern landscapes, living traditions and the communities of the Atacora region.",
    bestTime: "Dry season; confirm local conditions",
    duration: "2–3 days",
    from: "Northwestern Benin",
    note: "Plan transport ahead",
    heading: "Take the red road north.",
    paragraph:
      "Go beyond the transit stop: make time for local guides, regional food and the landscapes that give the north its character.",
  },
  "so-ava": {
    title: "Sô-Ava",
    location: "Lake Nokoué · Atlantique",
    image: photos.boats,
    intro:
      "Lakeside gateway to the water towns—pirogues, morning markets and the slow rhythm of Lake Nokoué.",
    bestTime: "Early morning",
    duration: "Half a day",
    from: "North of Cotonou",
    note: "Combine with Ganvié by boat",
    heading: "Where the lake begins to speak.",
    paragraph:
      "Sô-Ava is less a spectacle than a working shore: embarkations, nets, and conversations that set the tone before you reach the stilt city.",
  },
  pendjari: {
    title: "Pendjari",
    location: "Atacora · Far north-west",
    image: photos.natitingou,
    intro:
      "One of West Africa's last great wildlife reserves—elephants, lions and open savanna, approached with guides and time.",
    bestTime: "December–March",
    duration: "2–3 days",
    from: "Via Natitingou",
    note: "Book lodge and guide ahead",
    heading: "The north still holds wild ground.",
    paragraph:
      "Pendjari rewards patience: dry-season tracks, early drives, and the knowledge that this park is part of a wider cross-border ecosystem.",
  },

  tanougou: {
    title: "Tanougou Falls",
    location: "Atacora · Near Tanguiéta",
    image: photos.waterfall,
    intro:
      "Cascades in a rock amphitheatre—a cool pause on the road to Pendjari and the northern hills.",
    bestTime: "Cooler months",
    duration: "Half a day",
    from: "Near Tanguiéta",
    note: "Combine with Natitingou",
    heading: "Water in the hills.",
    paragraph:
      "Tanougou is a stop with intention: shade, sound of water, and a sense of the Atacora beyond the transit towns.",
  },

  possotome: {
    title: "Possotomè",
    location: "Mono · Lake Ahémé",
    image: photos.coast,
    intro:
      "A lakeside town on Ahémé known for thermal springs, calm water and a slower Mono rhythm—best approached without rush.",
    bestTime: "Morning; dry season for roads",
    duration: "Half to full day",
    from: "West of Cotonou via Bopa",
    note: "Combine with Lake Ahémé and local guides",
    heading: "Water that holds the day.",
    paragraph:
      "Possotomè is not a checklist stop. Come for the lake edge, the springs, and the sense that Mono life organises itself around water, work and quiet hospitality.",
  },
  bopa: {
    title: "Bopa",
    location: "Mono · Southwestern Benin",
    image: photos.boats,
    intro:
      "A working Mono town and gateway toward Lake Ahémé—markets, river life and the practical heart of the southwest.",
    bestTime: "Morning market hours",
    duration: "Half a day",
    from: "Road west from Cotonou",
    note: "Useful base for Ahémé and Possotomè",
    heading: "Gateway to the Mono waters.",
    paragraph:
      "Bopa rewards attention to ordinary movement: stalls, transport junctions, and the people who keep the lake and road connected. Use it as a hinge, not only a transit name.",
  },
  allada: {
    title: "Allada",
    location: "Atlantique · South-central Benin",
    image: photos.palace,
    intro:
      "A historic kingdom seat and living town—where royal memory, markets and daily traffic share the same ground.",
    bestTime: "Morning",
    duration: "Half to full day",
    from: "North of Cotonou",
    note: "Visit with local historical context",
    heading: "History under ordinary light.",
    paragraph:
      "Allada is not a museum. Royal lineages, market noise and road life sit side by side. Come ready to listen as much as to look.",
  },
  parakou: {
    title: "Parakou",
    location: "Borgou · Central-north Benin",
    image: photos.city,
    intro:
      "The main urban hub of central-north Benin—rail memory, markets, and a crossroads between south and the Sahel edge.",
    bestTime: "Dry season; cooler hours",
    duration: "1–2 days",
    from: "North of the Zou corridor",
    note: "Plan rest and local food stops",
    heading: "A city that turns the map.",
    paragraph:
      "Parakou is where distances change. Markets, transport yards and regional kitchens make it a place to understand the country’s middle belt—not only pass through it.",
  },
  ketou: {
    title: "Kétou",
    location: "Plateau · Southeastern Benin",
    image: photos.temple,
    intro:
      "A historic Yoruba town of the Plateau—walls, memory and a cultural life that still shapes the southeast.",
    bestTime: "Morning",
    duration: "Half to full day",
    from: "East of Porto-Novo / Pobè axis",
    note: "Approach heritage with local guidance",
    heading: "A town that keeps its own time.",
    paragraph:
      "Kétou holds layers of Yoruba history in a living town. Walk with attention: fortifications, market days and the quieter spaces where memory is not performed for visitors.",
  },

};

export const editionSets = [
  [
    [
      "Explore · Littoral",
      "COTO|NOU",
      "City of movement",
      "place",
      "edition-blue",
    ],
    [
      "Explore · Ouémé",
      "PORTO|—NOVO",
      "City of layers",
      "place",
      "edition-red",
    ],
    [
      "Taste · North",
      "WA|GASSI",
      "A food with a territory",
      "food",
      "edition-yellow",
    ],
    [
      "Experience · Atacora",
      "NORTH|BOUND",
      "Take the red road",
      "experience",
      "edition-cyan",
    ],
  ],
  [
    [
      "Place · Mono",
      "GRAND|POPO",
      "Where river meets sea",
      "place",
      "edition-cyan",
    ],
    ["Food · South", "AMI|WO", "Red rice, many tables", "food", "edition-red"],
    [
      "People · Cotonou",
      "MARKET|NAMES",
      "Meet the people behind the place",
      "story",
      "edition-yellow",
    ],
    [
      "Guide · Ouidah",
      "OUI|DAH",
      "History still in motion",
      "place",
      "edition-blue",
    ],
  ],
  [
    ["Place · Nokoué", "GAN|VIÉ", "Life on the water", "place", "edition-blue"],
    [
      "Experience · Cotonou",
      "AFTER|DARK",
      "Follow the smoke",
      "experience",
      "edition-red",
    ],
    [
      "Food · Everywhere",
      "FIVE|MEALS",
      "Start with the table",
      "food",
      "edition-yellow",
    ],
    [
      "Story · Atacora",
      "RED|ROAD",
      "A slower way north",
      "story",
      "edition-cyan",
    ],
  ],
  [
    [
      "Guide · Porto-Novo",
      "EARLY|LIGHT",
      "Meet the city before breakfast",
      "story",
      "edition-yellow",
    ],
    [
      "Food · Markets",
      "BUY|LOCAL",
      "Take it home, make it together",
      "food",
      "edition-cyan",
    ],
    [
      "Experience · Mono",
      "ON THE|WATER",
      "Two quiet hours with a local",
      "experience",
      "edition-blue",
    ],
    [
      "Place · Abomey",
      "ROYAL|GROUND",
      "Memory in the red earth",
      "place",
      "edition-red",
    ],
  ],
];

export const foodCycles = [
  {
    label: "Fresh Peulh Cheese",
    title: "Wagassi",
    image: photos.wagassi,
    intro: "One taste, many paths",
    paths: ["From the north", "Made by hand", "Taste it here", "Go further"],
    detail: "Borgou & Alibori",
    link: "Follow the story of Wagassi",
  },
  {
    label: "Five meals to begin with",
    title: "Start at the table",
    image: photos.amiwo,
    intro: "A first taste of Benin",
    paths: [
      "Amiwo at noon",
      "Akassa by the water",
      "Grilled fish at dusk",
      "Pâte with a local sauce",
    ],
    detail: "Across the country",
    link: "Explore Beninese food",
  },
  {
    label: "Buy with a local",
    title: "Cook. Sit down.",
    image: photos.women,
    intro: "The market is the beginning",
    paths: [
      "Choose what is fresh",
      "Learn the ingredients",
      "Cook together",
      "Eat without rushing",
    ],
    detail: "Cotonou · Porto-Novo",
    link: "Meet the people behind the table",
  },
  {
    label: "A taste of the north",
    title: "The red road",
    image: photos.grill,
    intro: "Food can be a direction",
    paths: [
      "Follow the ingredients",
      "Meet a maker",
      "Eat where it comes from",
      "Keep going north",
    ],
    detail: "Atacora · Borgou",
    link: "Take the food trail",
  },
];

export const peopleEntries = [
  [
    "Cook · Cotonou",
    "Rosine sees a market as a kitchen without walls.",
    photos.women,
  ],
  ["Fisherman · Lake Nokoué", "Koffi, keeper of the water.", photos.fisherman],
  ["Maker · Natitingou", "Aïssatou works the old way, by hand.", photos.cook],
  [
    "Guide · Ouidah",
    "Désiré knows where the road changes character.",
    photos.street,
  ],
];

export const foodCatalog: Record<
  string,
  {
    title: string;
    location: string;
    image: string;
    intro: string;
    madeFrom: string;
    season: string;
    taste: string;
    tryIt: string;
    heading: string;
    headingEm: string;
    p1: string;
    p2: string;
  }
> = {
  wagassi: {
    title: "Wagassi",
    location: "Borgou · Northern Benin",
    image: photos.wagassi,
    intro:
      "Soft, fresh and gently salted, wagassi is the cheese of Fulani pastoral life—and an edible path into the landscapes of northern Benin.",
    madeFrom: "Fresh cow’s milk",
    season: "All year",
    taste: "Mild, milky, delicate",
    tryIt: "Grilled or in tomato sauce",
    heading: "A landscape,",
    headingEm: "held together.",
    p1: "Wagassi begins with fresh milk and the leaves of the calotropis plant, whose sap gently separates curds from whey. The method travels through families—measured less by recipe than by touch, sound and attention.",
    p2: "In markets across Benin you will see ivory rounds stacked neatly, sometimes stained rust-red with sorghum leaves. Grilled over charcoal or simmered in sauce, it becomes a bridge between pastoral north and coastal table.",
  },
  amiwo: {
    title: "Amiwo",
    location: "South · Coastal Benin",
    image: photos.amiwo,
    intro:
      "Red rice cooked with tomato, oil and often fish—a plate of belonging that anchors many southern tables.",
    madeFrom: "Rice, tomato, oil, fish",
    season: "All year",
    taste: "Savory, bright, comforting",
    tryIt: "With grilled fish or chicken",
    heading: "Red of the coast,",
    headingEm: "many tables.",
    p1: "Amiwo is less a single recipe than a family of gestures: rice absorbing tomato, oil, and the day’s catch. It shows up at celebrations and ordinary lunches alike.",
    p2: "Follow it from market stalls to home kitchens and you understand how a simple plate can carry region, memory and hospitality at once.",
  },
  "buy-local": {
    title: "Buy local · Cook together",
    location: "Cotonou · Porto-Novo markets",
    image: photos.women,
    intro:
      "The market is the beginning: choose what is fresh, learn the ingredients, cook without rushing.",
    madeFrom: "Seasonal market produce",
    season: "Daily",
    taste: "Whatever is ready",
    tryIt: "With a local cook",
    heading: "Cook. Sit down.",
    headingEm: "Share the table.",
    p1: "Buying with someone who knows the stalls changes what you take home—and how you taste it later.",
    p2: "This is food as practice: attention, conversation, and a meal that does not need a restaurant to matter.",
  },

  akassa: {
    title: "Akassa",
    location: "South · Coastal tables",
    image: photos.amiwo,
    intro:
      "Fermented corn dough—soft, slightly tangy—the everyday companion to sauces, fish and conversation.",
    madeFrom: "Fermented corn",
    season: "All year",
    taste: "Mild, sour, grounding",
    tryIt: "With fish sauce or peanut sauce",
    heading: "The dough that holds",
    headingEm: "the meal together.",
    p1: "Akassa is less a dish than a structure: it receives sauce, fish, and the heat of the day without demanding attention.",
    p2: "Find it by the water, in market stalls, and at family tables—always nearby when the real meal is the company.",
  },
  "grilled-fish": {
    title: "Grilled fish",
    location: "Atlantic coast · Cotonou to Grand-Popo",
    image: photos.grill,
    intro:
      "Morning catch, charcoal, pili-pili—the coastal plate that needs almost nothing else.",
    madeFrom: "Fresh catch, chili, fire",
    season: "Year-round, best at dusk",
    taste: "Smoke, salt, heat",
    tryIt: "At a street grill after dark",
    heading: "Fire, fish,",
    headingEm: "and the evening.",
    p1: "Along the coast the best meals are often the simplest: fish scored and grilled, a pile of attiéké or fried yam, a cold drink.",
    p2: "Follow the smoke after sunset and you are already inside the city's night rhythm.",
  },
  pate: {
    title: "Pâte & sauce",
    location: "Everywhere · Daily table",
    image: photos.cook,
    intro:
      "The national pair: a smooth starch (cassava, corn or yam) with a sauce that carries the day.",
    madeFrom: "Cassava, corn or yam · local sauces",
    season: "All year",
    taste: "Comfort, spice, depth",
    tryIt: "With a home cook if you can",
    heading: "One dough,",
    headingEm: "many sauces.",
    p1: "Pâte is the quiet constant. What changes is the sauce—tomato, peanut, leaf greens, fish—and who is stirring it.",
    p2: "Learning to eat it without hurry is part of learning the country.",
  },
  "dantokpa-bites": {
    title: "Dantokpa bites",
    location: "Cotonou · Dantokpa market",
    image: photos.market,
    intro:
      "A tasting path through one of West Africa's largest markets—fritters, fruit, grilled corners, and the people who feed the city.",
    madeFrom: "Whatever is fresh that morning",
    season: "Daily",
    taste: "Varied, loud, generous",
    tryIt: "With a local who knows the aisles",
    heading: "The market is",
    headingEm: "already a meal.",
    p1: "Dantokpa is not only where the city shops—it is where it eats on its feet between errands.",
    p2: "Go early, stay curious, and let someone who works there set the order of stops.",
  },

  sodabi: {
    title: "Sodabi",
    location: "South · Shared glasses",
    image: photos.grill,
    intro:
      "Local palm spirit—approach with respect, share slowly, and listen to the stories that come with the bottle.",
    madeFrom: "Palm wine distillate",
    season: "Year-round",
    taste: "Strong, social, local",
    tryIt: "With hosts who offer it, not as a stunt",
    heading: "A spirit,",
    headingEm: "not a shot.",
    p1: "Sodabi is less a drink to conquer than a social signal—offered, accepted, and paced by the table.",
    p2: "Decline politely if you prefer; accept if you are ready to stay a while.",
  },
  kpélé: {
    title: "Kpélé",
    location: "Street · Everywhere",
    image: photos.cook,
    intro:
      "Corn fritters from the street—crisp, hot, and gone in a few bites between errands.",
    madeFrom: "Corn batter, oil",
    season: "Daily",
    taste: "Crisp, simple, joyful",
    tryIt: "From a roadside stall",
    heading: "Street heat,",
    headingEm: "small joy.",
    p1: "Kpélé is the snack of motion: bought standing, eaten walking, remembered later.",
    p2: "It is not a restaurant dish. It is the city feeding itself between stops.",
  },

  ablo: {
    title: "Ablo",
    location: "South · Steam and morning",
    image: photos.amiwo,
    intro:
      "Steamed rice cakes—soft, mild, and often sold still warm from the steamer at the edge of the market.",
    madeFrom: "Rice flour, water, light fermentation",
    season: "Daily",
    taste: "Soft, clean, slightly tangy",
    tryIt: "With sauce or grilled fish",
    heading: "Steam,",
    headingEm: "not spectacle.",
    p1: "Ablo is quiet food: white, soft, and precise. It shows up at breakfast and between errands, less celebrated than red rice, just as present.",
    p2: "Buy it where the steamer is still working. Heat and timing matter more than any written recipe.",
  },
  atassi: {
    title: "Atassi",
    location: "Across Benin · Shared plates",
    image: photos.market,
    intro:
      "Rice and beans cooked together—everyday fuel that holds workers, students and long afternoons.",
    madeFrom: "Rice, beans, oil, seasoning",
    season: "All year",
    taste: "Hearty, steady, familiar",
    tryIt: "With fried egg or fish when available",
    heading: "The plate that keeps the day going.",
    headingEm: "",
    p1: "Atassi is not festival food. It is the reliable middle of the day—filling, affordable, and shaped by whoever is cooking that street corner.",
    p2: "Follow the queues more than the signs. The best versions rarely need advertising.",
  },
  moyo: {
    title: "Moyo",
    location: "Coast · Tomato heat",
    image: photos.grill,
    intro:
      "A bright tomato-based sauce, often with crab or fish—sharp, generous, and inseparable from coastal tables.",
    madeFrom: "Tomato, onion, pepper, seafood",
    season: "When the catch is good",
    taste: "Bright, spicy, oceanic",
    tryIt: "With crab, fish or on rice",
    heading: "Heat,",
    headingEm: "with a view of the water.",
    p1: "Moyo is less a single recipe than a coastal attitude: tomato, fire, and whatever the lagoon or sea offered that morning.",
    p2: "Eat it where the sauce is made to order. The difference between good and forgettable is measured in minutes.",
  },
  "igname-pilee": {
    title: "Igname pilée",
    location: "South & centre · Mortar rhythm",
    image: photos.cook,
    intro:
      "Pounded yam—dense, elastic, and meant to be eaten with sauce, not as a side note.",
    madeFrom: "Yam, water, force",
    season: "Yam seasons especially",
    taste: "Neutral, substantial, grounding",
    tryIt: "With sauce arachide or palm sauce",
    heading: "The mortar still sets the pace.",
    headingEm: "",
    p1: "Igname pilée is labour made edible. The sound of the pestle is part of the meal long before the plate arrives.",
    p2: "Respect the portion and the sauce. This is food that asks you to sit, not to scroll past it.",
  },
  "tale-tale": {
    title: "Talé-talé",
    location: "Street · Sweet heat",
    image: photos.street,
    intro:
      "Sweet fried dough balls—golden, hot, and sold by the handful from pans that never seem to cool.",
    madeFrom: "Flour, sugar, yeast, oil",
    season: "Daily, especially mornings and evenings",
    taste: "Sweet, crisp outside, soft inside",
    tryIt: "Fresh from the oil, no ceremony",
    heading: "Sugar,",
    headingEm: "smoke, and the street.",
    p1: "Talé-talé belongs to movement: bought between errands, shared without plates, finished before you reach the next corner.",
    p2: "The best ones are the ones still too hot to hold comfortably.",
  },
  "sauce-arachide": {
    title: "Sauce arachide",
    location: "Across regions · Groundnut depth",
    image: photos.women,
    intro:
      "Peanut sauce—thick, savoury, and one of the country’s great shared languages at the table.",
    madeFrom: "Groundnuts, oil, seasoning, often meat or fish",
    season: "Year-round",
    taste: "Rich, nutty, comforting",
    tryIt: "With igname, rice or pâté",
    heading: "Depth,",
    headingEm: "not decoration.",
    p1: "Sauce arachide travels well across regions because it answers hunger with density: protein, fat, and the patience of slow cooking.",
    p2: "Every household has a version. Ask whose, and you will learn more about the table than any menu can say.",
  },

};

export const experienceCatalog: Record<
  string,
  {
    title: string;
    location: string;
    image: string;
    intro: string;
    duration: string;
    language: string;
    meeting: string;
    access: string;
    heading: string;
    p1: string;
    p2: string;
  }
> = {
  "after-dark": {
    title: "Cotonou after dark",
    location: "Zongo → Ganhi",
    image: photos.grill,
    intro:
      "Follow the smoke, the music and the evening crowd on a food walk through the city’s most generous street kitchens.",
    duration: "3 hours",
    language: "French · English",
    meeting: "Place Lénine, Akpakpa",
    access: "Mostly step-free",
    heading: "Come hungry. Leave knowing the city better.",
    p1: "Street food is Cotonou in miniature: fast-moving, deeply social and full of exacting opinions.",
    p2: "With a local cook, start with hot talé-talé, cross town for grilled wagassi, and finish over peppered fish near the lagoon.",
  },
  "north-bound": {
    title: "North bound",
    location: "Atacora · Northern roads",
    image: photos.natitingou,
    intro:
      "Take the red road north: landscapes, living traditions and the pace of Atacora communities.",
    duration: "2–3 days",
    language: "French · local guides",
    meeting: "Natitingou gateway",
    access: "Road travel; plan ahead",
    heading: "A slower way into the north.",
    p1: "The north is not a stopover. It is a set of places where food, craft and landscape still set the day’s rhythm.",
    p2: "Travel with time for guides, regional meals and the distances between villages.",
  },
  "on-the-water": {
    title: "On the water",
    location: "Mono estuary · Grand-Popo",
    image: photos.boats,
    intro:
      "Two quiet hours with a local on the estuary—where river, fishing and Atlantic shoreline meet.",
    duration: "2 hours",
    language: "French · local",
    meeting: "Grand-Popo waterfront",
    access: "Boat; weather dependent",
    heading: "Where river meets sea.",
    p1: "Follow the estuary with someone who works it, not only visits it.",
    p2: "Learn how tides, nets and meals structure the day along the Mono.",
  },

  "five-meals": {
    title: "Five meals · First days",
    location: "Across Benin · Your first week",
    image: photos.market,
    intro:
      "Five dinners for your first five days in Benin—an invitation to eat like a local from day one, not as a tourist checklist.",
    duration: "5 evenings",
    language: "French · English · local hosts",
    meeting: "Coordinated by city on arrival",
    access: "City-dependent; shared tables",
    heading: "Start living local at the table.",
    p1: "The first days in a country set the tone. Instead of defaulting to hotel menus, these five meals place you with hosts, street kitchens and family tables—so the country enters through taste, conversation and routine.",
    p2: "Each evening is a different entry: market heat, coastal fish, northern cheese, a home sauce, a shared celebration plate. Together they form a gentle curriculum for being present in Benin.",
  },
  "first-table": {
    title: "The First Table",
    location: "Place Chacha · Ouidah · 1 January",
    image: photos.ouidah,
    intro:
      "On the first day of the year, share a table at Place Chacha in Ouidah—including soupe joumou—on ground that holds both memory and living community.",
    duration: "New Year’s Day gathering",
    language: "French · local",
    meeting: "Place Chacha, Ouidah",
    access: "Public square; guided context available",
    heading: "A first meal on historic ground.",
    p1: "Place Chacha is where enslaved people were once sold. Today it remains a public square in Ouidah—a place of hard history and present life. The First Table invites visitors and locals to sit together on 1 January, with soupe joumou and other shared dishes, in a spirit of continuity rather than spectacle.",
    p2: "This is not a reenactment. It is a contemporary gathering: food, presence, and the choice to begin the year at a table that does not forget where it stands. Context is offered with care; the meal is shared as equals.",
  },

  "market-to-kitchen": {
    title: "Market to kitchen",
    location: "Ganhi · Cotonou",
    image: photos.market,
    intro:
      "Shop the stalls with a local, then cook what you bought into a Beninese plate.",
    duration: "Half a day",
    language: "French · English · local hosts",
    meeting: "Ganhi market entrance",
    access: "Walking; kitchen step varies",
    heading: "Buy it. Cook it. Sit down.",
    p1: "Choose ingredients at the market, follow them into a kitchen, eat what the day offers.",
    p2: "Not a show kitchen—a real market and a shared table.",
  },
  "ganvie-crossing": {
    title: "Ganvié crossing",
    location: "Lake Nokoué",
    image: photos.ganvie,
    intro:
      "A pirogue morning through the stilt city—with a guide who lives the water.",
    duration: "3–4 hours",
    language: "French · local",
    meeting: "Abomey-Calavi or Sô-Ava",
    access: "Boat; early start",
    heading: "A city without streets.",
    p1: "Ganvié is home first. Early light, floating market hours, time to watch without turning life into a backdrop.",
    p2: "Come for the water; leave with how a town organizes itself on pirogues alone.",
  },
  "memory-walk": {
    title: "Memory walk · Ouidah",
    location: "Place Chacha → Door of No Return",
    image: photos.ouidah,
    intro: "Walk the historic path with context—without spectacle.",
    duration: "Half to full day",
    language: "French · English",
    meeting: "Ouidah centre",
    access: "Mostly on foot",
    heading: "History underfoot.",
    p1: "Ouidah asks for slow steps and good guidance.",
    p2: "Pair it with living Ouidah so the visit is not only about the past.",
  },
  "royal-ground": {
    title: "Royal ground · Abomey",
    location: "Abomey · Zou",
    image: photos.abomey,
    intro: "The Dahomey Kingdom landscape with a knowledgeable guide.",
    duration: "Full day",
    language: "French · local guides",
    meeting: "Abomey",
    access: "On foot within sites",
    heading: "Where the kingdom still speaks.",
    p1: "Abomey is a living relationship to royal history and craft.",
    p2: "Go with someone who can open context; leave room for silence.",
  },

  "aheme-day": {
    title: "A day on Lake Ahémé",
    location: "Mono · Possotomè / Bopa",
    image: photos.boats,
    intro:
      "Cross and linger on Ahémé with a local boatman—thermal springs, lake villages and the slower Mono clock.",
    duration: "Half to full day",
    language: "French · local",
    meeting: "Bopa or Possotomè waterfront",
    access: "Boat; weather dependent",
    heading: "Let the lake set the schedule.",
    p1: "Ahémé is not a backdrop. It is work, transport and memory for the communities around it.",
    p2: "Go with someone who knows the channels. Leave time for stillness, not only movement.",
  },
  "dantokpa-dawn": {
    title: "Dantokpa at dawn",
    location: "Cotonou · Dantokpa",
    image: photos.market,
    intro:
      "Enter West Africa’s great market before the heat peaks—with a guide who knows which aisles matter.",
    duration: "2–3 hours",
    language: "French · local",
    meeting: "Agreed gate with guide",
    access: "Crowded; firm footing required",
    heading: "The city starts here.",
    p1: "Dantokpa is logistics, theatre and livelihood at once. Dawn is when you can still hear individual voices.",
    p2: "Buy little. Watch more. Let your guide decide when to move and when to stop.",
  },
  "porto-morning": {
    title: "Porto-Novo before the heat",
    location: "Porto-Novo · Ouémé",
    image: photos.portoNovo,
    intro:
      "A walking morning through markets, shaded streets and the capital’s layered architecture—before the city fully wakes.",
    duration: "3–4 hours",
    language: "French · English",
    meeting: "Central Porto-Novo",
    access: "Mostly walkable",
    heading: "Meet the capital without hurry.",
    p1: "Porto-Novo rewards early feet: Ouando’s first trades, quiet courtyards, and streets that still belong to residents.",
    p2: "Finish with a local breakfast. The point is arrival into the day, not a checklist of monuments.",
  },
  "craft-hands": {
    title: "Hands that make",
    location: "Abomey · Cotonou · workshops",
    image: photos.abomey,
    intro:
      "Time in a workshop with makers—textiles, metal, appliqué or wood—where skill is demonstrated, not performed.",
    duration: "2–4 hours",
    language: "French · local",
    meeting: "Workshop arranged in advance",
    access: "Varies by craft",
    heading: "Watch the work, not the souvenir shelf.",
    p1: "Craft in Benin is knowledge held in hands and families. A good visit is slow and specific.",
    p2: "Ask permission before photos. Buy only what you will use or truly keep.",
  },
  "savanna-morning": {
    title: "Savanna morning · Pendjari",
    location: "Pendjari · Atacora",
    image: photos.wildlife,
    intro:
      "An early drive into the reserve with a park guide—tracks, light and the chance of wildlife without guarantees.",
    duration: "Half day (or more)",
    language: "French · guide",
    meeting: "Lodge or park gate",
    access: "4x4; dry season preferred",
    heading: "Patience is the ticket.",
    p1: "Pendjari is not a zoo. Sightings depend on season, time and respect for the rules of the park.",
    p2: "Book through legitimate operators. The wild holds because people insist on limits.",
  },
  "lagoon-evening": {
    title: "Lagoon evening",
    location: "Cotonou · Lake Nokoué edge",
    image: photos.fisherman,
    intro:
      "Late light on the lagoon—fishermen, smoke, and the soft border between city and water.",
    duration: "2 hours",
    language: "French · local",
    meeting: "Agreed lagoon-side point",
    access: "Uneven ground near water",
    heading: "Where the city exhales.",
    p1: "Evening on Nokoué is less about a viewpoint than about watching work wind down.",
    p2: "Stay long enough for the light to change. Leave before you become the noise.",
  },

};

export const storyCatalog: Record<
  string,
  {
    title: string;
    eyebrow: string;
    dek: string;
    image: string;
    readTime: string;
    body: string[];
  }
> = {
  "rosine-cooks": {
    title: "Rosine cooks without recipes.",
    eyebrow: "Portrait · Cotonou",
    dek: "At Dantokpa, one cook turns the morning market into a map of memory, instinct and extraordinary flavor.",
    image: photos.women,
    readTime: "8 min read",
    body: [
      "By six in the morning, Rosine has already tasted the pepper twice. She does not measure it.",
      "Her stall sits where the market begins to fold into the street. Between plantains and charcoal, she makes breakfast for half a neighborhood.",
    ],
  },
  "market-names": {
    title: "Market names",
    eyebrow: "People · Cotonou",
    dek: "Meet the people behind the stalls—the names that make a market more than a place to buy.",
    image: photos.market,
    readTime: "6 min read",
    body: [
      "Every aisle has a voice. Vendors who remember your order, and the season better than any calendar.",
      "This is a short field note on the human infrastructure of Cotonou’s markets.",
    ],
  },
  "red-road": {
    title: "The red road",
    eyebrow: "Story · Atacora",
    dek: "A slower way north—through landscape, food and the people who hold the route together.",
    image: photos.natitingou,
    readTime: "7 min read",
    body: [
      "The road north changes color before it changes speed.",
      "What stays is the invitation to travel with attention, not only arrival.",
    ],
  },
  "early-light": {
    title: "Early light in Porto-Novo",
    eyebrow: "Guide · Porto-Novo",
    dek: "Meet the city before breakfast—when Ouando is already in conversation.",
    image: photos.portoNovo,
    readTime: "5 min read",
    body: [
      "At first light, baskets change hands and breakfast is ladled from enamel pots.",
      "Porto-Novo rewards the unhurried morning more than the checklist afternoon.",
    ],
  },

  "slave-route-note": {
    title: "Walking the Slave Route",
    eyebrow: "Field note · Ouidah",
    dek: "A careful account of the path from Place Chacha to the Atlantic.",
    image: photos.ouidah,
    readTime: "7 min read",
    body: [
      "The route is short on the map and long in the body.",
      "What helps is a guide who can name the stations without turning them into a show.",
    ],
  },
  "dantokpa-morning": {
    title: "Dantokpa before the heat",
    eyebrow: "Field note · Cotonou",
    dek: "An early circuit through the great market.",
    image: photos.market,
    readTime: "6 min read",
    body: [
      "Arrive while the air is still almost cool.",
      "Follow someone who works here.",
    ],
  },
  "pendjari-dry-season": {
    title: "Pendjari in the dry season",
    eyebrow: "Field note · Atacora",
    dek: "Why the north asks for planning, guides, and respect.",
    image: photos.natitingou,
    readTime: "8 min read",
    body: [
      "The roads lengthen. The air changes.",
      "What you gain is space and real wildlife.",
    ],
  },
  "vodun-with-care": {
    title: "Vodun, without the caricature",
    eyebrow: "Essay · Ouidah",
    dek: "How to approach living spiritual practice with respect.",
    image: photos.ouidah,
    readTime: "9 min read",
    body: [
      "Vodun is an official religion here—not the cartoon of dolls and curses.",
      "Visitors who listen more than they film leave with a different country.",
    ],
  },

  "possotome-springs": {
    title: "The springs at Possotomè",
    eyebrow: "Field note · Mono",
    dek: "Thermal water, lake light and a town that refuses to hurry for visitors.",
    image: photos.coast,
    readTime: "6 min read",
    body: [
      "Possotomè is introduced first by water: Lake Ahémé, then the springs that have drawn people for reasons older than tourism.",
      "The correct pace is local. Ask before you photograph. Stay long enough to notice who works the shore.",
    ],
  },
  "parakou-junction": {
    title: "Parakou, where the map turns",
    eyebrow: "Guide · Borgou",
    dek: "A central-north hub of markets, rail memory and the feeling that the country has changed latitude.",
    image: photos.city,
    readTime: "7 min read",
    body: [
      "Arrive in Parakou and distances rearrange themselves. South feels far; the Sahel edge feels nearer.",
      "Eat where the transport workers eat. The city explains itself better at a shared table than from a moving window.",
    ],
  },
  "allada-ordinary": {
    title: "Allada under ordinary light",
    eyebrow: "Field note · Atlantique",
    dek: "Royal memory and market noise share the same streets—history without a velvet rope.",
    image: photos.palace,
    readTime: "6 min read",
    body: [
      "Allada is not staged. Lineage and daily traffic occupy the same ground.",
      "Come with a local voice if you can. Silence is part of the visit when the story is heavier than the photo.",
    ],
  },
  "ketou-walls": {
    title: "Kétou keeps its own time",
    eyebrow: "Heritage · Plateau",
    dek: "A Yoruba town of walls and living culture in the southeast—approach without reducing it to ruins.",
    image: photos.temple,
    readTime: "7 min read",
    body: [
      "Kétou’s fortifications and market days still organise a town, not a set.",
      "Walk with someone who can name what you are looking at. Leave room for the present tense.",
    ],
  },
  "wagassi-road": {
    title: "Following wagassi south",
    eyebrow: "Food story · North to coast",
    dek: "How a Fulani cheese travels from pastoral north to charcoal grills in the cities.",
    image: photos.wagassi,
    readTime: "8 min read",
    body: [
      "Wagassi begins with milk and knowledge held in families. The calotropis leaf does what recipes only approximate.",
      "By the time it hits a Cotonou grill, it has already crossed regions. Taste is geography made edible.",
    ],
  },
  "zem-night": {
    title: "The city by zemidjan",
    eyebrow: "Portrait · Cotonou",
    dek: "Motorcycle-taxis as infrastructure, negotiation and a way of reading the night.",
    image: photos.street,
    readTime: "5 min read",
    body: [
      "Zemidjans are not colour. They are how the city breathes after dark—price, trust, shortcut, risk.",
      "Agree the fare before you move. Treat the rider as a professional, not a backdrop.",
    ],
  },
  "first-rains": {
    title: "When the first rains arrive",
    eyebrow: "Season · Countrywide",
    dek: "The shift in markets, roads and mood when the dry season breaks.",
    image: photos.waterfall,
    readTime: "6 min read",
    body: [
      "The first rains change the smell of the ground before they change the calendar.",
      "Travel plans bend. Food shifts. People speak of the season as a character, not a forecast.",
    ],
  },

};

export const resultItems = [
  {
    type: "Place",
    title: "Cotonou",
    sub: "Littoral · Southern Benin",
    image: photos.cotonou,
    to: "place" as Page,
    slug: "cotonou",
  },
  {
    type: "Place",
    title: "Porto-Novo",
    sub: "Ouémé · Southern Benin",
    image: photos.portoNovo,
    to: "place" as Page,
    slug: "porto-novo",
  },
  {
    type: "Place",
    title: "Ganvié",
    sub: "Lake Nokoué · Atlantique",
    image: photos.ganvie,
    to: "place" as Page,
    slug: "ganvie",
  },
  {
    type: "Food",
    title: "Wagassi",
    sub: "Fresh Peulh cheese · Northern Benin",
    image: photos.wagassi,
    to: "food" as Page,
  },
  {
    type: "Experience",
    title: "Cotonou after dark",
    sub: "Food walk · 3 hours",
    image: photos.cotonou,
    to: "experience" as Page,
  },
  {
    type: "Story",
    title: "What the market knows",
    sub: "Field notes from Dantokpa",
    image: photos.market,
    to: "story" as Page,
  },
];

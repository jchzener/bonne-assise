export type EventItem = {
  id: string;
  title: string;
  category: string;
  place: string;
  dateLabel: string;
  description: string;
  image: string;
  href: string;
  sponsored?: boolean;
};

export type Story = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  place: string;
};

export type Place = {
  id: string;
  name: string;
  region: string;
  description: string;
  coordinates: [number, number];
  image: string;
  href?: string;
};

export type Experience = {
  id: string;
  title: string;
  category: string;
  place: string;
  duration: string;
  image: string;
};

export type ExperienceProduct = {
  id: string;
  name: string;
  title: string;
  promise: string;
  place: string;
  duration: string;
  format: string;
  image: string;
  href: string;
};

export type Region = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  destinations: string[];
  image: string;
};

export type HomeResponse = {
  hero: { eyebrow: string; title: string; subtitle: string; image: string };
  discovery: {
    id: string;
    label: string;
    description: string;
    image: string;
  }[];
  regions: Region[];
  places: Place[];
  experiences: Experience[];
  prendrePlace: ExperienceProduct[];
  stories: Story[];
  events: EventItem[];
  locale: "en" | "fr";
};

export const homeMock: HomeResponse = {
  locale: "en",
  hero: {
    eyebrow: "BENIN · WEST AFRICA",
    title: "Come closer to the stories.",
    subtitle:
      "A living country of water, memory, ritual, food and extraordinary encounters.",
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=88",
  },
  discovery: [
    {
      id: "culture",
      label: "Culture",
      description: "Meet the traditions that still shape everyday life.",
      image:
        "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "nature",
      label: "Nature",
      description: "From the Atlantic coast to forests, lagoons and savannah.",
      image:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "food",
      label: "Food",
      description: "Taste a country through markets, fire and family tables.",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "history",
      label: "History",
      description: "Walk through stories that connect Benin to the world.",
      image:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: "spirituality",
      label: "Spirituality",
      description:
        "Explore beliefs, rituals and living traditions with respect and context.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
    },
  ],
  regions: [
    {
      id: "atlantic",
      kicker: "ATLANTIC",
      title: "The Atlantic",
      description: "Cities, lagoons, memory, living traditions and the ocean.",
      destinations: ["Ouidah", "Porto-Novo", "Ganvié", "Grand-Popo", "Cotonou"],
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=88",
    },
    {
      id: "heartlands",
      kicker: "ROYAL HEARTLANDS",
      title: "The Royal Heartlands",
      description: "Kingdoms, heritage, craft, landscapes and living culture.",
      destinations: ["Abomey", "Dassa", "Kétou", "Allada"],
      image:
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1800&q=88",
    },
    {
      id: "north",
      kicker: "NORTHERN HERITAGE AND LANDSCAPE",
      title: "The Northern Heritage and Landscape",
      description:
        "Mountains, wildlife, Tata Somba, royal traditions and northern cultures.",
      destinations: ["Natitingou", "Boukoumbé", "Tanguiéta", "Nikki"],
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88",
    },
  ],
  places: [
    {
      id: "ouidah",
      name: "Ouidah",
      region: "South",
      description: "Memory, spirituality and the Atlantic meet here.",
      coordinates: [6.3631, 2.0851],
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1400&q=85",
      href: "/ouidah",
    },
    {
      id: "ganvie",
      name: "Ganvié",
      region: "South",
      description: "A lake village where life moves with the water.",
      coordinates: [6.4667, 2.4167],
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85",
    },
    {
      id: "abomey",
      name: "Abomey",
      region: "South",
      description: "Royal history, craft and the memory of Dahomey.",
      coordinates: [7.185, 1.9911],
      image:
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1400&q=85",
    },
    {
      id: "natitingou",
      name: "Natitingou",
      region: "North",
      description: "Gateway to the Atakora landscapes and communities.",
      coordinates: [10.3042, 1.3796],
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85",
    },
  ],
  experiences: [
    {
      id: "spirit",
      title: "Walk the sacred city",
      category: "CULTURE",
      place: "Ouidah",
      duration: "Half day",
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=88",
    },
    {
      id: "water",
      title: "Wake up on the lake",
      category: "NATURE",
      place: "Ganvié",
      duration: "1–2 days",
      image:
        "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=88",
    },
    {
      id: "royal",
      title: "Enter the royal courtyards",
      category: "HISTORY",
      place: "Abomey",
      duration: "Half day",
      image:
        "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1600&q=88",
    },
  ],
  prendrePlace: [
    {
      id: "five-first-tables",
      name: "FIVE FIRST TABLES",
      title: "Five meals to begin with.",
      promise:
        "For your first days in Benin, choose from ten curated Beninese specialties, with drinks to match — delivered to you or served at selected tables, with the decision-making already done.",
      place: "Cotonou · Ouidah",
      duration: "5 meals",
      format: "10 dishes · delivery or restaurant",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=88",
      href: "/experiences/five-first-tables",
    },
    {
      id: "market-to-fire",
      name: "MARKET → FIRE",
      title: "Buy with a local. Cook. Sit down.",
      promise:
        "A morning at the market, an afternoon around the fire and a shared meal built from what you chose together.",
      place: "Ouidah",
      duration: "3–4 hours",
      format: "Market · cooking · shared meal",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=88",
      href: "/experiences/market-to-fire",
    },
    {
      id: "life-on-the-water",
      name: "LIFE ON THE WATER",
      title: "Ganvié, beyond the postcard.",
      promise:
        "Leave the sightseeing boat behind. Spend a morning on the lake with an host, a simple table and the rhythm of daily life.",
      place: "Ganvié",
      duration: "Morning",
      format: "Pirogue · local host · lunch",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=88",
      href: "/experiences/life-on-the-water",
    },
  ],
  stories: [
    {
      id: "story-1",
      eyebrow: "FIELD NOTES",
      title: "Why Ouidah stays with you",
      description:
        "A city of doors, routes, drums and memory — best understood slowly.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=88",
      place: "Ouidah",
    },
    {
      id: "story-2",
      eyebrow: "PEOPLE",
      title: "Life on the water",
      description: "Spend a morning where the lake is road, market and home.",
      image:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=88",
      place: "Ganvié",
    },
    {
      id: "story-3",
      eyebrow: "TABLE",
      title: "A country told through fire",
      description: "Markets and family kitchens reveal another map of Benin.",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=88",
      place: "Abomey",
    },
  ],
  events: [
    { id:'festival-mangal', title:'Festival Mangal', category:'ECOLOGY · CULTURE', place:'Grand-Popo', dateLabel:'23–27 September 2026', description:'A festival around mangrove ecosystems, local culture, ecological awareness, conversations, arts and eco-tourism.', image:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1500&q=86', href:'https://festivalmangal.mangroves.network/' },
    { id:'festival-sica', title:'Festival SICA', category:'MUSIC · ARTS', place:'Cotonou', dateLabel:'9–15 November 2026', description:'A week of African music, exhibitions, fashion, conversations and cultural encounters under the theme Heritage & Innovation.', image:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1500&q=86', href:'https://festivalsica.com/en/' },
    { id:'weloveya', title:'WeLovEya', category:'MUSIC · CULTURE', place:'Cotonou', dateLabel:'26–27 December 2026', description:'A festive end-of-year gathering celebrating African music, culture and talent in Cotonou.', image:'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1500&q=86', href:'https://benin.bj/en/news' },
    { id:'vodun-days', title:'Vodun Days', category:'CULTURE · SPIRITUALITY', place:'Ouidah', dateLabel:'2–9 January 2027', description:'Eight days in Ouidah dedicated to arts, culture and spirituality, bringing the city into a new year of living heritage.', image:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1500&q=86', href:'https://benin.bj/en/news' },
  ],
};


function getHomeMock(locale: "en" | "fr"): HomeResponse {
  if (locale === 'en') return { ...homeMock, locale };
  const discovery = [
    ['culture','Culture','Rencontrer les traditions qui continuent de façonner la vie quotidienne.'],
    ['nature','Nature','De la côte atlantique aux forêts, lagunes et savanes.'],
    ['food','Cuisine','Goûter un pays à travers les marchés, le feu et les tables familiales.'],
    ['history','Histoire','Parcourir des récits qui relient le Bénin au monde.'],
    ['spirituality','Spiritualité','Approcher croyances, rituels et traditions vivantes avec respect et contexte.'],
  ] as const;
  const regionTitles: Record<string,[string,string,string,string]> = {
    atlantic:['ATLANTIQUE','L’Atlantique','Villes, lagunes, mémoire, traditions vivantes et océan.','Ouidah · Porto-Novo · Ganvié · Grand-Popo · Cotonou'],
    heartlands:['ROYAUMES DU CENTRE','Les anciens royaumes','Royaumes, patrimoine, artisanat, paysages et cultures vivantes.','Abomey · Dassa · Kétou · Allada'],
    north:['PATRIMOINE ET PAYSAGES DU NORD','Le patrimoine et les paysages du Nord','Montagnes, faune, Tata Somba, traditions royales et cultures du Nord.','Natitingou · Boukoumbé · Tanguiéta · Nikki'],
  };
  return {
    ...homeMock,
    locale,
    hero:{...homeMock.hero, eyebrow:'BÉNIN · AFRIQUE DE L’OUEST',title:'Entrez plus près des histoires.',subtitle:'Un pays vivant de l’eau, de la mémoire, des rituels, de la cuisine et des rencontres.'},
    discovery:homeMock.discovery.map((item)=>{const t=discovery.find(([id])=>id===item.id)!;return {...item,label:t[1],description:t[2]};}),
    regions:homeMock.regions.map((r)=>{const t=regionTitles[r.id];return {...r,kicker:t[0],title:t[1],description:t[2],destinations:t[3].split(' · ')};}),
    experiences:[
      {...homeMock.experiences[0],title:'Parcourir la ville sacrée',category:'CULTURE',duration:'Demi-journée'},
      {...homeMock.experiences[1],title:'Se réveiller sur le lac',category:'NATURE',duration:'1–2 jours'},
      {...homeMock.experiences[2],title:'Entrer dans les cours royales',category:'HISTOIRE',duration:'Demi-journée'},
    ],
    prendrePlace:[
      {...homeMock.prendrePlace[0],name:'CINQ PREMIÈRES TABLES',title:'Cinq repas pour commencer.',promise:'Pour vos premiers jours au Bénin, choisissez cinq repas parmi dix spécialités béninoises et des boissons choisies — livrés ou servis à des tables partenaires.',place:'Cotonou · Ouidah',duration:'5 repas',format:'10 plats · livraison ou restaurant'},
      {...homeMock.prendrePlace[1],name:'MARCHÉ → FEU',title:'Acheter avec un local. Cuisiner. S’asseoir.',promise:'Une matinée au marché, un après-midi autour du feu et un repas partagé construit à partir de vos choix.',place:'Ouidah',duration:'3–4 heures',format:'Marché · cuisine · repas partagé'},
      {...homeMock.prendrePlace[2],name:'LA VIE SUR L’EAU',title:'Ganvié, au-delà de la carte postale.',promise:'Quitter le bateau touristique. Passer une matinée sur le lac avec un hôte, une table simple et le rythme de la vie quotidienne.',place:'Ganvié',duration:'Matinée',format:'Pirogue · hôte local · déjeuner'},
    ],
    stories:[
      {...homeMock.stories[0],eyebrow:'NOTES DE TERRAIN',title:'Pourquoi Ouidah reste avec vous',description:'Une ville de portes, de routes, de tambours et de mémoire — à comprendre lentement.'},
      {...homeMock.stories[1],eyebrow:'PERSONNES',title:'La vie sur l’eau',description:'Passer une matinée là où le lac est route, marché et maison.'},
      {...homeMock.stories[2],eyebrow:'TABLE',title:'Un pays raconté par le feu',description:'Les marchés et les cuisines familiales dessinent une autre carte du Bénin.'},
    ],
    events:[
      {...homeMock.events[0],category:'ÉCOLOGIE · CULTURE',dateLabel:'23–27 septembre 2026',description:'Un festival autour des mangroves, de la culture locale, de l’écologie, des rencontres, des arts et de l’écotourisme.'},
      {...homeMock.events[1],category:'MUSIQUE · ARTS',dateLabel:'9–15 novembre 2026',description:'Une semaine de musique africaine, expositions, mode, conversations et rencontres culturelles autour du thème Héritage & Innovation.'},
      {...homeMock.events[2],category:'MUSIQUE · CULTURE',dateLabel:'26–27 décembre 2026',description:'Un grand rendez-vous de fin d’année consacré à la musique, à la culture et aux talents africains à Cotonou.'},
      {...homeMock.events[3],category:'CULTURE · SPIRITUALITÉ',dateLabel:'2–9 janvier 2027',description:'Huit jours à Ouidah autour des arts, de la culture et de la spiritualité, pour commencer l’année au rythme du patrimoine vivant.'},
    ],
  };
}

export type TravelResponse = {
  place_id: string;
  origin: [number, number];
  distance_km: number;
  estimated_minutes: number;
  mode: string;
  source: "estimate" | string;
};

export async function getTravel(
  placeId: string,
  origin: [number, number],
): Promise<TravelResponse | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return null;
  try {
    const params = new URLSearchParams({
      origin_lat: String(origin[0]),
      origin_lon: String(origin[1]),
    });
    const response = await fetch(
      `${base}/api/v1/places/${placeId}/travel?${params.toString()}`,
    );
    if (!response.ok) throw new Error("Travel API failed");
    return response.json();
  } catch {
    return null;
  }
}

export async function getHome(
  locale: "en" | "fr" = "en",
): Promise<HomeResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return getHomeMock(locale);

  try {
    const response = await fetch(`${base}/api/v1/home?locale=${locale}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) throw new Error("Home API failed");
    const apiHome: HomeResponse = await response.json();
    const localArrival = getHomeMock(locale).prendrePlace.find(
      (item) => item.id === "five-first-tables",
    );
    const apiProducts = apiHome.prendrePlace.filter(
      (item) => item.id !== "arrival-tables" && item.id !== "five-first-tables",
    );
    return {
      ...apiHome,
      locale,
      prendrePlace: localArrival ? [localArrival, ...apiProducts] : apiProducts,
    };
  } catch {
    return getHomeMock(locale);
  }
}

export type DestinationResponse = {
  id: string;
  name: string;
  region: string;
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    image: string;
    coordinates: [number, number];
  };
  intro: string;
  threads: { id: string; title: string; label: string; description: string }[];
  experiences: {
    id: string;
    title: string;
    category: string;
    duration: string;
    description: string;
    image: string;
    href: string;
  }[];
  stories: {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    href: string;
  }[];
  foods: { name: string; description: string; image: string; href: string }[];
  practical: string[];
  nearby: { id: string; name: string; region: string; href: string }[];
  journeyText: string;
  locale: "en" | "fr";
};

const ouidahBase = {
  id: "ouidah",
  name: "Ouidah",
  region: "The Atlantic",
  hero: {
    coordinates: [6.3631, 2.0851] as [number, number],
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=90",
  },
  experiences: [
    {
      id: "route-des-esclaves",
      title: "Walk the Route of the Enslaved",
      category: "MEMORY",
      duration: "Half day",
      description:
        "Follow the historic route toward the Atlantic with room for remembrance, context and reflection.",
      image:
        "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=90",
      href: "/stories/route-to-the-door-of-no-return",
    },
    {
      id: "history-museum",
      title: "Enter the history of Ouidah",
      category: "HISTORY",
      duration: "1–2 hours",
      description:
        "Use the former Portuguese fort and its collections to read Ouidah through trade, kingdom, return and enslavement.",
      image:
        "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1800&q=90",
      href: "/stories/ouidah-history",
    },
    {
      id: "sacred-landscape",
      title: "Walk through the sacred landscape",
      category: "LIVING TRADITIONS",
      duration: "2–3 hours",
      description:
        "Explore sacred places with local context. These are places of belief and practice, not props for an exotic itinerary.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=90",
      href: "/experiences/living-traditions-ouidah",
    },
    {
      id: "afro-brazilian",
      title: "Look up at Ouidah",
      category: "ARCHITECTURE",
      duration: "1–2 hours",
      description:
        "Slow down through the historic streets and notice the Afro-Brazilian traces that add another language to the city.",
      image:
        "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1800&q=90",
      href: "/stories/afro-brazilian-ouidah",
    },
    {
      id: "atlantic",
      title: "End at the Atlantic",
      category: "COAST",
      duration: "Late afternoon",
      description:
        "Continue toward the coast and let the landscape become part of the story rather than an afterthought.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90",
      href: "/stories/door-of-no-return",
    },
  ],
  stories: [
    {
      id: "route-memory",
      eyebrow: "MEMORY",
      title: "The road to the Door of No Return",
      description:
        "A memorial route shaped by the forced journeys of enslaved people and by the city’s continuing work of remembrance.",
      image:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=88",
      href: "/stories/route-to-the-door-of-no-return",
    },
    {
      id: "two-traditions",
      eyebrow: "CITY",
      title: "Two traditions, one street",
      description:
        "A glimpse of the many religious histories that coexist in Ouidah’s urban fabric.",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=88",
      href: "/stories/two-traditions-one-street",
    },
    {
      id: "living-vodun",
      eyebrow: "LIVING TRADITIONS",
      title: "A tradition that is still alive",
      description:
        "Approach Vodun through people, places and context rather than spectacle.",
      image:
        "https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1400&q=88",
      href: "/stories/living-vodun",
    },
  ],
  foods: [
    {
      name: "Amiwo",
      description:
        "A southern corn-based staple, often paired with sauce and grilled or braised protein.",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=88",
      href: "/food/amiwo",
    },
    {
      name: "Akassa",
      description:
        "Soft fermented maize dough that belongs to the culinary vocabulary of southern Benin.",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=88",
      href: "/food/akassa",
    },
    {
      name: "Atlantic fish",
      description:
        "Fresh fish, smoke, spice and simple accompaniments connect the southern table to the coast.",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=88",
      href: "/food/atlantic-fish",
    },
  ],
  nearby: [
    {
      id: "cotonou",
      name: "Cotonou",
      region: "The Atlantic",
      href: "/destinations",
    },
    {
      id: "ganvie",
      name: "Ganvié",
      region: "The Atlantic",
      href: "/destinations",
    },
    {
      id: "porto-novo",
      name: "Porto-Novo",
      region: "The Atlantic",
      href: "/destinations",
    },
    {
      id: "abomey",
      name: "Abomey",
      region: "Royal Heartlands",
      href: "/destinations",
    },
  ],
};

const ouidahCopy = {
  en: {
    hero: {
      eyebrow: "SOUTH BENIN · ATLANTIC COAST",
      title: "Ouidah, a city of memory and living traditions.",
      subtitle:
        "A historic Atlantic city where memory, architecture, spiritual life and the road to the sea meet.",
    },
    intro:
      "Ouidah asks to be understood in layers. Its historic routes lead toward the Atlantic; Afro-Brazilian buildings sit beside older Beninese stories; churches and sacred places share the same urban fabric; and the city continues to carry living traditions.",
    threads: [
      {
        id: "memory",
        label: "MEMORY",
        title: "Follow the road to the Atlantic.",
        description:
          "The Route of the Enslaved is a memorial landscape, not simply a sightseeing route. Move through its stages slowly, from the historic city toward the Door of No Return.",
      },
      {
        id: "architecture",
        label: "ARCHITECTURE",
        title: "Read the city in its façades.",
        description:
          "Afro-Brazilian architecture adds another layer to Ouidah, reflecting histories of return, trade and cultural exchange.",
      },
      {
        id: "living-traditions",
        label: "LIVING TRADITIONS",
        title: "Encounter belief without reducing it.",
        description:
          "Sacred places and Vodun traditions are part of a living cultural landscape. Context and local guidance matter.",
      },
      {
        id: "atlantic",
        label: "ATLANTIC",
        title: "Let the city open toward the sea.",
        description:
          "The final stretch reaches the coast, where Ouidah’s memory and the Atlantic meet.",
      },
    ],
    practical: [
      "Give Ouidah at least a full day if you want to understand its historic core rather than collect a few sights.",
      "Approach the Route of the Enslaved as a memorial journey; leave time to pause at its major stages.",
      "For sacred and spiritual places, follow local guidance and photography rules. Ask before entering, touching or photographing.",
      "Use the city as a base for a slower southern journey rather than trying to compress every sight into one afternoon.",
    ],
    journeyText:
      "Save Ouidah as a place in your journey. We can connect its experiences, stories and food to the other places you choose.",
  },
  fr: {
    hero: {
      eyebrow: "SUD DU BÉNIN · CÔTE ATLANTIQUE",
      title: "Ouidah, une ville de mémoire et de traditions vivantes.",
      subtitle:
        "Une ville historique de l’Atlantique où mémoire, architecture, vie spirituelle et route vers la mer se rencontrent.",
    },
    intro:
      "Ouidah demande à être comprise par couches. Ses routes historiques vont vers l’Atlantique ; les architectures afro-brésiliennes côtoient des histoires béninoises plus anciennes ; églises et lieux sacrés partagent le même tissu urbain ; et la ville continue de porter des traditions vivantes.",
    threads: [
      {
        id: "memory",
        label: "MÉMOIRE",
        title: "Suivre la route jusqu’à l’Atlantique.",
        description:
          "La Route de l’Esclave est un paysage mémoriel, pas une simple succession de sites. Parcourez-la lentement, de la ville vers la Porte du Non-Retour.",
      },
      {
        id: "architecture",
        label: "ARCHITECTURE",
        title: "Lire la ville dans ses façades.",
        description:
          "Les architectures afro-brésiliennes ajoutent une autre couche à Ouidah et racontent des histoires de retour, de commerce et d’échanges culturels.",
      },
      {
        id: "living-traditions",
        label: "TRADITIONS VIVANTES",
        title: "Rencontrer le spirituel sans le réduire.",
        description:
          "Les lieux sacrés et les traditions Vodun appartiennent à un paysage culturel vivant. Le contexte et les indications locales comptent.",
      },
      {
        id: "atlantic",
        label: "ATLANTIQUE",
        title: "Laisser la ville s’ouvrir vers la mer.",
        description:
          "La dernière partie du parcours atteint la côte, là où la mémoire d’Ouidah rencontre l’Atlantique.",
      },
    ],
    practical: [
      "Accordez au moins une journée à Ouidah si vous souhaitez comprendre son centre historique plutôt que collectionner quelques sites.",
      "Abordez la Route de l’Esclave comme un parcours mémoriel et prenez le temps de vous arrêter.",
      "Dans les lieux sacrés et spirituels, suivez les indications locales et demandez avant d’entrer, toucher ou photographier.",
      "Pensez Ouidah comme une étape d’un voyage plus lent dans le Sud plutôt que comme une liste à boucler en quelques heures.",
    ],
    journeyText:
      "Enregistrez Ouidah dans votre voyage. Nous pourrons relier ses expériences, ses histoires et sa table aux autres lieux que vous choisissez.",
  },
} as const;

export const destinationSlugs = ["ouidah"] as const;

function getDestinationMock(
  locale: "en" | "fr",
  _id: string,
): DestinationResponse {
  const copy = ouidahCopy[locale];
  return {
    id: ouidahBase.id,
    name: ouidahBase.name,
    region: ouidahBase.region,
    hero: {
      ...ouidahBase.hero,
      ...copy.hero,
      coordinates: [
        ouidahBase.hero.coordinates[0],
        ouidahBase.hero.coordinates[1],
      ],
    },
    intro: copy.intro,
    threads: copy.threads.map((thread) => ({ ...thread })),
    experiences: ouidahBase.experiences.map((item) => ({ ...item })),
    stories: ouidahBase.stories.map((item) => ({ ...item })),
    foods: ouidahBase.foods.map((item) => ({ ...item })),
    practical: [...copy.practical],
    nearby: ouidahBase.nearby.map((item) => ({ ...item })),
    journeyText: copy.journeyText,
    locale,
  };
}

export async function getDestination(
  id: string,
  locale: "en" | "fr" = "en",
): Promise<DestinationResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  if (!base) return getDestinationMock(locale, id);
  try {
    const response = await fetch(
      `${base}/api/v1/destinations/${encodeURIComponent(id)}?locale=${locale}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) throw new Error("Destination API failed");
    return response.json();
  } catch {
    return getDestinationMock(locale, id);
  }
}

export type ExperienceHost = {
  name: string;
  role: string;
  bio: string;
  image: string;
};
export type ExperienceStep = {
  time: string;
  title: string;
  description: string;
};
export type ExperienceProductDetail = {
  id: string;
  type: string;
  name: string;
  title: string;
  promise: string;
  eyebrow: string;
  place: string;
  region: string;
  duration: string;
  format: string;
  hero: string;
  intro: string;
  why_it_matters: string;
  host: ExperienceHost;
  steps: ExperienceStep[];
  included: string[];
  not_included: string[];
  practical: string[];
  price_note: string;
  availability_note: string;
  booking_label: string;
  related: { id: string; label: string; href: string }[];
  locale: "en" | "fr";
};

const experienceMockCopy: Record<
  "en" | "fr",
  Record<
    string,
    {
      title: string;
      promise: string;
      intro: string;
      why_it_matters: string;
      eyebrow: string;
      booking_label: string;
    }
  >
> = {
  en: {
    "five-first-tables": {
      title:
        "Five meals to begin with — chosen from ten Beninese specialties, with drinks to match.",
      promise: "Arrive, eat well, and let the first decisions already be made.",
      intro:
        "The first days in a new country are full of small decisions. Five First Tables turns one of them into a pleasure: choose five meals from a curated list of ten Beninese specialties and drinks, then have them delivered or meet them at a selected restaurant.",
      why_it_matters:
        "This is not a food delivery subscription disguised as travel. It is a gentle way into Benin through its everyday table — with enough context to know what you are eating, where it comes from and why we chose it.",
      eyebrow: "PRENDRE PLACE",
      booking_label: "Choose your five meals",
    },
    "market-to-fire": {
      title: "Buy with a local. Cook what you found. Sit down together.",
      promise: "Enter the chain between market, ingredient, gesture and table.",
      intro:
        "Food is not simply prepared in Benin. It is bought, negotiated, carried, transformed and shared. This morning-to-table experience lets you enter that chain instead of watching it from the outside.",
      why_it_matters:
        "The value is not a cooking lesson alone. It is the relationship between market, ingredient, gesture and table — with a host who can explain what you are seeing and why it matters.",
      eyebrow: "PRENDRE PLACE",
      booking_label: "Reserve your place",
    },
    "life-on-the-water": {
      title: "Ganvié, beyond the postcard.",
      promise:
        "Spend a morning where the lake is road, workplace, market and home.",
      intro:
        "Ganvié is not a floating attraction. It is a lived environment where the lake is road, workplace, market and home. This experience deliberately slows the visit down.",
      why_it_matters:
        "The experience shifts the focus from seeing the lake to spending time with someone whose life is organised around it. The pirogue is a way into the relationship, not the destination itself.",
      eyebrow: "PRENDRE PLACE",
      booking_label: "Reserve your place",
    },
    "the-first-table": {
      title: "A January 1st table where food, memory and freedom meet.",
      promise:
        "A contemporary gathering shaped by Haitian and Beninese voices.",
      intro:
        "Joumou carries a powerful place in Haitian memory: a soup associated with January 1st and the independence of Haiti. Ouidah carries another history — the routes of enslavement and their remembrance. The First Table brings these histories into a contemporary gathering, without reenactment or spectacle.",
      why_it_matters:
        "The experience is deliberately co-created with Haitian and Beninese voices. Its purpose is not to turn memory into tourism, but to create a place for food, conversation, remembrance and connection.",
      eyebrow: "PRENDRE PLACE",
      booking_label: "Join the waiting list",
    },
  },
  fr: {
    "five-first-tables": {
      title:
        "Cinq repas pour commencer — choisis parmi dix plats et boissons béninois.",
      promise:
        "Arriver, bien manger, et laisser quelques décisions déjà prises.",
      intro:
        "Les premiers jours dans un nouveau pays sont remplis de petites décisions. Cinq Premières Tables transforme l’une d’elles en plaisir : choisissez cinq repas parmi une sélection de dix spécialités et boissons béninoises, puis faites-les livrer ou retrouvez-les dans un restaurant partenaire.",
      why_it_matters:
        "Ce n’est pas un abonnement de livraison maquillé en expérience touristique. C’est une porte d’entrée douce vers le Bénin par sa table quotidienne — avec juste assez de contexte pour comprendre ce que l’on mange, d’où cela vient et pourquoi nous l’avons choisi.",
      eyebrow: "PRENDRE PLACE",
      booking_label: "Choisir ses cinq repas",
    },
    "market-to-fire": {
      title:
        "Acheter avec un local. Cuisiner ce que l’on a choisi. S’asseoir ensemble.",
      promise: "Entrer dans le lien entre marché, ingrédient, geste et table.",
      intro:
        "Au Bénin, la cuisine ne commence pas dans la casserole. Elle commence au marché, dans les choix, les relations, les gestes et la table. Cette expérience permet d’entrer dans cette chaîne plutôt que de la regarder de l’extérieur.",
      why_it_matters:
        "La valeur n’est pas seulement celle d’un cours de cuisine. C’est le lien entre marché, ingrédient, geste et table — avec un hôte capable d’expliquer ce que vous voyez et pourquoi cela compte.",
      eyebrow: "PRENDRE PLACE",
      booking_label: "Réserver votre place",
    },
    "life-on-the-water": {
      title: "Ganvié, au-delà de la carte postale.",
      promise:
        "Passer une matinée là où le lac est route, travail, marché et maison.",
      intro:
        "Ganvié n’est pas une attraction flottante. C’est un environnement vécu où le lac est à la fois route, lieu de travail, marché et maison. Cette expérience choisit volontairement de ralentir.",
      why_it_matters:
        "L’expérience déplace le regard : il ne s’agit plus seulement de voir le lac, mais de passer du temps avec quelqu’un dont la vie s’organise autour de lui. La pirogue est une porte d’entrée, pas la destination.",
      eyebrow: "PRENDRE PLACE",
      booking_label: "Réserver votre place",
    },
    "the-first-table": {
      title:
        "Une table du 1er janvier où se rencontrent nourriture, mémoire et liberté.",
      promise:
        "Un rassemblement contemporain porté par des voix haïtiennes et béninoises.",
      intro:
        "La soupe Joumou occupe une place forte dans la mémoire haïtienne : elle est associée au 1er janvier et à l’indépendance d’Haïti. Ouidah porte une autre histoire, celle des routes de la traite et de leur mémoire. The First Table met ces histoires en relation dans un rassemblement contemporain, sans reconstitution ni spectacle.",
      why_it_matters:
        "L’expérience doit être co-construite avec des voix haïtiennes et béninoises. Son objectif n’est pas de transformer la mémoire en produit touristique, mais de créer un espace de nourriture, de conversation, de mémoire et de lien.",
      eyebrow: "PRENDRE PLACE",
      booking_label: "Rejoindre la liste d’attente",
    },
  },
};

const experienceMockBase: Record<
  string,
  Omit<
    ExperienceProductDetail,
    | "title"
    | "promise"
    | "intro"
    | "why_it_matters"
    | "eyebrow"
    | "booking_label"
    | "locale"
  >
> = {
  "five-first-tables": {
    id: "five-first-tables",
    type: "ARRIVAL_SERVICE",
    name: "FIVE FIRST TABLES",
    place: "Cotonou · Ouidah",
    region: "The Atlantic",
    duration: "5 meals",
    format: "10 curated dishes · delivery or selected restaurants",
    hero: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2400&q=90",
    host: {
      name: "Bonne Assise table editors",
      role: "Food curators",
      bio: "A small editorial selection of people, tables, dishes and drinks that give a first-time visitor a useful, generous way into Benin’s food culture.",
      image:
        "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=85",
    },
    steps: [
      {
        time: "01",
        title: "Choose your five",
        description:
          "Pick five meals from a changing list of ten dishes and Beninese drinks, with a short note on each.",
      },
      {
        time: "02",
        title: "Decide how to receive them",
        description:
          "Have selected meals delivered to where you are staying, or use the restaurant option when you want the room and the people around the table.",
      },
      {
        time: "03",
        title: "Eat through the week",
        description:
          "One meal at a time, without having to solve the “where do we eat tonight?” question from scratch.",
      },
      {
        time: "04",
        title: "Keep the map",
        description:
          "Each meal comes with enough context to remember what you tasted and where to look next.",
      },
    ],
    included: [
      "Five selected meals",
      "Choice from ten Beninese specialties + drinks",
      "Short editorial notes",
      "Delivery or selected restaurant format",
    ],
    not_included: [
      "Additional drinks or purchases",
      "Transport outside the selected delivery area",
    ],
    practical: [
      "Best for first days in Benin",
      "Dietary preferences collected at booking",
      "Restaurant availability varies by date and city",
    ],
    price_note: "Price shown after choosing delivery or restaurant format",
    availability_note:
      "Available in selected areas · advance notice recommended",
    related: [
      {
        id: "market-to-fire",
        label: "Market → Fire",
        href: "/experiences/market-to-fire",
      },
      { id: "ouidah", label: "Explore Ouidah", href: "/ouidah" },
    ],
  },
  "market-to-fire": {
    id: "market-to-fire",
    type: "HOSTED_EXPERIENCE",
    name: "MARKET → FIRE",
    place: "Ouidah",
    region: "The Atlantic",
    duration: "3–4 hours",
    format: "Small group · market · cooking · shared meal",
    hero: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2400&q=90",
    host: {
      name: "Your host",
      role: "Cook & local host",
      bio: "A local cook who opens the morning from market choices to a shared table, explaining the ingredients, gestures and everyday decisions along the way.",
      image:
        "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85",
    },
    steps: [
      {
        time: "08:30",
        title: "Meet your host",
        description:
          "Start together and learn what you are looking for before entering the market.",
      },
      {
        time: "09:00",
        title: "Go to market",
        description:
          "Choose ingredients with your host, learn what is in season and follow the small negotiations behind the meal.",
      },
      {
        time: "11:00",
        title: "Back to the kitchen",
        description:
          "Prepare two dishes together and learn the gestures rather than simply watching a demonstration.",
      },
      {
        time: "12:30",
        title: "Sit down",
        description:
          "Share the meal you helped make, with recipes to take home.",
      },
    ],
    included: [
      "Local market visit",
      "Ingredients for the workshop",
      "Cooking session",
      "Shared meal",
      "Recipe booklet",
    ],
    not_included: ["Transport to Ouidah", "Personal purchases"],
    practical: [
      "Small groups",
      "Comfortable shoes for the market",
      "Tell us about dietary restrictions when booking",
    ],
    price_note: "Price shown at booking · per person",
    availability_note: "Selected mornings · subject to host availability",
    related: [
      { id: "ouidah", label: "Explore Ouidah", href: "/ouidah" },
      {
        id: "life-on-the-water",
        label: "Life on the Water",
        href: "/experiences/life-on-the-water",
      },
    ],
  },
  "life-on-the-water": {
    id: "life-on-the-water",
    type: "HOSTED_EXPERIENCE",
    name: "LIFE ON THE WATER",
    place: "Ganvié",
    region: "The Atlantic",
    duration: "Morning",
    format: "Small group · local host · pirogue · shared meal",
    hero: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2400&q=90",
    host: {
      name: "Your host",
      role: "Fisher & lake guide",
      bio: "Meet someone whose daily life follows the water — not a staged performance of it.",
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85",
    },
    steps: [
      {
        time: "06:30",
        title: "Meet at the lake",
        description:
          "Begin early, when the lake is already moving with work and daily routines.",
      },
      {
        time: "07:00",
        title: "Take the pirogue",
        description:
          "Move through the waterways with a local host and learn how the lake connects homes, work and trade.",
      },
      {
        time: "09:00",
        title: "Spend time, not just time passing",
        description:
          "Pause with your host, listen and see the lake beyond the sightseeing circuit.",
      },
      {
        time: "10:30",
        title: "A simple table",
        description: "Finish with a meal shaped by what is available that day.",
      },
    ],
    included: [
      "Pirogue and local host",
      "Time on the lake",
      "Shared lunch",
      "Local context and conversation",
    ],
    not_included: ["Transport to Ganvié", "Personal purchases"],
    practical: [
      "Early start recommended",
      "Small groups only",
      "Bring sun protection and water",
    ],
    price_note: "Price shown at booking · per person",
    availability_note: "Morning departures · weather and host dependent",
    related: [
      {
        id: "market-to-fire",
        label: "Market → Fire",
        href: "/experiences/market-to-fire",
      },
      { id: "ouidah", label: "Explore Ouidah", href: "/ouidah" },
    ],
  },
  "the-first-table": {
    id: "the-first-table",
    type: "EVENT",
    name: "THE FIRST TABLE",
    place: "Ouidah",
    region: "The Atlantic",
    duration: "January 1",
    format: "Annual gathering · limited places",
    hero: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2400&q=90",
    host: {
      name: "A shared table",
      role: "Beninese & Haitian culinary voices",
      bio: "A gathering shaped with people who carry the histories, food traditions and memories this day brings together.",
      image:
        "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=85",
    },
    steps: [
      {
        time: "Morning",
        title: "Remember the place",
        description:
          "Begin with context about Ouidah, the history of the slave trade and the place the gathering inhabits.",
      },
      {
        time: "Late morning",
        title: "Prepare the table",
        description:
          "Cook and share the story of Joumou with Haitian and Beninese contributors.",
      },
      {
        time: "Midday",
        title: "Eat together",
        description:
          "A communal meal centred on Joumou, freedom, memory and the act of gathering.",
      },
      {
        time: "Afternoon",
        title: "Listen and exchange",
        description:
          "Conversation, music and testimony are shaped with the communities involved — never as spectacle.",
      },
    ],
    included: [
      "Joumou meal",
      "Cultural mediation",
      "Shared gathering",
      "Recipe and contextual notes",
    ],
    not_included: ["Transport to Ouidah", "Accommodation"],
    practical: [
      "January 1 only",
      "Limited capacity",
      "Programme co-created with community and cultural partners",
      "Not a historical re-enactment",
    ],
    price_note: "Annual event · final price announced with the programme",
    availability_note:
      "Places open ahead of January 1 · waiting list between editions",
    related: [
      { id: "ouidah", label: "Explore Ouidah", href: "/ouidah" },
      {
        id: "market-to-fire",
        label: "Market → Fire",
        href: "/experiences/market-to-fire",
      },
    ],
  },
};

export const experienceSlugs = [
  "five-first-tables",
  "market-to-fire",
  "life-on-the-water",
  "the-first-table",
] as const;


const experienceMockFrenchBase: Record<string, Partial<Omit<ExperienceProductDetail, 'id' | 'locale' | 'title' | 'promise' | 'intro' | 'why_it_matters' | 'eyebrow' | 'booking_label'>>> = {
  'five-first-tables': {
    name: 'CINQ PREMIÈRES TABLES', place: 'Cotonou · Ouidah', region: 'L’Atlantique', duration: '5 repas', format: '10 plats choisis · livraison ou restaurants partenaires',
    host: { name: 'L’équipe éditoriale des tables Bonne Assise', role: 'Curateurs de tables', bio: 'Une sélection éditoriale de personnes, de tables, de plats et de boissons pour offrir une première entrée généreuse et utile dans la cuisine béninoise.', image: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=85' },
    steps: [{time:'01',title:'Choisir ses cinq',description:'Choisissez cinq repas parmi une liste évolutive de dix plats et boissons béninois, avec une courte note pour chacun.'},{time:'02',title:'Choisir comment les recevoir',description:'Faites livrer certains repas là où vous séjournez, ou choisissez l’option restaurant lorsque vous souhaitez retrouver la salle et les personnes autour de la table.'},{time:'03',title:'Manger au fil de la semaine',description:'Un repas à la fois, sans devoir résoudre chaque soir la question de savoir où manger.'},{time:'04',title:'Garder la carte',description:'Chaque repas apporte assez de contexte pour se souvenir de ce que vous avez goûté et savoir où aller ensuite.'}],
    included:['Cinq repas sélectionnés','Choix parmi dix spécialités béninoises + boissons','Notes éditoriales courtes','Livraison ou restaurant partenaire'], not_included:['Boissons ou achats supplémentaires','Transport hors zone de livraison'], practical:['Pensé pour les premiers jours au Bénin','Préférences alimentaires recueillies à la réservation','Disponibilités des restaurants variables selon la date et la ville'], price_note:'Tarif affiché après le choix livraison ou restaurant', availability_note:'Disponible dans certaines zones · réservation anticipée recommandée', related:[{id:'market-to-fire',label:'Marché → Feu',href:'/experiences/market-to-fire'},{id:'ouidah',label:'Explorer Ouidah',href:'/destinations/ouidah'}]
  },
  'market-to-fire': {
    name:'MARCHÉ → FEU', region:'L’Atlantique', duration:'3–4 heures', format:'Petit groupe · marché · cuisine · repas partagé',
    host:{name:'Votre hôte',role:'Cuisinier·ère & hôte local·e',bio:'Une personne qui ouvre la matinée du choix au marché jusqu’à la table partagée, en expliquant ingrédients, gestes et décisions du quotidien.',image:'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85'},
    steps:[{time:'08:30',title:'Rencontrer votre hôte',description:'Commencez ensemble et découvrez ce que vous allez chercher avant d’entrer au marché.'},{time:'09:00',title:'Aller au marché',description:'Choisissez les ingrédients avec votre hôte, découvrez ce qui est de saison et les petites négociations derrière le repas.'},{time:'11:00',title:'Revenir en cuisine',description:'Préparez deux plats ensemble et apprenez les gestes plutôt que de simplement regarder une démonstration.'},{time:'12:30',title:'S’asseoir',description:'Partagez le repas que vous avez contribué à préparer, avec les recettes à emporter.'}],
    included:['Visite du marché local','Ingrédients de l’atelier','Session de cuisine','Repas partagé','Fiches recettes'],not_included:['Transport jusqu’à Ouidah','Achats personnels'],practical:['Petits groupes','Chaussures confortables pour le marché','Indiquer les restrictions alimentaires à la réservation'],price_note:'Tarif affiché à la réservation · par personne',availability_note:'Matins sélectionnés · selon disponibilité de l’hôte',related:[{id:'ouidah',label:'Explorer Ouidah',href:'/destinations/ouidah'},{id:'life-on-the-water',label:'La vie sur l’eau',href:'/experiences/life-on-the-water'}]
  },
  'life-on-the-water': {
    name:'LA VIE SUR L’EAU', region:'L’Atlantique', duration:'Matinée', format:'Petit groupe · hôte local · pirogue · repas partagé',
    host:{name:'Votre hôte',role:'Pêcheur·se & guide du lac',bio:'Rencontrez une personne dont la vie quotidienne suit l’eau — sans transformer cette vie en spectacle.',image:'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85'},
    steps:[{time:'06:30',title:'Rendez-vous au lac',description:'Commencez tôt, lorsque le lac est déjà en mouvement avec le travail et les routines du quotidien.'},{time:'07:00',title:'Prendre la pirogue',description:'Parcourez les voies d’eau avec un hôte local et découvrez comment le lac relie maisons, travail et commerce.'},{time:'09:00',title:'Prendre le temps',description:'Arrêtez-vous avec votre hôte, écoutez et regardez le lac au-delà du circuit touristique.'},{time:'10:30',title:'Une table simple',description:'Terminez par un repas façonné par ce qui est disponible ce jour-là.'}],
    included:['Pirogue et hôte local','Temps sur le lac','Repas partagé','Contexte local et conversation'],not_included:['Transport jusqu’à Ganvié','Achats personnels'],practical:['Départ matinal recommandé','Petits groupes uniquement','Prévoir protection solaire et eau'],price_note:'Tarif affiché à la réservation · par personne',availability_note:'Départs le matin · selon météo et disponibilité de l’hôte',related:[{id:'market-to-fire',label:'Marché → Feu',href:'/experiences/market-to-fire'},{id:'ouidah',label:'Explorer Ouidah',href:'/destinations/ouidah'}]
  },
  'the-first-table': {
    name:'THE FIRST TABLE', region:'L’Atlantique', duration:'1er janvier', format:'Rassemblement annuel · places limitées',
    host:{name:'Une table partagée',role:'Voix culinaires béninoises & haïtiennes',bio:'Un rassemblement façonné avec des personnes qui portent les histoires, les traditions culinaires et les mémoires que cette journée met en relation.',image:'https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=85'},
    steps:[{time:'Matin',title:'Se souvenir du lieu',description:'Commencez par un contexte sur Ouidah, l’histoire de la traite et le lieu que le rassemblement habite.'},{time:'Fin de matinée',title:'Préparer la table',description:'Cuisinez et partagez l’histoire du Joumou avec des contributeurs haïtiens et béninois.'},{time:'Midi',title:'Manger ensemble',description:'Un repas commun autour du Joumou, de la liberté, de la mémoire et du fait de se rassembler.'},{time:'Après-midi',title:'Écouter et échanger',description:'Conversations, musique et témoignages sont construits avec les communautés impliquées — jamais comme spectacle.'}],
    included:['Repas de Joumou','Médiation culturelle','Rassemblement partagé','Recette et notes de contexte'],not_included:['Transport jusqu’à Ouidah','Hébergement'],practical:['Uniquement le 1er janvier','Capacité limitée','Programme co-construit avec les communautés et partenaires culturels','Pas une reconstitution historique'],price_note:'Événement annuel · tarif annoncé avec le programme',availability_note:'Places ouvertes avant le 1er janvier · liste d’attente entre les éditions',related:[{id:'ouidah',label:'Explorer Ouidah',href:'/destinations/ouidah'},{id:'market-to-fire',label:'Marché → Feu',href:'/experiences/market-to-fire'}]
  }
};

function getExperienceMock(
  locale: "en" | "fr",
  slug: string,
): ExperienceProductDetail | null {
  const base = experienceMockBase[slug];
  const copy = experienceMockCopy[locale]?.[slug];
  if (!base || !copy) return null;
  const localizedBase = locale === 'fr' ? { ...base, ...experienceMockFrenchBase[slug] } : base;
  return { ...localizedBase, ...copy, locale };
}

export async function getExperience(
  locale: "en" | "fr",
  slug: string,
): Promise<ExperienceProductDetail | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  if (!base) return getExperienceMock(locale, slug);
  try {
    const response = await fetch(
      `${base}/api/v1/experiences/${encodeURIComponent(slug)}?locale=${locale}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) throw new Error("Experience API failed");
    return response.json();
  } catch {
    return getExperienceMock(locale, slug);
  }
}
export async function getExperienceCatalog(
  locale: "en" | "fr",
): Promise<ExperienceProductDetail[]> {
  const items = await Promise.all(
    experienceSlugs.map((slug) => getExperience(locale, slug)),
  );
  return items.filter((item): item is ExperienceProductDetail => Boolean(item));
}

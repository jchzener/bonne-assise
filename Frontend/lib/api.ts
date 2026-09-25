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
  discovery: { id: string; label: string; description: string; image: string }[];
  regions: Region[];
  places: Place[];
  experiences: Experience[];
  prendrePlace: ExperienceProduct[];
  stories: Story[];
  locale: 'en' | 'fr';
};

export const homeMock: HomeResponse = {
  locale: 'en',
  hero: {
    eyebrow: 'BENIN · WEST AFRICA',
    title: 'Come closer to the stories.',
    subtitle: 'A living country of water, memory, ritual, food and extraordinary encounters.',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=88',
  },
  discovery: [
    { id: 'culture', label: 'Culture', description: 'Meet the traditions that still shape everyday life.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85' },
    { id: 'nature', label: 'Nature', description: 'From the Atlantic coast to forests, lagoons and savannah.', image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85' },
    { id: 'food', label: 'Food', description: 'Taste a country through markets, fire and family tables.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85' },
    { id: 'history', label: 'History', description: 'Walk through stories that connect Benin to the world.', image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=85' },
    { id: 'spirituality', label: 'Spirituality', description: 'Explore beliefs, rituals and living traditions with respect and context.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85' },
  ],
  regions: [
    { id: 'atlantic', kicker: 'ATLANTIC', title: 'The Atlantic', description: 'Cities, lagoons, memory, living traditions and the ocean.', destinations: ['Ouidah', 'Porto-Novo', 'Ganvié', 'Grand-Popo', 'Cotonou'], image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=88' },
    { id: 'heartlands', kicker: 'ROYAL HEARTLANDS', title: 'The Royal Heartlands', description: 'Kingdoms, heritage, craft, landscapes and living culture.', destinations: ['Abomey', 'Dassa', 'Kétou', 'Allada'], image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1800&q=88' },
    { id: 'north', kicker: 'NORTHERN HERITAGE AND LANDSCAPE', title: 'The Northern Heritage and Landscape', description: 'Mountains, wildlife, Tata Somba, royal traditions and northern cultures.', destinations: ['Natitingou', 'Boukoumbé', 'Tanguiéta', 'Nikki'], image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=88' },
  ],
  places: [
    { id: 'ouidah', name: 'Ouidah', region: 'South', description: 'Memory, spirituality and the Atlantic meet here.', coordinates: [6.3631, 2.0851], image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1400&q=85', href: '/ouidah' },
    { id: 'ganvie', name: 'Ganvié', region: 'South', description: 'A lake village where life moves with the water.', coordinates: [6.4667, 2.4167], image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=85' },
    { id: 'abomey', name: 'Abomey', region: 'South', description: 'Royal history, craft and the memory of Dahomey.', coordinates: [7.1850, 1.9911], image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1400&q=85' },
    { id: 'natitingou', name: 'Natitingou', region: 'North', description: 'Gateway to the Atakora landscapes and communities.', coordinates: [10.3042, 1.3796], image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85' },
  ],
  experiences: [
    { id: 'spirit', title: 'Walk the sacred city', category: 'CULTURE', place: 'Ouidah', duration: 'Half day', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1600&q=88' },
    { id: 'water', title: 'Wake up on the lake', category: 'NATURE', place: 'Ganvié', duration: '1–2 days', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=88' },
    { id: 'royal', title: 'Enter the royal courtyards', category: 'HISTORY', place: 'Abomey', duration: 'Half day', image: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1600&q=88' },
  ],
  prendrePlace: [
    { id: 'arrival-tables', name: 'THE FIRST TABLES', title: 'Five evenings at the table.', promise: 'Five carefully chosen dinners for your first nights in Benin — with the table, the menu and the details already taken care of.', place: 'Cotonou · Ouidah · Porto-Novo', duration: '5 evenings', format: '5 reservations · WhatsApp confirmation', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=88', href: '#prendre-place' },
    { id: 'market-to-fire', name: 'MARKET → FIRE', title: 'Buy with a local. Cook. Sit down.', promise: 'A morning at the market, an afternoon around the fire and a shared meal built from what you chose together.', place: 'Ouidah', duration: '3–4 hours', format: 'Market · cooking · shared meal', image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1800&q=88', href: '#prendre-place' },
    { id: 'life-on-the-water', name: 'LIFE ON THE WATER', title: 'Ganvié, beyond the postcard.', promise: 'Leave the sightseeing boat behind. Spend a morning on the lake with an host, a simple table and the rhythm of daily life.', place: 'Ganvié', duration: 'Morning', format: 'Pirogue · local host · lunch', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=88', href: '#prendre-place' },
  ],
  stories: [
    { id: 'story-1', eyebrow: 'FIELD NOTES', title: 'Why Ouidah stays with you', description: 'A city of doors, routes, drums and memory — best understood slowly.', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=88', place: 'Ouidah' },
    { id: 'story-2', eyebrow: 'PEOPLE', title: 'Life on the water', description: 'Spend a morning where the lake is road, market and home.', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=88', place: 'Ganvié' },
    { id: 'story-3', eyebrow: 'TABLE', title: 'A country told through fire', description: 'Markets and family kitchens reveal another map of Benin.', image: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=88', place: 'Abomey' },
  ],
};


export type TravelResponse = {
  place_id: string;
  origin: [number, number];
  distance_km: number;
  estimated_minutes: number;
  mode: string;
  source: 'estimate' | string;
};

export async function getTravel(placeId: string, origin: [number, number]): Promise<TravelResponse | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return null;
  try {
    const params = new URLSearchParams({ origin_lat: String(origin[0]), origin_lon: String(origin[1]) });
    const response = await fetch(`${base}/api/v1/places/${placeId}/travel?${params.toString()}`);
    if (!response.ok) throw new Error('Travel API failed');
    return response.json();
  } catch {
    return null;
  }
}

export async function getHome(locale: 'en' | 'fr' = 'en'): Promise<HomeResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return { ...homeMock, locale };

  try {
    const response = await fetch(`${base}/api/v1/home?locale=${locale}`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error('Home API failed');
    return response.json();
  } catch {
    return { ...homeMock, locale };
  }
}

export type DestinationResponse = {
  id: string;
  name: string;
  region: string;
  hero: { eyebrow: string; title: string; subtitle: string; image: string; coordinates: [number, number] };
  intro: string;
  threads: { id: string; title: string; label: string; description: string }[];
  experiences: { id: string; title: string; category: string; duration: string; description: string; image: string }[];
  stories: { id: string; eyebrow: string; title: string; description: string; image: string }[];
  foods: { name: string; description: string; image: string }[];
  practical: string[];
  nearby: string[];
};

export const ouidahMock: DestinationResponse = {
  id: 'ouidah',
  name: 'Ouidah',
  region: 'South',
  hero: {
    eyebrow: 'SOUTH BENIN · ATLANTIC COAST',
    title: 'Ouidah, a city of memory and living traditions.',
    subtitle: 'A historic Atlantic city where memory, architecture, spiritual life and the road to the sea meet.',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=90',
    coordinates: [6.3631, 2.0851],
  },
  intro: 'Ouidah asks to be understood in layers. Its historic routes lead toward the Atlantic; Afro-Brazilian buildings sit beside older Beninese stories; churches and sacred places share the same urban fabric; and the city continues to carry living traditions.',
  threads: [
    {
      id: 'memory',
      label: 'MEMORY',
      title: 'Follow the road to the Atlantic.',
      description: 'The Route of the Enslaved is a memorial landscape, not simply a sightseeing route. Move through its stages slowly, from the historic city toward the Door of No Return.',
    },
    {
      id: 'architecture',
      label: 'ARCHITECTURE',
      title: 'Read the city in its façades.',
      description: 'Afro-Brazilian architecture adds another layer to Ouidah, reflecting the histories of return, trade and cultural exchange that shaped the city.',
    },
    {
      id: 'living-traditions',
      label: 'LIVING TRADITIONS',
      title: 'Encounter belief without reducing it.',
      description: 'The Temple of Pythons, Kpassè Sacred Forest and Vodun traditions are part of a living cultural landscape. Context and local guidance matter.',
    },
    {
      id: 'atlantic',
      label: 'ATLANTIC',
      title: 'Let the city open toward the sea.',
      description: 'The final stretch of the historic route reaches the coast, where Ouidah’s memory and the Atlantic meet.',
    },
  ],
  experiences: [
    {
      id:'route-des-esclaves',
      title:'Walk the Route of the Enslaved',
      category:'MEMORY',
      duration:'Half day',
      description:'Follow the last stretch of a historic route from the city toward the Atlantic. The experience should leave room for remembrance, context and reflection.',
      image:'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=90'
    },
    {
      id:'history-museum',
      title:'Enter the history of Ouidah',
      category:'HISTORY',
      duration:'1–2 hours',
      description:'Visit the Musée d’Histoire de Ouidah in the former Portuguese fort and use its collections to understand the city, the Dahomey Kingdom and the history of enslavement.',
      image:'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1800&q=90'
    },
    {
      id:'sacred-landscape',
      title:'Walk through the sacred landscape',
      category:'LIVING TRADITIONS',
      duration:'2–3 hours',
      description:'Explore Kpassè Sacred Forest and the Temple of Pythons with local context. These are places of belief and cultural practice, not props for an exotic itinerary.',
      image:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=90'
    },
    {
      id:'afro-brazilian',
      title:'Look up at Ouidah',
      category:'ARCHITECTURE',
      duration:'1–2 hours',
      description:'Slow down through the historic streets and notice the Afro-Brazilian architectural traces that give Ouidah another visual and historical language.',
      image:'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1800&q=90'
    },
    {
      id:'atlantic',
      title:'End at the Atlantic',
      category:'COAST',
      duration:'Late afternoon',
      description:'Continue toward the coast and the Door of No Return, allowing the landscape to become part of the story rather than an afterthought.',
      image:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=90'
    },
  ],
  stories: [
    {
      id:'route-memory',
      eyebrow:'MEMORY',
      title:'The road to the Door of No Return',
      description:'A memorial route shaped by the forced journeys of enslaved people and by the city’s continuing work of remembrance.',
      image:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=88'
    },
    {
      id:'two-traditions',
      eyebrow:'CITY',
      title:'Two traditions, one street',
      description:'The Temple of Pythons faces the Basilica of the Immaculate Conception — a striking glimpse of the many religious histories that coexist in Ouidah.',
      image:'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=88'
    },
    {
      id:'living-vodun',
      eyebrow:'LIVING TRADITIONS',
      title:'A tradition that is still alive',
      description:'Vodun is part of Benin’s living cultural and spiritual heritage. Approach it through people, places and context rather than spectacle.',
      image:'https://images.unsplash.com/photo-1524498250077-390f9e378fc0?auto=format&fit=crop&w=1400&q=88'
    }
  ],
  foods: [
    {name:'Amiwo', description:'A southern Beninese corn-based staple, often paired with sauce and grilled or braised protein.', image:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=88'},
    {name:'Akassa', description:'Soft fermented maize dough that belongs to the culinary vocabulary of southern Benin.', image:'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=88'},
    {name:'Atlantic fish', description:'Fresh fish, smoke, spice and simple accompaniments connect the southern table to the coast.', image:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1000&q=88'}
  ],
  practical: [
    'Give Ouidah at least a full day if you want to understand its historic core rather than collect a few sights.',
    'The Route of the Enslaved is best approached as a memorial journey; leave time to pause at its major stages.',
    'For sacred and spiritual places, follow local guidance and photography rules. Ask before entering, touching or photographing.',
    'November to February is commonly described by travel sources as a drier, more comfortable period for exploring southern Benin.'
  ],
  nearby: ['Cotonou', 'Ganvié', 'Porto-Novo', 'Abomey']
};

export async function getDestination(id: string): Promise<DestinationResponse> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return id === 'ouidah' ? ouidahMock : ouidahMock;
  try {
    const response = await fetch(`${base}/api/v1/destinations/${id}`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error('Destination API failed');
    return response.json();
  } catch {
    return ouidahMock;
  }
}

export type ExperienceHost = { name: string; role: string; bio: string; image: string };
export type ExperienceStep = { time: string; title: string; description: string };
export type ExperienceProductDetail = {
  id: string; type: string; name: string; title: string; promise: string; eyebrow: string;
  place: string; region: string; duration: string; format: string; hero: string; intro: string;
  why_it_matters: string; host: ExperienceHost; steps: ExperienceStep[]; included: string[];
  not_included: string[]; practical: string[]; price_note: string; availability_note: string;
  booking_label: string; related: { id: string; label: string; href: string }[]; locale: 'en'|'fr';
};

export async function getExperience(locale: 'en'|'fr', slug: string): Promise<ExperienceProductDetail | null> {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return null;
  try {
    const response = await fetch(`${base}/api/v1/experiences/${slug}?locale=${locale}`, { next: { revalidate: 60 } });
    if (!response.ok) throw new Error('Experience API failed');
    return response.json();
  } catch { return null; }
}

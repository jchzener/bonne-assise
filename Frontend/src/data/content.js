export const IMG = {
  /* Reliable editorial media — Cloudinary brand + verified wide shots */
  hero: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_85,w_2400,h_1350,c_fill,g_auto/amazone_42500f11c',
  hero2: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_85,w_2400,h_1350,c_fill,g_auto/mur-1',
  hero3: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_85,w_2400,h_1350,c_fill,g_center/amazone_42500f11c',
  cotonou: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1800,h_1200,c_fill/mur-1',
  ganvie: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,h_1200,c_fill,g_auto/amazone_42500f11c',
  ouidah: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,h_1200,c_fill/mur-1',
  porto: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,h_1200,c_fill,g_auto/amazone_42500f11c',
  grandPopo: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,h_1200,c_fill/mur-1',
  akassa: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,c_fill/mur-1',
  aloco: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,c_fill/amazone_42500f11c',
  yam: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,c_fill/mur-1',
  streetfood: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,c_fill/amazone_42500f11c',
  welcome1: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1400,c_fill/amazone_42500f11c',
  welcome2: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1400,c_fill/mur-1',
  welcome3: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1400,c_fill,g_auto/amazone_42500f11c',
  abomey: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,c_fill/mur-1',
  pendjari: 'https://res.cloudinary.com/benin/image/upload/f_auto,q_80,w_1600,c_fill/amazone_42500f11c'
};

const meta = (overrides = {}) => ({
  status: 'published',
  author: 'BONNE ASSISE',
  researchedAt: '2026-03',
  lastChecked: '2026-09',
  sources: ['benin.bj', 'field notes'],
  mediaCredit: 'benin.bj / editorial',
  ...overrides
});

/** Premium curated set — quality over quantity */

export const places = [
  {
    id: 'p1',
    slug: 'cotonou',
    name: 'Cotonou',
    eyebrow: 'Ville & côte',
    title: 'Le cœur vivant du Bénin.',
    desc: 'Marchés, art, tables, plage et vie nocturne. Se découvre par quartiers et par moments.',
    img: IMG.cotonou,
    gallery: [IMG.cotonou, IMG.hero2, IMG.streetfood],
    tags: ['ville', 'food', 'littoral'],
    region: 'Sud · Littoral',
    bestTime: 'Novembre – mars',
    duration: '2–4 jours',
    howToGet: 'Aéroport de Cotonou. Centre accessible en zémidjan ou taxi.',
    body: [
      'Cotonou n’est pas une carte postale figée. Dantokpa, Fidjrossè, la Marina : chaque quartier a son rythme.',
      'Le meilleur conseil : demander ce qui se passe aujourd’hui, ici — tables, expos, soirées.'
    ],
    highlights: [
      { title: 'Dantokpa', text: 'Le grand marché — y aller le matin, avec du temps.' },
      { title: 'Fidjrossè & plage', text: 'Fin de journée, grillades, océan.' },
      { title: 'Scène artistique', text: 'Galeries et murs : demander les ouvertures du moment.' }
    ],
    tips: [
      'Négociez le zémidjan avant de monter.',
      'Le soir, privilégiez les zones animées.'
    ],
    relatedDishes: ['akassa', 'aloco'],
    relatedStories: ['commencer-a-manger-a-cotonou'],
    relatedPlaces: ['ouidah', 'ganvie'],
    ...meta({ sources: ['benin.bj'] })
  },
  {
    id: 'p2',
    slug: 'ouidah',
    name: 'Ouidah',
    eyebrow: 'Histoire & mémoire',
    title: 'Une ville qui se raconte à pied.',
    desc: 'Route des esclaves, Porte du Non-Retour, temples vodoun et Atlantique.',
    img: IMG.ouidah,
    gallery: [IMG.ouidah, IMG.hero, IMG.porto],
    tags: ['histoire', 'culture', 'mémoire'],
    region: 'Sud · Atlantique',
    bestTime: 'Toute l’année · janvier pour les Vodun Days',
    duration: '1 journée',
    howToGet: 'Environ 40 km ouest de Cotonou. Taxi ou bus de ligne.',
    body: [
      'Ouidah se parcourt à pied. La mémoire demande du temps et du respect.',
      'Les Vodun Days (début janvier) concentrent arts, culture et spiritualité.'
    ],
    highlights: [
      { title: 'Porte du Non-Retour', text: 'Face à l’océan — point final de la Route des esclaves.' },
      { title: 'Temples vodoun', text: 'Demander avant de photographier.' }
    ],
    tips: [
      'Prévoir eau et chapeau.',
      'Un guide local change la qualité de la visite.'
    ],
    relatedDishes: ['poisson-braise'],
    relatedStories: ['ouidah-en-une-journee', 'renouer-avec-les-racines'],
    relatedPlaces: ['cotonou', 'ganvie'],
    ...meta({ sources: ['benin.bj', 'vodundays.bj'] })
  },
  {
    id: 'p3',
    slug: 'ganvie',
    name: 'Ganvié',
    eyebrow: 'Lac & vie quotidienne',
    title: 'La ville sur l’eau.',
    desc: 'Pirogues, marchés flottants, pêche — le quotidien avant le cliché.',
    img: IMG.ganvie,
    gallery: [IMG.ganvie, IMG.hero, IMG.cotonou],
    tags: ['lac', 'culture'],
    region: 'Sud · Atlantique',
    bestTime: 'Saison sèche',
    duration: 'Demi-journée à une journée',
    howToGet: 'Embarcadère d’Abomey-Calavi, puis pirogue.',
    body: [
      'Depuis une pirogue, Ganvié révèle d’abord des gestes. Le souvenir photographique vient après, si on le cherche.'
    ],
    highlights: [
      { title: 'Traversée en pirogue', text: 'Négocier le trajet à l’embarcadère.' },
      { title: 'Marché sur l’eau', text: 'Selon les jours — demander sur place.' }
    ],
    tips: ['Ralentir. Regarder. Peu de photos, beaucoup d’attention.'],
    relatedStories: ['ganvie-au-rythme-du-lac'],
    relatedPlaces: ['cotonou', 'ouidah'],
    ...meta()
  },
  {
    id: 'p4',
    slug: 'porto-novo',
    name: 'Porto-Novo',
    eyebrow: 'Capitale & culture',
    title: 'Ville de détails.',
    desc: 'Architecture afro-brésilienne, musées, Festival des Masques.',
    img: IMG.porto,
    gallery: [IMG.porto, IMG.abomey, IMG.ouidah],
    tags: ['culture', 'architecture'],
    region: 'Sud · Ouémé',
    bestTime: 'Toute l’année · août pour les Masques',
    duration: '1–2 jours',
    howToGet: 'Route depuis Cotonou (~40 min).',
    body: [
      'Porto-Novo se lit en marchant. Façades, Grande Mosquée, musées : chaque détail croise une histoire.'
    ],
    highlights: [
      { title: 'Quartier afro-brésilien', text: 'Marcher sans programme chargé.' },
      { title: 'Festival des Masques', text: 'Fin juillet – août.' }
    ],
    tips: ['Laisser du temps entre deux sites.'],
    relatedStories: ['festival-des-masques', 'porto-novo-architecture'],
    relatedPlaces: ['ouidah', 'abomey'],
    ...meta({ sources: ['benin.bj', 'festivaldesmasques.bj'] })
  }
];

export const dishes = [
  {
    id: 'd1',
    slug: 'akassa',
    name: 'Akassa',
    eyebrow: 'Plat fondateur',
    desc: 'Pâte de maïs fermentée, légèrement acidulée — le quotidien de beaucoup de tables.',
    img: IMG.akassa,
    gallery: [IMG.akassa, IMG.streetfood],
    tags: ['base', 'quotidien'],
    whereToTry: 'Tables de quartier à Cotonou, Ouidah, Porto-Novo.',
    body: [
      'Demander « akassa avec… » plutôt qu’une carte figée. Le meilleur est celui qui sort de la cuisine maintenant.'
    ],
    pairings: ['Sauce tomate ou arachide', 'Poisson', 'Viande'],
    relatedPlaces: ['cotonou'],
    relatedDishes: ['aloco', 'amiwo'],
    ...meta()
  },
  {
    id: 'd2',
    slug: 'aloco',
    name: 'Aloco',
    eyebrow: 'À partager',
    desc: 'Banane plantain mûre frite — simple, direct, souvent avec grillades.',
    img: IMG.aloco,
    gallery: [IMG.aloco, IMG.streetfood],
    tags: ['street', 'soir'],
    whereToTry: 'Bords de mer, bars de la Marina, soirées.',
    body: ['Le soir, près de la mer : aloco, poisson, piment.'],
    pairings: ['Grillades', 'Piment'],
    relatedPlaces: ['cotonou', 'grand-popo'],
    relatedDishes: ['akassa'],
    ...meta()
  },
  {
    id: 'd3',
    slug: 'amiwo',
    name: 'Amiwo',
    eyebrow: 'Couleur & fête',
    desc: 'Riz rouge (tomate ou huile de palme), souvent servi lors des moments collectifs.',
    img: IMG.yam,
    gallery: [IMG.yam, IMG.akassa],
    tags: ['fête', 'riz'],
    whereToTry: 'Tables familiales, cérémonies, restaurants locaux.',
    body: ['Un plat de partage autant que de goût.'],
    pairings: ['Viande', 'Poisson'],
    relatedDishes: ['akassa'],
    ...meta({ sources: ['unseenbenin.wordpress.com'] })
  },
  {
    id: 'd4',
    slug: 'poisson-braise',
    name: 'Poisson braisé',
    eyebrow: 'Côte',
    desc: 'Poisson grillé près de l’océan — le geste le plus simple et le plus juste.',
    img: IMG.streetfood,
    gallery: [IMG.streetfood, IMG.grandPopo],
    tags: ['côte', 'soir'],
    whereToTry: 'Fidjrossè, Grand-Popo, abords de plage.',
    body: ['Choisir le poisson du jour. Peu d’ornement.'],
    pairings: ['Aloco', 'Piment', 'Alloco'],
    relatedPlaces: ['cotonou', 'ouidah'],
    relatedDishes: ['aloco'],
    ...meta()
  }
];

export const events = [
  {
    id: 'e1',
    day: '02',
    month: 'JAN.',
    title: 'Vodun Days 2027',
    place: 'Ouidah',
    meta: '2–9 janvier · arts, culture & spiritualité',
    img: IMG.ouidah,
    dateStart: '2027-01-02',
    ...meta({ sources: ['vodundays.bj', 'benin.bj'] })
  },
  {
    id: 'e2',
    day: '26',
    month: 'DÉC.',
    title: 'WeLovEya 2026',
    place: 'Cotonou',
    meta: '26–27 décembre · musique & talents',
    img: IMG.cotonou,
    dateStart: '2026-12-26',
    ...meta({ sources: ['weloveyafestival.com', 'benin.bj'] })
  },
  {
    id: 'e3',
    day: '07',
    month: 'AOÛT',
    title: 'Festival des Masques 2027',
    place: 'Porto-Novo',
    meta: '7–8 août · masques, traditions & arts',
    img: IMG.porto,
    dateStart: '2027-08-07',
    ...meta({ sources: ['festivaldesmasques.bj', 'benin.bj'] })
  },
  {
    id: 'e4',
    day: '22',
    month: 'AOÛT',
    title: 'JISTNA 2027',
    place: 'Ouidah',
    meta: '22–23 août · mémoire de la traite',
    img: IMG.ouidah,
    dateStart: '2027-08-22',
    ...meta({ sources: ['jistna.bj', 'benin.bj'] })
  },
  {
    id: 'e5',
    day: '—',
    month: '2027',
    title: 'Gaani 2027',
    place: 'Nikki',
    meta: 'Fête royale Bariba · date à confirmer',
    img: IMG.pendjari,
    dateStart: '2027-01-01',
    ...meta({ sources: ['gaani.bj', 'benin.bj'] })
  }
];

export const stories = [
  {
    id: 's1',
    slug: 'ouidah-en-une-journee',
    title: 'Ouidah ne se raconte pas en une journée.',
    desc: 'Repères pour comprendre la ville avant de la parcourir.',
    img: IMG.ouidah,
    season: 'Toute l’année',
    body: [
      'La Route des esclaves, la Porte du Non-Retour, les temples : chaque étape gagne à être préparée.',
      'Arriver avec une intention : marcher, regarder, respecter.'
    ],
    ...meta()
  },
  {
    id: 's2',
    slug: 'ganvie-au-rythme-du-lac',
    title: 'Ganvié, au rythme du lac.',
    desc: 'Le quotidien avant le cliché, depuis une pirogue.',
    img: IMG.ganvie,
    season: 'Saison sèche',
    body: [
      'Filets, enfants, marchés, maisons : les gestes d’abord.',
      'Ralentir est le seul vrai conseil.'
    ],
    ...meta()
  },
  {
    id: 's3',
    slug: 'commencer-a-manger-a-cotonou',
    title: 'Ce que l’on commande vraiment à Cotonou.',
    desc: 'Quelques plats pour entrer dans la cuisine locale.',
    img: IMG.streetfood,
    season: 'Toute l’année',
    body: [
      'Alloco et grillades le soir. Akassa avec une sauce. Poisson braisé près de la mer.',
      'Demander : « Qu’est-ce qui est bon aujourd’hui ? »'
    ],
    ...meta()
  },
  {
    id: 's4',
    slug: 'renouer-avec-les-racines',
    title: 'Renouer avec les racines au Bénin.',
    desc: 'Terre d’accueil pour les Afro-descendants — mémoire et reconnexion.',
    img: IMG.hero,
    season: 'Toute l’année',
    body: [
      'Le Bénin invite à un geste concret : comprendre, séjourner, parfois s’ancrer.',
      'Ouidah, les Vodun Days et les communautés locales sont des portes d’entrée.'
    ],
    ...meta({ sources: ['benin.bj/afro-descendants', 'unseenbenin.wordpress.com'] })
  }
];

export const regions = [
  {
    id: 'r1',
    key: 'sud',
    label: 'SUD',
    title: 'Mémoriel, balnéaire & lacustre',
    places: 'Littoral · Atlantique · Mono · Ouémé',
    img: IMG.hero2
  },
  {
    id: 'r2',
    key: 'centre',
    label: 'CENTRE',
    title: 'Royaumes, collines & masques',
    places: 'Zou · Collines · Plateau · Couffo',
    img: IMG.porto
  },
  {
    id: 'r3',
    key: 'nord',
    label: 'NORD',
    title: 'Montagnes, parcs & traditions',
    places: 'Atacora · Donga · Borgou · Alibori',
    img: IMG.pendjari
  }
];

export const knows = [
  {
    kind: 'concrete',
    title: 'Négociez le zémidjan avant de monter',
    text: 'Fixez le prix à voix haute. Si le conducteur refuse, prenez le suivant.'
  },
  {
    kind: 'concrete',
    title: 'Demandez ce qui vient d’être préparé',
    text: 'À table, la carte est une suggestion. Le meilleur plat sort de la cuisine maintenant.'
  },
  {
    kind: 'concrete',
    title: 'Photographiez seulement après avoir demandé',
    text: 'Temples, cérémonies, personnes : un regard suffit. Si non, rangez l’appareil.'
  },
  {
    kind: 'general',
    title: 'À demander',
    text: 'Comment cela se passe aujourd’hui, ici.'
  },
  {
    kind: 'general',
    title: 'À respecter',
    text: 'Les personnes, les lieux sacrés, ce qui n’est pas à photographier.'
  },
  {
    kind: 'general',
    title: 'À regarder',
    text: 'Rythmes, gestes, lumière de fin de journée, marché du soir.'
  }
];

export const allContent = [
  ...places.map(p => ({ ...p, type: 'Lieu', href: `#/places/${p.slug}` })),
  ...dishes.map(d => ({ ...d, type: 'Plat', href: `#/food/${d.slug}` })),
  ...stories.map(s => ({ ...s, type: 'Histoire', href: `#/stories/${s.slug}` }))
];

export function getPlace(slug) { return places.find(p => p.slug === slug); }
export function getDish(slug) { return dishes.find(d => d.slug === slug); }
export function getStory(slug) { return stories.find(s => s.slug === slug); }
export function resolveRelated(slugs, collection) {
  if (!slugs || !slugs.length) return [];
  return slugs.map(s => collection.find(x => x.slug === s)).filter(Boolean);
}

export const sourceRegistry = [
  { source: 'benin.bj', url: 'https://benin.bj', note: 'Destination officielle, régions, agenda.' },
  { source: 'benin.bj/ressources', url: 'https://benin.bj/ressources', note: 'Médias & marque-pays — usage selon conditions.' },
  { source: 'Unseen Benin', url: 'https://unseenbenin.wordpress.com/', note: 'Regards culturels ; droits image à vérifier.' }
];

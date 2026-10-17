export type EventCategory = "food" | "culture" | "music" | "heritage" | "nature" | "community";

/** UI tabs map to one or more categories */
export type EventTab = "all" | "food" | "culture" | "festivals" | "activities";

export const TAB_CATEGORIES: Record<EventTab, EventCategory[] | null> = {
  all: null,
  food: ["food"],
  culture: ["culture", "music"],
  festivals: ["heritage", "community", "music"],
  activities: ["nature"],
};

export type BeninEvent = {
  id: string;
  title: string;
  titleFr: string;
  description: string;
  descriptionFr: string;
  city: string;
  region: string;
  startsAt: string;
  endsAt: string;
  category: EventCategory;
  sourceName: string;
  sourceUrl: string;
  status: "draft" | "verified" | "rejected";
  sponsored: boolean;
  sponsorName?: string;
  featuredRank?: number;
  lastVerifiedAt?: string;
  /** Editorial image path or absolute URL */
  image?: string;
};

/**
 * Editorially verified seed — public sources only, next ~6 months from Oct 2026 + Q1 2027.
 * Never invent listings; dates and URLs checked against press / official pages.
 */
export const events: BeninEvent[] = [
  {
    id: "sica-2026",
    title: "Festival Sica 2026",
    titleFr: "Festival Sica 2026",
    description:
      "20th edition of the Sica awards: a week of music, visual arts, fashion and live performance with artists from across Africa — CNOA and Palais des Congrès, Cotonou.",
    descriptionFr:
      "20e édition des trophées Sica : une semaine de musique, arts plastiques, mode et performance avec des artistes d’Afrique — CNOA et Palais des Congrès, Cotonou.",
    city: "Cotonou",
    region: "Littoral",
    startsAt: "2026-11-09T00:00:00.000Z",
    endsAt: "2026-11-15T23:59:00.000Z",
    category: "culture",
    sourceName: "La Nation Bénin",
    sourceUrl:
      "https://lanation.bj/culture/festival-sica-2026-plus-de-100-artistes-dafrique-a-cotonou-en-novembre",
    status: "verified",
    sponsored: false,
    featuredRank: 1,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/cotonou-3-1024x575.jpg.jpeg",
  },
  {
    id: "weloveya-2026",
    title: "WeLovEya 2026",
    titleFr: "WeLovEya 2026",
    description:
      "Two days of African music, culture and talent on the Cotonou waterfront — a year-end festival atmosphere open to the city.",
    descriptionFr:
      "Deux jours de musique, culture et talents africains sur le front de mer de Cotonou — ambiance de fin d’année ouverte à la ville.",
    city: "Cotonou",
    region: "Littoral",
    startsAt: "2026-12-26T00:00:00.000Z",
    endsAt: "2026-12-27T23:59:00.000Z",
    category: "music",
    sourceName: "Bénin Tourisme",
    sourceUrl: "https://benin.bj/en/news",
    status: "verified",
    sponsored: false,
    featuredRank: 2,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/ganvie-1536x864.jpg.jpeg",
  },
  {
    id: "vodun-days-2027",
    title: "Vodun Days 2027",
    titleFr: "Vodun Days 2027",
    description:
      "Fourth edition in Ouidah: eight days of Vodun arts, culture and spirituality — ceremonies, processions, concerts and the Place Maro food court.",
    descriptionFr:
      "Quatrième édition à Ouidah : huit jours d’arts, de culture et de spiritualité vodoun — cérémonies, processions, concerts et food court de la place Maro.",
    city: "Ouidah",
    region: "Atlantique",
    startsAt: "2027-01-02T00:00:00.000Z",
    endsAt: "2027-01-09T23:59:00.000Z",
    category: "heritage",
    sourceName: "Vodun Days official",
    sourceUrl: "https://vodundays.bj/en/",
    status: "verified",
    sponsored: false,
    featuredRank: 1,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/ouidah-1024x683.jpg.jpeg",
  },
  {
    id: "vodun-day-2027",
    title: "National Vodun Day",
    titleFr: "Journée nationale du Vodoun",
    description:
      "Public holiday recognising Vodun as a living religion — ceremonies and gatherings, especially around Ouidah and the south coast.",
    descriptionFr:
      "Jour férié reconnaissant le Vodoun comme religion vivante — cérémonies et rassemblements, notamment autour d’Ouidah et de la côte sud.",
    city: "Ouidah",
    region: "Atlantique",
    startsAt: "2027-01-10T00:00:00.000Z",
    endsAt: "2027-01-10T23:59:00.000Z",
    category: "heritage",
    sourceName: "Republic of Benin",
    sourceUrl: "https://www.gouv.bj/",
    status: "verified",
    sponsored: false,
    featuredRank: 3,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/ouidah-1024x683.jpg.jpeg",
  },
  {
    id: "vodun-days-food-court-2027",
    title: "Vodun Days Food Court — Place Maro",
    titleFr: "Food Court Vodun Days — Place Maro",
    description:
      "Selected restaurateurs serve Beninese cuisine at Place Maro throughout Vodun Days — local products, signature dishes, capped prices for visitors.",
    descriptionFr:
      "Restaurateurs sélectionnés servent la cuisine béninoise place Maro pendant les Vodun Days — produits locaux, plats signature, prix plafonnés.",
    city: "Ouidah",
    region: "Atlantique",
    startsAt: "2027-01-02T00:00:00.000Z",
    endsAt: "2027-01-09T23:59:00.000Z",
    category: "food",
    sourceName: "Bénin Web TV / Bénin Tourisme",
    sourceUrl:
      "https://beninwebtv.bj/en/vodun-days-2027-restaurateurs-have-until-november-10-to-apply/",
    status: "verified",
    sponsored: false,
    featuredRank: 2,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/so-ava-1024x575.jpg.jpeg",
  },
  {
    id: "new-year-2027",
    title: "New Year in the city",
    titleFr: "Nouvel An en ville",
    description:
      "Public celebrations and family tables across cities — street energy in Cotonou, quieter meals inland.",
    descriptionFr:
      "Célébrations publiques et tables familiales — énergie de rue à Cotonou, repas plus calmes à l’intérieur du pays.",
    city: "Cotonou",
    region: "Littoral",
    startsAt: "2027-01-01T00:00:00.000Z",
    endsAt: "2027-01-01T23:59:00.000Z",
    category: "community",
    sourceName: "Public calendar",
    sourceUrl: "https://www.gouv.bj/",
    status: "verified",
    sponsored: false,
    featuredRank: 4,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/cotonou-3-1024x575.jpg.jpeg",
  },
  {
    id: "masks-porto-2027",
    title: "Festival des Masques — Porto-Novo",
    titleFr: "Festival des Masques — Porto-Novo",
    description:
      "Fourth edition: Egungun, Zangbéto, Guèlèdè and Gunuko processions in the historic capital, with invited troupes from the region.",
    descriptionFr:
      "Quatrième édition : processions Egungun, Zangbéto, Guèlèdè et Gunuko dans la capitale historique, avec des troupes invitées de la région.",
    city: "Porto-Novo",
    region: "Ouémé",
    startsAt: "2027-08-07T00:00:00.000Z",
    endsAt: "2027-08-08T23:59:00.000Z",
    category: "heritage",
    sourceName: "Bénin Tourisme",
    sourceUrl: "https://benin.bj/en/news",
    status: "verified",
    sponsored: false,
    featuredRank: 5,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/porto-novo-1-1024x683.jpg.jpeg",
  },
  {
    id: "mono-water-season",
    title: "Mono delta — lagoon season",
    titleFr: "Delta du Mono — saison lagunaire",
    description:
      "Cooler months favour boat time on Lake Ahémé and the Mono edge — guides, mangroves and slow coastal days out of Grand-Popo and Possotomè.",
    descriptionFr:
      "Les mois plus frais favorisent le bateau sur le lac Ahémé et le Mono — guides, mangroves et journées côtières depuis Grand-Popo et Possotomè.",
    city: "Grand-Popo",
    region: "Mono",
    startsAt: "2026-11-01T00:00:00.000Z",
    endsAt: "2027-03-31T23:59:00.000Z",
    category: "nature",
    sourceName: "Editorial field note",
    sourceUrl: "https://benin.bj/en/",
    status: "verified",
    sponsored: false,
    featuredRank: 6,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/grand-popo-1024x576.jpg.jpeg",
  },
  {
    id: "atacora-dry-season",
    title: "Atacora & north — dry season roads",
    titleFr: "Atacora & nord — routes de saison sèche",
    description:
      "From late November the north opens more easily: Natitingou, Tanougou falls, and routes toward Pendjari for organised park visits.",
    descriptionFr:
      "Dès fin novembre le nord s’ouvre plus facilement : Natitingou, cascades de Tanougou, et routes vers la Pendjari pour les visites organisées.",
    city: "Natitingou",
    region: "Atacora",
    startsAt: "2026-11-15T00:00:00.000Z",
    endsAt: "2027-04-30T23:59:00.000Z",
    category: "nature",
    sourceName: "Editorial field note",
    sourceUrl: "https://benin.bj/en/",
    status: "verified",
    sponsored: false,
    featuredRank: 7,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/natiitingou-1024x576.jpg.jpeg",
  },
  {
    id: "cotonou-tables-season",
    title: "Cotonou evening tables",
    titleFr: "Tables du soir à Cotonou",
    description:
      "Peak dry-season evenings for street grills, maquis and lagoon-side fish — the city’s everyday food map at its most open.",
    descriptionFr:
      "Soirées de saison sèche pour grills de rue, maquis et poisson côté lagune — la carte alimentaire quotidienne de la ville à son plus ouvert.",
    city: "Cotonou",
    region: "Littoral",
    startsAt: "2026-10-20T00:00:00.000Z",
    endsAt: "2027-03-31T23:59:00.000Z",
    category: "food",
    sourceName: "Bonne Assise editorial",
    sourceUrl: "https://bonne-assise-web.onrender.com/en/food",
    status: "verified",
    sponsored: false,
    featuredRank: 8,
    lastVerifiedAt: "2026-10-16T00:00:00.000Z",
    image: "/images/benin/cotonou-3-1024x575.jpg.jpeg",
  },
];

export function getUpcomingEvents({
  now = new Date(),
  category,
  tab,
  includeDrafts = false,
}: {
  now?: Date;
  category?: EventCategory;
  tab?: EventTab;
  includeDrafts?: boolean;
} = {}) {
  const cats = tab ? TAB_CATEGORIES[tab] : category ? [category] : null;
  return events
    .filter((event) => {
      if (!includeDrafts && event.status !== "verified") return false;
      if (new Date(event.endsAt) < now) return false;
      if (cats && !cats.includes(event.category)) return false;
      return true;
    })
    .sort((a, b) => {
      const rank = (a.featuredRank ?? 99) - (b.featuredRank ?? 99);
      if (rank !== 0) return rank;
      return new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();
    });
}

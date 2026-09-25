export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const ui = {
  en: {
    discover: 'Discover', regions: 'Regions', experiences: 'All experiences', stories: 'Stories', journey: 'Your journey',
    food: 'Food', search: 'Search', menu: 'Menu', explore: 'Explore', readStory: 'Read story',
    chooseInterest: 'Choose what moves you', yourSignal: 'Your signal',
    regionsEyebrow: 'A COUNTRY OF MANY WORLDS', regionsTitle: 'Three worlds,', regionsTitle2: 'one country.',
    regionsLede: 'From Atlantic cities and lagoons to royal heartlands and northern landscapes, discover the different rhythms that shape Benin.',
    prendreeyebrow: 'PRENDRE PLACE', prendreTitle: 'Experiences that bring you', prendreTitle2: 'closer to Benin.',
    prendreLede: 'Small-scale encounters built around people, places and the details that make a day stay with you.',
    exploreExperience: 'Explore the experience',
    experienceNote: 'Curated by Bonne Assise · Small groups · Local hosts',
    fieldNote: 'Read the country before you travel it.',
    journeyTitle1: "Don't just", journeyTitle2: 'visit.', journeyTitle3: 'Make it yours.',
    journeyText: "Save the places that pull you in. We'll turn them into a journey you can actually use.",
    startBuilding: 'Start building',
    footerNote: 'A new way to discover Benin.\nBuilt around places, people and stories.',
    made: 'Made for curious people.',
  },
  fr: {
    discover: 'Découvrir', regions: 'Régions', experiences: 'Toutes les expériences', stories: 'Histoires', journey: 'Votre voyage',
    food: 'Cuisine', search: 'Rechercher', menu: 'Menu', explore: 'Explorer', readStory: 'Lire',
    chooseInterest: 'Choisissez ce qui vous attire', yourSignal: 'Votre signal',
    regionsEyebrow: 'UN PAYS, PLUSIEURS MONDES', regionsTitle: 'Trois mondes,', regionsTitle2: 'un seul pays.',
    regionsLede: 'Des villes atlantiques et des lagunes aux anciens royaumes et aux paysages du Nord, découvrez les différents rythmes qui façonnent le Bénin.',
    prendreeyebrow: 'PRENDRE PLACE', prendreTitle: 'Des expériences pour', prendreTitle2: 'rencontrer le Bénin.',
    prendreLede: 'Des rencontres en petit comité, pensées autour des personnes, des lieux et des détails qui restent longtemps.',
    exploreExperience: "Découvrir l'expérience",
    experienceNote: 'Curaté par Bonne Assise · Petits groupes · Hôtes locaux',
    fieldNote: 'Lire le pays avant de le parcourir.',
    journeyTitle1: 'Ne faites pas que', journeyTitle2: 'visiter.', journeyTitle3: 'Faites-en votre voyage.',
    journeyText: 'Enregistrez les lieux qui vous attirent. Nous les transformerons en un voyage que vous pourrez vraiment utiliser.',
    startBuilding: 'Construire mon voyage',
    footerNote: 'Une nouvelle façon de découvrir le Bénin.\nPensée autour des lieux, des personnes et des histoires.',
    made: 'Pour les esprits curieux.',
  },
} as const;

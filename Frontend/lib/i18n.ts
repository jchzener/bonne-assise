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
    made: 'Made for curious people.', scrollEnter: 'Scroll to enter', exploreLabel: 'Explore', menuOpen: 'Open menu', menuClose: 'Close menu', mobileNote: 'A destination platform built around places, people and stories.',
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
    made: 'Pour les esprits curieux.', scrollEnter: 'Faites défiler pour entrer', exploreLabel: 'Explorer', menuOpen: 'Ouvrir le menu', menuClose: 'Fermer le menu', mobileNote: 'Une plateforme de destination pensée autour des lieux, des personnes et des histoires.',
  },
} as const;

export const pageCopy = {
  en: {
    destination: { placeNav:'The place', experiences:'Experiences', food:'Food', stories:'Stories', allExperiences:'All experiences', benin:'Benin', enter:'Enter the place', orientationEyebrow:'A PLACE TO FOLLOW', readPlace:'READ THE PLACE', readPlaceTitle:'More than one story.', readPlaceLede:'Three ways into the place — memory, architecture and living traditions. Read one, then follow the thread.', readStory:'Read the story', experiencesTitle:"Don't just see it. Enter it.", experiencesLede:'Places become memorable through what you do there. These are ways to move from looking to taking part.', exploreExperience:'Explore the experience', taste:'TASTE THE PLACE', tasteTitle:'Food is another way in.', tasteLede:'Start with the table. Then follow the market, the ingredients, the people and the places behind it.', startTables:'Start with five tables', field:'FIELD NOTES', fieldTitle:'Read before you arrive.', map:'Open the place on map', keep:'KEEP MOVING', keepTitle:'Ouidah is a chapter. Keep reading.', keepLede:'Follow the southern route or change rhythm completely. The next place is part of the story too.', explore:'Explore', journey:'YOUR JOURNEY', addJourney:'Add to my journey', footer:'A new way to discover Benin.\nBuilt around places, people and stories.' },
    destinations:{eyebrow:'DESTINATIONS', title:'Places worth staying with a little longer.', lede:'Not a list of cities. Worlds to move through, connected to experiences, stories, food and your journey.', allExperiences:'All experiences', enter:'Enter the place'},
    experiences:{chapter:'PRENDRE PLACE', back:'Back home', title:'Experiences to meet Benin.', lede:'Not a list of activities. Invitations built around people, places, gestures and stories that make you want to stay a little longer.', discover:'Discover the experience', note:'A DIFFERENT WAY IN', noteTitle:'Start with one experience. Let the rest unfold.'},
    stories:{eyebrow:'FIELD NOTES', title:'Read the country before you travel it.', lede:'Stories that open a destination rather than reducing it to a list of facts.', back:'Ouidah', read:'Read story'},
    food:{eyebrow:'FOOD', title:'Enter through the table.', lede:'Dishes, markets, drinks and people: food is another way to read a place.', tables:'Five First Tables', back:'Ouidah'},
    journey:{eyebrow:'YOUR JOURNEY', title1:"Don't just", title2:'visit.', body:'Keep the places, experiences, stories and tables that pull you in. Your journey will take shape as you discover.', heading:'A memory of what pulls you in.', continue:'Keep discovering'}
  },
  fr: {
    destination: { placeNav:'Le lieu', experiences:'Expériences', food:'Cuisine', stories:'Histoires', allExperiences:'Toutes les expériences', benin:'Bénin', enter:'Entrer dans le lieu', orientationEyebrow:'UN LIEU À SUIVRE', readPlace:'LIRE LE LIEU', readPlaceTitle:'Plus d’une histoire.', readPlaceLede:'Trois portes d’entrée — mémoire, architecture et traditions vivantes. Lisez-en une, puis suivez le fil.', readStory:'Lire l’histoire', experiencesTitle:'Ne faites pas que voir. Entrez.', experiencesLede:'Un lieu devient mémorable par ce que l’on y vit. Voici des façons de passer du regard à la participation.', exploreExperience:'Découvrir l’expérience', taste:'GOÛTER LE LIEU', tasteTitle:'La table est une autre porte.', tasteLede:'Commencez par la table. Puis suivez le marché, les ingrédients, les personnes et les lieux derrière elle.', startTables:'Commencer par cinq tables', field:'NOTES DE TERRAIN', fieldTitle:'À lire avant d’arriver.', map:'Ouvrir le lieu sur la carte', keep:'CONTINUER', keepTitle:'Ouidah est un chapitre. Continuez à lire.', keepLede:'Suivez la route du Sud ou changez complètement de rythme. Le prochain lieu fait aussi partie de l’histoire.', explore:'Explorer', journey:'VOTRE VOYAGE', addJourney:'Ajouter à mon voyage', footer:'Une nouvelle façon de découvrir le Bénin.\nPensée autour des lieux, des personnes et des histoires.' },
    destinations:{eyebrow:'DESTINATIONS', title:'Des lieux où rester un peu plus longtemps.', lede:'Pas une liste de villes. Des mondes à parcourir, reliés aux expériences, aux histoires, à la table et à votre voyage.', allExperiences:'Toutes les expériences', enter:'Entrer dans le lieu'},
    experiences:{chapter:'PRENDRE PLACE', back:'Retour à l’accueil', title:'Des expériences pour rencontrer le Bénin.', lede:'Pas une liste d’activités. Des invitations pensées autour des personnes, des lieux, des gestes et des histoires qui donnent envie de rester un peu plus longtemps.', discover:'Découvrir l’expérience', note:'UNE AUTRE FAÇON D’ENTRER', noteTitle:'Commencez par une expérience. Laissez la suite venir.'},
    stories:{eyebrow:'NOTES DE TERRAIN', title:'Lire le pays avant de le parcourir.', lede:'Des histoires pour ouvrir une destination, pas pour la réduire à une liste de faits.', back:'Ouidah', read:'Lire l’histoire'},
    food:{eyebrow:'CUISINE', title:'Entrer par la table.', lede:'Plats, marchés, boissons et personnes : la cuisine est une autre manière de lire un lieu.', tables:'Cinq Premières Tables', back:'Ouidah'},
    journey:{eyebrow:'VOTRE VOYAGE', title1:'Ne faites pas que', title2:'visiter.', body:'Gardez les lieux, expériences, histoires et tables qui vous attirent. Votre voyage se construira au fil de vos découvertes.', heading:'Une mémoire de ce qui vous attire.', continue:'Continuer à découvrir'}
  }
} as const;

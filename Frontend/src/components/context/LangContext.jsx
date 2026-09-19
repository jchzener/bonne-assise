import React, { createContext, useCallback, useContext, useState } from "react";

const STR = {
  FR: {
    navDiscover: "Lieux",
    navFood: "À table",
    navAgenda: "Agenda",
    navStories: "Histoires",
    navPlan: "Itinéraire",
    navPostcard: "Carte postale",
    search: "Rechercher",
    explore: "Explorer",
    planStay: "Planifier mon séjour",
    addItinerary: "Ajouter à mon itinéraire",
    removeItinerary: "Retirer de l’itinéraire",
    inItinerary: "Dans l’itinéraire",
    myItinerary: "Mon itinéraire",
    emptyItinerary: "Votre itinéraire est vide.",
    clearItinerary: "Vider l’itinéraire",
    continueExplore: "Continuer à explorer",
    baKnows: "BONNE ASSISE SAIT",
    localKnowledge: "CONNAISSANCE LOCALE",
    bestMoment: "MEILLEUR MOMENT",
    toDo: "À FAIRE",
    verified: "VÉRIFIÉ",
    related: "CONTINUER",
    highlights: "POINTS FORTS",
    practical: "PRATIQUE",
    tips: "CONSEILS",
    whereToTry: "OÙ GOÛTER",
    pairings: "Souvent avec",
    gallery: "EN IMAGES",
    howToGet: "Y ALLER",
    duration: "DURÉE",
  },
  EN: {
    navDiscover: "Places",
    navFood: "At the table",
    navAgenda: "Agenda",
    navStories: "Stories",
    navPlan: "Itinerary",
    navPostcard: "Postcard",
    search: "Search",
    explore: "Explore",
    planStay: "Plan my trip",
    addItinerary: "Add to itinerary",
    removeItinerary: "Remove from itinerary",
    inItinerary: "In itinerary",
    myItinerary: "My itinerary",
    emptyItinerary: "Your itinerary is empty.",
    clearItinerary: "Clear itinerary",
    continueExplore: "Keep exploring",
    baKnows: "BONNE ASSISE KNOWS",
    localKnowledge: "LOCAL KNOWLEDGE",
    bestMoment: "BEST TIME",
    toDo: "TO DO",
    verified: "VERIFIED",
    related: "CONTINUE",
    highlights: "HIGHLIGHTS",
    practical: "PRACTICAL",
    tips: "TIPS",
    whereToTry: "WHERE TO TRY",
    pairings: "Often served with",
    gallery: "GALLERY",
    howToGet: "GETTING THERE",
    duration: "DURATION",
  },
};

const LangContext = createContext({
  lang: "FR",
  t: (k) => k,
  setLang: () => {},
});

export function LangProvider({ children }) {
  const [lang, setLang] = useState("FR");
  const t = useCallback((key) => STR[lang][key] || STR.FR[key] || key, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

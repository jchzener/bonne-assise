import type { Locale } from "../types";

import enChrome from "./en/chrome.json";
import enHome from "./en/home.json";
import enExplore from "./en/explore.json";
import enPages from "./en/pages.json";
import enPlaces from "./en/places.json";
import enFoods from "./en/foods.json";
import enExperiences from "./en/experiences.json";
import enStories from "./en/stories.json";

import frChrome from "./fr/chrome.json";
import frHome from "./fr/home.json";
import frExplore from "./fr/explore.json";
import frPages from "./fr/pages.json";
import frPlaces from "./fr/places.json";
import frFoods from "./fr/foods.json";
import frExperiences from "./fr/experiences.json";
import frStories from "./fr/stories.json";

function mergeLocale(
  chrome: Record<string, unknown>,
  home: Record<string, unknown>,
  explore: Record<string, unknown>,
  pages: Record<string, unknown>,
  places: Record<string, unknown>,
  foods: Record<string, unknown>,
  experiences: Record<string, unknown>,
  stories: Record<string, unknown>,
) {
  return {
    ...chrome,
    ...home,
    ...explore,
    ...pages,
    ...places,
    ...foods,
    ...experiences,
    ...stories,
  };
}

const en = mergeLocale(
  enChrome,
  enHome,
  enExplore,
  enPages,
  enPlaces,
  enFoods,
  enExperiences,
  enStories,
) as Messages;
const fr = mergeLocale(
  frChrome,
  frHome,
  frExplore,
  frPages,
  frPlaces,
  frFoods,
  frExperiences,
  frStories,
) as Messages;

export const messages = { en, fr } as const;

export type Messages = typeof enChrome &
  typeof enHome &
  typeof enExplore &
  typeof enPages &
  typeof enPlaces &
  typeof enFoods &
  typeof enExperiences &
  typeof enStories;

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.en;
}

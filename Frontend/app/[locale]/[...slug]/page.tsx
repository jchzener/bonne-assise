import { notFound } from "next/navigation";
import BAApp from "../../ba-app";
import type { Locale, Page } from "../../../lib/types";

const routeMap: Record<string, Page> = {
  explore: "explore",
  food: "food",
  experiences: "experience",
  trip: "trip",
  saved: "saved",
  stories: "story",
  places: "place",
};

export default async function LocalizedRoute({ params }: { params: Promise<{ locale: string; slug: string[] }> }) {
  const { locale, slug } = await params;
  if (locale !== "en" && locale !== "fr") notFound();
  const [first, second] = slug;
  if (!first) return <BAApp locale={locale as Locale} />;

  if (first === "places" && second) {
    return <BAApp locale={locale as Locale} initialPage="place" initialSlug={second} />;
  }
  if (first === "food" && second) {
    return <BAApp locale={locale as Locale} initialPage="food" initialSlug={second} />;
  }
  if (first === "experiences" && second) {
    return <BAApp locale={locale as Locale} initialPage="experience" initialSlug={second} />;
  }
  if (first === "stories" && second) {
    return <BAApp locale={locale as Locale} initialPage="story" initialSlug={second} />;
  }

  const page = routeMap[first];
  if (!page || second) notFound();
  return <BAApp locale={locale as Locale} initialPage={page} />;
}

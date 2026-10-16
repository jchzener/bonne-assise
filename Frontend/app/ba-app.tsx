"use client";
import { useEffect, useState } from "react";
import type { Page, Locale } from "../lib/types";
import { Header, Footer } from "../components/layout/site-chrome";
import { Home } from "../components/pages/home-page";
import { Explore } from "../components/pages/explore-page";
import { Place, Food, Experience } from "../components/pages/detail-pages";
import { Trip } from "../components/pages/trip-page";
import { Saved } from "../components/pages/saved-page";
import { Story } from "../components/pages/story-page";
import { CategoryIndex } from "../components/pages/category-page";

export default function BAApp({
  locale = "en",
  initialPage = "home",
  initialSlug,
}: {
  locale?: Locale;
  initialPage?: Page;
  initialSlug?: string;
}) {
  const [page] = useState<Page>(initialPage);
  const [slug] = useState(initialSlug);
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  const props = {
    saved,
    toggleSaved: () => setSaved((value) => !value),
    addTrip: () => setAdded(true),
    added,
  };
  let content;
  switch (page) {
    case "explore":
      content = <Explore />;
      break;
    case "place":
      content = slug ? <Place {...props} slug={slug} /> : <CategoryIndex kind="place" />;
      break;
    case "food":
      content = slug ? <Food {...props} slug={slug} /> : <CategoryIndex kind="food" />;
      break;
    case "experience":
      content = slug ? <Experience {...props} slug={slug} /> : <CategoryIndex kind="experience" />;
      break;
    case "trip":
      content = <Trip added={added} />;
      break;
    case "saved":
      content = <Saved saved={saved} />;
      break;
    case "story":
      content = slug ? <Story slug={slug} /> : <CategoryIndex kind="story" />;
      break;
    default:
      content = <Home {...props} locale={locale} />;
  }
  return (
    <>
      <Header page={page} locale={locale} />
      {content}
      <Footer locale={locale} />
    </>
  );
}

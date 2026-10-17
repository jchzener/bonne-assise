"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  foodCatalog,
  experienceCatalog,
  storyCatalog,
  placeCatalog,
} from "../../lib/content";
import { getMessages } from "../../lib/i18n/messages";
import type { Locale, Page } from "../../lib/types";
import { Link, Heading, Image, Eyebrow } from "../ui/primitives";

export type CategoryKind = "food" | "experience" | "story" | "place";

type CatItem = {
  slug: string;
  title: string;
  sub: string;
  image: string;
  dek?: string;
  more?: string[];
};

function buildLists(locale: Locale): Record<CategoryKind, { to: Page; items: CatItem[] }> {
  const t = getMessages(locale) as any;
  const places = t.places || {};
  const foods = t.foods || {};
  const experiences = t.experiences || {};
  const stories = t.stories || {};
  return {
    food: {
      to: "food",
      items: Object.entries(foodCatalog).map(([slug, v]) => {
        const i = foods[slug] || {};
        const more = [i.p1 || v.p1, i.p2 || v.p2].filter(Boolean) as string[];
        return {
          slug,
          title: i.title || v.title,
          sub: i.location || v.location,
          image: v.image,
          dek: i.intro || v.intro,
          more,
        };
      }),
    },
    experience: {
      to: "experience",
      items: Object.entries(experienceCatalog).map(([slug, v]) => {
        const i = experiences[slug] || {};
        const more = [i.p1 || v.p1, i.p2 || v.p2].filter(Boolean) as string[];
        return {
          slug,
          title: i.title || v.title,
          sub: i.location || v.location,
          image: v.image,
          dek: i.intro || v.intro,
          more,
        };
      }),
    },
    story: {
      to: "story",
      items: Object.entries(storyCatalog).map(([slug, v]) => {
        const i = stories[slug] || {};
        const more = (i.body?.length ? i.body : v.body) || [];
        return {
          slug,
          title: i.title || v.title,
          sub: i.eyebrow || v.eyebrow,
          image: v.image,
          dek: i.dek || v.dek,
          more,
        };
      }),
    },
    place: {
      to: "place",
      items: Object.entries(placeCatalog).map(([slug, v]) => {
        const i = places[slug] || {};
        const more = [i.paragraph || v.paragraph, i.heading || v.heading].filter(Boolean) as string[];
        return {
          slug,
          title: i.title || v.title,
          sub: i.location || v.location,
          image: v.image,
          dek: i.intro || v.intro,
          more,
        };
      }),
    },
  };
}

export function CategoryIndex({ kind }: { kind: CategoryKind }) {
  const pathname = usePathname() || "/en";
  const locale = (pathname.split("/")[1] === "fr" ? "fr" : "en") as Locale;
  const t = getMessages(locale);
  const copy = (t as any).categories?.[kind] || {};
  const { to, items } = buildLists(locale)[kind];
  const [heroIndex, setHeroIndex] = useState(0);
  const featured = items[heroIndex] || items[0];
  const rest = items.filter((_, i) => i !== heroIndex);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => setHeroIndex((i) => (i + 1) % Math.min(items.length, 5)), 6000);
    return () => window.clearInterval(id);
  }, [items.length]);

  return (
    <main className={`page-top category-page category-page--${kind} category-page--mtl`}>
      {/* MTL-style open: title + prose left, rotating image right */}
      <header className="cat-mtl-hero">
        <div className="cat-mtl-hero-copy">
          <Heading level={1} className="cat-mtl-title">
            {copy.title}{" "}
            {copy.titleAccent ? <em>{copy.titleAccent}</em> : null}
          </Heading>
          {copy.lede && <p className="cat-mtl-lede">{copy.lede}</p>}
          {(copy.p1 || copy.p2) && (
            <div className="cat-mtl-more">
              {copy.p1 && <p>{copy.p1}</p>}
              {copy.p2 && <p>{copy.p2}</p>}
            </div>
          )}
        </div>
        {featured && (
          <div className="cat-mtl-hero-media">
            <Link to={to} slug={featured.slug} className="cat-mtl-hero-frame">
              <Image src={featured.image} alt={featured.title} />
            </Link>
            <div className="cat-mtl-hero-caption">
              <Eyebrow>{featured.sub}</Eyebrow>
              <Link to={to} slug={featured.slug}>
                <Heading level={3}>{featured.title}</Heading>
              </Link>
            </div>
            {items.length > 1 && (
              <div className="cat-mtl-hero-dots" role="tablist">
                {items.slice(0, 5).map((it, i) => (
                  <button
                    key={it.slug}
                    type="button"
                    aria-label={it.title}
                    className={i === heroIndex ? "is-active" : ""}
                    onClick={() => setHeroIndex(i)}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Discovery grid — rounded cards, title under image */}
      <section className="cat-mtl-grid-wrap">
        <div className="cat-mtl-grid-head">
          <Heading level={2}>{locale === "fr" ? "À découvrir" : "Discover"}</Heading>
        </div>
        <div className="cat-mtl-grid">
          {items.map((item) => (
            <Link key={item.slug} to={to} slug={item.slug} className="cat-mtl-card">
              <div className="cat-mtl-card-media">
                <Image src={item.image} alt={item.title} />
              </div>
              <div className="cat-mtl-card-body">
                <Heading level={3}>{item.title}</Heading>
                {item.dek && <p className="cat-mtl-card-dek">{item.dek}</p>}
                <span className="cat-mtl-card-meta">{item.sub}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

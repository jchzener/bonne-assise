"use client";
import React, { useEffect, useRef } from "react";
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
  /** Extended editorial body for list layouts */
  more?: string[];
};

type Layout =
  | "rail-left"
  | "rail-right"
  | "stack"
  | "stack-flip"
  | "offset-pair"
  | "text-lead";

const LAYOUT_CYCLE: Layout[] = [
  "rail-left",
  "stack",
  "rail-right",
  "offset-pair",
  "text-lead",
  "rail-left",
  "stack-flip",
  "rail-right",
  "offset-pair",
];

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
        const more = (i.body && i.body.length ? i.body : v.body) || [];
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
        const more = [
          i.paragraph || v.paragraph,
          i.heading || v.heading,
          i.note ? (locale === "fr" ? `Note · ${i.note}` : `Note · ${i.note}`) : "",
        ].filter(Boolean) as string[];
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

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = root.querySelectorAll(".ba-reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
}

function BaBlock({
  item,
  next,
  to,
  layout,
  index,
}: {
  item: CatItem;
  next?: CatItem;
  to: Page;
  layout: Layout;
  index: number;
}) {
  const delay = (index % 5) * 0.06;

  if (layout === "stack" || layout === "stack-flip") {
    return (
      <article
        className={`ba-block ba-block--stack ${layout === "stack-flip" ? "ba-block--stack-flip" : ""} ba-reveal`}
        style={{ transitionDelay: `${delay}s` }}
      >
        <div className="ba-block-prose">
          <Eyebrow>{item.sub}</Eyebrow>
          <Link to={to} slug={item.slug} className="ba-block-title-link">
            <Heading level={2}>{item.title}</Heading>
          </Link>
          {item.dek && <p className="ba-block-dek">{item.dek}</p>}
          {item.more?.slice(0, 2).map((p, i) => (
            <p key={i} className="ba-block-body">
              {p}
            </p>
          ))}
          <Link to={to} slug={item.slug} className="ba-block-cta">
            {item.title}
          </Link>
        </div>
        <div className={`ba-block-shots ${next ? "ba-block-shots--duo" : ""}`}>
          <Link to={to} slug={item.slug} className="ba-block-shot ba-block-shot--a">
            <Image src={item.image} alt={item.title} />
          </Link>
          {next && (
            <Link to={to} slug={next.slug} className="ba-block-shot ba-block-shot--b">
              <Image src={next.image} alt={next.title} />
            </Link>
          )}
        </div>
      </article>
    );
  }

  if (layout === "text-lead") {
    return (
      <article
        className="ba-block ba-block--text-lead ba-reveal"
        style={{ transitionDelay: `${delay}s` }}
      >
        <div className="ba-block-prose ba-block-prose--wide">
          <Eyebrow>{item.sub}</Eyebrow>
          <Link to={to} slug={item.slug} className="ba-block-title-link">
            <Heading level={2}>{item.title}</Heading>
          </Link>
          {item.dek && <p className="ba-block-dek ba-block-dek--lg">{item.dek}</p>}
          {item.more?.map((p, i) => (
            <p key={i} className="ba-block-body">
              {p}
            </p>
          ))}
        </div>
        <Link to={to} slug={item.slug} className="ba-block-shot ba-block-shot--wide">
          <Image src={item.image} alt={item.title} />
        </Link>
      </article>
    );
  }

  if (layout === "offset-pair" && next) {
    return (
      <article
        className="ba-block ba-block--offset ba-reveal"
        style={{ transitionDelay: `${delay}s` }}
      >
        <Link to={to} slug={item.slug} className="ba-offset-card ba-offset-card--low">
          <div className="ba-offset-media">
            <Image src={item.image} alt={item.title} />
          </div>
          <div className="ba-offset-copy">
            <Eyebrow>{item.sub}</Eyebrow>
            <Heading level={3}>{item.title}</Heading>
            {item.dek && <p>{item.dek}</p>}
            {item.more?.[0] && <p className="ba-block-body">{item.more[0]}</p>}
          </div>
        </Link>
        <Link to={to} slug={next.slug} className="ba-offset-card ba-offset-card--high">
          <div className="ba-offset-media">
            <Image src={next.image} alt={next.title} />
          </div>
          <div className="ba-offset-copy">
            <Eyebrow>{next.sub}</Eyebrow>
            <Heading level={3}>{next.title}</Heading>
            {next.dek && <p>{next.dek}</p>}
            {next.more?.[0] && <p className="ba-block-body">{next.more[0]}</p>}
          </div>
        </Link>
      </article>
    );
  }

  // rail-left / rail-right (agency)
  const right = layout === "rail-right";
  return (
    <Link
      to={to}
      slug={item.slug}
      className={`ba-block ba-block--rail ${right ? "ba-block--rail-right" : ""} ba-reveal`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="ba-rail-copy">
        <Eyebrow>{item.sub}</Eyebrow>
        <Heading level={2}>{item.title}</Heading>
        {item.dek && <p className="ba-block-dek">{item.dek}</p>}
        {item.more?.slice(0, 2).map((p, i) => (
          <p key={i} className="ba-block-body">
            {p}
          </p>
        ))}
      </div>
      <div className="ba-rail-media">
        <Image src={item.image} alt={item.title} />
      </div>
    </Link>
  );
}

function BaStream({ items, to }: { items: CatItem[]; to: Page }) {
  const nodes: React.ReactNode[] = [];
  let i = 0;
  let row = 0;
  while (i < items.length) {
    const layout = LAYOUT_CYCLE[row % LAYOUT_CYCLE.length];
    const needsPair = layout === "offset-pair" || layout === "stack" || layout === "stack-flip";
    if (needsPair && items[i + 1] && layout === "offset-pair") {
      nodes.push(
        <BaBlock key={items[i].slug} item={items[i]} next={items[i + 1]} to={to} layout={layout} index={row} />,
      );
      i += 2;
    } else if ((layout === "stack" || layout === "stack-flip") && items[i + 1] && row % 2 === 0) {
      nodes.push(
        <BaBlock key={items[i].slug} item={items[i]} next={items[i + 1]} to={to} layout={layout} index={row} />,
      );
      i += 2;
    } else {
      const safe: Layout =
        layout === "offset-pair" ? (row % 2 === 0 ? "rail-left" : "rail-right") : layout;
      nodes.push(
        <BaBlock key={items[i].slug} item={items[i]} to={to} layout={safe} index={row} />,
      );
      i += 1;
    }
    row += 1;
  }
  return <>{nodes}</>;
}

export function CategoryIndex({ kind }: { kind: CategoryKind }) {
  const pathname = usePathname() || "/en";
  const locale = (pathname.split("/")[1] === "fr" ? "fr" : "en") as Locale;
  const t = getMessages(locale);
  const copy = (t as any).categories?.[kind] || {};
  const { to, items } = buildLists(locale)[kind];
  const revealRef = useReveal();
  const countLabel =
    locale === "fr" ? `${items.length} entrées` : `${items.length} entries`;

  return (
    <main className={`page-top category-page category-page--${kind}`}>
      <header className="ba-cat-intro ba-reveal is-in">
        <div className="ba-cat-intro-inner">
          <div className="ba-cat-intro-mark">
            <span className="ba-cat-dot" aria-hidden />
            <Eyebrow>{copy.eyebrow}</Eyebrow>
          </div>

          <Heading level={1} className="ba-cat-title">
            <span className="ba-cat-title-line">{copy.title}</span>
            {copy.titleAccent ? (
              <span className="ba-cat-title-accent">{copy.titleAccent}</span>
            ) : null}
          </Heading>

          <div className="ba-cat-intro-grid">
            {copy.lede && <p className="ba-cat-lede">{copy.lede}</p>}
            <div className="ba-cat-intro-side">
              {copy.p1 && <p className="ba-cat-standfirst">{copy.p1}</p>}
              {copy.p2 && <p className="ba-cat-standfirst ba-cat-standfirst--2">{copy.p2}</p>}
            </div>
          </div>

          <div className="ba-cat-intro-foot">
            <span>{countLabel}</span>
            <span className="ba-cat-intro-rule" aria-hidden />
            <span>{locale === "fr" ? "Sélection Bonne Assise" : "Bonne Assise selection"}</span>
          </div>
        </div>
      </header>

      <div className="ba-cat-rule" aria-hidden />

      <div className="ba-stream" ref={revealRef}>
        <BaStream items={items} to={to} />
      </div>
    </main>
  );
}

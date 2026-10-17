"use client";
import React from "react";
import { photos, placeCatalog, foodCatalog, experienceCatalog } from "../../lib/content";
import type { Page, Locale } from "../../lib/types";
import { getMessages } from "../../lib/i18n/messages";
import { usePathname } from "next/navigation";
import { Icon, Button, Link, Heading, Image, Eyebrow, SaveActions, TextLink } from "../ui/primitives";

function useLocale(): Locale {
  const pathname = usePathname() || "/en";
  return pathname.split("/")[1] === "fr" ? "fr" : "en";
}

export function DetailHero({
  type,
  title,
  location,
  intro,
  image,
  scrollLabel,
  children,
}: {
  type: string;
  title: string;
  location: string;
  intro: string;
  image: string;
  scrollLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="detail-hero">
        <Image src={image} alt={`${title}, ${location}`} />
        <div className="detail-shade" />
        <div className="detail-title">
          <Eyebrow light>
            {type} · {location}
          </Eyebrow>
          <Heading level={1}>{title}</Heading>
        </div>
        <span className="scroll-note">{scrollLabel || "Scroll to discover ↓"}</span>
      </section>
      <section className="detail-intro section-pad">
        <p className="lede">{intro}</p>
        {children}
      </section>
    </>
  );
}

export function InfoRail({ items }: { items: [string, string][] }) {
  return (
    <div className="info-rail">
      {items.map(([label, value]) => (
        <div key={label}>
          <Eyebrow>{label}</Eyebrow>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}

export function Related({ title, goFurther, items }: { title: string; goFurther?: string; items: [string, string, string, Page, string?][] }) {
  return (
    <section className="related section-pad">
      <div className="section-top">
        <div>
          <Heading level={2}>{title}</Heading>
        </div>
      </div>
      <div className="related-grid">
        {items.map(([type, name, image, to, itemSlug], i) => (
          <Link to={to} slug={itemSlug} key={name} className={i === 0 ? "related-main" : ""}>
            <Image src={image} alt={name} />
            <Eyebrow>{type}</Eyebrow>
            <Heading level={3}>{name}</Heading>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function Place({
  saved,
  toggleSaved,
  addTrip,
  added,
  slug = "ganvie",
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
  slug?: string;
}) {
  const locale = useLocale();
  const t = getMessages(locale);
  const d = (t as any).detail;
  const ui = (t as any).ui || {};
  const catalog = placeCatalog[slug] || placeCatalog.ganvie;
  const i18nPlace = (t as any).places?.[slug] || {};
  const place = {
    ...catalog,
    title: i18nPlace.title || catalog.title,
    location: i18nPlace.location || catalog.location,
    intro: i18nPlace.intro || catalog.intro,
    heading: i18nPlace.heading || catalog.heading,
    paragraph: i18nPlace.paragraph || catalog.paragraph,
    bestTime: i18nPlace.bestTime || catalog.bestTime,
    duration: i18nPlace.duration || catalog.duration,
    from: i18nPlace.from || catalog.from,
    note: i18nPlace.note || catalog.note,
  };
  const relatedLabels = d?.placeRelated || [
    ["Taste", "Smoked fish at the morning market"],
    ["Meet", "Koffi, keeper of the water"],
    ["Do", "Cross the lake at daybreak"],
  ];

  return (
    <main>
      <DetailHero type={d?.placeType || "Place"} title={place.title} location={place.location} image={place.image} intro={place.intro} scrollLabel={d?.scroll}>
        <SaveActions saved={saved} toggleSaved={toggleSaved} addTrip={addTrip} added={added} labels={ui} />
      </DetailHero>
      <section className="detail-body section-pad">
        <InfoRail
          items={[
            [d?.bestTime || "Best time", place.bestTime],
            [d?.allow || "Allow", place.duration],
            [d?.gettingThere || "Getting there", place.from],
            [d?.localNote || "Local note", place.note],
          ]}
        />
        <article className="article-copy">
          <Heading level={2}>{place.heading}</Heading>
          <p>{place.paragraph}</p>
          {slug === "ganvie" && d?.quoteGanvie && (
            <blockquote>
              “{d.quoteGanvie}”
              <small>{d.quoteGanvieAttr}</small>
            </blockquote>
          )}
        </article>
      </section>
      <section className="wide-image">
        <Image src={place.image} alt={`${place.title}, Benin`} />
        <span>
          {place.title} · Benin
        </span>
      </section>
      <Related
        title={(d?.around || "Around {title}").replace("{title}", place.title)}
        goFurther={d?.goFurther}
        items={[
          [relatedLabels[0][0], relatedLabels[0][1], photos.grill, "food", "wagassi"],
          [relatedLabels[1][0], relatedLabels[1][1], photos.fisherman, "story", "rosine-cooks"],
          [relatedLabels[2][0], relatedLabels[2][1], photos.boats, "experience", "on-the-water"],
        ]}
      />
    </main>
  );
}

export function Food({
  saved,
  toggleSaved,
  addTrip,
  added,
  slug = "wagassi",
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
  slug?: string;
}) {
  const locale = useLocale();
  const t = getMessages(locale);
  const d = (t as any).detail;
  const ui = (t as any).ui || {};
  const catalog = foodCatalog[slug] || foodCatalog.wagassi;
  const i18n = (t as any).foods?.[slug] || {};
  const item = {
    ...catalog,
    title: i18n.title || catalog.title,
    location: i18n.location || catalog.location,
    intro: i18n.intro || catalog.intro,
    madeFrom: i18n.madeFrom || catalog.madeFrom,
    season: i18n.season || catalog.season,
    taste: i18n.taste || catalog.taste,
    tryIt: i18n.tryIt || catalog.tryIt,
    heading: i18n.heading || catalog.heading,
    headingEm: i18n.headingEm ?? catalog.headingEm,
    p1: i18n.p1 || catalog.p1,
    p2: i18n.p2 || catalog.p2,
  };
  const labels = d?.food || {};

  return (
    <main>
      <DetailHero type={d?.foodType || "Food"} title={item.title} location={item.location} image={item.image} intro={item.intro} scrollLabel={d?.scroll}>
        <SaveActions saved={saved} toggleSaved={toggleSaved} addTrip={addTrip} added={added} labels={ui} />
      </DetailHero>
      <section className="detail-body food-detail section-pad">
        <InfoRail
          items={[
            [labels.madeFrom || "Made from", item.madeFrom],
            [labels.inSeason || "In season", item.season],
            [labels.taste || "Taste", item.taste],
            [labels.tryIt || "Try it", item.tryIt],
          ]}
        />
        <article className="article-copy">
          <Heading level={2}>
            {item.heading}
            <br />
            <em>{item.headingEm}</em>
          </Heading>
          <p>{item.p1}</p>
          <p>{item.p2}</p>
        </article>
      </section>
      <section className="maker-section section-pad">
        <div>
          <Heading level={2}>{labels.makerHeading || "Meet the people behind the plate."}</Heading>
          <p>{labels.makerBody || "Follow the ingredients to the cooks, makers and markets that keep them alive."}</p>
          <TextLink to="story" slug="rosine-cooks">
            {labels.makerCta || "Meet a cook"}
          </TextLink>
        </div>
        <Image src={photos.women} alt="" />
      </section>
      <Related
        title={labels.relatedTitle || "Follow the taste"}
        goFurther={d?.goFurther}
        items={[
          ["Place", "Cotonou markets", photos.grill, "place", "cotonou"],
          ["Experience", "Cotonou after dark", photos.market, "experience", "after-dark"],
          ["Story", "Rosine cooks", photos.women, "story", "rosine-cooks"],
        ]}
      />
    </main>
  );
}

export function Experience({
  saved,
  toggleSaved,
  addTrip,
  added,
  slug = "after-dark",
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
  slug?: string;
}) {
  const locale = useLocale();
  const t = getMessages(locale);
  const d = (t as any).detail;
  const e = d?.experience || {};
  const ui = (t as any).ui || {};
  const catalog = experienceCatalog[slug] || experienceCatalog["after-dark"];
  const i18n = (t as any).experiences?.[slug] || {};
  const item = {
    ...catalog,
    title: i18n.title || catalog.title,
    location: i18n.location || catalog.location,
    intro: i18n.intro || catalog.intro,
    duration: i18n.duration || catalog.duration,
    language: i18n.language || catalog.language,
    meeting: i18n.meeting || catalog.meeting,
    access: i18n.access || catalog.access,
    heading: i18n.heading || catalog.heading,
    p1: i18n.p1 || catalog.p1,
    p2: i18n.p2 || catalog.p2,
  };
  const steps = e.steps || [];

  return (
    <main>
      <DetailHero type={d?.experienceType || "Experience"} title={item.title} location={item.location} image={item.image} intro={item.intro} scrollLabel={d?.scroll}>
        <SaveActions saved={saved} toggleSaved={toggleSaved} addTrip={addTrip} added={added} labels={ui} />
      </DetailHero>
      <section className="booking-bar section-pad">
        <div>
          <Eyebrow>{e.duration || "Duration"}</Eyebrow>
          <p>{item.duration}</p>
        </div>
        <div>
          <Eyebrow>{e.language || "Language"}</Eyebrow>
          <p>{item.language}</p>
        </div>
        <div>
          <Eyebrow>{e.meeting || "Meeting point"}</Eyebrow>
          <p>{item.meeting}</p>
        </div>
        <Button>
          {e.request || "Request a place"} <Icon name="arrow" />
        </Button>
      </section>
      <section className="detail-body section-pad">
        <InfoRail
          items={[
            [e.duration || "Duration", item.duration],
            [e.language || "Language", item.language],
            [e.meeting || "Meeting point", item.meeting],
            [e.access || "Accessibility", item.access],
          ]}
        />
        <article className="article-copy">
          {e.productNote && (
            <p className="lede" style={{ marginBottom: "1.5rem", opacity: 0.9 }}>
              <strong>{e.productEyebrow || "Starter experiences"}</strong>
              <br />
              {e.productNote}
            </p>
          )}
          <Heading level={2}>{item.heading}</Heading>
          <p>{item.p1}</p>
          <p>{item.p2}</p>
          {steps.length > 0 && slug === "after-dark" && (
            <>
              <Heading level={3}>{e.howHeading || "How it unfolds"}</Heading>
              <ol className="steps">
                {steps.map((step: any) => (
                  <li key={step.n}>
                    <span>{step.n}</span>
                    <div>
                      <b>{step.title}</b>
                      <p>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}
        </article>
      </section>
      <Related
        title={e.relatedTitle || "More ways in"}
        goFurther={d?.goFurther}
        items={(
          [
            ["Experience", "Five meals · First days", photos.market, "experience", "five-meals"],
            ["Experience", "Cotonou after dark", photos.grill, "experience", "after-dark"],
            ["Experience", "The First Table", photos.ouidah, "experience", "first-table"],
          ] as [string, string, string, Page, string?][]
        ).filter((row) => row[4] !== slug)}
      />
    </main>
  );
}

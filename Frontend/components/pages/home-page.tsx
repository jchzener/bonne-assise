"use client";
import React, { useEffect, useState } from "react";
import {
  photos,
  foodCycles as foodImageCycles,
  peopleEntries as peopleImageEntries,
} from "../../lib/content";
import { getMessages } from "../../lib/i18n/messages";
import type { Locale, Page } from "../../lib/types";
import {
  Icon,
  Button,
  Link,
  Heading,
  Image,
  Eyebrow,
  TextLink,
  Section,
  SectionHeader,
  EditionCard,
} from "../ui/primitives";
import { HomeHero } from "../home/hero";


function NewsBand({ locale, excludeSlugs = [] }: { locale: Locale; excludeSlugs?: string[] }) {
  const t = getMessages(locale);
  const news = (t.home as any).news;
  const raw: Array<{ label: string; text: string; cta: string; to: Page; slug?: string }> =
    news?.items || [
      {
        label: t.home.tickerLabel,
        text: t.home.ticker,
        cta: t.home.tickerLink,
        to: "story" as Page,
        slug: "early-light",
      },
    ];
  // CPO: never surface the same destination as the edition cards above
  const exclude = new Set(excludeSlugs.filter(Boolean));
  const items = raw.filter((item) => !item.slug || !exclude.has(item.slug));
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [items.length, excludeSlugs.join("|")]);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % items.length), 7000);
    return () => window.clearInterval(id);
  }, [items.length]);

  const item = items[active] || items[0];
  if (!item) return null;

  return (
    <div className="news-band" aria-label={news?.aria || "From the field"} aria-live="polite">
      <div className="news-band-inner">
        <span className="news-band-label">{item.label}</span>
        <p className="news-band-text">{item.text}</p>
        <Link to={item.to} slug={item.slug} className="news-band-cta">
          {item.cta} <Icon name="arrow" size={14} />
        </Link>
      </div>
      {items.length > 1 && (
        <div className="news-band-dots" role="tablist" aria-label={news?.aria || "News"}>
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={i === active ? "is-active" : ""}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}



export function Home({
  saved,
  toggleSaved,
  addTrip,
  added,
  locale = "en",
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
  locale?: Locale;
}) {
  const t = getMessages(locale);
  const [editionIndex, setEditionIndex] = useState(0);
  const [foodIndex, setFoodIndex] = useState(0);
  const [editionPaused, setEditionPaused] = useState(false);
  const [foodPaused, setFoodPaused] = useState(false);
  const [eventTab, setEventTab] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState<
    Array<{
      id: string;
      title: string;
      description?: string;
      city: string;
      startsAt: string;
      endsAt?: string;
      category: string;
      sponsored: boolean;
      sponsorName?: string;
      sourceUrl: string;
      image?: string;
    }>
  >([]);

  const editionSets = (t as any).editions?.sets ?? [];
  const foodCopy = (t as any).foodCycles ?? [];
  const peopleCopy = (t as any).people?.entries ?? [];
  const ui = (t as any).ui ?? t.home;

  const eventTabKeys = ["all", "food", "culture", "festivals", "activities"] as const;

  useEffect(() => {
    const tab = eventTabKeys[eventTab] || "all";
    fetch(`/api/events?locale=${locale}&tab=${tab}`)
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload) => setUpcomingEvents(payload.events ?? []))
      .catch(() => setUpcomingEvents([]));
  }, [locale, eventTab]);

  useEffect(() => {
    if (editionPaused || editionSets.length <= 1) return;
    const timer = window.setInterval(() => setEditionIndex((i) => (i + 1) % editionSets.length), 8000);
    return () => window.clearInterval(timer);
  }, [editionPaused, editionSets.length]);

  useEffect(() => {
    if (foodPaused || foodCopy.length <= 1) return;
    const timer = window.setInterval(() => setFoodIndex((i) => (i + 1) % foodCopy.length), 9000);
    return () => window.clearInterval(timer);
  }, [foodPaused, foodCopy.length]);

  const foodImages = foodImageCycles;
  const food = {
    ...(foodCopy[foodIndex] || {}),
    image: foodImages[foodIndex]?.image || photos.wagassi,
  };
  const peopleFallbackImages = [
    photos.cotonou,
    photos.ganvie,
    photos.natitingou,
    photos.ouidah,
  ];
  const people = peopleCopy.map((entry: any, i: number) => ({
    ...entry,
    image: peopleImageEntries[i]?.[2] || peopleFallbackImages[i] || photos.cotonou,
  }));

  return (
    <main>
      <HomeHero locale={locale} />

      {/* City editions */}
      <Section
        className="city-editions"
        ariaLabel={t.home.editionsAria}
        onMouseEnter={() => setEditionPaused(true)}
        onMouseLeave={() => setEditionPaused(false)}
      >
        {(editionSets[editionIndex] || []).map((card: any, i: number) => (
          <EditionCard
            key={`${editionIndex}-${i}`}
            label={card.label}
            title={card.title}
            sub={card.sub}
            to={card.to as Page}
            tone={card.tone}
            slug={card.slug}
          />
        ))}
        <Link to="explore" className="edition edition-index" aria-label={(t as any).editions?.indexLabel || t.home.indexLabel}>
          <span>{(t as any).editions?.indexLabel || t.home.indexLabel}</span>
          <Heading level={3}>
            {((t as any).editions?.indexTitle || t.home.indexTitle || "SEE|ALL")
              .split("|")
              .map((line: string, i: number) => (
                <span key={i}>{line}</span>
              ))}
          </Heading>
          <small>{(t as any).editions?.indexMeta || t.home.indexMeta}</small>
        </Link>
      </Section>

      {/* From the field — rotating editorial signals */}
      <NewsBand
        locale={locale}
        excludeSlugs={(editionSets[editionIndex] || []).map((c: any) => c.slug).filter(Boolean)}
      />

      {/* Intent */}
      <Section className="intent" pad>
        <div className="intent-row">
          <span>{t.home.intentLead}</span>
          <div className="intent-links">
            <Link to="food">{t.home.intentFood}</Link>
            <Link to="story">{t.home.intentPeople}</Link>
            <Link to="place">{t.home.intentPlace}</Link>
            <Link to="experience">{t.home.intentExperience}</Link>
          </div>
        </div>
      </Section>

      {/* Feature place */}
      <Section className="feature-place" pad>
        <div className="feature-grid">
          <div className="feature-copy">
            <Heading level={2}>{t.home.featureTitle}</Heading>
            <p>{t.home.featureBody}</p>
            <TextLink to="place" slug="porto-novo">
              {t.home.featureCta}
            </TextLink>
          </div>
          <div className="feature-image-wrap">
            <Image src={photos.portoNovo} alt={t.home.featureAlt} />
            <span>{t.home.featureCaption}</span>
          </div>
        </div>
      </Section>

      {/* Food — first encounter with Beninese gastronomy */}
      <Section className="food-gateway food-taste">
        <div className="food-taste-intro section-pad">
          <Heading level={2}>{t.home.foodTitle}</Heading>
          <p>{t.home.foodBody}</p>
        </div>

        <div className="food-taste-grid section-pad">
          {(locale === "fr"
            ? [
                { slug: "wagassi", title: "Wagassi", region: "Borgou", note: "Fromage peul, doux et salé", image: photos.wagassi },
                { slug: "amiwo", title: "Amiwo", region: "Sud", note: "Riz rouge, tables du quotidien", image: photos.amiwo },
                { slug: "grilled-fish", title: "Poisson grillé", region: "Côte", note: "Braises au bord de l’eau", image: photos.grill },
                { slug: "akassa", title: "Akassa", region: "Sud", note: "Pâte de maïs, sauce qui compte", image: photos.market },
              ]
            : [
                { slug: "wagassi", title: "Wagassi", region: "Borgou", note: "Soft Peulh cheese, lightly salted", image: photos.wagassi },
                { slug: "amiwo", title: "Amiwo", region: "South", note: "Red rice, everyday tables", image: photos.amiwo },
                { slug: "grilled-fish", title: "Grilled fish", region: "Coast", note: "Open fire by the water", image: photos.grill },
                { slug: "akassa", title: "Akassa", region: "South", note: "Maize paste, the sauce matters", image: photos.market },
              ]
          ).map((dish) => (
            <Link key={dish.slug} to="food" slug={dish.slug} className="food-taste-card">
              <div className="food-taste-media">
                <Image src={dish.image} alt={dish.title} />
              </div>
              <div className="food-taste-body">
                <span className="food-taste-region">{dish.region}</span>
                <Heading level={3}>{dish.title}</Heading>
                <p>{dish.note}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="food-coffrets section-pad">
          <div className="food-coffrets-head">
            <Heading level={3}>
              {locale === "fr" ? "Goûter avec nous" : "Taste it with us"}
            </Heading>
            <p>
              {locale === "fr"
                ? "Coffrets et expériences pour entrer dans la cuisine béninoise — marché, table, mains qui préparent."
                : "Boxes and experiences to enter Beninese cooking — market, table, and the hands that prepare it."}
            </p>
          </div>
          <div className="food-coffrets-grid">
            <Link to="experience" slug="first-table" className="food-coffret">
              <div className="food-coffret-media">
                <Image src={photos.market} alt="" />
              </div>
              <div className="food-coffret-copy">
                <span className="food-taste-region">
                  {locale === "fr" ? "Expérience" : "Experience"}
                </span>
                <Heading level={3}>
                  {locale === "fr" ? "La première table" : "The First Table"}
                </Heading>
                <p>
                  {locale === "fr"
                    ? "Un repas partagé pour commencer le pays par le goût."
                    : "A shared meal to begin the country with taste."}
                </p>
                <span className="ba-btn ba-btn--text">
                  {locale === "fr" ? "Découvrir" : "Discover"}{" "}
                  <Icon name="arrow" size={14} />
                </span>
              </div>
            </Link>
            <Link to="experience" slug="five-meals" className="food-coffret">
              <div className="food-coffret-media">
                <Image src={photos.amiwo} alt="" />
              </div>
              <div className="food-coffret-copy">
                <span className="food-taste-region">
                  {locale === "fr" ? "Parcours" : "Tasting path"}
                </span>
                <Heading level={3}>
                  {locale === "fr" ? "Cinq repas · Premiers jours" : "Five meals · First days"}
                </Heading>
                <p>
                  {locale === "fr"
                    ? "Une carte de goûts pour orienter les premiers repas sur place."
                    : "A taste map to guide your first meals on the ground."}
                </p>
                <span className="ba-btn ba-btn--text">
                  {locale === "fr" ? "Découvrir" : "Discover"}{" "}
                  <Icon name="arrow" size={14} />
                </span>
              </div>
            </Link>
          </div>
          <div className="food-taste-footer">
            <TextLink to="food">
              {locale === "fr" ? "Toute la cuisine béninoise" : "All Beninese food"}
            </TextLink>
          </div>
        </div>
      </Section>

      {/* People — editorial feature + filmstrip */}
      <Section className="people people--editorial" pad>
        <div className="people-intro">
          <Heading level={2}>{t.home.peopleTitle}</Heading>
          <p>{t.home.peopleBody}</p>
        </div>
        {people[0] && (
          <Link to="story" slug="rosine-cooks" className="people-feature">
            <div className="people-feature-media">
              <Image src={people[0].image} alt={people[0].title} />
            </div>
            <div className="people-feature-copy">
              <p className="person-meta">{people[0].meta}</p>
              <Heading level={3}>{people[0].title}</Heading>
              <span className="ba-btn ba-btn--solid ba-btn--inverse">
                {t.home.meetPerson.replace(
                  "{name}",
                  people[0].ctaName || people[0].title.split(" ")[0]
                )}{" "}
                <Icon name="arrow" size={14} />
              </span>
            </div>
          </Link>
        )}
        <div className="people-strip">
          {people.slice(1).map((person: any) => (
            <Link to="story" slug="rosine-cooks" className="people-strip-item" key={person.title}>
              <div className="people-strip-media">
                <Image src={person.image} alt={person.title} />
              </div>
              <p className="person-meta">{person.meta}</p>
              <Heading level={3}>{person.title}</Heading>
            </Link>
          ))}
          <TextLink to="story" slug="rosine-cooks" className="people-all">
            {t.home.seeAllPeople}
          </TextLink>
        </div>
      </Section>

      {/* What's on — MTL-inspired premium rail */}
{/* What's on — MTL-inspired premium rail */}
      <Section className="whats-on whats-on--mtl" pad>
        <div className="whats-mtl-head">
          <div>
            <p className="whats-mtl-eyebrow">{t.events.eyebrow}</p>
            <Heading level={2} className="whats-mtl-title">
              {t.events.title}
              {t.events.titleAccent ? <em> {t.events.titleAccent}</em> : null}
            </Heading>
          </div>
          <TextLink to="explore">{t.home.seeAllEvents}</TextLink>
        </div>

        <div className="whats-tabs whats-tabs--pills" role="tablist" aria-label={t.events.eyebrow}>
          {(t.home.eventTabs || []).map((tab: string, i: number) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={eventTab === i}
              className={eventTab === i ? "active" : ""}
              onClick={() => setEventTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="whats-rail-wrap">
          <button
            type="button"
            className="whats-rail-nav whats-rail-nav--prev"
            aria-label={locale === "fr" ? "Précédent" : "Previous"}
            onClick={() => {
              const el = document.getElementById("whats-rail");
              if (el) el.scrollBy({ left: -340, behavior: "smooth" });
            }}
          >
            <Icon name="arrow" size={16} />
          </button>
          <button
            type="button"
            className="whats-rail-nav whats-rail-nav--next"
            aria-label={locale === "fr" ? "Suivant" : "Next"}
            onClick={() => {
              const el = document.getElementById("whats-rail");
              if (el) el.scrollBy({ left: 340, behavior: "smooth" });
            }}
          >
            <Icon name="arrow" size={16} />
          </button>
          <div className="whats-rail" id="whats-rail">
            {upcomingEvents.length ? (
              upcomingEvents.slice(0, 8).map((event) => (
                <a
                  key={event.id}
                  href={event.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="whats-card"
                >
                  <div className="whats-card-media">
                    {event.image ? <Image src={event.image} alt="" /> : <span className="whats-card-ph" />}
                  </div>
                  <div className="whats-card-body">
                    <Heading level={3}>{event.title}</Heading>
                    <div className="whats-card-tags">
                      <span className="whats-pill">{event.category}</span>
                      <span className="whats-pill whats-pill--mute">
                        {event.city} ·{" "}
                        {new Date(event.startsAt).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-GB", {
                          day: "numeric",
                          month: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <div className="events-empty">
                <Eyebrow>{t.events.verified}</Eyebrow>
                <Heading level={3}>{t.events.emptyTitle}</Heading>
                <p>{t.events.emptyText}</p>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Stories — magazine feature + stack */}
      <Section className="latest latest--mag" pad>
        <div className="latest-head">
          <Heading level={2}>{t.home.storiesTitle}</Heading>
          <TextLink to="story" slug="early-light">
            {t.home.storiesCta}
          </TextLink>
        </div>
        <div className="stories-mag">
          <Link to="story" slug="early-light" className="stories-mag-feature">
            <div className="stories-mag-feature-media">
              <Image src={photos.cotonou} alt={t.home.storyOne} />
            </div>
            <div className="stories-mag-feature-copy">
              <span className="story-meta">{t.home.storyMetaOne}</span>
              <Heading level={3}>{t.home.storyOne}</Heading>
              <span className="ba-btn ba-btn--text">
                {locale === "fr" ? "Lire" : "Read"} <Icon name="arrow" size={14} />
              </span>
            </div>
          </Link>
          <div className="stories-mag-stack">
            <Link to="story" slug="market-names" className="stories-mag-item">
              <div className="stories-mag-item-media">
                <Image src={photos.ganvie} alt={t.home.storyTwo} />
              </div>
              <div>
                <span className="story-meta">{t.home.storyMetaTwo}</span>
                <Heading level={3}>{t.home.storyTwo}</Heading>
              </div>
            </Link>
            <Link to="story" slug="rosine-cooks" className="stories-mag-item">
              <div className="stories-mag-item-media">
                <Image src={photos.ouidah} alt="Rosine" />
              </div>
              <div>
                <span className="story-meta">
                  {locale === "fr" ? "Portrait · 7 min" : "Portrait · 7 min"}
                </span>
                <Heading level={3}>
                  {locale === "fr"
                    ? "Rosine lit le marché comme une cuisine"
                    : "Rosine reads the market as a kitchen"}
                </Heading>
              </div>
            </Link>
            <Link to="story" slug="early-light" className="stories-mag-item">
              <div className="stories-mag-item-media">
                <Image src={photos.portoNovo} alt="Porto-Novo" />
              </div>
              <div>
                <span className="story-meta">
                  {locale === "fr" ? "Lieu · 5 min" : "Place · 5 min"}
                </span>
                <Heading level={3}>
                  {locale === "fr"
                    ? "Porto-Novo avant le petit déjeuner"
                    : "Porto-Novo before breakfast"}
                </Heading>
              </div>
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

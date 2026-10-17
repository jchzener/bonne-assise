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
  SaveActions,
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
  const people = peopleCopy.map((entry: any, i: number) => ({
    ...entry,
    image: peopleImageEntries[i]?.[2] || photos.women,
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
        <Eyebrow>{t.home.intentEyebrow}</Eyebrow>
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
            <Eyebrow>{t.home.featureEyebrow}</Eyebrow>
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

      {/* Food gateway */}
      <Section
        className="food-gateway"
        onMouseEnter={() => setFoodPaused(true)}
        onMouseLeave={() => setFoodPaused(false)}
      >
        <div className="food-intro section-pad">
          <div>
            <Eyebrow light>{t.home.foodEyebrow}</Eyebrow>
            <Heading level={2}>{t.home.foodTitle}</Heading>
          </div>
          <p>{t.home.foodBody}</p>
        </div>
        <div className="food-story section-pad food-cycle" key={foodIndex}>
          <div className="food-portrait">
            <Image src={food.image} alt={food.label || ""} />
          </div>
          <div className="food-word">
            <small>{food.label}</small>
            <span>{food.title}</span>
          </div>
          <div className="food-connections">
            <Eyebrow light>{food.intro}</Eyebrow>
            <div className="food-path-list">
              {(food.paths || []).map((path: string, i: number) => (
                <div className="food-path" key={path}>
                  <strong>{path}</strong>
                  {i === 0 && <small>{food.detail}</small>}
                </div>
              ))}
            </div>
            <TextLink to="food" slug="wagassi" light>
              {food.link}
            </TextLink>
            <div className="cycle-dots" aria-label={t.home.foodSelector}>
              {foodCopy.map((_: unknown, i: number) => (
                <button
                  key={i}
                  className={i === foodIndex ? "active" : ""}
                  onClick={() => setFoodIndex(i)}
                  aria-label={t.home.showFood.replace("{n}", String(i + 1))}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* People */}
      <Section className="people" pad>
        <div className="people-heading">
          <div>
            <Eyebrow>{t.home.peopleEyebrow}</Eyebrow>
            <Heading level={2}>{t.home.peopleTitle}</Heading>
          </div>
          <p>{t.home.peopleBody}</p>
        </div>
        <div className="people-layout">
          {people[0] && (
            <Link to="story" slug="rosine-cooks" className="person-main">
              <Image src={people[0].image} alt={people[0].title} />
              <div>
                <Eyebrow>{people[0].meta}</Eyebrow>
                <Heading level={3}>{people[0].title}</Heading>
                <span className="text-link">
                  {t.home.meetPerson.replace("{name}", people[0].ctaName || people[0].title.split(" ")[0])}{" "}
                  <Icon name="arrow" />
                </span>
              </div>
            </Link>
          )}
          <div className="person-side-list">
            {people.slice(1).map((person: any) => (
              <Link to="story" slug="rosine-cooks" className="person-side" key={person.title}>
                <Image src={person.image} alt={person.title} />
                <Eyebrow>{person.meta}</Eyebrow>
                <Heading level={3}>{person.title}</Heading>
              </Link>
            ))}
            <TextLink to="story" slug="rosine-cooks" className="people-all">
              {t.home.seeAllPeople}
            </TextLink>
          </div>
        </div>
      </Section>

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

      {/* Experience band */}
      <Section className="experience-band">
        <Image src={photos.coast} alt={t.home.experienceAlt} />
        <div className="experience-overlay">
          <Eyebrow light>{t.home.experienceEyebrow}</Eyebrow>
          <Heading level={2}>{t.home.experienceTitle}</Heading>
          <p>{t.home.experienceBody}</p>
          <div className="experience-meta">
            {(t.home.experienceMeta || []).map((item: string) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <SaveActions
            saved={saved}
            toggleSaved={toggleSaved}
            addTrip={addTrip}
            added={added}
            labels={{
              save: ui.save || t.home.save,
              saved: ui.saved || t.home.saved,
              addTrip: ui.addTrip || t.home.addTrip,
              addedTrip: ui.addedTrip || t.home.addedTrip,
              share: ui.share || t.home.share,
            }}
          />
        </div>
      </Section>

      {/* Plan */}
      <Section className="plan" pad>
        <div className="plan-collage">
          <Image src={photos.city} alt={t.home.planAltCity} />
          <Image src={photos.cook} alt={t.home.planAltCook} />
          <div className="saved-stamp">
            <Icon name="heart" />
            <span style={{ whiteSpace: "pre-line" }}>{t.home.savedStamp}</span>
          </div>
        </div>
        <div className="plan-copy">
          <Eyebrow>{t.home.planEyebrow}</Eyebrow>
          <Heading level={2}>{t.home.planTitle}</Heading>
          <p>{t.home.planBody}</p>
          <Link to="trip" className="btn btn-dark">
            {t.home.planCta} <Icon name="arrow" />
          </Link>
        </div>
      </Section>

      {/* Latest stories */}
      <Section className="latest" pad>
        <SectionHeader
          eyebrow={t.home.storiesEyebrow}
          title={t.home.storiesTitle}
          action={<TextLink to="story" slug="early-light">{t.home.storiesCta}</TextLink>}
        />
        <Link to="story" slug="early-light" className="story-row">
          <div>
            <Eyebrow>{t.home.storyMetaOne}</Eyebrow>
            <Heading level={3}>{t.home.storyOne}</Heading>
          </div>
          <Image src={photos.market} alt={t.home.marketAlt} />
          <Icon name="arrow" />
        </Link>
        <Link to="story" slug="market-names" className="story-row">
          <div>
            <Eyebrow>{t.home.storyMetaTwo}</Eyebrow>
            <Heading level={3}>{t.home.storyTwo}</Heading>
          </div>
          <Image src={photos.women} alt={t.home.womenAlt} />
          <Icon name="arrow" />
        </Link>
      </Section>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import { Shell } from "../layout/Shell.jsx";
import { SectionHead } from "../ui/SectionHead.jsx";
import { Card } from "../ui/Card.jsx";
import { Button, Arrow } from "../ui/Button.jsx";
import { useLang } from "../context/LangContext.jsx";
import {
  IMG,
  places,
  dishes,
  events,
  stories,
  regions,
  knows,
} from "../../data/content.js";

export function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const { t } = useLang();
  const heroSlides = [
    {
      img: IMG.hero,
      kicker: "VIVEZ LE BÉNIN",
      title: "Des lieux qui restent.",
      sub: "Commencez par les destinations",
    },
    {
      img: IMG.hero2,
      kicker: "À TABLE",
      title: "Des tables où s’asseoir.",
      sub: "La gastronomie béninoise",
    },
    {
      img: IMG.hero3,
      kicker: "MAINTENANT",
      title: "Ce qui est vivant.",
      sub: "L’agenda du moment",
    },
  ];

  useEffect(() => {
    const id = setInterval(
      () => setHeroIdx((i) => (i + 1) % heroSlides.length),
      7000
    );
    return () => clearInterval(id);
  }, []);

  const slide = heroSlides[heroIdx];

  return (
    <Shell>
      <section className="home-hero" aria-label="Découvrir le Bénin">
        <div className="home-hero-media">
          {heroSlides.map((s, i) => (
            <img
              key={i}
              src={s.img}
              alt=""
              className={i === heroIdx ? "active" : ""}
            />
          ))}
          <div className="home-hero-shade" />
        </div>
        <div className="home-hero-copy">
          <span className="eyebrow light">{slide.kicker}</span>
          <h1>{slide.title}</h1>
          <p>{slide.sub}</p>
          <div className="home-hero-actions">
            <Button as="a" href="#/places" variant="primary">
              {t("explore")} <Arrow />
            </Button>
            <Button as="a" href="#/plan" variant="ghost light">
              {t("planStay")}
            </Button>
          </div>
        </div>
        <div className="home-hero-dots">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === heroIdx ? "active" : ""}
              onClick={() => setHeroIdx(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="welcome">
        <div className="welcome-inner">
          <span className="eyebrow">BIENVENUE</span>
          <h2>
            Un guide vivant pour découvrir
            <br />
            le Bénin autrement.
          </h2>
          <p>
            Lieux, tables et histoires — une sélection attentive, pas un
            annuaire.
          </p>
          <div className="welcome-mosaic">
            <img src={IMG.welcome1} alt="" />
            <img src={IMG.welcome2} alt="" />
            <img src={IMG.welcome3} alt="" />
          </div>
        </div>
      </section>

      <section className="section agenda">
        <SectionHead
          eyebrow="AGENDA"
          title="Plongez dans l’énergie du Bénin"
          link={{ href: "#/events", label: "Voir tout l’agenda" }}
        />
        <a href="#/events" className="event-featured">
          <div className="event-featured-media">
            <img src={events[0].img} alt="" />
            <div className="date-badge">
              <b>{events[0].day}</b>
              <span>{events[0].month}</span>
            </div>
          </div>
          <div className="event-featured-copy">
            <h3>{events[0].title}</h3>
            <p>
              {events[0].place} · {events[0].meta}
            </p>
            <span className="text-link">Voir les détails →</span>
          </div>
        </a>
        <div className="event-row">
          {events.slice(1, 4).map((e) => (
            <a href="#/events" className="event-card" key={e.id}>
              <div className="event-card-media">
                <img src={e.img} alt="" />
                <div className="date-badge small">
                  <b>{e.day}</b>
                  <span>{e.month}</span>
                </div>
              </div>
              <h4>{e.title}</h4>
              <p>
                {e.place} · {e.meta}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="section regions">
        <SectionHead
          eyebrow="LE BÉNIN EN TROIS RÉGIONS"
          title="Sud · Centre · Nord"
          center
        />
        <div className="regions-grid">
          {regions.map((r) => (
            <a href="#/places" className="region-card" key={r.id}>
              <img src={r.img} alt="" />
              <div className="region-copy">
                <span>{r.label}</span>
                <h3>{r.title}</h3>
                <p>{r.places}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section food-section">
        <SectionHead
          eyebrow="À TABLE"
          title="Foodies · Tables & saveurs"
          link={{ href: "#/food", label: "Toute la cuisine" }}
        />
        <div className="food-layout">
          <a href={`#/food/${dishes[0].slug}`} className="food-hero">
            <img src={dishes[0].img} alt="" />
            <div className="food-hero-copy">
              <span className="tag">Plat fondateur</span>
              <h3>{dishes[0].name}</h3>
              <p>{dishes[0].desc}</p>
              <span className="text-link">Découvrir →</span>
            </div>
          </a>
          <div className="food-grid">
            {dishes.slice(1).map((d) => (
              <a href={`#/food/${d.slug}`} className="food-card" key={d.id}>
                <div className="food-card-media">
                  <img src={d.img} alt="" />
                </div>
                <div className="food-card-body">
                  <small>{d.eyebrow}</small>
                  <h4>{d.name}</h4>
                  <p>{d.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section destinations">
        <SectionHead
          eyebrow="DÉCOUVRIR"
          title="Des lieux à vivre"
          link={{ href: "#/places", label: "Toutes les destinations" }}
        />
        <div className="cards-3">
          {places.slice(0, 3).map((p) => (
            <Card key={p.id} item={p} large />
          ))}
        </div>
      </section>

      <section className="knows-band">
        <div className="knows-inner">
          <span className="eyebrow">{t("baKnows")}</span>
          <h2>Conseils concrets, puis repères.</h2>
          <p className="knows-lead">
            D’abord ce qui change une journée sur place. Ensuite les principes
            qui tiennent partout.
          </p>
          <div className="knows-split">
            <div className="knows-concrete">
              <span className="knows-label">Sur le terrain</span>
              {knows
                .filter((k) => k.kind === "concrete")
                .map((k, i) => (
                  <article key={k.title} className="knows-card concrete">
                    <span className="knows-num" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{k.title}</h3>
                      <p>{k.text}</p>
                    </div>
                  </article>
                ))}
            </div>
            <div className="knows-general">
              <span className="knows-label muted">Repères</span>
              {knows
                .filter((k) => k.kind === "general")
                .map((k) => (
                  <article key={k.title} className="knows-card general">
                    <h3>{k.title}</h3>
                    <p>{k.text}</p>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="object-cta">
        <div className="object-cta-inner">
          <div>
            <span className="eyebrow">OBJET ÉDITORIAL</span>
            <h2>Une carte postale à emporter.</h2>
            <p>Galerie, votre photo, digital ou envoi physique.</p>
          </div>
          <Button as="a" href="#/postcard" variant="primary">
            Créer une carte <Arrow />
          </Button>
        </div>
      </section>

      <section className="section stories">
        <SectionHead
          eyebrow="HISTOIRES"
          title="Regarder autrement"
          link={{ href: "#/stories", label: "Toutes les histoires" }}
        />
        <div className="cards-3">
          {stories.slice(0, 3).map((s) => (
            <Card key={s.id} item={s} kind="story" />
          ))}
        </div>
      </section>

      <section className="plan-cta">
        <div className="plan-cta-inner">
          <span className="eyebrow">PLANIFIER</span>
          <h2>Passer de l’envie à l’itinéraire.</h2>
          <p>Quelques lieux, quelques tables — un séjour qui vous ressemble.</p>
          <div className="plan-cta-actions">
            <Button as="a" href="#/plan" variant="primary">
              Mon itinéraire <Arrow />
            </Button>
            <Button as="a" href="#/postcard" variant="ghost light">
              Carte postale
            </Button>
          </div>
        </div>
      </section>
    </Shell>
  );
}

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
  experiences,
  pickLang,
} from "../../data/content.js";

/**
 * Home — funnel éditorial (CPO)
 * Emotion → Confiance → Table → Conversion coffrets → Vivant → Lieux → Savoir → Histoire → Objets → Plan
 * Objectif: temps sur page + intention d’achat coffrets / itinéraire
 */
export function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const { t, lang } = useLang();
  const heroSlides = [
    {
      img: IMG.hero,
      kicker: "GANVIÉ · LAC NOKOUÉ",
      title: "La cité sur l’eau.",
      sub: "Pirogues, pilotis, marché flottant — un matin sur le lac change tout.",
    },
    {
      img: IMG.hero2,
      kicker: "OUIDAH · MÉMOIRE",
      title: "La Porte du Non-Retour.",
      sub: "Marcher la Route des Esclaves, puis regarder l’océan autrement.",
    },
    {
      img: IMG.hero3,
      kicker: "PENDJARI · NORD",
      title: "La savane qui respire.",
      sub: "Éléphants à l’aube, pistes rouges, silence entre les collines.",
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
      {/* 1. ÉMOTION */}
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
            <Button as="a" href="#/boutique" variant="ghost light">
              Coffrets
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

      {/* 2. CONFIANCE */}
      <section className="welcome">
        <div className="welcome-inner">
          <span className="eyebrow">COMMENCEZ ICI</span>
          <h2>
            Pas un catalogue.
            Un compagnon de terrain.
          </h2>
          <p>
            BONNE ASSISE choisit peu : des lieux qui restent, des tables où
            s’asseoir, des histoires qui changent le regard. Le reste, on le
            laisse de côté.
          </p>
          <div className="welcome-mosaic">
            <img src={IMG.welcome1} alt="" />
            <img src={IMG.welcome2} alt="" />
            <img src={IMG.welcome3} alt="" />
          </div>
        </div>
      </section>

      {/* 3. IDENTITÉ — LA TABLE (prépare la conversion) */}
      <section className="section food-section">
        <SectionHead
          eyebrow="À TABLE"
          title="La table comme culture"
          link={{ href: "#/food", label: "Toute la cuisine" }}
        />
        <div className="food-layout">
          <a href={`#/food/${dishes[0].slug}`} className="food-hero">
            <img src={dishes[0].img} alt="" />
            <div className="food-hero-copy">
              <span className="tag">Plat fondateur</span>
              <h3>{pickLang(dishes[0], "name", lang)}</h3>
              <p>{pickLang(dishes[0], "desc", lang)}</p>
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
                  <small>{pickLang(d, "eyebrow", lang)}</small>
                  <h4>{pickLang(d, "name", lang)}</h4>
                  <p>{pickLang(d, "desc", lang)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CONVERSION — COFFRETS (chaud après la table) */}
      <section className="section experiences-section">
        <SectionHead
          eyebrow="S’ASSEOIR AUTREMENT"
          title="Cinq coffrets pour prendre place"
          link={{ href: "#/boutique", label: "Voir les coffrets" }}
        />
        <p className="experiences-lead">
          À réserver avant le départ : table, producteur, lac. Même exigence
          éditoriale que le guide.
        </p>

        {/* Featured = signature pack */}
        <a href="#/boutique" className="experience-featured">
          <div className="experience-featured-media">
            <img src={experiences[0].img} alt="" />
          </div>
          <div className="experience-featured-copy">
            <small>{pickLang(experiences[0], "eyebrow", lang)}</small>
            <h3>{pickLang(experiences[0], "name", lang)}</h3>
            <p className="experience-featured-tagline">
              {pickLang(experiences[0], "tagline", lang)}
            </p>
            <p className="experience-featured-desc">
              {pickLang(experiences[0], "desc", lang)}
            </p>
            <div className="experience-meta">
              <span>{experiences[0].duration}</span>
              <span className="experience-price">
                dès {experiences[0].priceFrom}
              </span>
            </div>
            <span className="text-link">Réserver le pack →</span>
          </div>
        </a>

        <div className="experiences-grid experiences-grid--4">
          {experiences.slice(1).map((x) => (
            <a href="#/boutique" className="experience-card" key={x.id}>
              <div className="experience-card-media">
                <img
                  src={x.img}
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = IMG.hero;
                  }}
                />
              </div>
              <div className="experience-card-body">
                <small>{pickLang(x, "eyebrow", lang)}</small>
                <h3>{pickLang(x, "name", lang)}</h3>
                <p>{pickLang(x, "tagline", lang)}</p>
                <div className="experience-meta">
                  <span>{x.duration}</span>
                  <span className="experience-price">dès {x.priceFrom}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="experiences-cta-row">
          <Button as="a" href="#/boutique" variant="primary">
            Voir tous les coffrets <Arrow />
          </Button>
        </div>
      </section>

      {/* 5. VIVANT — AGENDA */}
      <section className="section agenda">
        <SectionHead
          eyebrow="CE QUI SE PASSE"
          title="L’énergie du moment"
          link={{ href: "#/events", label: "Tout l’agenda" }}
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

      {/* 6. LIEUX — sélection courte */}
      <section className="section destinations">
        <SectionHead
          eyebrow="SÉLECTION"
          title="Des lieux à vivre"
          link={{ href: "#/places", label: "Tous les lieux" }}
        />
        <div className="cards-3">
          {places.slice(0, 3).map((p) => (
            <Card key={p.id} item={p} large />
          ))}
        </div>
      </section>

      {/* 7. TERRITOIRE — respiration */}
      <section className="section regions">
        <SectionHead
          eyebrow="TERRITOIRE"
          title="Trois manières d’habiter le Bénin"
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

      {/* 8. SAVOIR — rétention */}
      <section className="knows-band">
        <div className="knows-inner">
          <span className="eyebrow">{t("baKnows")}</span>
          <h2>D’abord le concret. Ensuite les repères.</h2>
          <p className="knows-lead">
            Trois gestes qui changent une journée sur place — puis trois
            attitudes qui tiennent partout au Bénin.
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

      {/* 9. HISTOIRE — profondeur */}
      <section className="section stories">
        <SectionHead
          eyebrow="COMPRENDRE"
          title="Une histoire pour changer le regard"
          link={{ href: "#/stories", label: "Toutes les histoires" }}
        />
        <div className="cards-3">
          {stories.slice(0, 3).map((s) => (
            <Card key={s.id} item={s} kind="story" />
          ))}
        </div>
      </section>

      {/* 10. OBJET secondaire */}
      <section className="object-cta">
        <div className="object-cta-inner">
          <div>
            <span className="eyebrow">OBJET ÉDITORIAL</span>
            <h2>Une carte postale à emporter.</h2>
            <p>Une image, un verso, un souvenir — digital ou imprimé.</p>
          </div>
          <Button as="a" href="#/postcard" variant="primary">
            Créer une carte <Arrow />
          </Button>
        </div>
      </section>

      {/* 11. CLOSE — plan + rappel coffrets */}
      <section className="plan-cta">
        <div className="plan-cta-inner">
          <span className="eyebrow">PRENDRE PLACE</span>
          <h2>De l’envie à l’itinéraire.</h2>
          <p>
            Composez votre séjour — puis réservez un coffret pour les premiers
            soirs et les gestes qui comptent.
          </p>
          <div className="plan-cta-actions">
            <Button as="a" href="#/plan" variant="primary">
              Mon itinéraire <Arrow />
            </Button>
            <Button as="a" href="#/boutique" variant="ghost light">
              Coffrets
            </Button>
          </div>
        </div>
      </section>
    </Shell>
  );
}

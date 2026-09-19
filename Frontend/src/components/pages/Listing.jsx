import React from "react";
import { Shell } from "../layout/Shell.jsx";
import { PageHero } from "../ui/PageHero.jsx";
import { SectionHead } from "../ui/SectionHead.jsx";
import { Card } from "../ui/Card.jsx";
import { useLang } from "../context/LangContext.jsx";
import { IMG, places, dishes, events, stories } from "../../data/content.js";
import { PlanPage } from "./Plan.jsx";

export function Listing({ type }) {
  const { t } = useLang();

  if (type === "plan") return <PlanPage />;

  if (type === "places") {
    return (
      <Shell>
        <PageHero
          kicker="DÉCOUVRIR"
          title="Des lieux à vivre au Bénin."
          text="Une sélection courte pour commencer."
          img={IMG.cotonou}
          cta={{ href: "#/plan", label: t("myItinerary") }}
        />
        <section className="section">
          <SectionHead eyebrow="DESTINATIONS" title="Où aller" />
          <div className="cards-3">
            {places.map((p) => (
              <Card key={p.id} item={p} />
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  if (type === "food") {
    return (
      <Shell>
        <PageHero
          kicker="À TABLE"
          title="Le Bénin dans l’assiette."
          text="Quatre plats pour entrer dans la cuisine locale."
          img={IMG.streetfood}
        />
        <section className="section food-listing">
          <div className="food-list-grid">
            {dishes.map((d) => (
              <a href={`#/food/${d.slug}`} className="food-list-card" key={d.id}>
                <div className="food-list-media">
                  <img src={d.img} alt="" />
                </div>
                <div className="food-list-body">
                  <small>{d.eyebrow}</small>
                  <h3>{d.name}</h3>
                  <p>{d.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  if (type === "events") {
    return (
      <Shell>
        <PageHero
          kicker="AGENDA"
          title="Ce qui se passe."
          text="Festivals et rendez-vous marquants."
          img={IMG.ouidah}
        />
        <section className="section">
          <div className="event-row">
            {events.map((e) => (
              <article className="event-card" key={e.id}>
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
              </article>
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  if (type === "stories") {
    return (
      <Shell>
        <PageHero
          kicker="HISTOIRES"
          title="Regarder autrement."
          text="Des récits courts pour le contexte."
          img={IMG.hero}
        />
        <section className="section">
          <div className="cards-3">
            {stories.map((s) => (
              <Card key={s.id} item={s} kind="story" />
            ))}
          </div>
        </section>
      </Shell>
    );
  }

  return null;
}

import React from "react";
import { Shell } from "../layout/Shell.jsx";
import { PageHero } from "../ui/PageHero.jsx";
import { SectionHead } from "../ui/SectionHead.jsx";
import { Card } from "../ui/Card.jsx";
import { MapEmbed } from "../ui/MapEmbed.jsx";
import { Button, Arrow } from "../ui/Button.jsx";
import { useLang } from "../context/LangContext.jsx";
import { useItinerary } from "../context/ItineraryContext.jsx";
import {
  getPlace,
  getDish,
  places,
  dishes,
  stories,
  knows,
  resolveRelated,
} from "../../data/content.js";
import { Listing } from "./Listing.jsx";

function ItineraryButton({ kind, slug, name, img }) {
  const { t } = useLang();
  const { has, add, remove } = useItinerary();
  const saved = has(kind, slug);
  return (
    <Button
      variant={saved ? "ghost light" : "primary"}
      className="itin-btn"
      onClick={() =>
        saved ? remove(kind, slug) : add({ kind, slug, name, img })
      }
    >
      {saved ? t("removeItinerary") : t("addItinerary")}
    </Button>
  );
}

export function Detail({ kind, slug }) {
  const { t } = useLang();
  const isDish = kind === "dish";
  const item = isDish ? getDish(slug) : getPlace(slug);
  if (!item) return <Listing type={isDish ? "food" : "places"} />;

  const relatedPlaces = resolveRelated(item.relatedPlaces, places);
  const relatedDishes = resolveRelated(item.relatedDishes, dishes);
  const relatedStories = resolveRelated(item.relatedStories, stories);
  const mapQuery = isDish
    ? `${item.whereToTry || "Cotonou"}, Benin`
    : `${item.name}, Benin`;

  return (
    <Shell>
      <PageHero
        kicker={isDish ? "À TABLE" : item.eyebrow}
        title={isDish ? item.name : item.title}
        text={item.desc}
        img={item.img}
        actions={
          <ItineraryButton
            kind={isDish ? "dish" : "place"}
            slug={item.slug}
            name={item.name || item.title}
            img={item.img}
          />
        }
      />

      <section className="detail-practical">
        <div className="detail-practical-inner">
          {!isDish && item.bestTime && (
            <div>
              <small>{t("bestMoment")}</small>
              <p>{item.bestTime}</p>
            </div>
          )}
          {!isDish && item.duration && (
            <div>
              <small>{t("duration")}</small>
              <p>{item.duration}</p>
            </div>
          )}
          {!isDish && item.howToGet && (
            <div className="span-2">
              <small>{t("howToGet")}</small>
              <p>{item.howToGet}</p>
            </div>
          )}
          {isDish && item.whereToTry && (
            <div className="span-2">
              <small>{t("whereToTry")}</small>
              <p>{item.whereToTry}</p>
            </div>
          )}
        </div>
      </section>

      <section className="detail-body rich section">
        <div className="detail-main">
          {(item.body || []).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          {item.highlights && (
            <>
              <h3 className="detail-block-title">{t("highlights")}</h3>
              <div className="highlights-grid">
                {item.highlights.map((h) => (
                  <div key={h.title}>
                    <b>{h.title}</b>
                    <p>{h.text}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          {item.tips && (
            <>
              <h3 className="detail-block-title">{t("tips")}</h3>
              <ul className="tips-list">
                {item.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </>
          )}
          {item.gallery && item.gallery.length > 0 && (
            <>
              <h3 className="detail-block-title">{t("gallery")}</h3>
              <div className="gallery-grid">
                {item.gallery.map((src, i) => (
                  <img key={i} src={src} alt="" loading="lazy" />
                ))}
              </div>
            </>
          )}
          <h3 className="detail-block-title">Carte</h3>
          <MapEmbed query={mapQuery} title={`Carte — ${item.name}`} />
        </div>
      </section>

      {(relatedPlaces.length > 0 ||
        relatedDishes.length > 0 ||
        relatedStories.length > 0) && (
        <section className="section related-section">
          <SectionHead eyebrow="CONTINUER" title="Dans le même esprit" />
          <div className="cards-3">
            {relatedPlaces.map((p) => (
              <Card key={p.id} item={p} />
            ))}
            {relatedDishes.map((d) => (
              <Card key={d.id} item={d} kind="dish" />
            ))}
            {relatedStories.map((s) => (
              <Card key={s.id} item={s} kind="story" />
            ))}
          </div>
        </section>
      )}

      <section className="knows-band compact">
        <div className="knows-inner">
          <span className="eyebrow">{t("baKnows")}</span>
          <h2>Avant de partir.</h2>
          <div className="knows-split compact-split">
            {knows
              .filter((k) => k.kind === "concrete")
              .map((k) => (
                <article key={k.title} className="knows-card concrete">
                  <h3>{k.title}</h3>
                  <p>{k.text}</p>
                </article>
              ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}

import React from "react";
import { Shell } from "../layout/Shell.jsx";
import { PageHero } from "../ui/PageHero.jsx";
import { Button, Arrow } from "../ui/Button.jsx";
import { useItinerary } from "../context/ItineraryContext.jsx";
import { useLang } from "../context/LangContext.jsx";
import { IMG } from "../../data/content.js";

export function PlanPage() {
  const { items, remove, clear } = useItinerary();
  const { t } = useLang();

  return (
    <Shell>
      <PageHero
        kicker="PLANIFIER"
        title="Mon itinéraire"
        text="Vos lieux et tables sélectionnés — un point de départ."
        img={IMG.hero2}
      />
      <section className="section">
        {items.length === 0 ? (
          <div className="empty-itin">
            <p>{t("emptyItinerary")}</p>
            <Button as="a" href="#/places" variant="primary">
              {t("continueExplore")} <Arrow />
            </Button>
          </div>
        ) : (
          <>
            <div className="itin-list">
              {items.map((it) => (
                <div className="itin-item" key={`${it.kind}-${it.slug}`}>
                  <a
                    className="itin-item-link"
                    href={
                      it.kind === "dish"
                        ? `#/food/${it.slug}`
                        : `#/places/${it.slug}`
                    }
                  >
                    {it.img && <img src={it.img} alt="" />}
                    <div>
                      <small>{it.kind}</small>
                      <strong>{it.name}</strong>
                    </div>
                  </a>
                  <button
                    type="button"
                    className="itin-remove"
                    onClick={() => remove(it.kind, it.slug)}
                    aria-label="Retirer"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <div className="plan-cta-actions" style={{ marginTop: 24 }}>
              <Button variant="ghost" onClick={clear}>
                {t("clearItinerary")}
              </Button>
              <Button as="a" href="#/postcard" variant="primary">
                Carte postale <Arrow />
              </Button>
            </div>
          </>
        )}
      </section>
    </Shell>
  );
}

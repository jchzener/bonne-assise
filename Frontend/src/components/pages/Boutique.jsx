import React from "react";
import { Shell } from "../layout/Shell.jsx";
import { PageHero } from "../ui/PageHero.jsx";
import { SectionHead } from "../ui/SectionHead.jsx";
import { Button, Arrow } from "../ui/Button.jsx";
import { POSTCARD_OFFERS } from "../postcard/PostcardStudio.jsx";
import { IMG, experiences } from "../../data/content.js";

const INTEREST_MAIL =
  "mailto:experiences@bonne-assise.bj?subject=Intérêt%20coffret%20BONNE%20ASSISE";

export function BoutiquePage() {
  return (
    <Shell>
      <PageHero
        kicker="BOUTIQUE"
        title="Objets et coffrets"
        text="Cartes postales, puis expériences à réserver avant le départ — hospitalité éditoriale, pas catalogue d’activités."
        img={IMG.plan || IMG.hero}
      />

      <section className="section">
        <SectionHead
          eyebrow="COFFRETS SIGNATURES"
          title="S’asseoir autrement"
        />
        <p className="experiences-lead">
          Cinq formats choisis pour le voyageur qui prépare son séjour. Phase
          d’ouverture : manifestez votre intérêt — nous confirmons les dates
          et les hôtes.
        </p>
        <div className="experiences-grid experiences-grid--boutique">
          {experiences.map((x) => (
            <article className="experience-card experience-card--full" key={x.id}>
              <div className="experience-card-media">
                <img src={x.img} alt="" />
              </div>
              <div className="experience-card-body">
                <small>{x.eyebrow}</small>
                <h3>{x.name}</h3>
                <p className="experience-tagline">{x.tagline}</p>
                <p>{x.desc}</p>
                <ul className="experience-includes">
                  {x.includes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="experience-meta">
                  <span>{x.duration} · {x.group}</span>
                  <span className="experience-price">
                    dès {x.priceFrom}
                    <small> {x.priceNote}</small>
                  </span>
                </div>
                <Button
                  as="a"
                  href={`${INTEREST_MAIL}&body=${encodeURIComponent(
                    `Bonjour,\n\nJe suis intéressé·e par le coffret « ${x.name} ».\nDates envisagées : \nNombre de personnes : \n\n`
                  )}`}
                  variant="primary"
                >
                  Manifestez votre intérêt <Arrow />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section boutique-grid">
        <SectionHead eyebrow="CARTES POSTALES" title="Objets éditoriaux" />
        <article className="boutique-card">
          <img src={IMG.hero2} alt="" />
          <div>
            <span className="eyebrow">DIGITAL</span>
            <h3>Carte HD sans signature</h3>
            <p>
              {POSTCARD_OFFERS.digital.price} XOF · licence personnelle · PNG
              print-ready
            </p>
            <Button as="a" href="#/postcard" variant="primary">
              Composer <Arrow />
            </Button>
          </div>
        </article>
        <article className="boutique-card">
          <img src={IMG.porto} alt="" />
          <div>
            <span className="eyebrow">PHYSIQUE</span>
            <h3>Carte A6 envoyée</h3>
            <p>
              {POSTCARD_OFFERS.physical.price} XOF · impression + port (Bénin &
              international — tarifs à confirmer)
            </p>
            <Button as="a" href="#/postcard" variant="primary">
              Commander <Arrow />
            </Button>
          </div>
        </article>
        <article className="boutique-card creator">
          <div>
            <span className="eyebrow">CRÉATEURS</span>
            <h3>Partage de revenus</h3>
            <p>
              Uploadez votre photo dans le studio. Si elle se vend :{" "}
              <strong>70&nbsp;% créateur / 30&nbsp;% plateforme</strong> sur le
              digital.
            </p>
            <Button as="a" href="#/postcard" variant="ghost">
              Devenir créateur <Arrow />
            </Button>
          </div>
        </article>
      </section>

      <section className="section">
        <p className="boutique-note">
          Réservation en ligne et paiement (FedaPay / Mobile Money / carte) :
          phase 2 backend. Aujourd’hui : manifeste d’intérêt par e-mail pour
          caler hôtes et dates.
        </p>
      </section>
    </Shell>
  );
}

import React from "react";
import { Shell } from "../layout/Shell.jsx";
import { PageHero } from "../ui/PageHero.jsx";
import { Button, Arrow } from "../ui/Button.jsx";
import { POSTCARD_OFFERS } from "../postcard/PostcardStudio.jsx";
import { IMG } from "../../data/content.js";

export function BoutiquePage() {
  return (
    <Shell>
      <PageHero
        kicker="BOUTIQUE"
        title="Objets éditoriaux"
        text="Cartes postales digitales et physiques — sélection BONNE ASSISE et créateurs."
        img={IMG.hero}
      />
      <section className="section boutique-grid">
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
              digital. Sur le physique, partage sur la marge après coûts
              d’impression et d’envoi.
            </p>
            <Button as="a" href="#/postcard" variant="ghost">
              Devenir créateur <Arrow />
            </Button>
          </div>
        </article>
      </section>
      <section className="section">
        <p className="boutique-note">
          Paiement : intégration FedaPay / Mobile Money / carte à brancher. La
          démo simule le checkout digital.
        </p>
      </section>
    </Shell>
  );
}

import { Logo } from "./Logo.jsx";
import { Arrow } from "../ui/Button.jsx";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>
            Lieux, tables et histoires pour découvrir le Bénin autrement. Une
            sélection attentive, ancrée dans le terrain.
          </p>
          <span className="footer-tag">Guide vivant</span>
        </div>
        <div className="footer-col">
          <span>Explorer</span>
          <a href="#/places">Destinations</a>
          <a href="#/food">À table</a>
          <a href="#/events">Agenda</a>
          <a href="#/stories">Histoires</a>
        </div>
        <div className="footer-col">
          <span>Préparer</span>
          <a href="#/plan">Itinéraires</a>
          <a href="#/search">Rechercher</a>
          <a href="#/postcard">Carte postale</a>
          <a href="#/boutique">Boutique</a>
        </div>
        <div className="footer-col">
          <span>BONNE ASSISE</span>
          <a href="#/edit">Éditer (CMS)</a>
          <a href="https://benin.bj" target="_blank" rel="noopener noreferrer">
            benin.bj
          </a>
          <a
            href="https://benin.bj/ressources"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ressources
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} BONNE ASSISE</span>
        <div className="footer-bottom-links">
          <a href="#/">Mentions légales</a>
          <a href="#/">Confidentialité</a>
          <span>FR · EN</span>
        </div>
      </div>
    </footer>
  );
}

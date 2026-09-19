import { Logo } from "./Logo.jsx";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo />
          <p className="footer-voice">Le Bénin, à vivre autrement.</p>
        </div>

        <div className="footer-col">
          <span>Explorer</span>
          <a href="#/places">Lieux</a>
          <a href="#/food">À table</a>
          <a href="#/events">Agenda</a>
          <a href="#/stories">Histoires</a>
        </div>

        <div className="footer-col">
          <span>Préparer</span>
          <a href="#/plan">Itinéraire</a>
          <a href="#/postcard">Carte postale</a>
          <a href="#/boutique">Boutique</a>
          <a href="#/search">Rechercher</a>
        </div>

        <div className="footer-col">
          <span>À propos</span>
          <a href="#/">Notre méthode</a>
          <a href="https://benin.bj" target="_blank" rel="noopener noreferrer">
            benin.bj
          </a>
          <a
            href="https://benin.bj/ressources"
            target="_blank"
            rel="noopener noreferrer"
          >
            Médias
          </a>
          <a href="#/edit">Édition</a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} BONNE ASSISE</span>
        <div className="footer-bottom-links">
          <span>FR</span>
          <span className="footer-dot" aria-hidden>
            ·
          </span>
          <span>EN</span>
        </div>
      </div>
    </footer>
  );
}

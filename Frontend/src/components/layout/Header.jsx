import React, { useEffect, useState } from "react";
import { Logo } from "./Logo.jsx";
import { useLang } from "../context/LangContext.jsx";
import { useItinerary } from "../context/ItineraryContext.jsx";

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { count } = useItinerary();

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />

        <nav className={open ? "open" : ""} aria-label="Navigation principale">
          <div className="nav-primary">
            <a href="#/places" onClick={close}>
              {t("navDiscover")}
            </a>
            <a href="#/food" onClick={close}>
              {t("navFood")}
            </a>
            <a href="#/events" onClick={close}>
              {t("navAgenda")}
            </a>
            <a href="#/stories" onClick={close}>
              {t("navStories")}
            </a>
          </div>
          <div className="nav-secondary">
            <a href="#/plan" onClick={close}>
              {t("navPlan")}
            </a>
            <a href="#/postcard" onClick={close}>
              {t("navPostcard")}
            </a>
            <a href="#/search" onClick={close} className="nav-search-mobile">
              {t("search")}
            </a>
          </div>
        </nav>

        <div className="header-tools">
          <a
            href="#/search"
            className="search-link"
            aria-label={t("search")}
            title={t("search")}
          >
            <span aria-hidden>⌕</span>
          </a>
          <a
            href="#/plan"
            className="itin-badge"
            title={t("myItinerary")}
            aria-label={t("myItinerary")}
          >
            <span className="itin-icon" aria-hidden>
              ◉
            </span>
            <span className="itin-label">{t("myItinerary")}</span>
            {count > 0 && <span className="itin-count">{count}</span>}
          </a>
          <button
            type="button"
            className="lang"
            onClick={() => setLang(lang === "FR" ? "EN" : "FR")}
            aria-label="Language"
          >
            {lang}
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <button
          type="button"
          className="nav-backdrop"
          aria-label="Fermer"
          onClick={close}
        />
      )}
    </header>
  );
}

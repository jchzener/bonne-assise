import React, { useState } from "react";
import { Logo } from "./Logo.jsx";
import { useLang } from "../context/LangContext.jsx";
import { useItinerary } from "../context/ItineraryContext.jsx";

export function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const { count } = useItinerary();

  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className={open ? "open" : ""} aria-label="Navigation principale">
          <a href="#/places" onClick={() => setOpen(false)}>
            {t("navDiscover")}
          </a>
          <a href="#/food" onClick={() => setOpen(false)}>
            {t("navFood")}
          </a>
          <a href="#/events" onClick={() => setOpen(false)}>
            {t("navAgenda")}
          </a>
          <a href="#/plan" onClick={() => setOpen(false)}>
            {t("navPlan")}
          </a>
        </nav>
        <div className="header-tools">
          <a
            href="#/plan"
            className="itin-badge"
            title={t("myItinerary")}
            aria-label={t("myItinerary")}
          >
            <span className="itin-label">{t("myItinerary")}</span>
            {count > 0 && <span className="itin-count">{count}</span>}
          </a>
          <a href="#/search" className="search-link">
            {t("search")} <span>⌕</span>
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
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}

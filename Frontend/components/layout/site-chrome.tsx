"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Page, Locale } from "../../lib/types";
import { Icon, Button, Link, ExternalLink } from "../ui/primitives";
import { getMessages } from "../../lib/i18n/messages";

export function Header({ page, locale = "en" }: { page: Page; locale?: "en" | "fr" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || `/${locale}`;
  const t = getMessages(locale);
  const close = () => setOpen(false);
  const isHome = page === "home" || pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Transparent + white over hero; BA blue identity when sticky / open / non-home
  const onHero = isHome && !scrolled && !open;
  const headerClass = [
    "header",
    "site-header",
    onHero ? "site-header--on-hero" : "site-header--identity",
    scrolled ? "is-scrolled" : "",
    open ? "is-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const otherLocale = locale === "fr" ? "en" : "fr";
  const langHref = `/${otherLocale}${pathname.replace(/^\/(en|fr)/, "") || ""}`;

  return (
    <header className={headerClass}>
      <Button
        variant="icon"
        className="menu-button"
        ariaLabel={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        <Icon name={open ? "close" : "menu"} size={22} />
      </Button>

      <nav className={`nav ${open ? "nav-open" : ""}`} aria-label="Main navigation">
        <Link to="place" onClick={close}>
          {t.nav.places}
        </Link>
        <Link to="food" onClick={close}>
          {t.nav.food}
        </Link>
        <Link to="experience" onClick={close}>
          {t.nav.experiences}
        </Link>
        <Link to="story" onClick={close}>
          {t.nav.stories}
        </Link>
      </nav>

      <Link to="home" className="logo" onClick={close} aria-label="Bonne Assise">
        <span className="logo-line">BONNE</span>
        <span className="logo-line">ASSISE</span>
      </Link>

      <div className="utilities">
        <Link to="explore" ariaLabel={t.nav.search} className="util-link">
          <Icon name="search" size={18} />
        </Link>
        <Link to="saved" ariaLabel={t.nav.saved} className="util-link">
          <Icon name="heart" size={18} />
        </Link>
        <a className="lang" href={langHref} lang={otherLocale} aria-label={t.nav.switchLanguage}>
          {otherLocale === "fr" ? "FR" : "EN"}
        </a>
        <Button variant="icon" className="util-link util-user" ariaLabel="Account">
          <Icon name="user" size={18} />
        </Button>
      </div>
    </header>
  );
}

export function Footer({ locale = "en" }: { locale?: "en" | "fr" }) {
  const t = getMessages(locale);
  const tagline =
    locale === "fr" ? "Vivre local au Bénin." : "Get local in Benin.";
  const about =
    locale === "fr"
      ? "Bonne Assise est un guide éditorial pour découvrir le Bénin de l’intérieur : marchés, tables, gens, routes et récits. Pas une liste d’adresses — une façon d’entrer dans le pays."
      : "Bonne Assise is an editorial guide to experiencing Benin from the inside: markets, tables, people, routes and stories. Not a list of addresses — a way into the country.";
  const exploreLabel = locale === "fr" ? "Explorer" : "Explore";
  const companyLabel = locale === "fr" ? "Bonne Assise" : "Bonne Assise";

  return (
    <footer className="footer footer--balanced">
      <div className="footer-top">
        <div className="footer-intro">
          <p className="footer-brand-name">Bonne Assise</p>
          <p className="footer-desc">{about}</p>
          <p className="footer-desc footer-desc--short">{t.footer.description}</p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <div className="footer-nav-col">
            <span className="footer-nav-label">{exploreLabel}</span>
            <Link to="place">{t.nav.places}</Link>
            <Link to="food">{t.nav.food}</Link>
            <Link to="experience">{t.nav.experiences}</Link>
            <Link to="story">{t.nav.stories}</Link>
            <Link to="explore">{t.nav.explore}</Link>
          </div>
          <div className="footer-nav-col">
            <span className="footer-nav-label">{companyLabel}</span>
            <Link to="trip">{t.footer.plan}</Link>
            <Link to="saved">{t.footer.savedPlaces}</Link>
            <ExternalLink href="mailto:hello@bonneassise.bj">{t.footer.contact}</ExternalLink>
          </div>
        </nav>
      </div>

      <p className="footer-tagline">{tagline}</p>

      <div className="footer-brand">
        <p className="footer-word-bleed" aria-hidden="true">
          Bonne&nbsp;Assise
        </p>
        <span className="sr-only">Bonne Assise</span>
      </div>
    </footer>
  );
}

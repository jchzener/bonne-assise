"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { type HomeResponse } from "@/lib/api";
import { type Locale, ui } from "@/lib/i18n";

const navItems = (copy: typeof ui.en) => [
  { id: "discover", label: copy.discover },
  { id: "places", label: copy.regions },
  { id: "prendre-place", label: copy.experiences },
  { id: "stories", label: copy.stories },
  { id: "journey", label: copy.journey },
];

export default function HomeExperience({
  data,
  locale,
}: {
  data: HomeResponse;
  locale: Locale;
}) {
  const copy = ui[locale];
  const links = navItems(copy);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("discover");
  const { scrollY, scrollYProgress } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 90],
    ["rgba(18,24,20,0)", "rgba(248,246,239,.94)"],
  );
  const navColor = useTransform(scrollY, [0, 90], ["#fff", "#172019"]);
  const navShadow = useTransform(
    scrollY,
    [0, 120],
    ["0 0 0 rgba(0,0,0,0)", "0 12px 40px rgba(15,25,19,.07)"],
  );
  const heroScale = useTransform(scrollY, [0, 900], [1, 1.08]);
  const heroY = useTransform(scrollY, [0, 900], ["0%", "12%"]);
  const heroOpacity = useTransform(scrollY, [0, 650], [1, 0.55]);

  useEffect(() => {
    const sections = links
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [links]);

  const selectedInterestData = useMemo(
    () =>
      selectedInterest
        ? data.discovery.find((item) => item.id === selectedInterest)
        : null,
    [data.discovery, selectedInterest],
  );

  return (
    <main className="site-shell">
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.header
        className="site-nav"
        style={{
          backgroundColor: navBg,
          color: navColor,
          boxShadow: navShadow,
        }}
      >
        <a className="wordmark" href="#top" aria-label="Bonne Assise home">
          BONNE
          <br />
          ASSISE
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((item) => (
            <a
              key={item.id}
              className={activeSection === item.id ? "active" : ""}
              href={`#${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="language-switch" aria-label="Language">
            <a className={locale === "en" ? "active" : ""} href="/en">
              EN
            </a>
            <span>/</span>
            <a className={locale === "fr" ? "active" : ""} href="/fr">
              FR
            </a>
          </div>
          <button
            className="ghost-button search-button"
            aria-label={copy.search}
          >
            <span aria-hidden="true" />
          </button>
          <button
            className={`menu-button ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mobile-menu-meta">
              BENIN · WEST AFRICA <span>MENU</span>
            </div>
            <div className="mobile-menu-links">
              {links.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </motion.a>
              ))}
            </div>
            <p className="mobile-menu-note">
              A destination platform built around places, people and stories.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero" id="top">
        <motion.div
          className="hero-media"
          style={{
            scale: heroScale,
            y: heroY,
            opacity: heroOpacity,
            backgroundImage: `url(${data.hero.image})`,
          }}
        />
        <div className="hero-grain" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {data.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.8 }}
          >
            {data.hero.title}
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {data.hero.subtitle}
          </motion.p>
          <motion.a
            className="circle-cta"
            href="#discover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            {copy.explore}
            <span>↘</span>
          </motion.a>
        </div>
        <div className="hero-side-note">
          <span>06°22′N</span>
          <span>02°21′E</span>
        </div>
        <div className="hero-bottom">
          <span>01</span>
          <span>Scroll to enter</span>
          <span className="line" />
        </div>
      </section>

      <section className="section discovery" id="discover">
        <div className="section-intro reveal-grid">
          <p className="eyebrow dark">FIND YOUR BENIN</p>
          <h2>
            {locale === "fr" ? "Commencez par ce qui" : "Start with what"}
            <br />
            <em>{locale === "fr" ? "vous attire." : "moves you."}</em>
          </h2>
          <p className="lede">
            {locale === "fr"
              ? "Vous n’avez pas besoin de savoir où aller. Dites-nous ce qui vous attire, nous ouvrirons les bonnes portes."
              : "You don't need to know where to go. Tell us what you want to feel, and we'll open the right doors."}
          </p>
        </div>
        <div
          className="interest-grid"
          role="list"
          aria-label={copy.chooseInterest}
        >
          {data.discovery.map((item) => {
            const active = selectedInterest === item.id;
            return (
              <motion.button
                key={item.id}
                className={`interest-card ${active ? "active" : ""}`}
                onClick={() => setSelectedInterest(item.id)}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.985 }}
                role="listitem"
                aria-pressed={active}
              >
                <div
                  className="interest-image"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.04), rgba(0,0,0,.62)), url(${item.image})`,
                  }}
                />
                <div className="interest-copy">
                  <strong>{item.label}</strong>
                  <p>{item.description}</p>
                  <i aria-hidden="true">
                    Explore <b>↗</b>
                  </i>
                </div>
              </motion.button>
            );
          })}
        </div>
        <motion.div
          className="preference-result"
          key={selectedInterest}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span>{copy.yourSignal}</span>
          <strong>{selectedInterestData?.label ?? copy.chooseInterest}</strong>
          <p>
            {selectedInterestData?.description ??
              (locale === "fr"
                ? "Sélectionnez un univers ci-dessus. Votre choix guidera ensuite les lieux, expériences et idées de voyage que nous vous proposerons."
                : "Select an interest above. Your choice will later shape the places, experiences and journey we recommend.")}
          </p>
          <span className="signal-arrow" aria-hidden="true">
            ↗
          </span>
        </motion.div>
      </section>

      <section className="regions-section" id="places">
        <div className="regions-intro">
          <div>
            <p className="eyebrow dark">{copy.regionsEyebrow}</p>
            <h2>
              {copy.regionsTitle}
              <br />
              <em>{copy.regionsTitle2}</em>
            </h2>
          </div>
          <p className="lede">{copy.regionsLede}</p>
        </div>

        <div
          className="region-atlas"
          role="list"
          aria-label="Explore Benin by region"
        >
          <a className="region-feature" href="#prendre-place" role="listitem">
            <div
              className="region-image"
              style={{ backgroundImage: `url(${data.regions[0].image})` }}
            />
            <div className="region-overlay" />
            <div className="region-content">
              <p className="eyebrow">01 · {data.regions[0].kicker}</p>
              <h3>{data.regions[0].title}</h3>
              <p>{data.regions[0].description}</p>
              <span className="region-destinations">
                {data.regions[0].destinations.join(" · ")}
              </span>
              <span className="region-link">
                {copy.explore} {data.regions[0].title} <span>↗</span>
              </span>
            </div>
          </a>

          <div className="region-secondary">
            {data.regions.slice(1).map((region, index) => (
              <a
                className="region-card"
                href="#prendre-place"
                role="listitem"
                key={region.id}
              >
                <div
                  className="region-image"
                  style={{ backgroundImage: `url(${region.image})` }}
                />
                <div className="region-overlay" />
                <div className="region-content">
                  <p className="eyebrow">
                    0{index + 2} · {region.kicker}
                  </p>
                  <h3>{region.title}</h3>
                  <p>{region.description}</p>
                  <span className="region-destinations">
                    {region.destinations.join(" · ")}
                  </span>
                  <span className="region-link">
                    {copy.explore} <span>↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="region-thread" aria-hidden="true">
          <span />
          <i />
          <span />
        </div>
      </section>

      <section className="section prendre-place" id="prendre-place">
        <div className="split-heading">
          <div>
            <p className="eyebrow dark">{copy.prendreeyebrow}</p>
            <h2>
              {copy.prendreTitle}
              <br />
              <em>{copy.prendreTitle2}</em>
            </h2>
          </div>
          <p className="lede">{copy.prendreLede}</p>
        </div>
        <div
          className="product-grid"
          role="list"
          aria-label={copy.prendreeyebrow}
        >
          {data.prendrePlace.map((product, i) => (
            <motion.article
              key={product.id}
              className="product-card"
              role="listitem"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.65, delay: i * 0.06 }}
            >
              <a
                className="product-media"
                href={product.href}
                aria-label={`${copy.exploreExperience}: ${product.title}`}
              >
                <div
                  className="product-image"
                  style={{ backgroundImage: `url(${product.image})` }}
                />
                <div className="product-index">0{i + 1}</div>
                <div className="product-arrow">↗</div>
              </a>
              <div className="product-copy">
                <p className="eyebrow dark">{product.name}</p>
                <h3>{product.title}</h3>
                <p>{product.promise}</p>
                <div className="product-meta">
                  <span>{product.place}</span>
                  <span>{product.duration}</span>
                </div>
                <a className="text-link" href={product.href}>
                  {copy.exploreExperience} <span>↗</span>
                </a>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="product-signature">
          <span>{copy.experienceNote}</span>
          <span>Prendre Place →</span>
        </div>
      </section>

      <section className="stories-section" id="stories">
        <div className="stories-head">
          <p>{copy.fieldNote}</p>
          <div>
            <p className="eyebrow">FIELD NOTES</p>
            <h2>
              Stories that
              <br />
              <em>open doors.</em>
            </h2>
          </div>
        </div>
        <div className="stories-grid">
          {data.stories.map((story, i) => (
            <motion.article
              key={story.id}
              className={`story story-${i + 1}`}
              whileHover={{ y: -6 }}
            >
              <div
                className="story-image"
                style={{ backgroundImage: `url(${story.image})` }}
              />
              <div className="story-copy">
                <p className="eyebrow">
                  {story.eyebrow} · {story.place}
                </p>
                <h3>{story.title}</h3>
                <p>{story.description}</p>
                <button className="text-link light">
                  Read story <span>↗</span>
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-bg" />
        <div className="journey-grid-lines" />
        <div className="journey-content">
          <p className="eyebrow">YOUR JOURNEY</p>
          <h2>
            {copy.journeyTitle1}
            <br />
            <em>{copy.journeyTitle2}</em>
            <br />
            {copy.journeyTitle3}
          </h2>
          <p>{copy.journeyText}</p>
          <button className="pill-button">
            {copy.startBuilding} <span>→</span>
          </button>
        </div>
        <div className="journey-orbit">
          <span>Ouidah</span>
          <span>Ganvié</span>
          <span>Abomey</span>
          <span>Atakora</span>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            BONNE
            <br />
            ASSISE
          </div>
          <div className="footer-note">
            {copy.footerNote.split("\n").map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#discover">{copy.discover}</a>
            <a href="#places">{copy.regions}</a>
            <a href="#prendre-place">{copy.experiences}</a>
            <a href="#stories">{copy.stories}</a>
            <a href="#journey">{copy.journey}</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Bonne Assise</span>
          <span>{copy.made}</span>
        </div>
      </footer>
    </main>
  );
}

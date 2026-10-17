"use client";

import { useEffect, useState } from "react";
import type { Locale } from "../../lib/types";
import { getMessages } from "../../lib/i18n/messages";
import { Icon, Link } from "../ui/primitives";

type HeroSlide = { image: string; altEn: string; altFr: string; placeEn: string; placeFr: string };

const slides: HeroSlide[] = [
  {
    image:
      "https://conteudo.imguol.com.br/c/entretenimento/36/2023/10/16/mulher-vende-tomates-pimentas-e-pimentoes-ao-lado-de-fora-do-mercado-de-dantokpa-1697467021798_v2_4x3.jpg",
    altEn: "A vendor selling tomatoes, peppers and fresh produce at Dantokpa market",
    altFr: "Une vendeuse de tomates, piments et légumes au marché Dantokpa",
    placeEn: "Dantokpa",
    placeFr: "Dantokpa",
  },
  {
    image: "https://exploreur.univ-toulouse.fr/sites/default/files/inline-images/portrait_femme_dacciwa_exploreur.jpg",
    altEn: "A market vendor surrounded by vivid wax-print textiles",
    altFr: "Une vendeuse entourée de tissus aux imprimés colorés",
    placeEn: "Cotonou",
    placeFr: "Cotonou",
  },
  {
    image:
      "https://images.euronews.com/articles/stories/06/66/54/30/1536x864_cmsv2_9c21e5b9-3b3a-5be4-80ba-4fb9ee7e251b-6665430.jpg",
    altEn: "Women paddling canoes between the stilt houses of Ganvié",
    altFr: "Des femmes avancent en pirogue entre les maisons sur pilotis de Ganvié",
    placeEn: "Lake Nokoué",
    placeFr: "Lac Nokoué",
  },
  {
    image: "https://live.staticflickr.com/3206/3052176052_231bc3e448_b.jpg",
    altEn: "A local man looking out over the Atlantic at Grand-Popo",
    altFr: "Un homme contemple l’Atlantique à Grand-Popo",
    placeEn: "Grand-Popo",
    placeFr: "Grand-Popo",
  },
];

export function HomeHero({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = getMessages(locale);
  const lines: string[] = (t.home as any).heroTitleLines || (locale === "fr" ? ["Vivez", "local", "au Bénin"] : ["Get", "local", "in Benin"]);
  const cta = (t.home as any).heroExplore || (locale === "fr" ? "Explorer le Bénin" : "Explore Benin");
  const fr = locale === "fr";

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return (
    <section
      className="collage-hero"
      aria-label={fr ? "Découvrez le Bénin" : "Discover Benin"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <div className="collage-hero-media">
        {slides.map((slide, index) => (
          <div
            key={slide.placeEn}
            className={`collage-hero-slide ${index === active ? "is-active" : ""}`}
            aria-hidden={index !== active}
          >
            <img
              src={slide.image}
              alt={index === active ? (fr ? slide.altFr : slide.altEn) : ""}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        ))}
      </div>
      <div className="collage-hero-shade" aria-hidden="true" />

      <div className="collage-hero-copy" key={locale}>
        <h1 className="collage-hero-title">
          {lines.map((line) => (
            <span className="title-line" key={line}>
              {line}
            </span>
          ))}
        </h1>
      </div>

      <Link to="explore" className="ba-btn ba-btn--solid ba-btn--inverse collage-hero-cta">
        <span>{cta}</span>
        <span className="collage-hero-cta-arrow" aria-hidden="true">
          <Icon name="arrow" size={15} />
        </span>
      </Link>
    </section>
  );
}

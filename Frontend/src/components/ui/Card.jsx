import { IMG } from "../../data/content.js";
import { pickLang } from "../../data/content.js";
import { Arrow } from "./Button.jsx";
import { useLang } from "../context/LangContext.jsx";

export function Card({ item, kind = "place", large = false }) {
  const { lang, t } = useLang();
  const href =
    kind === "dish"
      ? `#/food/${item.slug}`
      : kind === "story"
        ? `#/stories/${item.slug}`
        : `#/places/${item.slug}`;
  const fallback = IMG.hero2 || IMG.hero;
  const src = item.img || fallback;
  const eyebrow = pickLang(item, "eyebrow", lang);
  const name = pickLang(item, "name", lang) || pickLang(item, "title", lang);
  const desc = pickLang(item, "desc", lang);

  return (
    <a className={`card ${large ? "large" : ""}`} href={href}>
      <div className="card-media">
        <img
          src={src}
          alt=""
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
          }}
        />
      </div>
      <div className="card-body">
        {eyebrow && <small>{eyebrow}</small>}
        <h3>{name}</h3>
        {desc && <p>{desc}</p>}
        <span className="card-cta">
          {lang === "EN" ? "Discover" : "Découvrir"} <Arrow />
        </span>
      </div>
    </a>
  );
}

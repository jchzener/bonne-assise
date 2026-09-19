import { IMG } from "../../data/content.js";
import { Arrow } from "./Button.jsx";

export function Card({ item, kind = "place", large = false }) {
  const href =
    kind === "dish"
      ? `#/food/${item.slug}`
      : kind === "story"
        ? `#/stories/${item.slug}`
        : `#/places/${item.slug}`;
  const fallback = IMG.hero2 || IMG.hero;
  const src = item.img || fallback;

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
        {item.eyebrow && <small>{item.eyebrow}</small>}
        <h3>{item.name || item.title}</h3>
        {item.desc && <p>{item.desc}</p>}
        <span className="card-cta">
          Découvrir <Arrow />
        </span>
      </div>
    </a>
  );
}

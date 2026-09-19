import { Arrow } from "./Button.jsx";

export function SectionHead({ eyebrow, title, link, center = false }) {
  return (
    <div className={`section-head ${center ? "center" : ""}`}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {link && (
        <a href={link.href} className="section-link">
          {link.label} <Arrow />
        </a>
      )}
    </div>
  );
}

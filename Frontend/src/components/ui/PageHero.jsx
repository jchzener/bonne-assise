import { Button, Arrow } from "./Button.jsx";

export function PageHero({ kicker, title, text, img, cta, actions }) {
  return (
    <section className="page-hero">
      <img src={img} alt="" />
      <div className="page-hero-overlay" />
      <div className="page-hero-copy">
        {kicker && <span className="eyebrow light">{kicker}</span>}
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {(cta || actions) && (
          <div className="page-hero-actions">
            {cta && (
              <Button as="a" href={cta.href} variant="primary">
                {cta.label} <Arrow />
              </Button>
            )}
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}

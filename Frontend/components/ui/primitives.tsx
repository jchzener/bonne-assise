"use client";
import React from "react";
import { usePathname } from "next/navigation";
import type { Page } from "../../lib/types";

export function Icon({ name, size = 20 }: { name: "search" | "heart" | "menu" | "close" | "arrow" | "plus" | "user" | "share" | "check"; size?: number }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    menu: <><path d="M4 7h16M4 17h16" /></>,
    close: <><path d="m5 5 14 14M19 5 5 19" /></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.6-4.1 3.3-6 8-6s7.4 1.9 8 6" /></>,
    share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.5-4.4M8.2 13.3l7.5 4.4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

/** BA button system: dark | light | line | icon | primary (blue) | ghost */
/** BA buttons: solid | outline | text | icon (+ legacy aliases) */
export function Button({
  children,
  onClick,
  variant = "solid",
  ariaLabel,
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "solid" | "outline" | "text" | "icon" | "dark" | "light" | "line" | "ghost" | "primary";
  ariaLabel?: string;
  className?: string;
  type?: "button" | "submit";
}) {
  const map: Record<string, string> = {
    solid: "ba-btn ba-btn--solid",
    outline: "ba-btn ba-btn--outline",
    text: "ba-btn ba-btn--text",
    icon: "ba-btn ba-btn--icon",
    dark: "ba-btn ba-btn--solid",
    light: "ba-btn ba-btn--solid ba-btn--inverse",
    line: "ba-btn ba-btn--outline",
    ghost: "ba-btn ba-btn--text",
    primary: "ba-btn ba-btn--solid",
  };
  return (
    <button
      type={type}
      className={`${map[variant] || map.solid} ${className}`.trim()}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

export function Link({
  children,
  to,
  slug,
  className = "",
  onClick,
  ariaLabel,
  style,
}: {
  children: React.ReactNode;
  to: Page;
  slug?: string;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname() || "/en";
  const locale = pathname.split("/")[1] === "fr" ? "fr" : "en";
  /* Route map:
   * home              -> /
   * explore           -> /explore
   * place[+slug]      -> /places/{slug} | /explore
   * food[+slug]       -> /food/{slug} | /food
   * experience[+slug] -> /experiences/{slug} | /experiences
   * story[+slug]      -> /stories/{slug} | /stories
   * trip | saved
   */
  const route =
    to === "home"
      ? ""
      : to === "place"
        ? slug
          ? `places/${slug}`
          : "places"
        : to === "food"
          ? slug
            ? `food/${slug}`
            : "food"
          : to === "experience"
            ? slug
              ? `experiences/${slug}`
              : "experiences"
            : to === "trip"
              ? "trip"
              : to === "saved"
                ? "saved"
                : to === "story"
                  ? slug
                    ? `stories/${slug}`
                    : "stories"
                  : to === "explore"
                    ? "explore"
                    : "";
  return (
    <a
      href={`/${locale}${route ? `/${route}` : ""}`}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      style={style}
    >
      {children}
    </a>
  );
}

export function ExternalLink({ children, href, className = "" }: { children: React.ReactNode; href: string; className?: string }) {
  return (
    <a href={href} className={className} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
}: {
  type?: string;
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return <input type={type} className={className} placeholder={placeholder} value={value} onChange={onChange} />;
}

export function FilterButton({ children, active = false, className = "" }: { children: React.ReactNode; active?: boolean; className?: string }) {
  return <button className={`${active ? "active" : ""} ${className}`}>{children}</button>;
}

export function Heading({ level = 2, children, className = "" }: { level?: 1 | 2 | 3 | 4; children: React.ReactNode; className?: string }) {
  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;
  return <Tag className={className}>{children}</Tag>;
}

/** Media with optional caption — consistent image treatment */
export function Image({
  src,
  alt,
  className = "",
  caption,
}: {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
}) {
  if (caption) {
    return (
      <figure className={`ba-media ${className}`}>
        <img src={src} alt={alt} loading="lazy" />
        <figcaption>{caption}</figcaption>
      </figure>
    );
  }
  return <img className={className} src={src} alt={alt} loading="lazy" />;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>;
}

/** Text link with arrow — BA tertiary CTA */
export function TextLink({
  children,
  to,
  slug,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  to: Page;
  slug?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      to={to}
      slug={slug}
      className={`ba-btn ba-btn--text text-link ${light ? "ba-btn--on-dark light-link" : ""} ${className}`.trim()}
    >
      <span>{children}</span> <Icon name="arrow" size={14} />
    </Link>
  );
}

/** Link styled as BA button (solid | outline | text) */
export function ButtonLink({
  children,
  to,
  slug,
  variant = "solid",
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  to: Page;
  slug?: string;
  variant?: "solid" | "outline" | "text";
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <Link
      to={to}
      slug={slug}
      className={`ba-btn ba-btn--${variant} ${className}`.trim()}
      ariaLabel={ariaLabel}
    >
      {children}
    </Link>
  );
}

/** Section shell with optional pad */
export function Section({
  children,
  className = "",
  pad = false,
  ariaLabel,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  pad?: boolean;
  ariaLabel?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`${className} ${pad ? "section-pad" : ""}`.trim()} aria-label={ariaLabel} {...rest}>
      {children}
    </section>
  );
}

/** Section title row: eyebrow + heading + optional action */
export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  action,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  titleAccent?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`section-top ${className}`.trim()}>
      <div>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <Heading level={2}>
          {title}
          {titleAccent ? (
            <>
              <br />
              <em>{titleAccent}</em>
            </>
          ) : null}
        </Heading>
      </div>
      {action}
    </div>
  );
}

/** City edition card */
export function EditionCard({
  label,
  title,
  sub,
  to,
  tone,
  slug,
}: {
  label: string;
  title: string;
  sub: string;
  to: Page;
  tone: string;
  slug?: string | null;
}) {
  return (
    <Link to={to} slug={slug || undefined} className={`edition ${tone} edition-cycle`}>
      <span>{label}</span>
      <Heading level={3}>
        {title.split("|").map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </Heading>
      <small>{sub}</small>
    </Link>
  );
}

export function SaveActions({
  saved,
  toggleSaved,
  addTrip,
  added,
  labels,
}: {
  saved: boolean;
  toggleSaved: () => void;
  addTrip: () => void;
  added: boolean;
  labels?: { save: string; saved: string; addTrip: string; addedTrip: string; share: string };
}) {
  const l = labels || { save: "Save", saved: "Saved", addTrip: "Add to trip", addedTrip: "Added to trip", share: "Share" };
  return (
    <div className="actions">
      <Button variant="line" onClick={toggleSaved}>
        <Icon name={saved ? "check" : "heart"} /> {saved ? l.saved : l.save}
      </Button>
      <Button onClick={addTrip}>
        <Icon name={added ? "check" : "plus"} /> {added ? l.addedTrip : l.addTrip}
      </Button>
      <Button variant="icon" ariaLabel={l.share}>
        <Icon name="share" />
      </Button>
    </div>
  );
}

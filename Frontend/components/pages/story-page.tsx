"use client";
import React from "react";
import { photos, storyCatalog } from "../../lib/content";
import { getMessages } from "../../lib/i18n/messages";
import { usePathname } from "next/navigation";
import { Icon, Link, Heading, Image, Eyebrow } from "../ui/primitives";

export function Story({ slug = "rosine-cooks" }: { slug?: string }) {
  const pathname = usePathname() || "/en";
  const locale = pathname.split("/")[1] === "fr" ? "fr" : "en";
  const t = getMessages(locale);
  const s = (t as any).story || {};
  const catalog = storyCatalog[slug] || storyCatalog["rosine-cooks"];
  const i18n = (t as any).stories?.[slug] || {};
  const item = {
    ...catalog,
    title: i18n.title || catalog.title,
    eyebrow: i18n.eyebrow || catalog.eyebrow,
    dek: i18n.dek || catalog.dek,
    readTime: i18n.readTime || catalog.readTime,
    body: (i18n.body && i18n.body.length ? i18n.body : catalog.body) || [],
  };

  return (
    <main className="story-page">
      <section className="story-hero section-pad">
        <div>
          <Eyebrow>{item.eyebrow || s.eyebrow}</Eyebrow>
          <Heading level={1}>{item.title || s.title}</Heading>
          <p className="story-dek">{item.dek || s.dek}</p>
          <div className="byline">
            <span>{s.bylineWords || "Bonne Assise"}</span>
            <span>{item.readTime || s.readTime}</span>
          </div>
        </div>
        <Image src={item.image || photos.women} alt={item.title || ""} />
      </section>
      <article className="story-article section-pad">
        {(item.body || [s.p1, s.p2]).filter(Boolean).map((p: string, i: number) => (
          <p key={i} className={i === 0 ? "dropcap" : undefined}>
            {p}
          </p>
        ))}
        {slug === "rosine-cooks" && s.quote && <blockquote>“{s.quote}”</blockquote>}
        {slug === "rosine-cooks" && (
          <>
            <Image src={photos.cook} alt={s.imgAlt || ""} />
            <small>{s.imgCaption}</small>
            {s.h2 && <Heading level={2}>{s.h2}</Heading>}
            {s.p3 && <p>{s.p3}</p>}
            {s.p4 && <p>{s.p4}</p>}
          </>
        )}
      </article>
      <section className="story-end section-pad">
        <Eyebrow>{s.endEyebrow || "Continue the journey"}</Eyebrow>
        <Heading level={2}>{s.endTitle || "Keep exploring"}</Heading>
        <p>{s.endBody || ""}</p>
        <Link to="experience" slug="after-dark" className="btn btn-light">
          {s.endCta || "Discover an experience"} <Icon name="arrow" />
        </Link>
      </section>
    </main>
  );
}

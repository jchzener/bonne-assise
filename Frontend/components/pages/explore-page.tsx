"use client";
import React, { useState } from "react";
import { resultItems } from "../../lib/content";
import { getMessages } from "../../lib/i18n/messages";
import { usePathname } from "next/navigation";
import { Icon, Button, Link, Input, FilterButton, Heading, Image, Eyebrow, Section, TextLink } from "../ui/primitives";
import type { Page } from "../../lib/types";

export function Explore() {
  const pathname = usePathname() || "/en";
  const locale = pathname.split("/")[1] === "fr" ? "fr" : "en";
  const t = getMessages(locale);
  const [query, setQuery] = useState("");
  const filtered = resultItems.filter((item) =>
    `${item.title} ${item.type} ${item.sub}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="page-top explore-page section-pad">
      <div className="explore-head">
        <Eyebrow>{t.explore.eyebrow}</Eyebrow>
        <Heading level={1}>
          {t.explore.title}
          <br />
          <em>{t.explore.titleAccent}</em>
        </Heading>
        <label className="search-field">
          <Icon name="search" size={26} />
          <span className="sr-only">{t.explore.searchLabel}</span>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.explore.placeholder} />
        </label>
      </div>
      <div className="filters">
        <FilterButton active>{t.explore.everything}</FilterButton>
        <FilterButton>{t.explore.places}</FilterButton>
        <FilterButton>{t.explore.food}</FilterButton>
        <FilterButton>{t.explore.experiences}</FilterButton>
        <FilterButton>{t.explore.people}</FilterButton>
        <FilterButton>{t.explore.stories}</FilterButton>
        <FilterButton className="filter-more">{(t.explore as any).moreFilters}</FilterButton>
      </div>
      <div className="results-label">
        <span>
          {filtered.length} {t.explore.discoveries}
        </span>
        <span>{t.explore.curated}</span>
      </div>
      <div className="results">
        {filtered.map((item, i) => (
          <Link
            to={item.to as Page}
            slug={"slug" in item ? (item as any).slug : undefined}
            className={`result result-${i + 1}`}
            key={item.title}
          >
            <div className="result-image">
              <Image src={item.image} alt={item.title} />
              <Button variant="icon" ariaLabel={(t.explore as any).saveItem?.replace("{title}", item.title) || `Save ${item.title}`}>
                <Icon name="heart" />
              </Button>
            </div>
            <div>
              <Eyebrow>{item.type}</Eyebrow>
              <Heading level={2}>{item.title}</Heading>
              <p>{item.sub}</p>
              <span className="text-link">
                {(t.explore as any).discover || "Discover"} <Icon name="arrow" />
              </span>
            </div>
          </Link>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty">
          <Heading level={2}>{(t.explore as any).emptyTitle || t.pages.emptyTitle}</Heading>
          <p>{(t.explore as any).emptyText || t.pages.emptyText}</p>
        </div>
      )}
    </main>
  );
}

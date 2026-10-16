"use client";
import React from "react";
import { resultItems } from "../../lib/content";
import { getMessages } from "../../lib/i18n/messages";
import { usePathname } from "next/navigation";
import { Icon, Button, Link, Heading, Image, Eyebrow } from "../ui/primitives";
import type { Page } from "../../lib/types";

export function Saved({ saved }: { saved: boolean }) {
  const pathname = usePathname() || "/en";
  const locale = pathname.split("/")[1] === "fr" ? "fr" : "en";
  const t = getMessages(locale);
  const s = (t as any).saved || {};
  const items = saved ? resultItems : resultItems.slice(1);

  return (
    <main className="page-top saved-page section-pad">
      <div className="saved-head">
        <div>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <Heading level={1}>{s.title}</Heading>
        </div>
        <Button>
          <Icon name="plus" /> {s.newCollection}
        </Button>
      </div>
      <div className="collection-strip">
        <div>
          <Heading level={3}>{s.collection1}</Heading>
          <p>{(s.discoveries || "{n} discoveries").replace("{n}", String(items.length))}</p>
        </div>
        <div>
          <Heading level={3}>{s.collection2}</Heading>
          <p>{(s.discoveries || "{n} discoveries").replace("{n}", "3")}</p>
        </div>
        <div className="collection-new">
          <Icon name="plus" />
          <p>{s.createCollection}</p>
        </div>
      </div>
      <div className="section-top">
        <div>
          <Eyebrow>{s.everything}</Eyebrow>
          <Heading level={2}>{(s.discoveries || "{n} discoveries").replace("{n}", String(items.length))}</Heading>
        </div>
        <div className="view-toggle">{s.gridList}</div>
      </div>
      <div className="saved-grid">
        {items.map((item) => (
          <Link to={item.to as Page} slug={"slug" in item ? (item as any).slug : undefined} key={item.title}>
            <div>
              <Image src={item.image} alt={item.title} />
              <Button variant="icon" ariaLabel={(s.remove || "Remove {title}").replace("{title}", item.title)}>
                <Icon name="heart" />
              </Button>
            </div>
            <Eyebrow>{item.type}</Eyebrow>
            <Heading level={3}>{item.title}</Heading>
            <p>{item.sub}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

"use client";
import React, { useState } from "react";
import { photos } from "../../lib/content";
import { getMessages } from "../../lib/i18n/messages";
import { usePathname } from "next/navigation";
import { Icon, Button, Heading, Image, Eyebrow } from "../ui/primitives";

export function Trip({ added }: { added: boolean }) {
  const pathname = usePathname() || "/en";
  const locale = pathname.split("/")[1] === "fr" ? "fr" : "en";
  const t = getMessages(locale);
  const tr = (t as any).trip || {};
  const items = tr.items || {};
  const [days, setDays] = useState(2);

  const day1 = [
    [photos.market, items.d1a, items.d1aMeta],
    [photos.grill, items.d1b, items.d1bMeta],
  ];
  const day2 = [
    [photos.boats, items.d2a, items.d2aMeta],
    ...(added ? [[photos.coast, items.d2b, items.d2bMeta]] : []),
  ];

  return (
    <main className="page-top trip-page">
      <section className="trip-head section-pad">
        <div>
          <Eyebrow>{tr.eyebrow}</Eyebrow>
          <Heading level={1}>{tr.title}</Heading>
        </div>
        <div className="trip-stats">
          <div>
            <b>{days}</b>
            <span>{tr.days}</span>
          </div>
          <div>
            <b>{added ? 4 : 3}</b>
            <span>{tr.discoveries}</span>
          </div>
          <Button variant="line">
            <Icon name="share" /> {tr.share}
          </Button>
        </div>
      </section>
      <section className="trip-workspace section-pad">
        <div className="day-list">
          {[
            { n: 1, title: tr.day1Title, items: day1 },
            { n: 2, title: tr.day2Title, items: day2 },
          ].map((day) => (
            <div className="day" key={day.n}>
              <div className="day-title">
                <span>{(tr.day || "Day {n}").replace("{n}", String(day.n))}</span>
                <p>{day.title}</p>
              </div>
              {day.items.map((item: any, i: number) => (
                <div className="trip-item" key={String(item[1])}>
                  <span className="drag">⠿</span>
                  <Image src={String(item[0])} alt={String(item[1])} />
                  <div>
                    <Eyebrow>{String(item[2])}</Eyebrow>
                    <Heading level={3}>{String(item[1])}</Heading>
                    <p>{i ? tr.later : tr.begin}</p>
                  </div>
                  <Button variant="icon" ariaLabel="Item options">
                    •••
                  </Button>
                </div>
              ))}
            </div>
          ))}
          <Button variant="line" onClick={() => setDays(days + 1)}>
            <Icon name="plus" /> {(tr.addDay || "Add day {n}").replace("{n}", String(days + 1))}
          </Button>
        </div>
        <aside className="trip-aside">
          <Eyebrow>{tr.noteEyebrow}</Eyebrow>
          <Heading level={2}>{tr.noteTitle}</Heading>
          <p>{tr.noteBody}</p>
          <div className="trip-tip">
            <span>{tr.tipLabel}</span>
            <p>{tr.tipBody}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

import React, { useMemo, useState } from "react";
import { Shell } from "../layout/Shell.jsx";
import { Arrow } from "../ui/Button.jsx";
import { allContent } from "../../data/content.js";

export function Search() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const norm = (s) =>
      s
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    const query = norm(q);
    return allContent.filter((x) =>
      norm(x.name || x.title || "").includes(query)
    );
  }, [q]);

  return (
    <Shell>
      <section className="search-page">
        <span className="eyebrow">RECHERCHER</span>
        <h1>
          Que voulez-vous
          <br />
          vivre au Bénin ?
        </h1>
        <div className="search-input-wrap">
          <span>⌕</span>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Une ville, un plat…"
          />
        </div>
        {q && (
          <div className="search-results">
            {results.length ? (
              results.map((r) => (
                <a href={r.href} key={r.href}>
                  <div>
                    <small>{r.type}</small>
                    <h3>{r.name || r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                  <Arrow />
                </a>
              ))
            ) : (
              <p className="no-results">Aucun résultat. Essayez Cotonou, akassa…</p>
            )}
          </div>
        )}
      </section>
    </Shell>
  );
}

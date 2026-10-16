"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminLogout } from "../../logout-button";

const TYPES = ["place", "restaurant", "hotel", "experience", "story", "guide"] as const;

export default function NewEntryPage() {
  const router = useRouter();
  const [type, setType] = useState<(typeof TYPES)[number]>("restaurant");
  const [slug, setSlug] = useState("");
  const [locale, setLocale] = useState("fr");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [partnerOrg, setPartnerOrg] = useState("");
  const [status, setStatus] = useState<"draft" | "review">("draft");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOk("");
    const res = await fetch("/api/admin/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, slug, locale, title, summary, city, region, partnerOrg, status }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Échec");
      return;
    }
    setOk(`Créé #${data.entry?.id} · ${data.entry?.slug}`);
    setTimeout(() => router.push("/admin/entries"), 800);
  }

  return (
    <>
      <nav className="admin-nav">
        <strong>Nouvelle entrée</strong>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/entries">Liste</Link>
        <AdminLogout />
      </nav>
      <div className="admin-card">
        <h1>Créer un brouillon</h1>
        <p className="admin-muted">Hôtels, restos, guides, expériences — moderation avant publish.</p>
        <form className="admin-form" onSubmit={onSubmit} style={{ marginTop: "1.25rem", maxWidth: 520 }}>
          <label>
            Type
            <select value={type} onChange={(e) => setType(e.target.value as any)}>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label>
            Locale
            <select value={locale} onChange={(e) => setLocale(e.target.value)}>
              <option value="fr">fr</option>
              <option value="en">en</option>
            </select>
          </label>
          <label>
            Titre
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Slug
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="ex. hotel-plage-grand-popo"
              required
            />
          </label>
          <label>
            Résumé
            <textarea value={summary} onChange={(e) => setSummary(e.target.value)} />
          </label>
          <label>
            Ville
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label>
            Région
            <input value={region} onChange={(e) => setRegion(e.target.value)} />
          </label>
          <label>
            Organisation partenaire
            <input value={partnerOrg} onChange={(e) => setPartnerOrg(e.target.value)} />
          </label>
          <label>
            Statut
            <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option value="draft">draft</option>
              <option value="review">review</option>
            </select>
          </label>
          {error && <p className="admin-error">{error}</p>}
          {ok && <p className="admin-ok">{ok}</p>}
          <button className="admin-btn" type="submit" disabled={loading}>
            {loading ? "…" : "Enregistrer"}
          </button>
        </form>
      </div>
    </>
  );
}

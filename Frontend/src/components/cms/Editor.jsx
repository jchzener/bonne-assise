import React, { useCallback, useEffect, useState } from "react";
import { Logo } from "../layout/Logo.jsx";
import { Button, Arrow } from "../ui/Button.jsx";
import { PostcardStudio } from "../postcard/PostcardStudio.jsx";

function EditorLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault();
    setError("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!r.ok) throw new Error("Identifiants incorrects");
      onLogin(await r.json());
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <main className="editor-login">
      <div className="editor-login-card">
        <Logo />
        <span className="eyebrow">ESPACE ÉDITORIAL</span>
        <h1>Éditer BONNE ASSISE</h1>
        <form onSubmit={submit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <Button variant="primary" as="button" type="submit">
            Se connecter <Arrow />
          </Button>
        </form>
        <small>
          URL : <b>/#/edit</b>
        </small>
      </div>
    </main>
  );
}

export function Editor() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [kind, setKind] = useState("places");
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => u && setUser(u))
      .catch(() => {});
  }, []);

  const load = useCallback(async () => {
    if (kind === "postcard") {
      setItems([]);
      return;
    }
    const r = await fetch(`/api/content?kind=${kind}`, {
      credentials: "include",
    });
    if (r.status === 401) {
      setUser(null);
      return;
    }
    const data = await r.json();
    setItems(data);
    if (data[0] && !selected) {
      setSelected(data[0].slug);
      setForm(data[0]);
    }
  }, [kind, selected]);

  useEffect(() => {
    if (user) load();
  }, [user, kind]); // eslint-disable-line

  useEffect(() => {
    const item = items.find((i) => i.slug === selected);
    if (item) setForm(item);
  }, [selected, items]);

  if (!user) return <EditorLogin onLogin={setUser} />;

  async function save(e) {
    e.preventDefault();
    const r = await fetch(`/api/content/${kind}/${form.slug || selected}`, {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: form }),
    });
    setMessage(r.ok ? "Enregistré" : "Erreur");
    if (r.ok) load();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
  }

  async function uploadFile(file) {
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/upload", {
      method: "POST",
      credentials: "include",
      body: fd,
    });
    const data = await r.json();
    if (!r.ok) throw new Error(data.detail || "Upload échoué");
    return data.url;
  }

  return (
    <main className="editor">
      <header className="editor-top">
        <Logo />
        <div>
          <span>{user.email}</span>
          <button type="button" onClick={logout}>
            Déconnexion
          </button>
        </div>
      </header>
      <div className="editor-shell">
        <aside className="editor-sidebar">
          <span className="eyebrow">CMS</span>
          <h1>Éditorial</h1>
          {["places", "dishes", "events", "stories", "postcard"].map((k) => (
            <button
              type="button"
              className={kind === k ? "active" : ""}
              key={k}
              onClick={() => {
                setKind(k);
                setSelected(null);
              }}
            >
              {k === "places"
                ? "Lieux"
                : k === "dishes"
                  ? "Plats"
                  : k === "events"
                    ? "Agenda"
                    : k === "postcard"
                      ? "Cartes postales"
                      : "Histoires"}
            </button>
          ))}
        </aside>
        <section className="editor-main">
          {kind === "postcard" ? (
            <>
              <h2>Cartes à vendre (print & digital)</h2>
              <p style={{ color: "var(--muted)", maxWidth: "42ch" }}>
                Uploadez des visuels pour la boutique physique. Utilisez le
                studio pour prévisualiser et exporter.
              </p>
              <PostcardStudio embedded cmsMode />
            </>
          ) : (
            <>
              <div className="editor-heading">
                <h2>Modifier · {kind}</h2>
                <span className="editor-status">{message}</span>
              </div>
              <div className="editor-workspace">
                <div className="editor-list">
                  {items.map((i) => (
                    <button
                      type="button"
                      className={i.slug === selected ? "selected" : ""}
                      key={i.slug}
                      onClick={() => setSelected(i.slug)}
                    >
                      <b>{i.name || i.title}</b>
                      <small>{i.slug}</small>
                    </button>
                  ))}
                </div>
                {selected && (
                  <form className="editor-form" onSubmit={save}>
                    <label>
                      Nom / titre
                      <input
                        value={form.name || form.title || ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                            title: form.title !== undefined ? e.target.value : form.title,
                          })
                        }
                      />
                    </label>
                    <label>
                      Image principale
                      <input
                        value={form.img || ""}
                        onChange={(e) => setForm({ ...form, img: e.target.value })}
                      />
                    </label>
                    {form.img && (
                      <div className="editor-media-preview">
                        <img src={form.img} alt="" />
                      </div>
                    )}
                    <label className="editor-upload">
                      Upload photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          try {
                            const url = await uploadFile(file);
                            const gallery = Array.isArray(form.gallery)
                              ? form.gallery
                              : [];
                            setForm({
                              ...form,
                              img: url,
                              gallery: [url, ...gallery].slice(0, 8),
                            });
                            setMessage("Photo uploadée");
                          } catch (err) {
                            setMessage(String(err.message));
                          }
                        }}
                      />
                    </label>
                    <label>
                      Galerie (une URL / ligne)
                      <textarea
                        rows={3}
                        value={(form.gallery || []).join("\n")}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            gallery: e.target.value
                              .split("\n")
                              .map((s) => s.trim())
                              .filter(Boolean),
                          })
                        }
                      />
                    </label>
                    <label>
                      Résumé
                      <textarea
                        rows={3}
                        value={form.summary || form.desc || ""}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            summary: e.target.value,
                            desc: form.desc !== undefined ? e.target.value : form.desc,
                          })
                        }
                      />
                    </label>
                    <Button variant="primary" as="button" type="submit">
                      Enregistrer <Arrow />
                    </Button>
                  </form>
                )}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

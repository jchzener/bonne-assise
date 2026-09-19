import React, { useMemo, useRef, useState } from "react";
import { IMG } from "../../data/content.js";
import { Button } from "../ui/Button.jsx";
import { Shell } from "../layout/Shell.jsx";

export const POSTCARD_OFFERS = {
  preview: {
    id: "preview",
    label: "Aperçu gratuit",
    price: 0,
    watermark: true,
    desc: "Téléchargement avec signature BONNE ASSISE",
  },
  digital: {
    id: "digital",
    label: "Digital HD sans signature",
    price: 2000,
    watermark: false,
    desc: "PNG 1050×1480 · usage perso · une licence",
  },
  physical: {
    id: "physical",
    label: "Carte physique",
    price: 4500,
    watermark: false,
    desc: "Impression A6 + envoi (boutique)",
  },
};

const SCENES = [
  { id: "hero", img: IMG.hero, label: "Paysage" },
  { id: "cotonou", img: IMG.cotonou, label: "Cotonou" },
  { id: "ouidah", img: IMG.ouidah, label: "Ouidah" },
  { id: "porto", img: IMG.porto, label: "Porto-Novo" },
  { id: "pendjari", img: IMG.pendjari, label: "Nord" },
  { id: "street", img: IMG.streetfood, label: "Ville" },
];

function wrapText(ctx, text, maxWidth) {
  const words = (text || "").split(" ");
  const lines = [];
  let line = "";
  words.forEach((w) => {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else line = test;
  });
  if (line) lines.push(line);
  return lines.slice(0, 10);
}

function exportCanvas(side, { imgSrc, message, fromName, watermark }) {
  const w = 1050;
  const h = 1480;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const finish = () => {
    const a = document.createElement("a");
    a.download = `bonne-assise-${side}${watermark ? "-apercu" : ""}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  };
  if (side === "recto") {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.fillStyle = "#f7f4ee";
      ctx.fillRect(0, 0, w, h);
      const scale = Math.max(w / img.width, h / img.height);
      const sw = img.width * scale;
      const sh = img.height * scale;
      ctx.drawImage(img, (w - sw) / 2, (h - sh) / 2, sw, sh);
      const g = ctx.createLinearGradient(0, h * 0.45, 0, h);
      g.addColorStop(0, "rgba(23,23,21,0)");
      g.addColorStop(1, "rgba(23,23,21,0.72)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      if (watermark) {
        ctx.fillStyle = "rgba(247,244,238,0.92)";
        ctx.font = "600 26px Georgia, serif";
        ctx.fillText("BONNE", 60, h - 120);
        ctx.font = "800 52px Georgia, serif";
        ctx.fillText("ASSISE", 60, h - 58);
      }
      finish();
    };
    img.onerror = finish;
    img.src = imgSrc;
  } else {
    ctx.fillStyle = "#f7f4ee";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#ded8ce";
    ctx.lineWidth = 3;
    ctx.strokeRect(w - 220, 60, 160, 180);
    ctx.fillStyle = "#5c5953";
    ctx.font = "12px system-ui, sans-serif";
    ctx.fillText("TIMBRE", w - 180, 155);
    ctx.beginPath();
    ctx.moveTo(w * 0.55, 60);
    ctx.lineTo(w * 0.55, h - 60);
    ctx.stroke();
    ctx.fillStyle = "#171715";
    ctx.font = "22px Georgia, serif";
    let y = 120;
    wrapText(ctx, message, w * 0.45 - 80).forEach((line) => {
      ctx.fillText(line, 60, y);
      y += 32;
    });
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillStyle = "#5c5953";
    ctx.fillText(`— ${fromName}`, 60, y + 24);
    if (watermark) {
      ctx.fillStyle = "#9a4a35";
      ctx.font = "600 14px system-ui, sans-serif";
      ctx.fillText("BONNE ASSISE · BÉNIN", 60, h - 60);
    }
    finish();
  }
}

export function PostcardStudio({ embedded = true, cmsMode = false }) {
  const [flipped, setFlipped] = useState(false);
  const [message, setMessage] = useState(
    "Depuis le Bénin — lumière, tables et moments qui restent."
  );
  const [fromName, setFromName] = useState("");
  const [sceneId, setSceneId] = useState("hero");
  const [customUrl, setCustomUrl] = useState("");
  const [offer, setOffer] = useState("preview");
  const [creatorOptIn, setCreatorOptIn] = useState(false);
  const [status, setStatus] = useState("");

  const currentImg = useMemo(() => {
    if (customUrl) return customUrl;
    return SCENES.find((s) => s.id === sceneId)?.img || IMG.hero;
  }, [sceneId, customUrl]);

  const selectedOffer = POSTCARD_OFFERS[offer];

  function onUserPhoto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCustomUrl(URL.createObjectURL(file));
    setStatus("Photo personnelle chargée.");
  }

  function handleDownload(side) {
    if (offer === "physical") {
      setStatus("Redirection boutique pour commande physique…");
      window.location.hash = "#/boutique?product=postcard";
      return;
    }
    if (offer === "digital") {
      const ok = window.confirm(
        `Licence digital HD — ${selectedOffer.price} XOF\n\nPaiement simulé (intégrer FedaPay / Stripe ensuite). Télécharger sans signature ?`
      );
      if (!ok) return;
    }
    exportCanvas(side, {
      imgSrc: currentImg,
      message,
      fromName: fromName || "—",
      watermark: selectedOffer.watermark,
    });
    setStatus(
      offer === "preview"
        ? "Aperçu téléchargé (signature BONNE ASSISE)."
        : "HD sans signature téléchargé."
    );
  }

  return (
    <section
      className={
        "postcard-studio" +
        (embedded ? "" : " postcard-page") +
        (cmsMode ? " cms-mode" : "")
      }
      id="postcard"
    >
      <div className="postcard-studio-inner">
        <div className="postcard-copy">
          {!embedded && <span className="eyebrow">CARTE POSTALE</span>}
          {!embedded && <h1>Composez la vôtre.</h1>}
          {embedded && !cmsMode && (
            <>
              <span className="eyebrow">OBJET ÉDITORIAL</span>
              <h2>Carte postale</h2>
            </>
          )}
          {cmsMode && (
            <>
              <span className="eyebrow">CMS · PRINT</span>
              <h2>Studio édition</h2>
            </>
          )}
          <p>
            Galerie BONNE ASSISE ou votre photo. Aperçu gratuit avec signature —
            digital HD et envoi physique via la boutique.
          </p>

          <div className="postcard-gallery-pick">
            <span className="knows-label">Galerie</span>
            <div className="pc-thumbs">
              {SCENES.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  className={
                    "pc-thumb" +
                    (sceneId === s.id && !customUrl ? " active" : "")
                  }
                  onClick={() => {
                    setSceneId(s.id);
                    setCustomUrl("");
                  }}
                  title={s.label}
                >
                  <img src={s.img} alt={s.label} />
                </button>
              ))}
            </div>
          </div>

          <div className="postcard-controls">
            <label className="editor-upload">
              Votre photo
              <input type="file" accept="image/*" onChange={onUserPhoto} />
            </label>
            {customUrl && (
              <button
                type="button"
                className="btn ghost"
                onClick={() => setCustomUrl("")}
              >
                Revenir à la galerie
              </button>
            )}
            <label>
              De la part de
              <input
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                maxLength={40}
                placeholder="Votre nom"
              />
            </label>
            <label>
              Message (verso)
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={220}
              />
            </label>

            <fieldset className="pc-offers">
              <legend>Formule</legend>
              {Object.values(POSTCARD_OFFERS).map((o) => (
                <label key={o.id} className="pc-offer">
                  <input
                    type="radio"
                    name="offer"
                    checked={offer === o.id}
                    onChange={() => setOffer(o.id)}
                  />
                  <span>
                    <strong>
                      {o.label}
                      {o.price > 0 ? ` · ${o.price} XOF` : ""}
                    </strong>
                    <small>{o.desc}</small>
                  </span>
                </label>
              ))}
            </fieldset>

            {customUrl && (
              <label className="pc-creator">
                <input
                  type="checkbox"
                  checked={creatorOptIn}
                  onChange={(e) => setCreatorOptIn(e.target.checked)}
                />
                <span>
                  Proposer en boutique — partage 70&nbsp;% créateur / 30&nbsp;%
                  plateforme (digital) ; physique après coûts d’impression
                </span>
              </label>
            )}

            <div className="postcard-actions">
              <Button variant="primary" onClick={() => setFlipped((f) => !f)}>
                {flipped ? "Voir le recto" : "Retourner"}
              </Button>
              <Button variant="ghost" onClick={() => handleDownload("recto")}>
                {offer === "physical" ? "Commander" : "Recto"}
              </Button>
              <Button variant="ghost" onClick={() => handleDownload("verso")}>
                Verso
              </Button>
            </div>
            {status && <p className="pc-status">{status}</p>}
          </div>
        </div>

        <div className="postcard-stage">
          <div
            className={"postcard-flip" + (flipped ? " is-flipped" : "")}
            onClick={() => setFlipped((f) => !f)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setFlipped((f) => !f);
            }}
            aria-label="Retourner la carte"
          >
            <div className="postcard-face recto">
              <img src={currentImg} alt="" />
              <div className="postcard-shade" />
              {selectedOffer.watermark && (
                <div className="postcard-brand">
                  <span className="pc-bonne">BONNE</span>
                  <span className="pc-assise">ASSISE</span>
                </div>
              )}
            </div>
            <div className="postcard-face verso">
              <div className="verso-left">
                <p className="verso-message">{message}</p>
                <p className="verso-from">— {fromName || "…"}</p>
                {selectedOffer.watermark && (
                  <p className="verso-mark">BONNE ASSISE · BÉNIN</p>
                )}
              </div>
              <div className="verso-right">
                <div className="stamp-box">TIMBRE</div>
                <div className="address-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
          <p className="postcard-hint">Touchez pour retourner</p>
        </div>
      </div>
    </section>
  );
}

export function PostcardPage() {
  return (
    <Shell>
      <PostcardStudio embedded={false} />
    </Shell>
  );
}

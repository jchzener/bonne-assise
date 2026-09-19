/** Google Maps embed — no API key required for basic place search */
export function MapEmbed({ query, title = "Carte", height = 280 }) {
  const q = encodeURIComponent(query || "Cotonou, Benin");
  const src = `https://www.google.com/maps?q=${q}&output=embed&z=13`;
  return (
    <div className="map-embed">
      <iframe
        title={title}
        src={src}
        width="100%"
        height={height}
        style={{ border: 0, borderRadius: 12, display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

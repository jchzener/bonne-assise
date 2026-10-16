import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "BA Admin · Bonne Assise",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="admin-body">
        <style>{`
          .admin-body { margin: 0; font-family: system-ui, sans-serif; background: #0f1419; color: #f3efe6; min-height: 100vh; }
          .admin-wrap { max-width: 960px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
          .admin-nav { display: flex; gap: 1rem; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; }
          .admin-nav a { color: #f0c6a2; text-decoration: none; font-size: 0.9rem; }
          .admin-nav strong { letter-spacing: 0.06em; text-transform: uppercase; font-size: 0.8rem; }
          .admin-card { background: #1a222c; border: 1px solid #2a3544; border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1rem; }
          .admin-card h1, .admin-card h2 { margin: 0 0 0.75rem; font-size: 1.25rem; }
          .admin-muted { color: #9aa7b5; font-size: 0.9rem; }
          .admin-form { display: grid; gap: 0.75rem; max-width: 420px; }
          .admin-form label { display: grid; gap: 0.35rem; font-size: 0.85rem; color: #c5cdd6; }
          .admin-form input, .admin-form select, .admin-form textarea {
            background: #0f1419; border: 1px solid #2a3544; color: #f3efe6; border-radius: 8px; padding: 0.6rem 0.75rem; font: inherit;
          }
          .admin-form textarea { min-height: 80px; }
          .admin-btn { background: #2145c7; color: #fff; border: none; border-radius: 8px; padding: 0.65rem 1rem; font: inherit; cursor: pointer; }
          .admin-btn.secondary { background: transparent; border: 1px solid #2a3544; color: #f3efe6; }
          .admin-btn:disabled { opacity: 0.5; cursor: not-allowed; }
          .admin-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
          .admin-table th, .admin-table td { text-align: left; padding: 0.55rem 0.4rem; border-bottom: 1px solid #2a3544; }
          .admin-badge { display: inline-block; padding: 0.15rem 0.45rem; border-radius: 999px; font-size: 0.75rem; background: #2a3544; }
          .admin-badge.draft { background: #3d3420; color: #f0c6a2; }
          .admin-badge.review { background: #1e3a5f; color: #9ec5ff; }
          .admin-badge.published { background: #1e3d2f; color: #8fd6a8; }
          .admin-error { color: #f0a0a0; font-size: 0.9rem; }
          .admin-ok { color: #8fd6a8; font-size: 0.9rem; }
        `}</style>
        <div className="admin-wrap">{children}</div>
      </body>
    </html>
  );
}

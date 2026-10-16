import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import { pool } from "@/lib/db/postgres";
import { AdminLogout } from "../logout-button";

export const dynamic = "force-dynamic";

async function loadEntries() {
  if (!process.env.DATABASE_URL) return { entries: [] as any[], source: "no-database" as const };
  try {
    const result = await pool.query(
      `SELECT id, type, slug, locale, title, city, status, partner_org AS "partnerOrg",
              updated_at AS "updatedAt"
       FROM content_entries ORDER BY updated_at DESC LIMIT 100`,
    );
    return { entries: result.rows, source: "database" as const };
  } catch {
    return { entries: [] as any[], source: "error" as const };
  }
}

export default async function AdminEntriesPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  const { entries, source } = await loadEntries();

  return (
    <>
      <nav className="admin-nav">
        <strong>Entrées CMS</strong>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/entries/new">Nouvelle</Link>
        <AdminLogout />
      </nav>
      <div className="admin-card">
        <h1>Contenu partenaire</h1>
        {source === "no-database" && (
          <p className="admin-muted">DATABASE_URL non configurée — les entrées ne sont pas encore persistées.</p>
        )}
        {source === "error" && (
          <p className="admin-error">Erreur base — exécuter <code>db/schema.sql</code> sur Postgres.</p>
        )}
        {source === "database" && entries.length === 0 && (
          <p className="admin-muted">Aucune entrée. Créez la première pour un partenaire.</p>
        )}
        {entries.length > 0 && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Type</th>
                <th>Locale</th>
                <th>Statut</th>
                <th>Ville</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((row: any) => (
                <tr key={row.id}>
                  <td>
                    {row.title}
                    <div className="admin-muted">{row.slug}</div>
                  </td>
                  <td>{row.type}</td>
                  <td>{row.locale}</td>
                  <td>
                    <span className={`admin-badge ${row.status}`}>{row.status}</span>
                  </td>
                  <td>{row.city || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

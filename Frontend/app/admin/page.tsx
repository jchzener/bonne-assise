import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/auth";
import { AdminLogout } from "./logout-button";

export default async function AdminHomePage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <>
      <nav className="admin-nav">
        <strong>Bonne Assise · Admin</strong>
        <Link href="/admin/entries">Entrées</Link>
        <Link href="/admin/entries/new">Nouvelle entrée</Link>
        <Link href="/en">Voir le site</Link>
        <AdminLogout />
      </nav>
      <div className="admin-card">
        <h1>Tableau de bord</h1>
        <p className="admin-muted">Connecté : {session.email}</p>
        <p style={{ marginTop: "1rem", lineHeight: 1.55 }}>
          CMS MVP pour guides, hôtels, restaurants, expériences et stories. Workflow{" "}
          <code>draft → review → published</code>.
        </p>
        <ul className="admin-muted" style={{ lineHeight: 1.7 }}>
          <li>
            Seed éditorial : <code>lib/content.ts</code> + <code>lib/i18n/&#123;en,fr&#125;/</code>
          </li>
          <li>
            Contenu partenaire : Postgres <code>content_entries</code>
          </li>
          <li>
            Events : <code>events</code> + seed <code>lib/events.ts</code>
          </li>
        </ul>
        <p style={{ marginTop: "1.25rem" }}>
          <Link className="admin-btn" href="/admin/entries/new" style={{ display: "inline-block", textDecoration: "none" }}>
            Créer une entrée
          </Link>
        </p>
      </div>
    </>
  );
}

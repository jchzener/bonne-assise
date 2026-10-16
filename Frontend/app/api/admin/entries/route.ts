import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { pool } from "@/lib/db/postgres";

export const dynamic = "force-dynamic";

const TYPES = new Set(["place", "restaurant", "hotel", "experience", "story", "guide"]);

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ entries: [], source: "no-database", message: "Set DATABASE_URL to persist CMS entries." });
  }
  try {
    const result = await pool.query(
      `SELECT id, type, slug, locale, title, summary, city, region, status, partner_org AS "partnerOrg",
              published_at AS "publishedAt", created_at AS "createdAt", updated_at AS "updatedAt"
       FROM content_entries ORDER BY updated_at DESC LIMIT 100`,
    );
    return NextResponse.json({ entries: result.rows, source: "database" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error. Run db/schema.sql migrations." }, { status: 503 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ error: "DATABASE_URL not configured" }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  const type = String(body.type || "");
  const slug = String(body.slug || "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "");
  const locale = body.locale === "fr" ? "fr" : "en";
  const title = String(body.title || "").trim();
  const summary = String(body.summary || "").trim();
  const city = String(body.city || "").trim();
  const region = String(body.region || "").trim();
  const partnerOrg = String(body.partnerOrg || "").trim();
  const status = body.status === "review" ? "review" : "draft";
  if (!TYPES.has(type) || !slug || !title) {
    return NextResponse.json({ error: "type, slug and title are required" }, { status: 400 });
  }
  try {
    const result = await pool.query(
      `INSERT INTO content_entries (type, slug, locale, title, summary, city, region, status, partner_org)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING id, type, slug, locale, title, status, created_at AS "createdAt"`,
      [type, slug, locale, title, summary, city, region, status, partnerOrg],
    );
    return NextResponse.json({ entry: result.rows[0] }, { status: 201 });
  } catch (e: unknown) {
    console.error(e);
    const msg = e instanceof Error ? e.message : "Insert failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/lib/db/postgres";

// Scheduled jobs may submit candidates, but candidates remain drafts until editorially verified.
export async function POST(request: NextRequest) {
  const token = process.env.EVENT_INGEST_TOKEN;
  if (!token || request.headers.get("authorization") !== `Bearer ${token}`) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!process.env.DATABASE_URL) return NextResponse.json({ error: "DATABASE_URL is not configured" }, { status: 503 });
  const body = await request.json().catch(() => null);
  if (!Array.isArray(body?.events) || body.events.length > 100) return NextResponse.json({ error: "Provide an events array with at most 100 candidates." }, { status: 400 });
  let inserted = 0;
  for (const candidate of body.events) {
    if (!candidate?.title || !candidate?.titleFr || !candidate?.city || !candidate?.startsAt || !candidate?.endsAt || !candidate?.sourceName || !candidate?.sourceUrl || !candidate?.category) continue;
    const source = String(candidate.sourceUrl);
    if (!/^https?:\/\//i.test(source)) continue;
    await pool.query(`INSERT INTO events (title, title_fr, description, description_fr, city, region, starts_at, ends_at, category, source_name, source_url, status, sponsored) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,'draft',false) ON CONFLICT (source_url, title, starts_at) DO NOTHING`, [candidate.title, candidate.titleFr, candidate.description ?? "", candidate.descriptionFr ?? "", candidate.city, candidate.region ?? "", candidate.startsAt, candidate.endsAt, candidate.category, candidate.sourceName, source]);
    inserted++;
  }
  return NextResponse.json({ accepted: inserted, status: "drafts-awaiting-editorial-review" }, { status: 202 });
}

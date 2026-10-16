import { NextRequest, NextResponse } from "next/server";
import { getUpcomingEvents, type EventCategory } from "@/lib/events";
import { pool } from "@/lib/db/postgres";

const categories = new Set(["food", "culture", "music", "heritage", "nature", "community"]);
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const categoryParam = request.nextUrl.searchParams.get("category");
  if (categoryParam && !categories.has(categoryParam)) return NextResponse.json({ error: "Unknown event category." }, { status: 400 });
  const locale = request.nextUrl.searchParams.get("locale") === "fr" ? "fr" : "en";
  try {
    if (process.env.DATABASE_URL) {
      const values: unknown[] = [];
      let sql = `SELECT id, title, title_fr AS "titleFr", description, description_fr AS "descriptionFr", city, region, starts_at AS "startsAt", ends_at AS "endsAt", category, source_name AS "sourceName", source_url AS "sourceUrl", status, sponsored, sponsor_name AS "sponsorName", featured_rank AS "featuredRank", last_verified_at AS "lastVerifiedAt" FROM events WHERE status = 'verified' AND ends_at >= NOW()`;
      if (categoryParam) { values.push(categoryParam); sql += ` AND category = $${values.length}`; }
      sql += ` ORDER BY sponsored DESC, featured_rank ASC NULLS LAST, starts_at ASC LIMIT 24`;
      const result = await pool.query(sql, values);
      const events = result.rows.map((event) => ({ ...event, title: locale === "fr" ? event.titleFr : event.title, description: locale === "fr" ? event.descriptionFr : event.description }));
      return NextResponse.json({ events, count: events.length, updatedAt: new Date().toISOString(), source: "database" }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
    }
  } catch (error) {
    console.error("Events database query failed", error);
    return NextResponse.json({ error: "Events are temporarily unavailable." }, { status: 503 });
  }
  const events = getUpcomingEvents({ category: categoryParam as EventCategory | undefined }).map((event) => ({ ...event, title: locale === "fr" ? event.titleFr : event.title, description: locale === "fr" ? event.descriptionFr : event.description }));
  return NextResponse.json({ events, count: events.length, updatedAt: new Date().toISOString(), source: "editorial-fallback" }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}

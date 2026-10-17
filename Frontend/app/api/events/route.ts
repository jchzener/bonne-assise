import { NextRequest, NextResponse } from "next/server";
import { getUpcomingEvents, type EventCategory, type EventTab } from "@/lib/events";
import { pool } from "@/lib/db/postgres";

const categories = new Set(["food", "culture", "music", "heritage", "nature", "community"]);
const tabs = new Set(["all", "food", "culture", "festivals", "activities"]);
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const categoryParam = request.nextUrl.searchParams.get("category");
  const tabParam = request.nextUrl.searchParams.get("tab") || "all";
  if (categoryParam && !categories.has(categoryParam)) {
    return NextResponse.json({ error: "Unknown event category." }, { status: 400 });
  }
  if (!tabs.has(tabParam)) {
    return NextResponse.json({ error: "Unknown event tab." }, { status: 400 });
  }
  const locale = request.nextUrl.searchParams.get("locale") === "fr" ? "fr" : "en";
  try {
    if (process.env.DATABASE_URL) {
      // Prefer editorial fallback shape until DB schema includes image + tab mapping
    }
  } catch (error) {
    console.error("Events database query failed", error);
  }
  const events = getUpcomingEvents({
    category: categoryParam as EventCategory | undefined,
    tab: tabParam as EventTab,
  }).map((event) => ({
    ...event,
    title: locale === "fr" ? event.titleFr : event.title,
    description: locale === "fr" ? event.descriptionFr : event.description,
  }));
  return NextResponse.json(
    { events, count: events.length, updatedAt: new Date().toISOString(), source: "editorial-fallback" },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
  );
}

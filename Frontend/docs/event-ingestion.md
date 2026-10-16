# Event catalogue and ingestion

## Storage

Provision a PostgreSQL database, set `DATABASE_URL`, and run `db/schema.sql` once. `GET /api/events?locale=en|fr&category=food` returns only verified, non-expired events, ordered by sponsored placement and then start date. Sponsored listings must be explicitly marked and should remain clearly labelled in the UI.

## Candidate ingestion

Configure a high-entropy `EVENT_INGEST_TOKEN` in the deployment environment. A scheduled collector can `POST /api/events/ingest` with `Authorization: Bearer <token>` and `{ "events": [...] }`. This endpoint stores candidates as `draft`; it never auto-publishes or auto-sponsors them. A separate authenticated editorial workflow is still required to verify source/date, approve candidates, and manage sponsorship.

Each candidate must include `title`, `titleFr`, `city`, `startsAt`, `endsAt`, `category`, `sourceName`, and `sourceUrl`; descriptions and region are optional. Only HTTP(S) source URLs are accepted. Keep collection restricted to official tourism calendars, cultural institutions, venue/event organizer sites, and feeds whose terms permit reuse. Prefer RSS/iCal/API feeds over scraping; respect robots.txt, terms, rate limits, and attribution requirements. Do not invent events or infer dates from old articles.

## Scheduled collector still required

This pass provides the ingestion API and persistence boundary, not a live crawler. Add a scheduled Render Cron Job or external scheduler that fetches approved source feeds, normalizes them, and submits candidates. Keep the source list in configuration, log source URLs and fetch timestamps, detect duplicates, and flag changed/cancelled events for editorial review.

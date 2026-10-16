# Bonne Assise — editorial platform

Next.js App Router foundation for discovering Benin through food, places, people and local life. The code is split by responsibility so the application shell stays small and page components can evolve independently.

## Local development
```bash
npm install
npm run dev
```

## Architecture
- `app/`: Next.js routes, root layout, global CSS, API route and the small app shell.
- `components/ui/`: reusable UI primitives (buttons, headings, images, links, icon).
- `components/layout/`: shared site chrome (header and footer).
- `components/pages/`: page-level React components (home, explore, detail pages, journey, saved items and story).
- `lib/content.ts`: editorial seed data and destination catalog, separated from presentation.
- `lib/types.ts`: shared domain types.
- `lib/events.ts` and `app/api/events/`: event data model and API foundation.
- `public/images/benin/`: locally stored destination imagery and attribution records.
- `docs/event-ingestion.md`: proposal for sourced event ingestion and sponsor workflow.

## Routes and language
- `/en` and `/fr`: locale-prefixed entry points.
- `middleware.ts` redirects unprefixed routes based on browser language, defaulting to English.
- `NEXT_PUBLIC_API_BASE_URL` is retained for Render compatibility with a separately deployed API.

## Known limitations before production
- Internal prototype navigation still uses hash-based section state; migrate to real App Router routes before treating destination pages as production-ready.
- The current page copy is not yet fully translated into native English and French dictionaries.
- The event endpoint is an integration foundation, not an automated crawler. A production event pipeline still needs persistent storage, source connectors, scheduled ingestion, duplicate detection, editorial verification, expiration handling and sponsor disclosure.
- Verify every image's provenance, subject accuracy and commercial reuse rights before launch.
- Run `npm install`, `npm run lint` and `npm run build` in CI/Render before deployment. Dependency installation could not be completed in the current build environment, so this archive is not represented as build-verified.


## Pass 01–05 implementation notes
- Localized routes now use `/en` and `/fr` with path-based pages such as `/en/places/cotonou`, `/fr/food`, `/en/experiences`, `/en/stories`, `/en/trip`, and `/en/saved`.
- The home hero typography is deliberately smaller and scales with `clamp()` across breakpoints.
- Translation dictionaries live in `lib/i18n/messages.ts`; home hero, explore discovery labels, event empty state, header navigation, and footer are the initial localized surfaces. The remaining long-form editorial copy still needs full native translation before claiming complete i18n.
- Optional PostgreSQL-backed event catalogue: apply `db/schema.sql`, set `DATABASE_URL` and `EVENT_INGEST_TOKEN`. Ingestion stores draft candidates only; an automated source collector and editorial approval workflow remain to be configured.
- `npm run lint` and `npm run build` must pass in CI before deployment.

## Pass 06 — editorial content and full-viewport hero

- Locale editorial dictionaries live in `en/file.json` and `fr/file.json`. Navigation, footer, hero, explore, events and homepage section copy should be authored there, not duplicated in JSX.
- The homepage hero now fills the viewport (`100svh`) and uses a more restrained responsive type scale. The copy direction is food-led and invitation-based, inspired by the *editorial principle* of SEQ Food Trails without copying its wording or layout.
- New content should be reviewed for factual status before publication. Experience names, availability, prices, quotes, people, and bylines must be treated as editorial placeholders unless verified with a real local partner/source.
- Current limitation: some legacy copy remains in the detail, story, trip and saved page components and in `lib/content.ts`. Move that copy into the locale JSON dictionaries as part of the next content migration before declaring the JSON-only content requirement complete.

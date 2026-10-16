# English copy (legacy path)

Locale strings live under `lib/i18n/en/`, split by concern:

- `chrome.json` — nav, footer, ui, hero
- `home.json` — home, editions, people, foodCycles
- `explore.json` — explore, events
- `pages.json` — pages, detail, story, saved, trip, categories
- `places.json` / `foods.json` / `experiences.json` / `stories.json` — editorial entries

Loaded via `lib/i18n/messages.ts` → `getMessages(locale)`.

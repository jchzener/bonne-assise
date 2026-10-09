# Bonne Assise — Next.js frontend

This folder is the Next.js adaptation of the visually approved `Identity Step 01` React prototype.
The approved `src/index.css` was carried over to `app/globals.css` without redesigning the UI.

## Local development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Render

- Runtime: Node
- Root directory: `Frontend` (if this project is placed in the repository's `Frontend/` directory)
- Build command: `npm install --no-audit --no-fund && npm run build`
- Start command: `npm start`
- Environment: `NODE_VERSION=22.12.0`, `NEXT_TELEMETRY_DISABLED=1`
- Add `NEXT_PUBLIC_API_BASE_URL` when the new backend is available.

`NEXT_PUBLIC_API_BASE_URL` is read at build time by Next.js. It must be configured in Render before building if client-side code needs it.

The prototype does not yet depend on a backend. `lib/api.ts` centralizes URL construction for future API calls without inventing endpoints.

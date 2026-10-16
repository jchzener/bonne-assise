# Pass 01–05 QA checklist

## Routes to verify after deployment
- [ ] `/en` and `/fr`
- [ ] `/en/explore` and `/fr/explore`
- [ ] `/en/places/cotonou`, `/en/places/porto-novo`, `/en/places/ganvie`
- [ ] `/fr/places/cotonou`, `/fr/places/porto-novo`, `/fr/places/ganvie`
- [ ] `/en/food`, `/fr/food`
- [ ] `/en/experiences`, `/fr/experiences`
- [ ] `/en/stories`, `/fr/stories`
- [ ] `/en/trip`, `/fr/trip`, `/en/saved`, `/fr/saved`
- [ ] invalid locale and unknown route return 404
- [ ] language switch preserves the current route
- [ ] browser back/forward works without hash navigation

## Responsive checks
- [ ] 375px mobile, 768px tablet, 1280px desktop
- [ ] Hero title no longer dominates the viewport
- [ ] No horizontal overflow, clipped CTA or menu overlap
- [ ] Images have relevant alt text and correct destination subject

## Events API
- [ ] `GET /api/events?locale=en` and `?locale=fr`
- [ ] category filter rejects unknown category
- [ ] expired events are excluded
- [ ] ingestion without token returns 401
- [ ] ingestion with token but no database returns 503
- [ ] ingested candidates remain drafts; only editorially verified entries are public
- [ ] sponsored cards are clearly labelled

## Release gate
Run `npm install --no-audit --no-fund`, `npm run lint`, and `npm run build`. CI now runs all three checks. Browser interaction/responsive checks still require a deployed preview or local browser session.

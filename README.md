# BONNE ASSISE — Pass 12

Pass 12 introduces **The Assise Composition** and the first version of the site's quiet recommendation layer.

## What changed

- FR/EN end-to-end UI copy and localized mock fallbacks.
- Backend content localization for Home, Destinations and Experiences.
- Added `five-first-tables` to the FastAPI experience catalogue.
- Homepage interest signals stored locally in the browser and used to reorder experiences/stories.
- Anonymous interaction signals: interest selection, content open/read/save/journey signals.
- Recommendation layer is editorial/rule-based for now; no opaque AI ranking.
- New `/[locale]/journey` page.
- `/[locale]/ouidah` remains a compatibility redirect to `/[locale]/destinations/ouidah`.
- Navigation now prefers real URLs for Stories, Experiences, Destinations and Journey rather than unnecessary anchors.
- Assise Composition polish: personalization note, editorial spacing and journey composition.

## Render

The Blueprint uses the repository's lowercase `frontend` and `backend` directories:

- API: `backend`, FastAPI / Uvicorn
- Web: `frontend`, Next.js

Set `FRONTEND_ORIGIN` on the API and `NEXT_PUBLIC_API_BASE_URL` on the web service.

## Validation

TypeScript was checked with `tsc --noEmit` successfully in the build workspace.

A full `next build` could not be completed in the offline build environment because Next.js attempted to download its platform SWC binary. Render's normal networked build can perform that step.

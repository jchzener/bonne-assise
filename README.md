# BONNE ASSISE — Pass 13

## Definitive Responsive + Visual Polish

This pass establishes the responsive visual system for desktop, laptop, tablet and mobile.

### Product / visual decisions

- Mobile is treated as a first-class composition, not a compressed desktop.
- The homepage hero keeps GPS coordinates away from the mobile navigation controls.
- FIND YOUR BENIN reveals its editorial copy only on hover/focus/selection; the images remain intentionally quiet at rest.
- BENIN, RIGHT NOW uses a distinct single-row editorial interaction on desktop: one event occupies roughly 2/3 of the row and the others 1/3; hover/focus changes the dominant event. Mobile uses a swipeable editorial rail without navigation arrows.
- FIELD NOTES becomes a reading-list composition on mobile instead of another horizontal card gallery.
- Destination READ THE PLACE keeps copy below/overlapping the image rather than placing every text block on top of imagery.
- Destination EXPERIENCES remains limited to four items.
- Destination FOOD keeps the collage on larger screens and becomes a sequence of editorial still lifes on mobile so descriptions remain readable.
- YOUR JOURNEY now has a quiet status dot/count when saved items exist.
- Experiences and destination experience cards can be added to the journey with a small, non-intrusive control.
- `/[locale]/journey` displays saved items and allows removal.

### Validation

The modified TS/TSX files were checked for balanced braces. A local TypeScript build could not be run in this environment because dependencies are not installed and external npm access is unavailable. Render should run the authoritative production build.

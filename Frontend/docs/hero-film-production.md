# Bonne Assise hero film — production brief

## Creative direction
- Working title: **Live Benin. / Vivez le Bénin.**
- Hero copy: title only. No badge, subtitle, caption or CTA.
- Full viewport; documentary, human-centred and food-led without reducing Benin to food alone.
- Do not use an Amazon/jungle stock visual or a Cotonou aerial as the default opening image.
- Mix food preparation, market activity, urban everyday life, architecture, craft, social encounters, coast and inland landscapes.
- Ganvie can appear as one scene among many, not as the visual shorthand for the whole country.

## Development implementation
The React component is `components/home/hero.tsx`. Place an approved, locally hosted H.264 MP4 at `public/videos/benin-hero.mp4`.

The component uses muted autoplay, looping, `playsInline`, and a poster fallback. Keep the file lightweight, without an audio track. Before release, add a reduced-motion branch so visitors who prefer reduced motion receive only the poster, and verify mobile data/performance behaviour. Do not ship a video until its rights are cleared.

## Suggested edit (12–18 seconds)
1. 0–3s — food being prepared: hands, steam, ingredients, fire or utensils.
2. 3–6s — a real market or everyday street scene, with people in context.
3. 6–10s — architecture/craft/urban life across more than one Beninese location.
4. 10–14s — shared meal or meaningful human interaction.
5. 14–18s — a striking, calm final shot that can loop smoothly to the opening.

Use natural sound only if separately cleared; the homepage video should autoplay muted. Avoid rapid cuts, over-saturated grading, staged stereotypes and scenes that cannot be confidently located in Benin.

## Rights and source log
Do not extract or republish frames from third-party YouTube videos for the public site unless the relevant rights holder grants permission or an explicit licence permits this use. YouTube's Terms restrict downloading/reproducing content outside authorised features, and the uploader may not own every element (including music) in the video.

For each approved asset, record:
- asset filename and scene/location
- original URL and creator/rights holder
- written permission or licence name and URL
- attribution text and any restrictions
- date permission was checked
- releases/consent where identifiable people are featured

A frame grabbed for private editorial review is not automatically cleared for publication. Do not include any third-party YouTube frame in the production build until clearance is recorded.
## Homepage brand lockup — Pass 10

The homepage hero now uses **“Be Local.”** as the fixed title, with a smaller multicolour welcome above it. Greetings are stored in `en/file.json` and `fr/file.json`, not hardcoded in the component. The current sequence runs quickly through the list, pauses on the final greeting, then repeats. It respects the operating system's reduced-motion preference.

The proposed spellings for Beninese-language greetings are editorial placeholders and should be reviewed by fluent local speakers before launch. The hero still uses the Ouidah image as a temporary poster and expects a rights-cleared film at `/public/videos/benin-hero.mp4`.


# Parv Jain / Abstergo — PJ Hinge

PJ Hinge is Parv Jain’s person-first identity. `PARV JAIN` is always the primary recall target; `ABSTERGO / PRODUCT SYSTEMS` is the studio and domain descriptor.

## Concept and construction

The mark joins two filled architectural planes around one exact 45-degree signal cut. The warm mineral plane implies the `P`; the lichen plane and its lower turn resolve the `J`. The lime hinge is the only primary signal element. This is an interface plane meeting a system plane—compact, structural, and legible without a surrounding keyline.

The canonical geometry lives in `scripts/generate-brand-assets.mjs`. Run `npm run brand:generate` after changing it; never redraw paths in a component or individual export.

## Usage

- Minimum digital size: 16px.
- Minimum clearspace: one hinge width on every side.
- Use `pj-hinge-mark.svg` on dark/carbon surfaces and `pj-hinge-mark-light.svg` on warm/light surfaces.
- Use `pj-hinge-mark-mono.svg` only when production limits color to one ink.
- At lockup scale, pair the mark with live text: `PARV JAIN` above `ABSTERGO / PRODUCT SYSTEMS`.
- Do not put the mark in a stroked rounded square, add glow/gradients, recolor the hinge casually, distort it, or use generated key art as the logo.

## Multiverse treatments

PJ Hinge is the invariant identity across the two authored portfolio interfaces. The interface may change its material treatment, but it must not redraw or replace the geometry.

- **Systems Atlas:** use the full-color architectural mark against carbon, with lime restricted to the canonical hinge and high-priority system signals.
- **Editorial Ledger:** use the one-ink mono export like a printer’s device mark. Warm ivory, graphite, and oxide belong to the ledger; do not bring the Atlas lime into editorial chrome.

The shared phrase `Same work. Different interface.` is portfolio product chrome, not a permanent identity tagline. Keep `PARV JAIN` as the primary recall target in every mode.

## Palette

| Role | Value |
| --- | --- |
| Carbon canvas | `#080A09` |
| Warm mineral white | `#F2F0E8` |
| Graphite plane | `#151A16` |
| Lichen gray | `#9DA69C` |
| Signal lime | `#B6FF4A` |
| Oxide accent | `#E36F45` |

Signal lime is reserved for the hinge, active states, and the few interactions that genuinely need priority. Oxide is a tertiary editorial accent. Project imagery may retain its own colors.

## Typography

Manrope is the primary editorial sans and carries the name, display copy, and body text. IBM Plex Mono carries coordinates, descriptors, and the secondary studio tier. The lockup uses confident sans weight with tight tracking for `PARV JAIN`, then a smaller, wider mono line for `ABSTERGO / PRODUCT SYSTEMS`.

## Asset inventory

- `public/brand/pj-hinge-mark.svg` — canonical dark-surface mark export
- `public/brand/pj-hinge-mark-light.svg` — light-surface export
- `public/brand/pj-hinge-mark-mono.svg` — one-color export
- `public/brand/pj-hinge-pattern.svg` — derived hinge field
- `public/brand/pj-hinge-key-art.webp` — generated atmospheric key art
- `public/brand/brand-board.png` — identity contact sheet
- `public/brand/qa/favicon-scale-strip.png` — true-size dark/light scale check
- `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png` — framework icons
- `public/icons/parv-jain-192.png`, `parv-jain-512.png`, and `parv-jain-maskable-512.png` — manifest icons

## Generated key art disclosure

The selected supporting still was made with the built-in image-generation tool in `stylized-concept` mode. It does not contain or define the logo.

Final prompt:

> Use case: stylized-concept. Asset type: premium personal-brand key art for a product engineer portfolio. Primary request: an abstract architectural hinge made from two interlocking black mineral planes, joined by one precise luminous acid-lime incision; a subtle oxide-orange reflection appears on one edge. Scene/backdrop: near-black seamless studio void. Style/medium: premium editorial 3D still life, understated industrial design, physically plausible matte graphite and honed stone surfaces. Composition/framing: wide 3:2 composition, object right-of-center, strong negative space on the left, readable silhouette at thumbnail scale. Lighting/mood: controlled grazing light, calm, exact, quiet confidence. Color palette: carbon black, warm mineral white reflections, acid lime signal, very restrained oxide orange. Materials/textures: matte anodized metal, honed basalt, subtle paper-grain atmosphere. Constraints: no text, no letters, no logo, no watermark, no UI, no people, no floating random shapes, no cyberpunk glow, no generic neon tunnel, no excessive bloom.

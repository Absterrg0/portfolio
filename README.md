# Parv Jain / Abstergo — Portfolio Multiverse

One production portfolio, two authored interfaces. Every route presents the same identity, copy, systems, interface experiments, practice, capability, timeline, and contact destinations while changing the visual and interaction system completely.

| Route | Interface | Purpose | Search policy |
| --- | --- | --- | --- |
| `/` | Editorial Ledger | Warm-charcoal, serif-led editorial record | Indexed; canonical |
| `/atlas` | Systems Atlas | Dark architectural product-systems dossier | `noindex, follow`; canonicalizes to `/` |

A fixed bottom-right switch links the two styles with real Next.js routes.

## Edit content once

All substantive portfolio content and destinations live in the immutable, typed contract at `src/app/data/portfolio.ts`. Edit that file to update every interface. Do not place portfolio copy directly in a route renderer; route-local text is reserved for decorative interface language such as mission coordinates or register labels.

`scripts/verify-mode-content.mjs` transpiles the canonical TypeScript contract and checks the static production HTML for all routes. It proves project counts, canonical copy, section IDs and order, project/source/social/resume URLs, and mode SEO policy.

## Architecture

- `src/app/page.tsx` renders Editorial Ledger as a Server Component, scoped by `minimal.module.css`.
- `src/app/atlas/page.tsx` renders Systems Atlas as a Server Component, scoped by `globals.css`.
- `src/app/components/mode-switcher.tsx` is shared, server-rendered route chrome (fixed dock).
- `src/app/components/portfolio-json-ld.tsx` is the single structured-data factory.
- `src/app/components/site-header.tsx` remains Atlas’s narrow client boundary for its mobile dialog.
- Each mode has a distinct static 1200×630 Open Graph image route.

## Development and production QA

```bash
npm install
npm run dev
```

Production gates:

```bash
npm run lint
npm run typecheck
npm run build
npm run verify:modes
git diff --check
npm run start
```

`verify:modes` reads `.next/server/app/*.html` by default, so run it after `build`. Set `PORTFOLIO_URL` to validate a running deployment instead.

Browser QA covers every route at 1440×1000, 1280×800, 1024×768, 768×1024, 430×932, 390×844, and 360×800, plus back/forward mode navigation, metadata, and social-card rendering.

## Branding and captures

Brand geometry and usage live in `BRAND.md`. Run `npm run brand:generate` after changing the mark script. Mode Open Graph images are static routes under each page directory.

# abstergo.fyi

Parv Jain's portfolio. One page, monospace, plain ASCII art.

```
src/app/
  page.tsx                  the page
  globals.css               all styles (light and dark follow the system)
  data/portfolio.ts         every word of content and every link
  data/ascii.ts             the banner and diagrams, plain 7-bit ASCII
  components/ascii-torus.tsx the spinning torus (static under reduced motion)
  opengraph-image.tsx       social card, rendered with JetBrains Mono
```

Edit content in `data/portfolio.ts`. Keep art in `data/ascii.ts` pure ASCII so it lines up in any
monospace font.

```bash
npm install
npm run dev
npm run lint && npm run typecheck && npm run build
```

Pushing to `master` deploys to production on Vercel.

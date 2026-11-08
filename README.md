# abstergo.fyi

Parv Jain's portfolio. One page, monochrome, with ASCII art that is generated in code.

```
src/app/
  page.tsx                  the page
  globals.css               all styles (light and dark follow the system)
  data/portfolio.ts         every word of content and every link
  data/art.ts               grid sizes and descriptions for each ASCII piece
  art/render.ts             the renderers: moon and lake, crystal, voice waveform
  components/ascii-art.tsx  draws a piece; animates it on screen unless reduced motion is set
  opengraph-image.tsx       social card, rendered with JetBrains Mono
```

Edit content in `data/portfolio.ts`. The renderers only emit 7-bit ASCII, so the art lines up in any
monospace font; the server renders the first frame, so the page is complete without JavaScript.

```bash
npm install
npm run dev
npm run lint && npm run typecheck && npm run build
```

Pushing to `master` deploys to production on Vercel.

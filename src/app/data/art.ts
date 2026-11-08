// Grid sizes and descriptions for the procedural ASCII pieces in `src/app/art/render.ts`.
// `wide` is shown on desktop, `narrow` on phones; each grid fills its box's width.

export const art = {
  landscape: {
    wide: { cols: 150, rows: 38 },
    narrow: { cols: 76, rows: 36 },
    label: "ASCII drawing of a moon rising over three mountain ridges and a lake that reflects it.",
  },
  crystal: {
    wide: { cols: 34, rows: 23 },
    label: "ASCII drawing of a six-sided crystal turning slowly.",
  },
  waveform: {
    wide: { cols: 121, rows: 9 },
    narrow: { cols: 61, rows: 9 },
    label: "ASCII voice waveform.",
  },
} as const;

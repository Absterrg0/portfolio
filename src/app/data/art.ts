// Grid sizes and descriptions for the procedural ASCII pieces in `src/app/art/render.ts`.
// `wide` is shown on desktop, `narrow` on phones; each grid fills its box's width.

export const art = {
  landscape: {
    wide: { cols: 150, rows: 38 },
    narrow: { cols: 76, rows: 36 },
    label: "ASCII drawing of a moon rising over three mountain ridges and a lake that reflects it.",
  },
} as const;

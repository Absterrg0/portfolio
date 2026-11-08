// Every piece of art here is plain 7-bit ASCII so it lines up in any monospace font.

// Kurambit's fox, sitting with its tail curled round its front paws.
// Drawn as an outline; the dots near the tail's end are its white tip.
// The "o" on the third row is its eye; see `foxEye`.
export const fox = [
  "             /\\  /|",
  "            /  \\/ |",
  "      _.--'  o    \\",
  "  <--'             \\",
  "   `-._            |",
  "       `-.        (",
  "         /         \\",
  "        /           \\",
  "       (             \\",
  "       \\              \\",
  "        \\     .--.     \\",
  "         | | /          |",
  "  .-.    | |(          /",
  " (. .`-'-'--`-.__     /",
  "  `. . .          `-._/",
  "    `-.._______..---''",
] as const;

// Where the eye sits in `fox`: row and column of the single character.
export const foxEye = { row: 2, col: 13 } as const;

// One spoken request and the three kinds of thing Circe sorts it into.
// Each row is a list of [text, inked] runs; the inked runs trace the path the request takes.
type Run = readonly [string, boolean];

export const circeFigure: readonly (readonly Run[])[] = [
  [['"stop the agent on my laptop"', true]],
  [["   |", true]],
  [["   +", true], ["-- question    answer from live state", false]],
  [["   +-- operation   approve, stop or steer", true]],
  [["   `-- work        send to the thread that owns it", false]],
];

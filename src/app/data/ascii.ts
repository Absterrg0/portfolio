// Every piece of art here is plain 7-bit ASCII so it lines up in any monospace font.

// A red fox sitting with its tail around its paws: Kurambit's mascot.
// ":" is the dark coat, "." the white cheek, bib and tail tip.
// The two spaces after "':::" on the seventh row are its eye; see `foxEye`.
export const fox = [
  "                  /\\         /|",
  "                 /::\\       /:|",
  "                /::::\\     /::|",
  "               /::::::\\   /:::|",
  "              /::::::::\\ /::::|",
  "             /::::::::::V:::::\\",
  "        _.--':::  :::::::::::::\\",
  "  _.--''::::::::::::::::::::::::\\",
  "<'-......... .....:::::::::::::::\\",
  "   `-.............:::::::::::::::\\",
  "       `--.__.....::::::::::::::::\\",
  "             |.....::::::::::::::::|",
  "             |.....::::::::::::::::\\",
  "             |.....:::::::::::::::::|",
  "             |.....:::::::::::::::::\\",
  "             |.....::::::::::::::::::|",
  "             |.....::::::::::::::::::|",
  "             |....::::::::::::::::::::\\",
  "             |....:::::::::::::::::::::|",
  "             |...::::::::::::::::::::::|     _.--.._",
  "             |..::::::::::::::::::::::::\\ .-'::::::::`.",
  "             |.:::::::::::::::::::::::::|/::::::::::::::\\",
  "             |:::::::::::::::::::::::::::::::::::::::::::|",
  "             |::::|:::::::::::::::::::::::::::::::::::::/",
  "       .--.__|____|_______________.--'::::::::::::::::.'",
  "      (.......::::::::::::::::::::::::::::::::::::::.'",
  "       `-..______________________________________.-'",
] as const;

// Where the eye sits in `fox`: row, first column, and how many cells it spans.
export const foxEye = { row: 6, col: 16, width: 2 } as const;

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

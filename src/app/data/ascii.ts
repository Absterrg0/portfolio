// Every piece of art here is plain 7-bit ASCII so it lines up in any monospace font.

// The lighthouse from Tidewake, one of the games Kurambit made.
// The lamp turns through four phases: beam to the right, facing you, beam to the left, facing away.
const tower = [
  "                      .",
  "                     / \\",
  "                    /___\\",
  null, // lantern room, drawn per phase
  "                   |_____|",
  "                  [=======]",
  "                    |   |",
  "                    |   |",
  "                    |...|",
  "                   /     \\",
  "                   |     |",
  "                   |.....|",
  "                  /       \\",
  "                  |   _   |",
  "                  |  | |  |",
  "          ________|__|_|__|________",
  "      _.-'  .   '    .    '   .    '-._",
];

const lantern = [
  "                   | [@] |=====--- -- .",
  "                  -| [@] |-",
  "      . -- ---=====| [@] |",
  "                   | [ ] |",
];

const swell = [
  "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
  "   ~~~      ~~       ~~~~      ~~      ~~~   ",
  "        ~~      ~~~        ~~      ~~        ",
];

function shift(row: string, by: number) {
  const n = ((by % row.length) + row.length) % row.length;
  return row.slice(n) + row.slice(0, n);
}

// Frame i: the lamp changes phase every 5 frames, the swell drifts one column per frame.
export function lighthouse(i: number): string {
  const lamp = lantern[Math.floor(i / 5) % lantern.length];
  const sky = tower.map((row) => row ?? lamp);
  const sea = [swell[0], shift(swell[1], i), shift(swell[2], -i)];
  return [...sky, ...sea].join("\n");
}

// A spoken request and the three kinds of thing Circe sorts it into.
// Lines listed in `taken` are drawn in full ink: the request and the branch it lands on.
export const circeFigure = {
  lines: [
    '"stop the agent on my laptop"',
    " .:|:..:||||:.:||:..:|||:..:|.",
    "      |",
    "      |-- question   answer from live state",
    "      |-- operation  approve, stop or steer",
    "      `-- work       hand to the owning thread",
  ],
  taken: [0, 4],
} as const;

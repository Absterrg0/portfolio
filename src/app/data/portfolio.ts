export type Link = Readonly<{ label: string; href: string }>;

export const site = {
  url: "https://abstergo.fyi",
  name: "Parv Jain",
  role: "Full-stack developer",
  location: "Bengaluru, India",
  timeZone: "Asia/Kolkata",
  description:
    "Parv Jain is a full-stack developer in Bengaluru. He is building Kurambit, a Linux app that makes games with your coding agent, and Circe, which runs coding agents by voice.",
} as const;

export const intro =
  "I'm a full-stack developer. Both of my current projects are open-source apps built on T3 Code.";

export const kurambit = {
  name: "Kurambit",
  summary: "A Linux app that makes games with the coding agent you already use.",
  meta: "linux app, mit license",
  body: [
    "Kurambit makes games with the coding agent you already use. It builds them in Godot or three.js, and every model it makes in Blender keeps its .blend file and the script that generated it.",
    "A second session plays each build. Kurambit reverts any build that doesn't win a blind comparison with the last one.",
  ],
  links: [
    { label: "kurambit.com", href: "https://kurambit.com" },
    { label: "source", href: "https://github.com/Absterrg0/Kurambit" },
  ],
  gamesLabel: "test games it has made",
  games: [
    { name: "hollow reach", line: "ring three bells in a ruined cliffside monastery", engine: "godot" },
    { name: "tidewake", line: "a lighthouse keeper's roguelite on a flooded island", engine: "godot" },
    { name: "lantern hop", line: "catch fireflies before the candle burns out", engine: "three.js" },
    { name: "fox dash", line: "a fox grabs five gems while three slimes chase it", engine: "three.js" },
  ],
} as const;

export const circe = {
  name: "Circe",
  summary: "Runs coding agents by voice, with no LLM inside.",
  meta: "unfinished, built in the open",
  body: [
    "Circe runs coding agents by voice. It has no LLM of its own. It breaks each request into small questions about what is running and works out the action in code.",
  ],
  links: [
    { label: "heycirce.com", href: "https://heycirce.com" },
    { label: "source", href: "https://github.com/Absterrg0/circe" },
  ],
} as const;

export const earlier = [
  {
    name: "okito",
    line: "solana payment gateway and its typescript sdk",
    links: [
      { label: "app", href: "https://app.okito.abstergo.fyi/" },
      { label: "sdk", href: "https://okito.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/Okito-app" },
    ],
  },
  {
    name: "droplert",
    line: "live site notifications from one npm package",
    links: [
      { label: "site", href: "https://droplert.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/Alertify" },
    ],
  },
  {
    name: "decentrawork",
    line: "freelance marketplace paid through solana contracts",
    links: [
      { label: "site", href: "https://decentrawork.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/DecentraWork" },
    ],
  },
  {
    name: "justdraw",
    line: "a sketchbook that saves drawings in your browser",
    links: [
      { label: "site", href: "https://justdraw.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/JustDraw" },
    ],
  },
] as const;

export const interfaces = {
  name: "interfaces",
  links: [
    { label: "archive 07", href: "https://starwars.abstergo.fyi/" },
    { label: "neoai", href: "https://neoai.abstergo.fyi/" },
    { label: "clandestine", href: "https://clandestine.abstergo.fyi/" },
    { label: "components", href: "https://components.abstergo.fyi/one" },
  ],
} as const;

export const experience = [
  { where: "tb10 platform", what: "tournament platform with real-time game sync", when: "jan-jun 2026" },
  { where: "octasol", what: "github escrow flow and its solana contracts", when: "jul-aug 2025" },
  { where: "blolabel", what: "hls video pipeline for an annotation platform", when: "nov 2024-jun 2025" },
  { where: "msrit", what: "b.tech, computer science", when: "2023-2027" },
] as const;

export const contact = {
  email: "parvj5212@gmail.com",
  links: [
    { label: "github", value: "absterrg0", href: "https://github.com/absterrg0" },
    { label: "x", value: "@notabbytwt", href: "https://x.com/notabbytwt" },
    { label: "linkedin", value: "parv-jain", href: "https://www.linkedin.com/in/parv-jain-82169b297" },
    { label: "resume", value: "pdf", href: "/resume.pdf" },
  ],
} as const;

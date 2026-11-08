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
  "I'm a full-stack developer and a computer science student at MSRIT. Right now I'm building Kurambit and Circe, two open-source apps on T3 Code.";

export const kurambit = {
  name: "Kurambit",
  summary: "A Linux app that makes games with the coding agent you already use.",
  meta: "linux app, mit license",
  body: [
    "You describe a game and the coding agent you already use builds it in Godot or three.js. Any model it makes in Blender keeps its .blend file and the script that made it.",
    "A second session plays every build and reports what it saw. If a build doesn't beat the last one in a blind comparison, Kurambit reverts it.",
  ],
  links: [
    { label: "kurambit.com", href: "https://kurambit.com" },
    { label: "source", href: "https://github.com/Absterrg0/Kurambit" },
  ],
  gamesLabel: "test games it has made",
  games: [
    { name: "hollow reach", line: "ring three bells in a ruined monastery", engine: "godot" },
    { name: "tidewake", line: "roguelite down flooded floors to a boss", engine: "godot" },
    { name: "lantern hop", line: "catch fireflies before the candle dies", engine: "three.js" },
    { name: "fox dash", line: "grab five gems while slimes chase you", engine: "three.js" },
  ],
} as const;

export const circe = {
  name: "Circe",
  summary: "Runs coding agents by voice, with no LLM inside.",
  meta: "unfinished, built in the open",
  body: [
    "Circe runs coding agents by voice. It has no LLM of its own. It splits each request into small questions about what's running, then picks the action in code.",
    "When an agent fails, has a question or needs approval, Circe tells you without being asked.",
  ],
  links: [
    { label: "heycirce.com", href: "https://heycirce.com" },
    { label: "source", href: "https://github.com/Absterrg0/circe" },
  ],
} as const;

export const earlier = [
  {
    name: "okito",
    line: "solana payment gateway and sdk",
    links: [
      { label: "app", href: "https://app.okito.abstergo.fyi/" },
      { label: "sdk", href: "https://okito.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/Okito-app" },
    ],
  },
  {
    name: "droplert",
    line: "live notifications from one npm package",
    links: [
      { label: "site", href: "https://droplert.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/Alertify" },
    ],
  },
  {
    name: "decentrawork",
    line: "freelance marketplace, solana payments",
    links: [
      { label: "site", href: "https://decentrawork.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/DecentraWork" },
    ],
  },
  {
    name: "justdraw",
    line: "sketchbook that saves in your browser",
    links: [
      { label: "site", href: "https://justdraw.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/JustDraw" },
    ],
  },
] as const;

export const experiments = {
  label: "interface experiments",
  links: [
    { label: "archive 07", href: "https://starwars.abstergo.fyi/" },
    { label: "neoai", href: "https://neoai.abstergo.fyi/" },
    { label: "clandestine", href: "https://clandestine.abstergo.fyi/" },
    { label: "components", href: "https://components.abstergo.fyi/one" },
  ],
} as const;

export const experience = [
  { where: "tb10 platform", what: "tournaments with real-time game sync", when: "jan-jun 2026" },
  { where: "octasol", what: "github escrow and its solana contracts", when: "jul-aug 2025" },
  { where: "blolabel", what: "document annotation and hls video", when: "nov 2024-jun 2025" },
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

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

export const intro = [
  "I'm a full-stack developer in Bengaluru, studying computer science at MSRIT.",
  "Right now I'm building Kurambit and Circe. Both are open source and built on T3 Code.",
] as const;

export const kurambit = {
  name: "Kurambit",
  summary: "A Linux app that makes games with the coding agent you already use.",
  body: "A Linux app that makes games with the coding agent you already use. A second session plays every build, and a build that doesn't beat the last one in a blind comparison is reverted.",
  links: [
    { label: "kurambit.com", href: "https://kurambit.com" },
    { label: "source", href: "https://github.com/Absterrg0/Kurambit" },
  ],
  games: [
    {
      name: "hollow reach",
      engine: "godot",
      line: "Climb a ruined monastery to ring three bells. If a warden catches you, you go back to the last shrine.",
    },
    {
      name: "tidewake",
      engine: "godot",
      line: "A lighthouse keeper works down through flooded floors to a boss.",
    },
    {
      name: "lantern hop",
      engine: "three.js",
      line: "A paper lantern hops lily pads for fireflies before its candle burns out.",
    },
    {
      name: "fox dash",
      engine: "three.js",
      line: "A fox picks up five gems while three slimes chase it.",
    },
  ],
} as const;

export const circe = {
  name: "Circe",
  summary: "Runs coding agents by voice. There is no LLM inside it.",
  body: "Circe lets you run coding agents by voice. There's no LLM inside it. It asks small, grounded questions about what is running and works out the action in code.",
  note: "unfinished, built in the open",
  links: [
    { label: "heycirce.com", href: "https://heycirce.com" },
    { label: "source", href: "https://github.com/Absterrg0/circe" },
  ],
} as const;

export const earlier = [
  {
    name: "okito",
    line: "A Solana payment gateway, plus an SDK that wraps common Solana calls in TypeScript.",
    links: [
      { label: "app", href: "https://app.okito.abstergo.fyi/" },
      { label: "sdk", href: "https://okito.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/Okito-app" },
    ],
  },
  {
    name: "droplert",
    line: "Real-time notifications for any website, added with a small npm package.",
    links: [
      { label: "site", href: "https://droplert.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/Alertify" },
    ],
  },
  {
    name: "decentrawork",
    line: "A freelance marketplace on Solana where smart contracts handle the payments.",
    links: [
      { label: "site", href: "https://decentrawork.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/DecentraWork" },
    ],
  },
  {
    name: "justdraw",
    line: "A drawing app that keeps your sketches in the browser.",
    links: [
      { label: "site", href: "https://justdraw.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/JustDraw" },
    ],
  },
  {
    name: "interfaces",
    line: "Front-end experiments.",
    links: [
      { label: "archive 07", href: "https://starwars.abstergo.fyi/" },
      { label: "neoai", href: "https://neoai.abstergo.fyi/" },
      { label: "clandestine", href: "https://clandestine.abstergo.fyi/" },
      { label: "components", href: "https://components.abstergo.fyi/one" },
    ],
  },
] as const;

export const experience = [
  {
    when: "jan - jun 2026",
    where: "TB10 Platform",
    what: "Owned the architecture of their tournament platform. Wrote the Node game logic and the real-time sync between players.",
  },
  {
    when: "jul - aug 2025",
    where: "Octasol",
    what: "Built a GitHub escrow workflow and the Solana contracts behind its payments.",
  },
  {
    when: "nov 2024 - jun 2025",
    where: "Blolabel",
    what: "Worked on a document annotation platform and built its HLS video pipeline on S3 and MediaConvert.",
  },
  {
    when: "2023 - 2027",
    where: "MSRIT",
    what: "B.Tech in Computer Science, M.S. Ramaiah Institute of Technology.",
  },
] as const;

export const contact = {
  email: "parvj5212@gmail.com",
  links: [
    { label: "github", href: "https://github.com/absterrg0" },
    { label: "x", href: "https://x.com/notabbytwt" },
    { label: "linkedin", href: "https://www.linkedin.com/in/parv-jain-82169b297" },
    { label: "resume", href: "/resume.pdf" },
  ],
} as const satisfies { email: string; links: readonly Link[] };

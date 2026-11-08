export type Link = Readonly<{ label: string; href: string }>;

export const site = {
  url: "https://abstergo.fyi",
  name: "Parv Jain",
  role: "Full-stack developer",
  location: "Bengaluru, India",
  timeZone: "Asia/Kolkata",
  description:
    "Parv Jain is a full-stack developer in Bengaluru building Kurambit, a game studio that plays what it builds, and Circe, a voice-first control plane for coding agents.",
} as const;

export const intro = [
  "I build systems and the interfaces that sit on top of them, and I care about both halves equally.",
  "Lately that means tools that let coding agents do real work: make games, take orders by voice, and know when they got it wrong.",
] as const;

export const now = {
  kurambit: {
    name: "kurambit",
    tagline: "A game studio that plays what it builds.",
    description:
      "Describe a game. The coding agent you already use builds it in Godot and Blender, a separate tester session plays every build, and a blind comparison decides whether a change stays. Open source and local first.",
    links: [
      { label: "kurambit.com", href: "https://kurambit.com" },
      { label: "source", href: "https://github.com/Absterrg0/Kurambit" },
    ],
    games: [
      { name: "hollow-reach", engine: "godot", line: "climb a ruined cliffside monastery and ring three bells" },
      { name: "tidewake", engine: "godot", line: "a lighthouse keeper's roguelite on a flooded island" },
      { name: "lantern-hop", engine: "three", line: "a paper lantern hopping lily pads on a night pond" },
      { name: "fox-dash", engine: "three", line: "one fox, five gems, three slimes" },
    ],
  },
  circe: {
    name: "circe",
    tagline: "A voice-first control plane for coding agents.",
    description:
      "Say what you want and it lands on the machine, project and agent that own the work, grounded in what is actually running instead of guesses. Built on T3 Code.",
    links: [
      { label: "heycirce.com", href: "https://heycirce.com" },
      { label: "source", href: "https://github.com/Absterrg0/circe" },
    ],
  },
} as const;

export const work = [
  {
    name: "okito",
    line: "Solana payment gateway and its TypeScript SDK",
    links: [
      { label: "live", href: "https://app.okito.abstergo.fyi/" },
      { label: "sdk", href: "https://okito.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/Okito-app" },
    ],
  },
  {
    name: "droplert",
    line: "real-time in-app alerts from one npm package",
    links: [
      { label: "live", href: "https://droplert.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/Alertify" },
    ],
  },
  {
    name: "decentrawork",
    line: "freelance marketplace paid by smart contracts",
    links: [
      { label: "live", href: "https://decentrawork.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/DecentraWork" },
    ],
  },
  {
    name: "justdraw",
    line: "a local-first sketchbook for diagrams",
    links: [
      { label: "live", href: "https://justdraw.abstergo.fyi/" },
      { label: "src", href: "https://github.com/Absterrg0/JustDraw" },
    ],
  },
  {
    name: "interfaces",
    line: "frontend experiments",
    links: [
      { label: "archive-07", href: "https://starwars.abstergo.fyi/" },
      { label: "neoai", href: "https://neoai.abstergo.fyi/" },
      { label: "clandestine", href: "https://clandestine.abstergo.fyi/" },
      { label: "components", href: "https://components.abstergo.fyi/one" },
    ],
  },
] as const;

export const experience = [
  { when: "2026.01 - 2026.06", where: "TB10 Platform", what: "Full-stack developer. Owned a real-time tournament platform end to end." },
  { when: "2025.07 - 2025.08", where: "Octasol", what: "Solana escrow contracts and a GitHub payout workflow." },
  { when: "2024.11 - 2025.06", where: "Blolabel", what: "Full-stack developer. Document annotation, HLS video on AWS." },
  { when: "2023 - 2027", where: "MSRIT", what: "B.Tech, Computer Science. M.S. Ramaiah Institute of Technology." },
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

export type WorkLink = Readonly<{ label: string; href: string }>;

export type SystemProject = Readonly<{
  id: "okito" | "droplert" | "decentrawork" | "justdraw";
  index: string;
  title: string;
  category: string;
  description: string;
  stack: readonly string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  links: readonly WorkLink[];
}>;

export type InterfaceProject = Readonly<{
  id: "archive-07" | "neoai" | "clandestine" | "email" | "pricing" | "order" | "portfolio" | "grok" | "profile";
  index: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  span: "feature" | "wide" | "standard" | "compact";
  signal?: "green" | "mineral" | "oxide";
}>;

const systems = [
  {
    id: "okito", index: "SYS.01", title: "Okito", category: "Payment infrastructure / Current focus",
    description: "A Web3 payment gateway on Solana, designed around a direct developer and user experience.",
    stack: ["Next.js", "TypeScript", "Solana", "Web3", "React", "Tailwind"],
    image: "/images/projects/okito.webp", imageAlt: "Okito payment product interface", imageWidth: 2400, imageHeight: 1500,
    links: [{ label: "Live product", href: "https://app.okito.abstergo.fyi/" }, { label: "Source", href: "https://github.com/Absterrg0/Okito-app" }],
  },
  {
    id: "droplert", index: "SYS.02", title: "Droplert", category: "Real-time systems / npm",
    description: "A real-time website notification system integrated through a lightweight npm package.",
    stack: ["TypeScript", "npm", "JavaScript", "React", "Node.js"],
    image: "/images/projects/droplert.webp", imageAlt: "Droplert notification system dashboard", imageWidth: 2400, imageHeight: 1500,
    links: [{ label: "Live product", href: "https://droplert.abstergo.fyi/" }, { label: "Source", href: "https://github.com/Absterrg0/Alertify" }],
  },
  {
    id: "decentrawork", index: "SYS.03", title: "DecentraWork", category: "Marketplace / Web3",
    description: "A Solana-powered freelance marketplace with transparent transactions and smart-contract payments.",
    stack: ["Solana", "Web3", "Smart contracts", "React", "TypeScript"],
    image: "/images/projects/decentrawork.webp", imageAlt: "DecentraWork freelance marketplace interface", imageWidth: 2400, imageHeight: 1500,
    links: [{ label: "Live product", href: "https://decentrawork.abstergo.fyi/" }, { label: "Source", href: "https://github.com/Absterrg0/DecentraWork" }],
  },
  {
    id: "justdraw", index: "SYS.04", title: "JustDraw", category: "Creative tools / Canvas",
    description: "A responsive single-user drawing app with configurable tools, shapes, and a focused workspace.",
    stack: ["React", "Canvas API", "TypeScript", "Tailwind", "JavaScript"],
    image: "/images/projects/justdraw.webp", imageAlt: "JustDraw creative drawing workspace", imageWidth: 2400, imageHeight: 1500,
    links: [{ label: "Live product", href: "https://justdraw.abstergo.fyi/" }, { label: "Source", href: "https://github.com/Absterrg0/JustDraw" }],
  },
] as const satisfies readonly SystemProject[];

const interfaces = [
  { id: "archive-07", index: "INT.01 / NEW", title: "Archive 07 — Biographical Registry", description: "A field registry of known beings, origins, and appearances across the galactic record.", href: "https://starwars.abstergo.fyi/", image: "/images/interfaces/archive-07.webp", imageAlt: "Archive 07 character registry interface with technical field records", imageWidth: 2400, imageHeight: 1500, span: "feature", signal: "green" },
  { id: "neoai", index: "INT.02", title: "NeoAI", description: "Smart AI for shopping, delivery, and travel planning.", href: "https://neoai.abstergo.fyi/", image: "/images/interfaces/neoai-interface.webp", imageAlt: "NeoAI shopping and travel assistant interface", imageWidth: 2400, imageHeight: 1500, span: "wide", signal: "mineral" },
  { id: "clandestine", index: "INT.03", title: "Clandestine", description: "AI-powered cybersecurity with real-time threat detection.", href: "https://clandestine.abstergo.fyi/", image: "/images/interfaces/clandestine-interface.webp", imageAlt: "Clandestine cybersecurity platform interface", imageWidth: 2400, imageHeight: 1500, span: "standard", signal: "oxide" },
  { id: "email", index: "INT.04", title: "Email Management", description: "AI email dashboard with smart filtering and CRM context.", href: "https://components.abstergo.fyi/five", image: "/images/interfaces/email.webp", imageAlt: "Email management dashboard component", imageWidth: 2400, imageHeight: 1500, span: "standard" },
  { id: "pricing", index: "INT.05", title: "Pricing Plans", description: "A clear tiered subscription and pricing component.", href: "https://components.abstergo.fyi/one", image: "/images/interfaces/pricingplan.webp", imageAlt: "Pricing plans interface component", imageWidth: 2400, imageHeight: 1500, span: "compact" },
  { id: "order", index: "INT.06", title: "Order Customizer", description: "Shopify customer self-service order editing.", href: "https://components.abstergo.fyi/two", image: "/images/interfaces/order.webp", imageAlt: "Shopify order customization component", imageWidth: 2400, imageHeight: 1500, span: "compact" },
  { id: "portfolio", index: "INT.07", title: "Portfolio Component", description: "A concise profile and work showcase.", href: "https://components.abstergo.fyi/third", image: "/images/interfaces/portfolio.webp", imageAlt: "Minimal portfolio profile component", imageWidth: 2400, imageHeight: 1500, span: "compact" },
  { id: "grok", index: "INT.08", title: "Grok Dashboard", description: "A dense but legible AI dashboard interface.", href: "https://components.abstergo.fyi/four", image: "/images/interfaces/grok.webp", imageAlt: "Grok AI dashboard interface", imageWidth: 2400, imageHeight: 1500, span: "wide", signal: "mineral" },
  { id: "profile", index: "INT.09", title: "User Avatar", description: "An elegant user avatar and profile display.", href: "https://components.abstergo.fyi/six", image: "/images/interfaces/profile.webp", imageAlt: "User avatar and profile component", imageWidth: 2400, imageHeight: 1500, span: "standard" },
] as const satisfies readonly InterfaceProject[];

const capabilities = [
  { index: "CAP.01", title: "Product interface", items: "React · Next.js · TypeScript · Tailwind · TanStack Query · Motion · Figma" },
  { index: "CAP.02", title: "Application systems", items: "Node / Express · PostgreSQL · Redis · Prisma · APIs" },
  { index: "CAP.03", title: "Delivery & tooling", items: "Git · Docker · Linux · AWS" },
  { index: "CAP.04", title: "Protocol depth", items: "Solana · Web3 · SDKs · Real-time systems" },
] as const;

export const portfolioContent = {
  identity: {
    name: "Parv Jain",
    studio: "Abstergo",
    descriptor: "Product systems",
    role: "Full-stack Developer",
    discipline: "Product + interface",
    location: "Bengaluru, India",
    availability: "Available for work",
    availabilityLong: "Available for internships, full-time and freelance",
    focus: "Okito / Solana",
    timeZone: "Asia/Kolkata",
  },
  navigation: [
    { href: "#systems", label: "Systems", index: "01" },
    { href: "#interfaces", label: "Interfaces", index: "02" },
    { href: "#practice", label: "Practice", index: "03" },
    { href: "#about", label: "About", index: "04" },
    { href: "#contact", label: "Contact", index: "05" },
  ],
  modes: {
    label: "Portfolio view / 2 styles",
    statement: "Two authored interfaces. One identical body of work.",
    callout: "2 interfaces / 1 body of work",
    options: [
      { id: "minimal", label: "Minimal", href: "/" },
      { id: "atlas", label: "Atlas", href: "/atlas" },
    ],
  },

  hero: {
    eyebrow: "Full-stack Developer / Systems + interface",
    titleLead: "I design the interface",
    titleMiddle: "and build the system",
    titleTail: "behind it.",
    biography: "I’m Parv Jain, a full-stack developer focused on scalable systems, real-time applications, and developer-first tools—built with clean architecture, strong performance, and end-to-end product ownership.",
    actions: [
      { label: "View selected systems", href: "#systems" },
      { label: "Explore interface work", href: "#interfaces" },
    ],
  },
  sections: {
    systems: { index: "02 / 05", eyebrow: "Selected systems", title: "Products that work all the way through.", description: "Selected full-stack systems where product thinking, interface craft, and underlying architecture operate as one." },
    interfaces: { index: "03 / 05", eyebrow: "Interface archive / Frontend work", title: "Interfaces are not the surface. They are the system made visible.", description: "Nine experiments and production concepts across commerce, AI, cybersecurity, identity, and information architecture.", register: "Register / 09 entries", range: "2024—2026", discipline: "Discipline / UI engineering" },
    practice: { index: "04 / 05", eyebrow: "Package / Capability", title: "A wide practice, kept coherent.", description: "I move across the stack without separating interface quality from system quality." },
    about: { eyebrow: "05 / 05 — About / Experience", title: "Curiosity, made operational." },
  },
  systems,
  interfaces,
  practice: {
    record: "Package record / SDK.01",
    status: "Active",
    eyebrow: "TypeScript / Solana / Web3 / npm / SDK",
    title: "Okito SDK",
    description: "A developer-friendly TypeScript wrapper that makes common Solana functions direct, typed, and easier to integrate.",
    links: [{ label: "Site & docs", href: "https://okito.abstergo.fyi/" }, { label: "Source", href: "https://github.com/Absterrg0/Okito-app" }],
  },
  capabilities,
  about: {
    biography: "I’m Parv Jain, a full-stack developer who takes products from interface decisions through backend architecture and deployment. My work centers on scalable systems, real-time applications, developer-first tools, clean architecture, and performance.",
    portrait: "/images/profile/parv-jain.webp",
    portraitAlt: "Portrait of Parv Jain",
    profileRecord: "Identity / PJ.01",
    profileLine: "Full-stack Developer · Bengaluru, India",
  },
  timeline: [
    { id: "tb10", index: "EXP.01", date: "FEB 2026—PRESENT", title: "TB10 Platform", role: "Full-stack Developer / Game Infrastructure / Remote", description: "Owns the architecture and development of a full-stack tournament platform: a React and Tailwind frontend, Node.js game logic and APIs, scalable workflows, and real-time state synchronization for multiplayer-style experiences." },
    { id: "octasol", index: "EXP.02", date: "JUL 2025—AUG 2025", title: "Octasol", role: "Freelancer / Escrow Workflow / Remote", description: "Built a GitHub escrow workflow and Solana smart contracts for secure payments, contributing to on-chain execution, testing, and workflow automation." },
    { id: "blolabel", index: "EXP.03", date: "NOV 2024—FEB 2025", title: "Blolabel", role: "Full-stack Developer / Remote", description: "Built a document annotation platform with structured labeling, editing, layered metadata, and real-time feedback; designed document storage and annotation workflows; implemented HLS video processing with AWS S3 and MediaConvert; and integrated Cleanvoice AI audio filtering." },
    { id: "education", index: "EDU.01", date: "2023—2027", title: "M.S. Ramaiah Institute of Technology", role: "B.Tech / Computer Science Engineering / Bengaluru", description: "Bachelor of Technology in Computer Science Engineering." },
  ],
  contact: {
    coordinate: "Channel / Open",
    zone: "India / UTC +05:30",
    eyebrow: "Available for internships, full-time & freelance",
    titleLead: "Let’s make something",
    titleTail: "clear, useful, and real.",
    email: "parvj5212@gmail.com",
    social: [
      { label: "GitHub", href: "https://github.com/absterrg0/" },
      { label: "X / Twitter", href: "https://x.com/intent/follow?screen_name=notabbytwt" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/parv-jain-82169b297" },
    ],
    resume: { label: "Résumé", href: "/resume.pdf" },
  },
  footer: {
    identity: "Parv Jain / Abstergo",
    builtWith: "Built with Next.js + TypeScript",
    origin: "Back to origin",
  },
} as const;

export type PortfolioContent = typeof portfolioContent;

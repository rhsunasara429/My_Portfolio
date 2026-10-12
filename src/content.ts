/**
 * ALL site copy lives here so the portfolio stays easy to update.
 * Edit text below — no component changes needed.
 *
 * Honesty rules (do not break these):
 * - No invented jobs, clients, metrics, revenue, testimonials, or awards.
 * - Dhyaan is a PERSONAL build for my own use + a learning experiment in
 *   how AI creates software. Do not frame it as a product for users/students.
 *   Do not claim users, validation, or "students like me" as the audience.
 *   The live link is view-only proof ("look at my build"), not onboarding.
 * - Links must work. The Dhyaan repo URL below returned 404 at last check
 *   (repo may be private or unpushed) — verify before sharing widely.
 * - Live Dhyaan deployment verified 2026-10-11:
 *   https://dhyaan.rhsunasara429.workers.dev (spelling "rhsunasara", matches GitHub).
 */

export const profile = {
  name: "Rashidali",
  wordmark: "Rashidali",
  eyebrow: "Developer × Aspiring Founder",
  location: "Ahmedabad, IN",
  college: "SAL Institute of Technology and Engineering Research",
  degree: "B.Tech, Computer Science (AI/ML) — First year",
  email: "rhsunasara429@gmail.com",
  linkedin: "https://www.linkedin.com/in/rashidali-h/",
  github: "https://github.com/rhsunasara429",
  /** Hero portrait. File: public/portrait.png */
  portrait: "/portrait.png" as string | null,
} as const;

export const hero = {
  titleA: "CS student by day,",
  titleB: "product builder by night.",
  typedRoles: [
    "built Dhyaan — a personal task tool I use myself",
    "learning how AI actually turns ideas into software",
    "learning AI/ML from the maths up",
    "studying how software becomes a business",
  ],
  standfirst:
    "I'm Rashidali, a first-year CS student who learns by building for himself. Dhyaan is my personal task-capture tool — I built it for my own college life, and to learn first-hand how AI creates software. I directed every decision; the AI helped me execute it.",
  primaryCta: { label: "See My Personal Build", href: "#work" },
  secondaryCta: { label: "The Bet I'm Making", href: "#bet" },
  meta: ["Based in Ahmedabad", "Built Dhyaan for myself", "Learning how AI builds software"],
} as const;

export const ticker = [
  "Problem-first",
  "AI-assisted",
  "Learning in public",
  "React",
  "TypeScript",
  "Founder path",
  "Built Dhyaan for myself",
  "CS fundamentals",
] as const;

export const manifesto = {
  lines: [
    { text: "Most students learn to code.", dim: false },
    { text: "I'm learning to find problems", dim: false },
    { text: "worth coding about.", dim: true },
  ],
  tag: "The bet — skills compound, products teach, users decide",
} as const;

export interface Project {
  no: string;
  name: string;
  tagline: string;
  status: string;
  stageNote: string;
  problem: string;
  audience: string;
  solution: string;
  role: string;
  stack: string[];
  decisions: string[];
  lessons: string[];
  /** User-provided 2026-10-11. Returned HTTP 404 on last check — repo may be private. */
  repoUrl: string;
  /** Live deployment — verified reachable 2026-10-11. Null until one exists. */
  liveUrl: string | null;
}

/** Add future projects here — the Work section renders this array. */
export const projects: Project[] = [
  {
    no: "No. 01",
    name: "Dhyaan",
    tagline: "My personal task-capture tool — built for my own college life, and as a hands-on way to learn how AI creates software.",
    status: "Personal build · Ongoing",
    stageNote:
      "This is not a product for users. I built it for myself and I use it myself. The live link is just so you can look at my build — not a launch.",
    problem:
      "My own college tasks were scattered — notebooks, group chats, memory. I kept forgetting things, so I wanted one fast place of my own to dump a task in seconds and trust it would still be there later.",
    audience:
      "I made it only for me: someone rushing between classes who wants to note something down in seconds and check it off the same day. Nobody else needs to use it for it to be successful.",
    solution:
      "I open my app, type the task, and get on with my day. I added a subject and due date because I personally need them, a tick-off flow I like, and one gentle evening reminder about what's left — tuned exactly how I want it.",
    role: "I designed and directed the whole thing, with an AI coding assistant writing code alongside me. Every decision was mine, I reviewed and understood all of it — and that process taught me how AI actually turns an idea into working software: specifying, iterating, debugging, and knowing when to correct it.",
    stack: ["React", "TypeScript", "Vite", "Plain CSS", "localStorage", "PWA"],
    decisions: [
      "My tasks are saved in my own browser — so my app works offline between classes, with no account and no server to maintain.",
      "Adding a task takes seconds: one box, one tap. I built that speed for myself because that's the whole point.",
      "No server by design: it's an installable phone app for my personal use, instead of backend systems I don't need for one user — me.",
      "When I add new features, my previously saved tasks keep working — nothing gets wiped.",
    ],
    lessons: [
      "I learned how AI actually builds software: I specify the idea, it drafts the code, I review, correct, and re-prompt until it matches what I meant.",
      "The evening reminder can't ring like an alarm when my app is closed — so it honestly catches up the next time I open it.",
      "A little celebration feels good once; every single time feels noisy. I tuned big moments for my own milestones only.",
      "Building for reduced motion taught me accessibility shapes real code — that change came from testing the app on myself.",
    ],
    repoUrl: "https://github.com/rhsunasara429/Dhyaan",
    liveUrl: "https://dhyaan.rhsunasara429.workers.dev",
  },
];

export const about = {
  heading: "A builder learning in public.",
  paragraphs: [
    "I'm in my first year of a computer science degree, specialising in AI and machine learning — and most of my real education so far has come from building things for myself.",
    "My rule is simple: understand the problem before writing code. I sketch the solution, reason about trade-offs, then use AI tools to execute faster. The thinking stays mine; the assistant handles the typing — and reviewing its work taught me how AI actually creates software.",
    "Alongside the engineering, I'm studying how software becomes a sustainable product — how founders spot problems, validate before they scale, and turn tools into businesses. Dhyaan is separate from that: it's my personal tool that I use daily, and the hands-on experiment where I learned the AI-assisted workflow.",
  ],
} as const;

export const explorations = {
  heading: "What I'm exploring",
  note: "Active learning areas — not mastered skills. Each one feeds the founder path.",
  items: [
    {
      title: "Software engineering & app development",
      detail: "Fundamentals first: how real applications are structured, tested, and shipped.",
    },
    {
      title: "Artificial intelligence & machine learning",
      detail: "My degree specialisation — currently the maths and foundations, not applied claims.",
    },
    {
      title: "AI-assisted development workflows",
      detail: "Using coding agents well: specifying, reviewing, and staying responsible for the output.",
    },
    {
      title: "SaaS & entrepreneurship",
      detail: "How useful software becomes a business — pricing, positioning, and patience.",
    },
    {
      title: "Problem discovery & validation",
      detail: "Finding recurring problems worth solving before committing to a solution.",
    },
  ],
} as const;

/** Update freely as priorities change. Keep entries dated and plain. */
export const now = {
  heading: "Now",
  updated: "October 2026",
  items: [
    "Strengthening CS and software engineering fundamentals alongside my degree.",
    "Using Dhyaan daily — my personal task tool — and polishing it for myself while studying what the AI-assisted build taught me.",
    "Learning how AI creates software: specifying, reviewing, debugging, and staying responsible for the output.",
    "Exploring how useful software becomes a sustainable product — separate from Dhyaan, which stays personal.",
  ],
} as const;

export const contact = {
  heading: "Have a problem worth solving?",
  body: "The fastest way to reach me is email. Student-built software, AI-assisted workflows, startup ideas, or a problem you think deserves a better tool — I reply to thoughtful mail.",
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Bet", href: "#bet" },
  { label: "Path", href: "#journey" },
  { label: "About", href: "#about" },
  { label: "Now", href: "#now" },
  { label: "Contact", href: "#contact" },
] as const;

/** Honest timeline — only things that verifiably happened, year precision. */
export const journey = {
  heading: "The path so far",
  note: "No fake jobs, no inflated titles — just what's actually happened.",
  steps: [
    {
      when: "2026",
      state: "Done",
      title: "Started CS (AI/ML)",
      detail:
        "First-year B.Tech at SAL, Ahmedabad. Chose the degree — and started learning how computers really work.",
    },
    {
      when: "Oct 2026",
      state: "Done",
      title: "Designed & built Dhyaan for myself",
      detail:
        "A personal task-capture tool I use daily, built with an AI coding assistant. Deployed to Cloudflare so anyone can look at my build — not a product launch.",
    },
    {
      when: "Now",
      state: "Now",
      title: "Learning how AI builds software",
      detail:
        "Studying my own build: what the AI did well, where I had to correct it, and how specifying + reviewing turns an idea into working code.",
    },
    {
      when: "Next",
      state: "Next",
      title: "Keep building for myself, keep studying founders",
      detail:
        "More personal builds to sharpen the craft — and separately, studying how real products get validated and become businesses.",
    },
  ],
} as const;

export const vision = {
  heading: "A letter to the future",
  body: [
    "I don't know which problem I'll spend my career on yet. That's an honest sentence, and I'd rather write it than a grand one.",
    "But I have a hunch: the best software respects people's attention instead of harvesting it. Dhyaan is my personal proof of that — a small tool I built for myself that captures a thought in seconds and gets out of my way. Building it taught me how AI actually turns an idea into working software.",
    "If you're a student, a builder, or someone curious about AI-assisted building — let's talk. The future gets built by people who start before they feel ready.",
  ],
  sign: "— Rashidali, October 2026",
} as const;

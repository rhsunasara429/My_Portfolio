/**
 * ALL site copy lives here so the portfolio stays easy to update.
 * Edit text below — no component changes needed.
 *
 * Honesty rules (do not break these):
 * - No invented jobs, clients, metrics, revenue, testimonials, or awards.
 * - Dhyaan is "Early-stage / ongoing". Do not claim users or validation.
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
    "shipping Dhyaan, a task-capture app for students",
    "learning AI/ML from the maths up",
    "studying how software becomes a business",
    "looking for problems worth solving",
  ],
  standfirst:
    "I'm Rashidali, a first-year CS student who thinks like a founder: find a real problem, reason about the solution, then build. I use AI coding tools to move fast — but the thinking stays mine.",
  primaryCta: { label: "See What I'm Building", href: "#work" },
  secondaryCta: { label: "The Bet I'm Making", href: "#bet" },
  meta: ["Based in Ahmedabad", "Building Dhyaan", "Open to ideas"],
} as const;

export const ticker = [
  "Problem-first",
  "AI-assisted",
  "Learning in public",
  "React",
  "TypeScript",
  "Founder path",
  "Shipping Dhyaan",
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
    tagline: "A simple app for noting down college tasks in seconds — and finishing them the same day.",
    status: "Work in progress",
    stageNote:
      "A working demo I'm still improving. No real students have tested it yet, so I make no claims about users.",
    problem:
      "In college, homework and reminders live everywhere — notebooks, group chats, memory. Things get forgotten.",
    audience:
      "It's for students like me: people rushing between classes who need to note something down in seconds and trust it'll still be there later.",
    solution:
      "Open the app, type the task, get on with your day. Add a subject or a due date if you like, tick tasks off as you finish, and get one gentle evening reminder about what's left.",
    role: "I built it myself, with an AI coding assistant helping me write the code. Every decision was mine, and I understand how all of it works.",
    stack: ["React", "TypeScript", "Vite", "Plain CSS", "localStorage", "PWA"],
    decisions: [
      "Your tasks are saved in your own browser — so the app works offline between classes, with no account and no server.",
      "Adding a task takes seconds: one box, one tap. That speed is the whole point.",
      "No server by design: it's an installable phone app instead of backend systems I'm not ready to run yet.",
      "When I add new features, previously saved tasks keep working — nothing gets wiped.",
    ],
    lessons: [
      "The evening reminder can't ring like an alarm when the app is closed — so it honestly catches up the next time you open it.",
      "A little celebration feels good once; every single time feels noisy. Big moments are saved for milestones.",
      "Designing for people who prefer less motion changed how the app's animations were built — accessibility shapes real code.",
    ],
    repoUrl: "https://github.com/rhsunasara429/Dhyaan",
    liveUrl: "https://dhyaan.rhsunasara429.workers.dev",
  },
];

export const about = {
  heading: "A builder learning in public.",
  paragraphs: [
    "I'm in my first year of a computer science degree, specialising in AI and machine learning — and most of my real education so far has come from building things.",
    "My rule is simple: understand the problem before writing code. I sketch the solution, reason about trade-offs, then use AI tools to execute faster. The thinking stays mine; the assistant handles the typing.",
    "Alongside the engineering, I'm studying how software becomes a sustainable product — talking to potential users, testing whether a problem is real, and learning how founders validate before they scale. Dhyaan is where I practise all of it.",
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
    "Building and improving Dhyaan — capture flow, reliability, and small polish.",
    "Learning to investigate real user problems instead of assuming them.",
    "Exploring how useful software becomes a sustainable product.",
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
      title: "Designed, built & shipped Dhyaan",
      detail:
        "A working task-capture app, built with AI assistance and deployed to Cloudflare where anyone can try it.",
    },
    {
      when: "Now",
      state: "Now",
      title: "Validating the problem",
      detail:
        "Talking to students and watching what they actually do — learning whether the problem is real before adding features.",
    },
    {
      when: "Next",
      state: "Next",
      title: "Whatever survives contact with users",
      detail:
        "The version real students actually use becomes Dhyaan v1. The users decide, not me.",
    },
  ],
} as const;

export const vision = {
  heading: "A letter to the future",
  body: [
    "I don't know which problem I'll spend my career on yet. That's an honest sentence, and I'd rather write it than a grand one.",
    "But I have a hunch: the best software respects people's attention instead of harvesting it. Dhyaan is a tiny bet in that direction — a tool that captures a thought in seconds and gets out of your way.",
    "If you're a student, a builder, or someone with a problem that deserves a better tool — let's talk. The future gets built by people who start before they feel ready.",
  ],
  sign: "— Rashidali, October 2026",
} as const;

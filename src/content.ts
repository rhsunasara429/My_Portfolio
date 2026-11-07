/**
 * ALL site copy lives here so the portfolio stays easy to update.
 * Edit text below — no component changes needed.
 *
 * Honesty rules (do not break these):
 * - No invented jobs, clients, metrics, revenue, testimonials, or awards.
 * - Dhyaan is a PERSONAL project for my own college routine. Do not frame
 *   it as a launched product, and do not claim users, traction, or demand.
 *   The live link opens a view-only copy (localStorage demo in the
 *   visitor's own browser), not onboarding.
 * - Dhyaan repo is public: https://github.com/rhsunasara429/Dhyaan
 *   (verified reachable 2026-10-12). repoUrl links to it.
 * - Live Dhyaan deployment verified reachable 2026-10-12:
 *   https://dhyaan.rhsunasara429.workers.dev (JS SPA + web manifest).
 * - Each section adds something new. Do not restate the same idea twice.
 */

export const profile = {
  name: "Rashidali",
  wordmark: "Rashidali",
  eyebrow: "B.Tech CSE (AI/ML) · Ahmedabad",
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
  titleA: "Learning software",
  titleB: "by building things I need.",
  typedRoles: [
    "First-year B.Tech CSE (AI/ML) at SAL, Ahmedabad",
    "Built Dhyaan for my college routine",
    "Strengthening CS fundamentals",
  ],
  standfirst:
    "I'm Rashidali, a first-year CS student. I built Dhyaan after finding it difficult to keep track of college tasks scattered across chats, notes, and memory. I used an AI coding agent to help implement it. My work involved defining what the app should do, reviewing changes, testing the result, and correcting problems along the way.",
  primaryCta: { label: "See Dhyaan", href: "#work" },
  secondaryCta: { label: "About me", href: "#about" },
  meta: ["Based in Ahmedabad", "First-year B.Tech CSE (AI/ML)", "Built Dhyaan for my routine"],
} as const;

export const ticker = [
  "B.Tech CSE (AI/ML)",
  "Ahmedabad",
  "Dhyaan — task capture",
  "React + TypeScript",
  "Local-first",
  "Installable PWA",
] as const;

export interface FilmChapter {
  no: string;
  label: string;
  title: string;
  body: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/**
 * Pinned scroll film: a four-chapter journey story scrubbed by scrolling.
 * Keep chapter copy short — it is displayed over a moving canvas scene.
 */
export const film: { tag: string; hint: string; chapters: FilmChapter[] } = {
  tag: "A short scroll film — four chapters",
  hint: "Scroll to play",
  chapters: [
    {
      no: "01",
      label: "Origin",
      title: "Hi, I'm Rashidali.",
      body: "First-year B.Tech CSE (AI/ML) student in Ahmedabad, learning software by building things I need.",
    },
    {
      no: "02",
      label: "Learning",
      title: "Learning the fundamentals, one build at a time.",
      body: "Strengthening CS fundamentals and putting them into practice with personal projects.",
    },
    {
      no: "03",
      label: "Building",
      title: "So I built Dhyaan.",
      body: "A simple task-capture app for my own college routine — planned, tested and corrected with an AI coding agent.",
    },
    {
      no: "04",
      label: "Next",
      title: "Still early. Still building.",
      body: "The next chapter is unwritten. For now, see what I've built and what I'm focused on.",
      primary: { label: "See my work", href: "#work" },
      secondary: { label: "Say hello", href: "#contact" },
    },
  ],
};

/** A single principle, stated once. Do not repeat it elsewhere. */
export const manifesto = {
  lines: [
    {
      text: "Before I ask AI to build something, I want to understand why it should exist.",
      dim: false,
    },
  ],
  tag: "A principle I work by",
} as const;

export interface Project {
  no: string;
  name: string;
  tagline: string;
  status: string;
  stageNote: string;
  problem: string;
  solution: string;
  role: string;
  /** One-line takeaway shown in the quick-scan summary. */
  learning: string;
  /** Max three short labels for the quick-scan summary. */
  features: readonly string[];
  stack: string[];
  decisions: string[];
  lessons: string[];
  /** Public repo URL. Null only if no public repo exists. */
  repoUrl: string | null;
  /** Live deployment — verified reachable 2026-10-12. Null until one exists. */
  liveUrl: string | null;
}

/** Add future projects here — the Work section renders this array. */
export const projects: Project[] = [
  {
    no: "No. 01",
    name: "Dhyaan",
    tagline: "A task-capture app for my college routine.",
    status: "Personal project · Ongoing",
    stageNote:
      "A personal project for my own routine. The live link opens a view-only copy so you can look at the build — anything you type saves only in your own browser.",
    problem:
      "College tasks were scattered across chats, notebooks, and memory.",
    solution: "One simple place to capture tasks and keep track of them.",
    role: "I used an AI coding agent to help implement the app, defining requirements, reviewing changes, testing behaviour, and iterating on problems.",
    learning:
      "AI can generate code. Building something useful still requires clear decisions and testing.",
    features: ["Quick task capture", "Optional due dates", "Offline, mobile-friendly"] as const,
    stack: ["React", "TypeScript", "Vite", "Plain CSS", "localStorage", "PWA"],
    decisions: [
      "Tasks save in the browser's local storage — no account or server, and it works offline.",
      "Adding a task is one box and one tap, because capture speed is the point.",
      "No backend: one user (me) doesn't need server infrastructure.",
      "Saved tasks survive app updates — new features don't wipe what's there.",
    ],
    lessons: [
      "Generated code still needs reviewing — I caught behaviour that didn't match what I asked for only by testing it myself.",
      "Features need clearly defined expected behaviour before asking for them; vague requests came back vague.",
      "Small changes are easier to validate — one fix at a time kept testing manageable.",
    ],
    repoUrl: "https://github.com/rhsunasara429/Dhyaan",
    liveUrl: "https://dhyaan.rhsunasara429.workers.dev",
  },
];

export const about = {
  heading: "I'm early in the journey, and that's the point.",
  paragraphs: [
    "I'm a first-year B.Tech student specialising in Computer Science and AI/ML at SAL Institute in Ahmedabad.",
    "I'm strengthening my programming and computer science fundamentals while using personal projects to put what I learn into practice.",
    "I enjoy working with AI coding tools, but I don't want to blindly accept what they produce. I want to improve at defining problems, making technical decisions, reviewing code, and understanding why something does not work.",
    "Longer term, I want to build useful software and understand the business around it: how to find problems that matter, test assumptions, and earn people's trust.",
  ],
} as const;

/** One compact focus list. Not a skills list — no mastery claims. */
export const now = {
  heading: "Current focus",
  updated: "October 2026",
  items: [
    "Strengthening CS and software engineering fundamentals alongside my degree.",
    "Practising how to plan, review, test, and debug applications built with AI coding agents.",
    "Learning problem discovery and product validation — how useful software becomes a sustainable business.",
  ],
} as const;

export const contact = {
  heading: "Have a problem worth thinking through?",
  body: "I'm happy to hear from students, builders, and people working on interesting problems. Reach out about something you're building, an idea you're exploring, or a problem that deserves a better solution.",
  form: {
    /**
     * Formspree form ID — the part after https://formspree.io/f/ .
     * Create a free form at https://formspree.io (deliver to rhsunasara429@gmail.com),
     * then paste the ID here. While empty, the form falls back to opening the
     * visitor's email app with the message prefilled.
     */
    formspreeId: "xzeeqrzg",
    eyebrow: "Email me",
    title: "Send a message.",
    lede: "A few lines are enough. It lands straight in my inbox — no account needed.",
    name: "Name",
    email: "Email",
    message: "Message",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@example.com",
    messagePlaceholder: "What's on your mind?",
    submit: "Send message",
    sending: "Sending…",
    subject: "New message from your portfolio",
    successTitle: "Message sent.",
    successBody: "Thanks for reaching out — I'll get back to you as soon as I can.",
    mailtoTitle: "Almost there.",
    mailtoBody:
      "Your email app should have opened with the message ready. Press send there and it's on its way.",
    error: "That didn't go through. Try again, or email me directly.",
    direct: "or email me directly",
    close: "Close contact form",
    done: "Close",
  },
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Focus", href: "#now" },
  { label: "Contact", href: "#contact" },
] as const;

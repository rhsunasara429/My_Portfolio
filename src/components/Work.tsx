import { useState, type PointerEvent } from "react";
import { projects } from "../content";
import Tilt from "./Tilt";

/** Plain-English labels for the tech terms. Real term kept as a tooltip. */
const STACK_PLAIN: Record<string, string> = {
  React: "React (app framework)",
  TypeScript: "TypeScript (safer JavaScript)",
  Vite: "Vite (build tool)",
  "Plain CSS": "Plain CSS (styling)",
  localStorage: "Saves in your browser",
  PWA: "Installable phone app",
};

const TRY_STEPS = [
  "Open “See my live build” above — no sign-up, it just opens my personal tool.",
  "Add one task the way I do, e.g. “Revise chapter 3”.",
  "Tick it off. That's the flow I use daily — you're just looking over my shoulder.",
] as const;

/**
 * Case study written for newcomers, not developers:
 * big actions first, numbered plain-English story, tech details optional.
 * Renders every entry in `projects` so a second project needs no layout changes.
 */
export default function Work() {
  const [tiltOn] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const onTilt = (e: PointerEvent<HTMLDivElement>) => {
    if (!tiltOn) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 12}deg) translateZ(8px)`;
  };
  const onUntilt = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <>
      <div className="work-head">
        <div>
          <p className="eyebrow">Selected Work</p>
          <h2 className="section-title">
            What I&apos;ve <em>built</em> so far.
          </h2>
          <p className="section-lede">One personal build for now — explained simply.</p>
        </div>
        <p className="work-count">Project 1 of 1 — more coming</p>
      </div>

      {projects.map((p) => (
        <article key={p.name} className="case" aria-labelledby={`case-${p.name}`}>
          <div className="case-top">
            <h3 id={`case-${p.name}`} className="case-name">
              {p.name}
            </h3>
            <span className="case-status">{p.status}</span>
          </div>
          <p className="case-tagline">{p.tagline}</p>

          <div className="cta-row">
            {p.liveUrl ? (
              <a
                className="btn btn-primary"
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                See my live build
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <span className="case-live-soon">Live view — coming soon</span>
            )}
            {/* Repo URL user-provided 2026-10-11; returned 404 on last check. */}
            <a
              className="btn btn-secondary"
              href={p.repoUrl}
              target="_blank"
              rel="noreferrer"
            >
              See the code
            </a>
          </div>

          <div className="plain-grid">
            <div className="plain-steps">
              <div className="plain-step">
                <span className="plain-num" aria-hidden="true">
                  1
                </span>
                <div>
                  <h3>The problem</h3>
                  <p>{p.problem}</p>
                </div>
              </div>
              <div className="plain-step">
                <span className="plain-num" aria-hidden="true">
                  2
                </span>
                <div>
                  <h3>What it does for me</h3>
                  <p>{p.audience}</p>
                  <p>{p.solution}</p>
                </div>
              </div>
              <div className="plain-step">
                <span className="plain-num" aria-hidden="true">
                  3
                </span>
                <div>
                  <h3>My part</h3>
                  <p>{p.role}</p>
                </div>
              </div>
            </div>

            <div>
              <figure className="preview">
                <div
                  className="preview-frame"
                  onPointerMove={onTilt}
                  onPointerLeave={onUntilt}
                  aria-hidden="true"
                >
                  <div className="preview-screen">
                    <div className="preview-bar">
                      <span>Dhyaan · Today</span>
                      <span className="preview-dot" />
                    </div>
                    <div className="preview-task">
                      <span className="preview-box done" />
                      <s>Maths assignment ch.3</s>
                      <span className="preview-tag">Done</span>
                    </div>
                    <div className="preview-task">
                      <span className="preview-box" />
                      <span>Physics lab record</span>
                      <span className="preview-tag">Today</span>
                    </div>
                    <div className="preview-task">
                      <span className="preview-box" />
                      <span>Revise ML notes</span>
                      <span className="preview-tag">Area</span>
                    </div>
                  </div>
                </div>
                <figcaption className="preview-caption">
                  A mock-up, not a screenshot — my personal build is linked above
                </figcaption>
              </figure>

              <Tilt className="try-box" max={5} glare={false}>
                <h3>Look at it in 30 seconds</h3>
                <ol>
                  {TRY_STEPS.map((step) => (
                    <li key={step.slice(0, 20)}>{step}</li>
                  ))}
                </ol>
              </Tilt>

              <p className="stage-note" style={{ marginTop: "1.25rem" }}>
                <strong>Honest status:</strong> {p.stageNote}
              </p>
            </div>
          </div>

          <details className="case-details">
            <summary>How I built it — the nerdy version (optional)</summary>
            <div className="details-body">
              <h3>Built with</h3>
              <ul className="stack-plain">
                {p.stack.map((t) => (
                  <li key={t} className="stack-chip" title={t}>
                    {STACK_PLAIN[t] ?? t}
                  </li>
                ))}
              </ul>
              <h3 style={{ marginTop: "1.25rem" }}>Decisions I made</h3>
              <ul>
                {p.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <h3 style={{ marginTop: "1.25rem" }}>What it taught me</h3>
              <ul>
                {p.lessons.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          </details>
        </article>
      ))}
    </>
  );
}

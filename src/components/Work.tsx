import { useState, type PointerEvent } from "react";
import { projects } from "../content";

/** Plain-English labels for the tech terms. Real term kept as a tooltip. */
const STACK_PLAIN: Record<string, string> = {
  React: "React (app framework)",
  TypeScript: "TypeScript (safer JavaScript)",
  Vite: "Vite (build tool)",
  "Plain CSS": "Plain CSS (styling)",
  localStorage: "Saves in your browser",
  PWA: "Installable phone app",
};

/**
 * Quick-scan case study: title, short summary, visual, feature labels,
 * and one contribution line up front. Technical detail lives in <details>.
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
                See Dhyaan
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ) : (
              <span className="case-live-soon">Live view — coming soon</span>
            )}
            {p.repoUrl ? (
              <a
                className="btn btn-secondary"
                href={p.repoUrl}
                target="_blank"
                rel="noreferrer"
              >
                See the code
              </a>
            ) : (
              <span className="case-live-soon">Code — not public right now</span>
            )}
          </div>

          <div className="case-summary-grid">
            <div className="case-summary">
              <p className="case-why">
                <strong>Why:</strong> {p.problem}
              </p>
              <p className="case-why">
                <strong>What:</strong> {p.solution}
              </p>
              <ul className="feature-list" aria-label="Key features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="case-role">
                <strong>My contribution:</strong> {p.role}
              </p>
              <p className="case-learning">
                <strong>Key learning:</strong> {p.learning}
              </p>
            </div>

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
          </div>

          <details className="case-details">
            <summary>How I built it — the nerdy version (optional)</summary>
            <div className="details-body">
              <h3 className="details-label">Built with</h3>
              <ul className="stack-plain">
                {p.stack.map((t) => (
                  <li key={t} className="stack-chip" title={t}>
                    {STACK_PLAIN[t] ?? t}
                  </li>
                ))}
              </ul>
              <h3 className="details-label">Decisions I made</h3>
              <ul className="details-list">
                {p.decisions.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <h3 className="details-label">What I learned</h3>
              <ul className="details-list">
                {p.lessons.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <h3 className="details-label">About the demo</h3>
              <p className="details-note">{p.stageNote}</p>
            </div>
          </details>
        </article>
      ))}
    </>
  );
}

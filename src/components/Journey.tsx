import { journey } from "../content";

/**
 * Honest timeline: only milestones that actually happened (year precision),
 * plus what's now and what's next. No invented jobs or dates.
 */
export default function Journey() {
  return (
    <>
      <p className="eyebrow">Path</p>
      <h2 className="section-title">{journey.heading}</h2>
      <p className="section-lede">{journey.note}</p>
      <ol className="timeline">
        {journey.steps.map((s) => (
          <li key={s.title} data-state={s.state}>
            <span className="timeline-dot" aria-hidden="true" />
            <span className="timeline-meta">
              <span className="timeline-when">{s.when}</span>
              <span className={`state-pill is-${s.state.toLowerCase()}`}>{s.state}</span>
            </span>
            <h3>{s.title}</h3>
            <p>{s.detail}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

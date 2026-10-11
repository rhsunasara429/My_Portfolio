import { contact, profile } from "../content";

/** Renders the gradient accent on the closing phrase of the heading. */
function AccentHeading({ text }: { text: string }) {
  const phrase = "worth solving?";
  const i = text.indexOf(phrase);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em>{phrase}</em>
    </>
  );
}

export default function Contact() {
  return (
    <>
      <p className="eyebrow">Contact</p>
      <h2 className="contact-title">
        <AccentHeading text={contact.heading} />
      </h2>
      <p className="contact-body">{contact.body}</p>
      <div className="contact-links">
        <a className="contact-row" href={`mailto:${profile.email}`}>
          <span>
            <span className="contact-label">Email — fastest</span>
            <br />
            <span className="contact-value">{profile.email}</span>
          </span>
          <span className="contact-arrow" aria-hidden="true">
            →
          </span>
        </a>
        <a
          className="contact-row"
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <span className="contact-label">LinkedIn</span>
            <br />
            <span className="contact-value">linkedin.com/in/rashidali-h</span>
          </span>
          <span className="contact-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
        <a
          className="contact-row"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <span className="contact-label">GitHub</span>
            <br />
            <span className="contact-value">github.com/rhsunasara429</span>
          </span>
          <span className="contact-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      </div>
    </>
  );
}

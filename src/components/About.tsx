import { about, profile } from "../content";

export default function About() {
  return (
    <div className="about-grid">
      <div>
        <p className="eyebrow">About</p>
        <h2 className="section-title">{about.heading}</h2>
      </div>
      <div className="about-prose">
        {about.paragraphs.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
        <p className="about-credentials">
          <strong>{profile.degree}</strong>
          <br />
          {profile.college} · {profile.location}
        </p>
      </div>
    </div>
  );
}

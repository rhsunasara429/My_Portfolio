import { profile } from "../content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-giant" aria-hidden="true">
          Rashidali
        </div>
        <div className="footer-inner">
          <span className="wordmark">
            {profile.wordmark}
            <span className="mark-dot" aria-hidden="true">
              .
            </span>
          </span>
          <ul className="footer-social" aria-label="Social links">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>Email</a>
            </li>
          </ul>
          <span>Building in public — CS, software, and the founder&apos;s path.</span>
        </div>
      </div>
    </footer>
  );
}

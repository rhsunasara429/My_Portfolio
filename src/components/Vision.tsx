import { vision } from "../content";

/** Short founder-style letter. Ambitious, deliberately un-grandiose. */
export default function Vision() {
  return (
    <>
      <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
        <p className="eyebrow" style={{ justifyContent: "center" }}>
          Vision
        </p>
        <h2 className="section-title">{vision.heading}</h2>
      </div>
      <div className="letter">
        {vision.body.map((para, i) => (
          <p key={para.slice(0, 28)} className={i === 0 ? "letter-lead" : undefined}>
            {para}
          </p>
        ))}
        <p className="letter-sign">{vision.sign}</p>
      </div>
    </>
  );
}

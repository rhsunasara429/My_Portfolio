import { manifesto } from "../content";

export default function Manifesto() {
  return (
    <div className="manifesto">
      <p className="eyebrow" style={{ justifyContent: "center" }}>
        Principle
      </p>
      <p className="manifesto-big">
        {manifesto.lines.map((line, i) => (
          <span key={line.text}>
            <span className={line.dim ? "dim" : undefined}>{line.text}</span>
            {i < manifesto.lines.length - 1 && <br />}
          </span>
        ))}
      </p>
      <p className="manifesto-tag">{manifesto.tag}</p>
    </div>
  );
}

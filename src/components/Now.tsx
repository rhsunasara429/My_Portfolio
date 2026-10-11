import { now } from "../content";
import Tilt from "./Tilt";

export default function Now() {
  return (
    <>
      <p className="eyebrow">Now</p>
      <h2 className="section-title">{now.heading}</h2>
      <Tilt className="now-card" max={4}>
        <p className="now-updated">Updated {now.updated} — edit me in content.ts</p>
        <ul>
          {now.items.map((item) => (
            <li key={item.slice(0, 24)}>{item}</li>
          ))}
        </ul>
      </Tilt>
    </>
  );
}

import { explorations } from "../content";
import Tilt from "./Tilt";

export default function Explorations() {
  return (
    <>
      <p className="eyebrow">Explorations</p>
      <h2 className="section-title">{explorations.heading}</h2>
      <p className="section-lede">{explorations.note}</p>
      <ol className="explore-list">
        {explorations.items.map((item, i) => (
          <Tilt as="li" key={item.title} max={3} glare={false}>
            <span className="explore-index" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </Tilt>
        ))}
      </ol>
    </>
  );
}

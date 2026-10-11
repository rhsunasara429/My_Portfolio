import { useEffect, useState, type ReactNode, type PointerEvent } from "react";
import { hero, profile } from "../content";
import Particles from "./Particles";
import Tilt from "./Tilt";

/** Types each role in a loop. Static first role when reduced motion is on. */
function useTypedRole(roles: readonly string[]) {
  const [text, setText] = useState(roles[0] ?? "");
  const [typing] = useState(
    () =>
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let role = 0;
    let char = (roles[0] ?? "").length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = roles[role] ?? "";
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char >= current.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 34 + Math.random() * 40);
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char <= 0) {
          role = (role + 1) % roles.length;
          deleting = false;
          timer = setTimeout(tick, 350);
          return;
        }
        timer = setTimeout(tick, 18);
      }
    };
    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [roles]);

  return { text, typing };
}

/** Link that leans toward the cursor on fine pointers. */
function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  const [fine] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!fine) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
  };
  const onLeave = (e: PointerEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <a href={href} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </a>
  );
}

export default function Hero() {
  const { text, typing } = useTypedRole(hero.typedRoles);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />
      <Particles />
      <div className="wrap hero-grid">
        <div>
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            {hero.titleA}
            <br />
            <span className="glow-word">{hero.titleB}</span>
          </h1>
          <p className="hero-typed" aria-live={typing ? "off" : "polite"}>
            <span style={{ color: "var(--faint)" }}>→ </span>
            {text}
            {typing && (
              <span className="caret" aria-hidden="true" />
            )}
          </p>
          <p className="hero-standfirst">
            I&apos;m <strong>Rashidali</strong>, a first-year CS student who thinks like a
            founder: find a real problem, reason about the solution, then build. I use AI
            coding tools to move fast — but the thinking stays mine.
          </p>
          <div className="hero-ctas">
            <MagneticLink className="btn btn-primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </MagneticLink>
            <MagneticLink className="btn btn-secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </MagneticLink>
          </div>
          <div className="hero-meta">
            {hero.meta.map((m) => (
              <span key={m}>
                <i aria-hidden="true" />
                {m}
              </span>
            ))}
          </div>
        </div>
        <div className="portrait-wrap">
          <Tilt className="portrait-tilt" max={10}>
            <div className="portrait-frame">
              <div className="portrait-inner">
                {profile.portrait ? (
                  <img src={profile.portrait} alt="Portrait of Rashidali" />
                ) : (
                  <span className="portrait-mono" aria-hidden="true">
                    R
                  </span>
                )}
              </div>
            </div>
          </Tilt>
          <p className="portrait-caption">
            {profile.portrait ? "Rashidali — builder" : "Portrait slot — photo incoming"}
          </p>
        </div>
      </div>
      <div className="wrap">
        <a className="scroll-hint" href="#work">
          Scroll
        </a>
      </div>
    </section>
  );
}

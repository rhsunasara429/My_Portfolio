import { useState, type PointerEvent, type ReactNode } from "react";

/**
 * Reusable pointer-driven 3D tilt + cursor-tracking glare.
 * Disabled on touch pointers and under prefers-reduced-motion.
 */
export default function Tilt({
  children,
  className = "",
  as = "div",
  max = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  /** Max tilt in degrees each way. */
  max?: number;
  glare?: boolean;
}) {
  const [on] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (!on) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${(px * max * 2).toFixed(2)}deg) rotateX(${(-py * max * 2).toFixed(2)}deg)`;
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "";
  };

  const cls = `tilt ${className}`.trim();
  const glareEl = glare ? (
    <span className="tilt-glare" aria-hidden="true" />
  ) : null;

  if (as === "li") {
    return (
      <li className={cls} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
        {glareEl}
      </li>
    );
  }
  return (
    <div className={cls} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
      {glareEl}
    </div>
  );
}

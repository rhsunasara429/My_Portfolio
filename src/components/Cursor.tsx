import { useEffect, useRef, useState } from "react";

/**
 * Difference-blend cursor dot. Renders nothing on touch devices
 * or when reduced motion is requested.
 */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const dot = ref.current;
    if (!dot) return;
    let x = -100;
    let y = -100;
    let tx = x;
    let ty = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const t = e.target as HTMLElement | null;
      setHovering(!!t?.closest("a, button, summary, [data-hover]"));
    };
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} className={`cursor-dot${hovering ? " is-hovering" : ""}`} aria-hidden="true" />
  );
}

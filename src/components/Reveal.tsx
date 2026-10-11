import { useEffect, useRef, type ReactNode } from "react";

/** Fades a section in on first scroll into view. No-op under reduced motion (CSS). */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  id,
}: {
  children: ReactNode;
  as?: "div" | "section";
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement | HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (Tag === "section") {
    return (
      <section ref={ref as never} id={id} className={`reveal ${className}`.trim()}>
        {children}
      </section>
    );
  }
  return (
    <div ref={ref as never} id={id} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  );
}

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas particle field for the hero: slow-rising glowing
 * dots in the site palette with faint connective lines. No dependencies.
 * - DPR-aware (capped at 2), pauses off-screen / when tab hidden.
 * - Renders nothing under prefers-reduced-motion.
 */
export default function Particles({ density = 14 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      c: string;
      a: number;
      ph: number;
    }
    const COLORS = ["205,241,77", "139,124,255", "245,242,234"];
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = 0;
    let visible = true;
    let parts: P[] = [];

    function spawn(anywhere: boolean): P {
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 10,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.12 + Math.random() * 0.3),
        r: 0.8 + Math.random() * 1.8,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        a: 0.25 + Math.random() * 0.5,
        ph: Math.random() * Math.PI * 2,
      };
    }

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(90, Math.floor((w * h) / (density * 1000)));
      parts = Array.from({ length: Math.max(24, n) }, () => spawn(true));
    }

    function frame() {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      t += 0.016;
      ctx!.clearRect(0, 0, w, h);

      for (const p of parts) {
        p.x += p.vx + Math.sin(t + p.ph) * 0.12;
        p.y += p.vy;
        if (p.y < -12 || p.x < -12 || p.x > w + 12) Object.assign(p, spawn(false));
        const tw = p.a * (0.6 + 0.4 * Math.sin(t * 2 + p.ph));
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.c},${tw.toFixed(3)})`;
        ctx!.fill();
      }

      ctx!.lineWidth = 1;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i];
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 110) {
            ctx!.strokeStyle = `rgba(205,241,77,${(0.07 * (1 - d / 110)).toFixed(3)})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (canvas.parentElement) io.observe(canvas.parentElement);
    window.addEventListener("resize", resize);
    resize();
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return <canvas ref={ref} className="particles" aria-hidden="true" />;
}

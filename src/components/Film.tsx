import { useEffect, useRef, useState } from "react";
import { film } from "../content";

const TAU = Math.PI * 2;
const COLORS = ["205,241,77", "139,124,255", "245,242,234"] as const;

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const smooth = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

/** Deterministic random source so formations stay stable across resizes. */
function makeRng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

interface Particle {
  seed: number;
  noise: number;
  color: string;
  size: number;
  tw: number;
  ux: number;
  uy: number;
  uz: number;
  x: number;
  y: number;
  z: number;
}

interface Spot {
  x: number;
  y: number;
  z: number;
}

interface Layout {
  w: number;
  h: number;
  cx: number;
  cy: number;
  r: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  tw: number;
  a: number;
}

/**
 * A pinned, scroll-scrubbed "film": four chapters of a journey story told
 * over a code-generated canvas scene. Scroll position is the timeline —
 * stopping the scroll stops the picture. All motion is drawn locally, so
 * there is no video file to download or decode.
 */
export default function Film() {
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chapterRefs = useRef<Array<HTMLDivElement | null>>([]);
  const tickRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const fillRef = useRef<HTMLDivElement>(null);
  const noRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLSpanElement>(null);

  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (reduced) return;
    const track = trackRef.current;
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement ?? null;
    if (!track || !canvas || !stage) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let layout: Layout = { w: 0, h: 0, cx: 0, cy: 0, r: 0 };
    let particles: Particle[] = [];
    let stars: Star[] = [];
    let rafId = 0;
    let running = false;
    let last = 0;
    let smoothP = -1;
    let chapterIndex = -1;

    const comet = () => {
      const { cx, cy, r } = layout;
      return {
        sx: cx - r * 1.5,
        sy: cy + r * 0.9,
        ex: cx + r * 1.4,
        ey: cy - r * 0.85,
        qx: cx - r * 0.2,
        qy: cy - r * 0.15,
      };
    };

    const phoneBox = () => {
      const ph = layout.r * 1.5;
      const pw = ph * 0.54;
      return { left: layout.cx - pw / 2, top: layout.cy - ph / 2, pw, ph };
    };

    /** Where a single particle sits in scene 0..3 for a given timeline read. */
    const formation = (scene: number, p: Particle, prog: number, t: number): Spot => {
      const { cx, cy, r } = layout;

      if (scene === 0) {
        const ang = p.seed * TAU + prog * 0.9;
        const rad = r * (0.4 + 0.6 * Math.sqrt(p.noise));
        return {
          x: cx + Math.cos(ang) * rad * 1.25,
          y: cy + Math.sin(ang) * rad * 0.54 + Math.sin(t * 0.5 + p.tw) * 2.5,
          z: 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(ang + prog * 2)),
        };
      }

      if (scene === 1) {
        const ry = prog * TAU * 1.05 + 0.6;
        const tilt = 0.34;
        const x1 = p.ux * Math.cos(ry) + p.uz * Math.sin(ry);
        const z1 = -p.ux * Math.sin(ry) + p.uz * Math.cos(ry);
        const y1 = p.uy * Math.cos(tilt) - z1 * Math.sin(tilt);
        const z2 = p.uy * Math.sin(tilt) + z1 * Math.cos(tilt);
        const breathe = 1 + Math.sin(t * 0.8 + p.tw) * 0.012;
        const persp = 1 + z2 * 0.16;
        return {
          x: cx + x1 * r * persp * breathe,
          y: cy + y1 * r * persp * breathe,
          z: (z2 + 1) / 2,
        };
      }

      if (scene === 2) {
        const { left, top, pw, ph } = phoneBox();
        const drift = Math.sin(t * 0.6 + p.tw) * 1.5;
        if (p.noise < 0.62) {
          const per = 2 * (pw + ph);
          let d = p.seed * per;
          let x = left;
          let y = top;
          if (d < pw) {
            x = left + d;
          } else if ((d -= pw) < ph) {
            x = left + pw;
            y = top + d;
          } else if ((d -= ph) < pw) {
            x = left + pw - d;
            y = top + ph;
          } else {
            d -= pw;
            y = top + ph - d;
          }
          const jitter = (p.seed - 0.5) * 4;
          return { x: x + jitter, y: y + jitter + drift, z: 0.85 };
        }
        if (p.noise < 0.84) {
          const row = Math.floor(p.seed * 3);
          return {
            x: left + pw * (0.28 + 0.5 * ((p.seed * 7) % 1)),
            y: top + ph * (0.34 + row * 0.14) + (p.noise - 0.5) * 4 + drift,
            z: 0.7,
          };
        }
        const ang = p.seed * TAU;
        const rad = Math.max(pw, ph) * (0.72 + p.noise * 0.25);
        return {
          x: cx + Math.cos(ang) * rad * 0.85,
          y: cy + Math.sin(ang) * rad * 0.55 + drift,
          z: 0.35,
        };
      }

      const c = comet();
      const along = p.seed;
      const mt = 1 - along;
      const x = mt * mt * c.sx + 2 * mt * along * c.qx + along * along * c.ex;
      const y = mt * mt * c.sy + 2 * mt * along * c.qy + along * along * c.ey;
      const ang = p.noise * TAU + t * 0.04;
      const spread = (1 - along * 0.7) * r * 0.42;
      return {
        x: x + Math.cos(ang) * spread * 0.8,
        y: y + Math.sin(ang) * spread * 0.45,
        z: 0.35 + along * 0.65,
      };
    };

    const drawGlow = (x: number, y: number, radius: number, rgb: string, alpha: number) => {
      if (alpha <= 0.002 || radius <= 0) return;
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, `rgba(${rgb},${alpha.toFixed(3)})`);
      g.addColorStop(0.45, `rgba(${rgb},${(alpha * 0.32).toFixed(3)})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, TAU);
      ctx.fill();
    };

    const drawLinks = (points: Spot[], alpha: number) => {
      if (alpha < 0.02) return;
      const maxD = layout.r * 0.5;
      const maxD2 = maxD * maxD;
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > maxD2) continue;
          const al = (1 - Math.sqrt(d2) / maxD) * 0.13 * alpha * Math.min(a.z, b.z);
          if (al < 0.008) continue;
          ctx.strokeStyle = `rgba(205,241,77,${al.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    };

    /** The Dhyaan phone mock, assembled by the particles. */
    const drawPhone = (p: number) => {
      const t3 = p * 3;
      const appear = smooth(clamp((t3 - 1.62) / 0.3));
      const vanish = 1 - smooth(clamp((t3 - 2.42) / 0.3));
      const alpha = appear * vanish;
      if (alpha < 0.01) return;

      const { cx } = layout;
      const { left, top, pw, ph } = phoneBox();
      const local = clamp(t3 - 2);
      const radius = Math.min(30, pw * 0.13);

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(left, top, pw, ph, radius);
      ctx.fillStyle = `rgba(13,13,22,${(0.72 * alpha).toFixed(3)})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(245,242,234,${(0.22 * alpha).toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(cx - pw * 0.13, top + ph * 0.045, pw * 0.26, ph * 0.018, 99);
      ctx.fillStyle = `rgba(245,242,234,${(0.12 * alpha).toFixed(3)})`;
      ctx.fill();

      const headY = top + ph * 0.16;
      ctx.beginPath();
      ctx.arc(left + pw * 0.2, headY, pw * 0.028, 0, TAU);
      ctx.fillStyle = `rgba(205,241,77,${(0.9 * alpha).toFixed(3)})`;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(left + pw * 0.27, headY);
      ctx.lineTo(left + pw * 0.62, headY);
      ctx.strokeStyle = `rgba(245,242,234,${(0.32 * alpha).toFixed(3)})`;
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.stroke();

      for (let k = 0; k < 3; k++) {
        const rowY = top + ph * (0.34 + k * 0.14);
        const check = smooth(clamp((local - (0.1 + k * 0.12)) / 0.1));

        ctx.beginPath();
        ctx.roundRect(left + pw * 0.12, rowY - ph * 0.041, pw * 0.76, ph * 0.082, pw * 0.03);
        ctx.strokeStyle = `rgba(245,242,234,${(0.13 * alpha).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        const dotX = left + pw * 0.21;
        ctx.beginPath();
        ctx.arc(dotX, rowY, pw * 0.036, 0, TAU);
        if (check > 0.02) {
          ctx.fillStyle = `rgba(205,241,77,${(0.9 * check * alpha).toFixed(3)})`;
          ctx.fill();
        }
        ctx.strokeStyle = `rgba(245,242,234,${(0.38 * alpha).toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        if (check > 0.05) {
          ctx.beginPath();
          ctx.moveTo(dotX - pw * 0.022, rowY);
          ctx.lineTo(dotX - pw * 0.004, rowY + pw * 0.019);
          ctx.lineTo(dotX + pw * 0.028, rowY - pw * 0.026);
          ctx.strokeStyle = `rgba(10,10,15,${(0.9 * check * alpha).toFixed(3)})`;
          ctx.lineWidth = 1.8;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.moveTo(left + pw * 0.3, rowY);
        ctx.lineTo(left + pw * (0.3 + 0.3 + k * 0.06), rowY);
        ctx.strokeStyle = `rgba(245,242,234,${(0.2 * alpha).toFixed(3)})`;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.stroke();
      }

      const addX = cx;
      const addY = top + ph * 0.82;
      ctx.beginPath();
      ctx.arc(addX, addY, pw * 0.09, 0, TAU);
      ctx.fillStyle = `rgba(205,241,77,${(0.14 * alpha).toFixed(3)})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(205,241,77,${(0.7 * alpha).toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(addX - pw * 0.035, addY);
      ctx.lineTo(addX + pw * 0.035, addY);
      ctx.moveTo(addX, addY - pw * 0.035);
      ctx.lineTo(addX, addY + pw * 0.035);
      ctx.strokeStyle = `rgba(205,241,77,${(0.8 * alpha).toFixed(3)})`;
      ctx.lineWidth = 1.6;
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.restore();
    };

    const drawComet = (alpha: number) => {
      if (alpha < 0.01) return;
      const c = comet();
      drawGlow(c.ex, c.ey, layout.r * 0.95, "205,241,77", 0.2 * alpha);
      drawGlow(c.ex, c.ey, layout.r * 0.45, "245,242,234", 0.16 * alpha);
      ctx.fillStyle = `rgba(245,242,234,${(0.9 * alpha).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(c.ex, c.ey, 2.6, 0, TAU);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(139,124,255,${(0.1 * alpha).toFixed(3)})`;
      for (let k = 0; k < 2; k++) {
        ctx.beginPath();
        ctx.arc(
          layout.cx,
          layout.cy + layout.r * 1.25,
          layout.r * (1.8 + k * 0.5),
          Math.PI * 1.12,
          Math.PI * 1.88,
        );
        ctx.stroke();
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const wide = w >= 900;
      const cx = wide ? w * 0.66 : w * 0.5;
      const cy = wide ? h * 0.5 : h * 0.36;
      const r = Math.max(96, Math.min(wide ? w * 0.22 : w * 0.3, h * 0.31));
      layout = { w, h, cx, cy, r };

      const count = Math.round(clamp((w * h) / 12000, 70, 150));
      const rand = makeRng(20261107);
      particles = Array.from({ length: count }, (_, i) => {
        const gy = 1 - ((i + 0.5) / count) * 2;
        const gr = Math.sqrt(Math.max(0, 1 - gy * gy));
        const ga = Math.PI * (1 + Math.sqrt(5)) * i;
        return {
          seed: rand(),
          noise: rand(),
          color: COLORS[Math.floor(rand() * COLORS.length)],
          size: 0.7 + rand() * 1.8,
          tw: rand() * TAU,
          ux: Math.cos(ga) * gr,
          uy: gy,
          uz: Math.sin(ga) * gr,
          x: cx,
          y: cy,
          z: 0.5,
        };
      });

      const starRand = makeRng(4242);
      stars = Array.from({ length: 64 }, () => ({
        x: starRand() * w,
        y: starRand() * h,
        r: 0.4 + starRand() * 1.1,
        tw: starRand() * TAU,
        a: 0.06 + starRand() * 0.22,
      }));

      for (const p of particles) {
        const s = formation(0, p, 0, 0);
        p.x = s.x;
        p.y = s.y;
        p.z = s.z;
      }

      smoothP = -1;
      chapterIndex = -1;
    };

    const render = (p: number, t: number, ease: number) => {
      const { w, h, cx, cy, r } = layout;
      const t3 = p * 3;
      const i = Math.min(2, Math.floor(t3));
      const f = smooth(t3 - i);
      const w0 = clamp(1 - Math.abs(t3));
      const w1 = clamp(1 - Math.abs(t3 - 1));
      const w3 = clamp(1 - Math.abs(t3 - 3));

      const pts: Spot[][] = [[], [], [], []];
      for (const part of particles) {
        for (let s = 0; s < 4; s++) pts[s].push(formation(s, part, p, t));
      }

      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const a = s.a * (0.65 + 0.35 * Math.sin(t * 0.8 + s.tw));
        ctx.fillStyle = `rgba(245,242,234,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, TAU);
        ctx.fill();
      }

      if (w0 > 0.01) {
        drawGlow(cx, cy, r * 1.9, "139,124,255", 0.14 * w0);
        drawGlow(cx, cy, r * 1.05, "205,241,77", 0.09 * w0);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-0.16);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(205,241,77,${(0.1 * w0).toFixed(3)})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.5, r * 0.6, 0, 0, TAU);
        ctx.stroke();
        ctx.strokeStyle = `rgba(139,124,255,${(0.12 * w0).toFixed(3)})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 0.95, r * 0.4, 0.5, 0, TAU);
        ctx.stroke();
        ctx.restore();
        drawGlow(cx, cy, 64, "245,242,234", 0.4 * w0);
      }

      if (w1 > 0.01) {
        drawGlow(cx, cy, r * 1.7, "139,124,255", 0.12 * w1);
        drawGlow(cx, cy, r * 0.9, "205,241,77", 0.05 * w1);
        drawLinks(pts[1], w1);
      }

      drawComet(w3);

      const current = pts[i];
      const next = pts[i + 1];
      for (let n = 0; n < particles.length; n++) {
        const part = particles[n];
        const a = current[n];
        const b = next[n];
        const tx = a.x + (b.x - a.x) * f;
        const ty = a.y + (b.y - a.y) * f;
        const tz = a.z + (b.z - a.z) * f;
        part.x += (tx - part.x) * ease;
        part.y += (ty - part.y) * ease;
        part.z += (tz - part.z) * ease;

        const twinkle = 0.5 + 0.5 * Math.sin(t * 1.6 + part.tw);
        const alpha = clamp((0.18 + 0.52 * twinkle) * (0.4 + 0.6 * part.z));
        const size = part.size * (0.7 + 0.65 * part.z);
        if (n % 11 === 0) drawGlow(part.x, part.y, size * 10, part.color, 0.09 * alpha);
        ctx.fillStyle = `rgba(${part.color},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(part.x, part.y, size, 0, TAU);
        ctx.fill();
      }

      drawPhone(p);
    };

    const applyDom = (p: number) => {
      const chapters = film.chapters;
      const n = chapters.length;

      for (let i = 0; i < n; i++) {
        const el = chapterRefs.current[i];
        if (!el) continue;
        const local = p * n - i;
        const enter = i === 0 ? 1 : smooth(local / 0.08);
        const exit = i === n - 1 ? 1 : smooth((1 - local) / 0.08);
        const a = Math.min(enter, exit);
        const d = p - (i + 0.5) / n;

        el.style.opacity = a.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - a) * 28 * (d < 0 ? 1 : -1)).toFixed(2)}px, 0)`;
        el.style.visibility = a > 0.005 ? "visible" : "hidden";
      }

      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p.toFixed(4)})`;

      const idx = Math.min(n - 1, Math.floor(p * n));
      if (idx !== chapterIndex) {
        chapterIndex = idx;
        if (noRef.current) noRef.current.textContent = chapters[idx]?.no ?? "";
        if (labelRef.current) labelRef.current.textContent = chapters[idx]?.label ?? "";
        for (let i = 0; i < tickRefs.current.length; i++) {
          tickRefs.current[i]?.classList.toggle("is-active", i <= idx);
        }
      }

      if (hintRef.current) hintRef.current.style.opacity = clamp(1 - p * 12).toFixed(3);
    };

    const getTarget = () => {
      const rect = track.getBoundingClientRect();
      const max = rect.height - stage.clientHeight;
      return max > 0 ? clamp(-rect.top / max) : 0;
    };

    const loop = (now: number) => {
      if (!running) return;
      const dt = Math.min(64, now - last) / 16.667;
      last = now;
      const target = getTarget();
      if (smoothP < 0) smoothP = target;
      smoothP += (target - smoothP) * Math.min(1, dt * 0.22);
      if (Math.abs(target - smoothP) < 0.0002) smoothP = target;

      render(smoothP, now / 1000, Math.min(1, dt * 0.3));
      applyDom(smoothP);
      rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) start();
        else stop();
      },
      { rootMargin: "12% 0px" },
    );
    io.observe(track);

    window.addEventListener("resize", resize);
    resize();
    applyDom(0);
    render(0, performance.now() / 1000, 1);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section id="journey" className="film-static section" aria-labelledby="film-static-title">
        <div className="wrap">
          <p className="eyebrow">A short film — four chapters</p>
          <h2 id="film-static-title" className="section-title">
            My journey <em>so far</em>.
          </h2>
          <ol className="film-static-list">
            {film.chapters.map((chapter) => (
              <li key={chapter.no}>
                <span className="film-static-no">
                  {chapter.no} — {chapter.label}
                </span>
                <h3>{chapter.title}</h3>
                <p>{chapter.body}</p>
                {chapter.primary && (
                  <div className="cta-row film-ctas">
                    <a className="btn btn-primary" href={chapter.primary.href}>
                      {chapter.primary.label}
                      <span className="arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                    {chapter.secondary && (
                      <a className="btn btn-secondary" href={chapter.secondary.href}>
                        {chapter.secondary.label}
                      </a>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section id="journey" className="film" aria-labelledby="film-title">
      <h2 id="film-title" className="sr-only">
        A short scroll film: my journey so far
      </h2>
      <p className="sr-only">
        {film.chapters.map((chapter) => `${chapter.title} ${chapter.body}`).join(" ")}
      </p>
      <div ref={trackRef} className="film-track">
        <div className="film-stage">
          <canvas ref={canvasRef} className="film-canvas" aria-hidden="true" />
          <div className="film-vignette" aria-hidden="true" />
          <div className="film-glow film-glow-a" aria-hidden="true" />
          <div className="film-glow film-glow-b" aria-hidden="true" />
          <p className="film-tag" aria-hidden="true">
            {film.tag}
          </p>

          <div className="film-chapters">
            {film.chapters.map((chapter, i) => (
              <div
                key={chapter.no}
                ref={(el) => {
                  chapterRefs.current[i] = el;
                }}
                className="film-chapter"
              >
                <div className="film-chapter-inner">
                  <p className="film-chapter-no">
                    {chapter.no} — {chapter.label}
                  </p>
                  <h3 className="film-chapter-title">{chapter.title}</h3>
                  <p className="film-chapter-body">{chapter.body}</p>
                  {chapter.primary && (
                    <div className="cta-row film-ctas">
                      <a className="btn btn-primary" href={chapter.primary.href}>
                        {chapter.primary.label}
                        <span className="arrow" aria-hidden="true">
                          →
                        </span>
                      </a>
                      {chapter.secondary && (
                        <a className="btn btn-secondary" href={chapter.secondary.href}>
                          {chapter.secondary.label}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="film-hud" aria-hidden="true">
            <div className="film-rail">
              <div className="film-rail-track">
                <div ref={fillRef} className="film-rail-fill" />
              </div>
              <div className="film-ticks">
                {film.chapters.map((chapter, i) => (
                  <span
                    key={chapter.no}
                    ref={(el) => {
                      tickRefs.current[i] = el;
                    }}
                    className="film-tick"
                  >
                    {chapter.no} <b>{chapter.label}</b>
                  </span>
                ))}
              </div>
            </div>
            <div className="film-status">
              <span>
                <b ref={noRef}>{film.chapters[0]?.no}</b> —{" "}
                <span ref={labelRef}>{film.chapters[0]?.label}</span>
              </span>
              <span ref={hintRef} className="film-hint">
                {film.hint}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

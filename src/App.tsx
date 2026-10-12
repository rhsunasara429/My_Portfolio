import { useEffect, useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import Manifesto from "./components/Manifesto";
import About from "./components/About";
import Journey from "./components/Journey";
import Explorations from "./components/Explorations";
import Now from "./components/Now";
import Vision from "./components/Vision";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Reveal from "./components/Reveal";
import Cursor from "./components/Cursor";
import { ticker } from "./content";

/** Thin progress bar pinned to the very top of the viewport. */
function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      el.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />;
}

function Ticker() {
  const doubled = [...ticker, ...ticker];
  return (
    <div className="marquee" role="presentation">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} aria-hidden={i >= ticker.length || undefined}>
            {item}
            <b aria-hidden="true">✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="noise" aria-hidden="true" />
      <ScrollProgress />
      <Cursor />
      <div id="top" />
      <Header />
      <main id="main">
        <Hero />
        <Ticker />
        <Reveal as="section" id="work" className="section">
          <div className="wrap">
            <Work />
          </div>
        </Reveal>
        <Reveal as="section" id="bet" className="section">
          <div className="wrap">
            <Manifesto />
          </div>
        </Reveal>
        <Reveal as="section" id="about" className="section">
          <div className="wrap">
            <About />
          </div>
        </Reveal>
        <Reveal as="section" id="journey" className="section">
          <div className="wrap narrow">
            <Journey />
          </div>
        </Reveal>
        <Reveal as="section" id="explorations" className="section">
          <div className="wrap">
            <Explorations />
          </div>
        </Reveal>
        <Reveal as="section" id="now" className="section">
          <div className="wrap">
            <Now />
          </div>
        </Reveal>
        <Reveal as="section" id="vision" className="section">
          <div className="wrap">
            <Vision />
          </div>
        </Reveal>
        <Reveal as="section" id="contact" className="section contact-section">
          <div className="wrap narrow">
            <Contact />
          </div>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}

export default App;

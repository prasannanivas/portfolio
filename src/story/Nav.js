import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import Kid from "./Kid";
import { chapters } from "./content";
import { scroller, jumpTo, chapterEl } from "./scroll";

// Which version of the kid represents each chapter in the menu preview, plus a one-line teaser.
const PREVIEW = {
  hero: ["toddler", "Where it starts."],
  curls: ["toddler", "A kid who loved maths."],
  school: ["school", "Equations, chalk and Hello, World."],
  college: ["grad", "CIT, Coimbatore · 2018–2022."],
  work: ["adult", "Toshiba and Lumel."],
  flight: ["adult", "13,481 km to Toronto."],
  canada: ["winter", "Lambton College · new winters."],
  career: ["adult", "1UP, Roost, Pando, SCIEX."],
  ai: ["dev", "AI types. I make the calls."],
  now: ["dev", "Things I've shipped."],
  words: ["adult", "What people say."],
  writing: ["dev", "Notes from the 10% AI can't do."],
  toolkit: ["adult", "Skills and certificates."],
  epilogue: ["adult", "Say hello."],
};

export default function Nav({ active }) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(null);
  const [list, setList] = useState(chapters);
  const menuRef = useRef();
  const tlRef = useRef();
  const segRefs = useRef({});
  const ch = chapters.find((c) => c.id === active) || chapters[0];

  // Only list chapters that actually rendered (e.g. testimonials hide while empty).
  useEffect(() => {
    const refresh = () => setList(chapters.filter((c) => chapterEl(c.id)));
    const t = setTimeout(refresh, 300);
    window.addEventListener("chapters-changed", refresh);
    return () => {
      clearTimeout(t);
      window.removeEventListener("chapters-changed", refresh);
    };
  }, []);

  // Fill each rail segment with that chapter's own scroll progress.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.scrollY + window.innerHeight * 0.5;
      for (const c of list) {
        const el = chapterEl(c.id);
        const seg = segRefs.current[c.id];
        if (!el || !seg) continue;
        const top = el.offsetTop;
        const p = Math.min(1, Math.max(0, (mid - top) / el.offsetHeight));
        seg.style.setProperty("--p", p.toFixed(4));
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [list]);

  // Menu open/close timeline.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tlRef.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .set(menuRef.current, { display: "grid" })
        .fromTo(menuRef.current, { clipPath: "circle(0% at 50% 0%)" }, { clipPath: "circle(150% at 50% 0%)", duration: 0.9, ease: "power3.inOut" })
        .fromTo(".menu-item .menu-inner", { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.035 }, 0.3)
        .fromTo(".menu-side", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5);
    }, menuRef);
    return () => ctx.revert();
  }, [list]);

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) {
      setHover(active);
      scroller.lenis && scroller.lenis.stop();
      tl.timeScale(1).play();
    } else {
      scroller.lenis && scroller.lenis.start();
      tl.timeScale(1.8).reverse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (c) => {
    setOpen(false);
    setTimeout(() => jumpTo(c.id, c.title), open ? 350 : 0);
  };

  const shown = PREVIEW[hover || active] || PREVIEW.hero;
  const shownCh = chapters.find((c) => c.id === (hover || active)) || ch;

  return (
    <>
      {/* chapter rail — every chapter is a clickable segment */}
      <nav className="rail" aria-label="Chapters">
        {list.map((c) => (
          <button
            key={c.id}
            ref={(el) => (segRefs.current[c.id] = el)}
            className={`rail-seg ${c.id === active ? "is-active" : ""}`}
            onClick={() => go(c)}
            aria-label={`Go to chapter ${c.num}: ${c.title}`}
          >
            <i />
            <span className="rail-tip mono">{c.num} · {c.title}</span>
          </button>
        ))}
      </nav>

      <header className="hud mono">
        <a href="#top" className="hud-logo" onClick={(e) => { e.preventDefault(); go(chapters[0]); }}>
          NIVAS<span>.DEV</span>
        </a>
        <button className={`hud-chapter ${open ? "is-open" : ""}`} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="chapter-menu">
          <span className="hud-roll-wrap" aria-live="polite">
            <span key={ch.id} className="hud-roll">
              <b>{ch.num}</b> / {ch.title}
            </span>
          </span>
          <span className="hud-burger" aria-hidden="true"><i /><i /></span>
          <span className="hud-hint">{open ? "Close" : "Chapters"}</span>
        </button>
        <a href="#contact" className="hud-cta" onClick={(e) => { e.preventDefault(); go({ id: "epilogue", title: "Say hello" }); }}>
          Contact
        </a>
      </header>

      <div ref={menuRef} id="chapter-menu" className="menu" role="dialog" aria-modal="true" aria-label="Chapters">
        <ol className="menu-list" onMouseLeave={() => setHover(null)}>
          {list.map((c) => (
            <li key={c.id} className={`menu-item ${c.id === active ? "is-current" : ""}`}>
              <button onClick={() => go(c)} onMouseEnter={() => setHover(c.id)} onFocus={() => setHover(c.id)}>
                <span className="menu-inner">
                  <span className="mono menu-num">{c.num}</span>
                  <span className="display menu-title">{c.title}</span>
                  {c.id === active && <span className="mono menu-here">● You are here</span>}
                </span>
              </button>
            </li>
          ))}
        </ol>
        <aside className="menu-side">
          <div className="menu-kid">
            <Kid key={shown[0]} variant={shown[0]} className="menu-kid-svg" />
          </div>
          <span className="mono label">Ch. {shownCh.num}</span>
          <p className="display menu-teaser" key={shownCh.id}>{shown[1]}</p>
          <span className="mono menu-esc">Esc to close</span>
        </aside>
      </div>

      <div className="curtain" aria-hidden="true">
        <span className="curtain-mask"><span className="display curtain-title" /></span>
      </div>
    </>
  );
}

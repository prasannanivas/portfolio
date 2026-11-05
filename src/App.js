import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./story/story.css";
import Nav from "./story/Nav";
import Spider from "./story/Spider";
import { scroller, jumpTo, chapterEl } from "./story/scroll";
import Writing from "./story/Writing";
import Blog, { useRoute } from "./blog/Blog";
import { Hero, Curls, School, College, Work, Flight, Canada, Career, Now, Toolkit, Epilogue, Contact } from "./story/Chapters";
import { AiEra, Testimonials } from "./story/AiEra";

gsap.registerPlugin(ScrollTrigger);

// Each chapter re-colours the whole page as you scroll into it.
const THEMES = {
  hero: { bg: "#0b0c10", fg: "#eef1f5", accent: "#c6ff3d" },
  curls: { bg: "#e9e8ff", fg: "#15123a", accent: "#4b3bff" },
  school: { bg: "#1d3a31", fg: "#efe9dc", accent: "#ffd23f" },
  college: { bg: "#14113a", fg: "#ebe8ff", accent: "#a99dff" },
  work: { bg: "#0f1114", fg: "#eceef2", accent: "#c6ff3d" },
  flight: { bg: "#04050b", fg: "#ffffff", accent: "#c6ff3d" },
  canada: { bg: "#e4edf5", fg: "#0d1b2a", accent: "#d52b1e" },
  career: { bg: "#0d1220", fg: "#eef1f5", accent: "#5ee6ff" },
  ai: { bg: "#07070d", fg: "#eef1f5", accent: "#8be9ff" },
  now: { bg: "#0b0c10", fg: "#eef1f5", accent: "#c6ff3d" },
  words: { bg: "#0b0c10", fg: "#eef1f5", accent: "#c6ff3d" },
  toolkit: { bg: "#0b0c10", fg: "#eef1f5", accent: "#c6ff3d" },
  epilogue: { bg: "#0b0c10", fg: "#eef1f5", accent: "#c6ff3d" },
};

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Cursor() {
  const ref = useRef();
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    el.style.display = "block";
    const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });
    const move = (e) => {
      x(e.clientX);
      y(e.clientY);
      el.classList.toggle("is-link", !!e.target.closest("a, button, .cert"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  return <div ref={ref} className="cursor" aria-hidden="true" />;
}

export default function App() {
  const [active, setActive] = useState("hero");
  const route = useRoute();

  useEffect(() => {
    const onChapter = (e) => {
      setActive(e.detail);
      const t = THEMES[e.detail];
      if (!t) return;
      gsap.to(document.documentElement, {
        "--bg": t.bg,
        "--fg": t.fg,
        "--accent": t.accent,
        duration: reduceMotion() ? 0 : 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    window.addEventListener("chapter", onChapter);
    return () => window.removeEventListener("chapter", onChapter);
  }, []);

  useEffect(() => {
    if (reduceMotion()) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    scroller.lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e) => {
      const a = e.target.closest("a[data-scroll-to]");
      if (!a) return;
      e.preventDefault();
      lenis.scrollTo(a.getAttribute("href"), { duration: 2.2 });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      scroller.lenis = null;
    };
  }, []);

  // Fonts and images change layout; re-measure all triggers once they settle.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  // Route changes: start each page at the top, and give the blog its own theme.
  useEffect(() => {
    if (scroller.lenis) scroller.lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    if (route.page !== "home") {
      gsap.set(document.documentElement, { "--bg": "#0b0c10", "--fg": "#eef1f5", "--accent": "#c6ff3d" });
      return;
    }
    setActive("hero");
    window.dispatchEvent(new CustomEvent("chapter", { detail: "hero" }));
    if (!route.target) return;
    // e.g. #/writing → jump to that chapter once it has rendered
    let tries = 0;
    const iv = setInterval(() => {
      if (chapterEl(route.target) || ++tries > 20) {
        clearInterval(iv);
        if (chapterEl(route.target)) jumpTo(route.target, "Writing");
      }
    }, 150);
    return () => clearInterval(iv);
  }, [route.page, route.slug, route.target]);

  if (route.page !== "home") {
    return (
      <main className="story">
        <Cursor />
        <Spider />
        <div className="grain" aria-hidden="true" />
        <Blog route={route} />
      </main>
    );
  }

  return (
    <main className="story">
      <Cursor />
      <Nav active={active} />
      <Spider />
      <div className="grain" aria-hidden="true" />
      <Hero />
      <Curls />
      <School />
      <College />
      <Work />
      <Flight />
      <Canada />
      <Career />
      <AiEra />
      <Now />
      <Testimonials />
      <Writing />
      <Toolkit />
      <Epilogue />
      <Contact />
    </main>
  );
}

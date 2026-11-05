import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Kid from "./Kid";
import { createGlobe, routeKm } from "./Globe";
import {
  person,
  childhood,
  school,
  college,
  work,
  career,
  flight,
  canada,
  projects,
  skills,
  certificates,
} from "./content";
import myphoto from "../images/my-photos/me-web.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ---------- helpers ---------- */

export const setChapter = (id) => window.dispatchEvent(new CustomEvent("chapter", { detail: id }));

export function useScene(ref, id, build) {
  useLayoutEffect(() => {
    let cleanup;
    ref.current.dataset.chapter = id;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (s) => s.isActive && setChapter(id),
      });
      cleanup = build(ref.current);
    }, ref);
    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export const scrub = (trigger, extra = {}) =>
  gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger, start: "top top", end: "bottom bottom", scrub: 0.8, ...extra },
  });

export function Words({ text, className = "" }) {
  return (
    <span className={`words ${className}`}>
      {text.split(" ").map((w, i) => (
        <span className="mask" key={i}>
          <span className="w">{w}</span>
        </span>
      ))}
    </span>
  );
}

export function Tag({ num, title, place }) {
  return (
    <div className="tag mono">
      <span className="tag-num">Ch. {num}</span>
      <span className="tag-line" />
      <span>{title}</span>
      {place && <span className="tag-place">· {place}</span>}
    </div>
  );
}

/* ---------- 00 · Hero ---------- */

export function Hero() {
  const ref = useRef();
  useScene(ref, "hero", (el) => {
    gsap
      .timeline({ delay: 0.15 })
      .from(".hero-title .w", { yPercent: 120, rotate: 4, duration: 1.2, ease: "expo.out", stagger: 0.05 })
      .from(".hero-kid", { yPercent: 70, opacity: 0, duration: 1.6, ease: "elastic.out(1, 0.55)" }, "-=0.9")
      .from(".hero-meta > *", { opacity: 0, y: 14, stagger: 0.08, duration: 0.7, ease: "power3.out" }, "-=1.3");

    scrub(el)
      .to(".hero-title", { yPercent: -25, opacity: 0, scale: 0.94, filter: "blur(12px)" }, 0)
      .to(".hero-kid-wrap", { scale: 1.12, xPercent: -30, yPercent: -6 }, 0)
      .fromTo(".hero-next .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.04 }, 0.35)
      .to(".hero-kid-wrap", { opacity: 0, yPercent: -40 }, 0.8)
      .to(".hero-next", { opacity: 0 }, 0.9);
  });

  return (
    <section ref={ref} id="top" className="chapter ch-hero" style={{ height: "180vh" }}>
      <div className="sticky">
        <div className="hero-meta mono">
          <span>{person.name}</span>
          <span>{person.role} — {person.city}</span>
          <span className="hero-scroll">Scroll to begin ↓</span>
        </div>
        <h1 className="display hero-title">
          <Words text="Every engineer" />
          <Words text="was once a kid" />
          <span className="words">
            <span className="mask"><span className="w">who</span></span>{" "}
            <span className="mask"><span className="w">loved</span></span>{" "}
            <span className="mask"><em className="w">maths.</em></span>
          </span>
        </h1>
        <div className="hero-kid-wrap">
          <Kid variant="toddler" className="hero-kid" />
        </div>
        <p className="display hero-next">
          <Words text="This one grew up to write software." />
          <Words text="Here's how." className="accent" />
        </p>
      </div>
    </section>
  );
}

/* ---------- 01 · Numbers ---------- */

// Maths symbols that orbit the kid: [x%, y%, size, glyph]
const SYMBOLS = [
  [-38, -30, 1.3, "π"], [34, -40, 1, "√"], [44, 8, 1.5, "∑"], [-46, 18, 0.9, "÷"], [8, -58, 1.1, "x²"], [-20, 46, 1, "∞"], [30, 44, 0.8, "="],
];

export function Curls() {
  const ref = useRef();
  useScene(ref, "curls", (el) => {
    scrub(el)
      .fromTo(".curls-lines .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.06, duration: 0.5 }, 0)
      .fromTo(".curls-kid", { scale: 0.88, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }, 0)
      .fromTo(".q", { scale: 0, rotate: -40 }, { scale: 1, rotate: 0, stagger: 0.12, duration: 0.4, ease: "back.out(3)" }, 0.4)
      .to(".q", { y: (i) => (i % 2 ? -60 : 60), duration: 1.2 }, 0.8)
      .fromTo(".curls-aside", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4 }, 1.2)
      .to(".curls-stage", { yPercent: -8, duration: 1 }, 1.2);
  });

  return (
    <section ref={ref} className="chapter ch-curls" style={{ height: "230vh" }}>
      <div className="sticky">
        <Tag num="01" title="Numbers" place={childhood.kicker} />
        <div className="split">
          <h2 className="display curls-lines">
            {childhood.lines.map((l, i) => (
              <Words key={i} text={l} className={i === 2 ? "accent" : ""} />
            ))}
          </h2>
          <div className="curls-stage">
            {SYMBOLS.map(([x, y, s, g], i) => (
              <span key={i} className="q display" style={{ left: `${50 + x}%`, top: `${45 + y}%`, fontSize: `${s * 4}rem` }}>
                {g}
              </span>
            ))}
            <Kid variant="toddler" className="curls-kid" />
          </div>
        </div>
        <p className="aside curls-aside">{childhood.aside}</p>
      </div>
    </section>
  );
}

/* ---------- 02 · School ---------- */

function SchoolHouse() {
  return (
    <svg viewBox="0 0 300 240" className="schoolhouse" aria-hidden="true">
      <rect x="30" y="90" width="240" height="150" fill="#c45a3c" />
      <path d="M10 95 L150 20 L290 95 Z" fill="#8f3a26" />
      <rect x="125" y="160" width="50" height="80" rx="25" fill="#3b2016" />
      {[50, 95, 185, 230].map((x) => (
        <rect key={x} x={x} y="120" width="28" height="34" fill="#ffe7a8" />
      ))}
      <circle cx="150" cy="70" r="16" fill="#f4f1ea" />
      <path d="M150 60 L150 70 L158 74" stroke="#3b2016" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <rect x="146" y="-20" width="3" height="40" fill="#f4f1ea" />
      <path d="M149 -20 L178 -12 L149 -4 Z" fill="#ffd23f" className="flag" />
    </svg>
  );
}

export function School() {
  const ref = useRef();
  useScene(ref, "school", (el) => {
    scrub(el)
      .fromTo(".school-title .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.05, duration: 0.4 }, 0)
      .fromTo(".school-walker", { x: "-55vw" }, { x: "0vw", duration: 2 }, 0)
      .fromTo(".schoolhouse", { x: "30vw", opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0.2)
      .fromTo(".board-line span", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", stagger: 0.5, duration: 0.45 }, 0.6)
      .fromTo(".cloud", { x: 0 }, { x: (i) => (i % 2 ? -200 : -320), duration: 2.4 }, 0)
      .fromTo(".school-aside", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, 2);
  });

  return (
    <section ref={ref} className="chapter ch-school" style={{ height: "260vh" }}>
      <div className="sticky">
        <Tag num="02" title="First bell" place={school.kicker} />
        <h2 className="display school-title">
          {school.title.map((t, i) => (
            <Words key={i} text={t} className={i ? "accent" : ""} />
          ))}
        </h2>
        <div className="board">
          {school.board.map((l) => (
            <div className="board-line chalk" key={l}>
              <span>{l}</span>
            </div>
          ))}
        </div>
        <span className="cloud" style={{ top: "18%", left: "60%" }} />
        <span className="cloud" style={{ top: "30%", left: "85%" }} />
        <div className="ground">
          <SchoolHouse />
          <div className="school-walker">
            <Kid variant="school" walking />
          </div>
        </div>
        <p className="aside school-aside">{school.aside}</p>
      </div>
    </section>
  );
}

/* ---------- 03 · College ---------- */

export function College() {
  const ref = useRef();
  const codeRef = useRef();
  const gradeRef = useRef();
  useScene(ref, "college", (el) => {
    const typed = { n: 0 };
    const grade = { g: 0 };
    const code = college.code;
    scrub(el)
      .fromTo(".college-head .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.04, duration: 0.3 }, 0)
      .fromTo(".editor", { y: 80, opacity: 0, rotateX: 18 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.4 }, 0.1)
      .to(typed, {
        n: code.length,
        duration: 1.6,
        onUpdate: () => {
          if (codeRef.current) codeRef.current.textContent = code.slice(0, Math.round(typed.n));
        },
      }, 0.3)
      .fromTo(".stat", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.3 }, 0.5)
      .to(grade, {
        g: college.grade,
        duration: 0.8,
        onUpdate: () => {
          if (gradeRef.current) gradeRef.current.textContent = grade.g.toFixed(2);
        },
      }, 0.6)
      .to(".kid-swap .kid--college", { opacity: 0, duration: 0.15 }, 2)
      .fromTo(".kid-swap .kid--grad", { opacity: 0 }, { opacity: 1, duration: 0.15 }, 2)
      .fromTo(".kid-swap .kid--grad .kid-cap", { y: 0, rotate: 0 }, { y: -170, rotate: 380, transformOrigin: "50% 50%", duration: 0.45, ease: "power2.out" }, 2.1)
      .to(".kid-swap .kid--grad .kid-cap", { y: 0, rotate: 720, duration: 0.45, ease: "power2.in" }, 2.55)
      .fromTo(".confetti i", { x: 0, y: 0, opacity: 0, scale: 0 }, {
        x: () => gsap.utils.random(-260, 260),
        y: () => gsap.utils.random(-320, -60),
        rotate: () => gsap.utils.random(-360, 360),
        opacity: 1,
        scale: 1,
        stagger: 0.005,
        duration: 0.5,
        ease: "power3.out",
      }, 2.1)
      .to(".confetti i", { y: "+=220", opacity: 0, duration: 0.5 }, 2.6)
      .fromTo(".class-of", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, 2.2);
  });

  return (
    <section ref={ref} className="chapter ch-college" style={{ height: "300vh" }}>
      <div className="sticky">
        <Tag num="03" title="Compile" place={college.place} />
        <div className="college-grid">
          <div className="college-left">
            <h2 className="display college-head">
              <Words text="College turned" />
              <Words text="curiosity into" />
              <Words text="a compiler." className="accent" />
            </h2>
            <div className="editor">
              <div className="editor-bar mono">
                <i /><i /><i /> <span>journey.js</span>
              </div>
              <pre className="mono">
                <code ref={codeRef} />
                <span className="caret" />
              </pre>
            </div>
          </div>
          <div className="college-right">
            <div className="stat">
              <span className="mono label">Institution</span>
              <span className="stat-big">{college.institution}</span>
            </div>
            <div className="stat">
              <span className="mono label">Degree</span>
              <span className="stat-big">{college.degree}</span>
            </div>
            <div className="stat-row">
              <div className="stat">
                <span className="mono label">CGPA</span>
                <span className="stat-num"><b ref={gradeRef}>0.00</b><small>/{college.gradeOf}</small></span>
              </div>
              <div className="stat">
                <span className="mono label">Years</span>
                <span className="stat-num"><b>{college.years}</b></span>
              </div>
            </div>
            <div className="kid-swap">
              <Kid variant="college" />
              <Kid variant="grad" />
              <div className="confetti">
                {Array.from({ length: 36 }, (_, i) => (
                  <i key={i} style={{ background: ["#ffd23f", "#8b7bff", "#c6ff3d", "#3ddc97"][i % 4] }} />
                ))}
              </div>
              <span className="class-of display">Class of 2022</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 04 · First commits ---------- */

export function Work({ data = work, id = "work", num = "04", title = "First commits", place = "India", marquee = true }) {
  const ref = useRef();
  useScene(ref, id, (el) => {
    const tl = scrub(el).fromTo(".work-title .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.05, duration: 0.3 }, 0);
    const cards = gsap.utils.toArray(".role", el);
    cards.forEach((c, i) => {
      tl.fromTo(c, { y: () => window.innerHeight, rotate: 6 }, { y: 0, rotate: i % 2 ? 1.5 : -1.5, duration: 0.6, ease: "power2.out" }, 0.3 + i * 0.8);
      if (i > 0) tl.to(cards[i - 1], { scale: 0.9, yPercent: -12, opacity: 0.45, duration: 0.6 }, 0.3 + i * 0.8);
    });
  });

  return (
    <section ref={ref} className="chapter ch-work" style={{ height: `${130 + data.roles.length * 60}vh` }}>
      <div className="sticky">
        <Tag num={num} title={title} place={place} />
        <h2 className="display work-title">
          {data.title.map((t, i) => (
            <Words key={i} text={t} className={i ? "accent" : ""} />
          ))}
        </h2>
        <div className="roles">
          {data.roles.map((r) => (
            <article className="role" key={r.company}>
              <div className="role-top">
                <div className="role-logo">
                  <img src={r.logo} alt={r.company} />
                </div>
                {r.when && <span className="mono role-when">{r.when}</span>}
              </div>
              <h3 className="display">{r.company}</h3>
              <p>{r.what}</p>
              <div className="chips">
                {r.tags.map((t) => (
                  <span className="chip mono" key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
        {marquee && <div className="logo-marquee" aria-label="Companies">
          <div className="logo-track">
            {[...work.logos, ...work.logos, ...work.logos, ...work.logos].map((l, i) => (
              <img key={i} src={l.src} alt={i < work.logos.length ? l.name : ""} />
            ))}
          </div>
        </div>}
      </div>
    </section>
  );
}

export const Career = () => (
  <Work data={career} id="career" num="07" title="Level up" place="Canada → the world" marquee={false} />
);

/* ---------- 05 · The flight ---------- */

export function Flight() {
  const ref = useRef();
  const canvasRef = useRef();
  const kmRef = useRef();
  const total = routeKm(flight.from.coords, flight.to.coords);

  useScene(ref, "flight", (el) => {
    const globe = createGlobe(canvasRef.current, flight.from.coords, flight.to.coords, {
      accent: "#c6ff3d",
      fromLabel: flight.from.label,
      toLabel: flight.to.label,
    });
    globe.resize();
    const ro = new ResizeObserver(() => globe.resize());
    ro.observe(canvasRef.current);

    const state = { t: 0 };
    let raf = 0;
    const loop = () => {
      globe.render(state.t);
      raf = requestAnimationFrame(loop);
    };
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (s) => {
        cancelAnimationFrame(raf);
        if (s.isActive) loop();
      },
    });

    const tl = scrub(el, { scrub: 1 })
      .to(state, {
        t: 1,
        duration: 10,
        onUpdate: () => {
          const f = globe.render(state.t);
          if (kmRef.current) kmRef.current.textContent = Math.round(f * total).toLocaleString();
        },
      }, 0)
      .fromTo(".flight-year", { opacity: 0, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.6 }, 0)
      .to(".flight-year", { opacity: 0, scale: 0.96, filter: "blur(16px)", duration: 0.8 }, 1.1)
      .fromTo(".globe", { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power2.out" }, 0.2)
      .fromTo(".flight-hud", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 1);

    gsap.utils.toArray(".fl-line", el).forEach((l, i) => {
      const at = 2 + i * 2.2;
      tl.fromTo(l, { opacity: 0, y: 40, filter: "blur(8px)" }, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 }, at)
        .to(l, { opacity: 0, y: -40, filter: "blur(8px)", duration: 0.6 }, at + 1.5);
    });
    tl.fromTo(".landed .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.08, duration: 0.6 }, 9.2);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  });

  return (
    <section ref={ref} className="chapter ch-flight" style={{ height: "450vh" }}>
      <div className="sticky">
        <div className="stars" />
        <Tag num="05" title="Departure" place={`${flight.from.country} → ${flight.to.country}`} />
        <canvas ref={canvasRef} className="globe" aria-label={`Animated flight from ${flight.from.label} to ${flight.to.label}`} />
        <div className="display flight-year">{flight.year}</div>
        <div className="fl-lines">
          {flight.lines.map((l) => (
            <p key={l} className="display fl-line">{l}</p>
          ))}
        </div>
        <h2 className="display landed">
          <Words text="Landed." />
          <Words text="Toronto." className="accent" />
        </h2>
        <div className="flight-hud mono">
          <span>{flight.from.label}, IN</span>
          <span className="hud-arrow">→</span>
          <span>{flight.to.label}, CA</span>
          <span className="hud-km"><b ref={kmRef}>0</b> / {total.toLocaleString()} km</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- 06 · Canada ---------- */

function Snow() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let w, h, raf;
    const flakes = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 2.6 + 0.6, s: Math.random() * 0.6 + 0.3, d: Math.random() * Math.PI * 2 }));
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      for (const f of flakes) {
        f.y += (f.s * 1.2) / h;
        f.d += 0.01;
        f.x += Math.sin(f.d) * 0.0006;
        if (f.y > 1.02) { f.y = -0.02; f.x = Math.random(); }
        ctx.beginPath();
        ctx.arc(f.x * w, f.y * h, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    size();
    window.addEventListener("resize", size);
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) tick();
    });
    io.observe(c);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", size);
    };
  }, []);
  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}

export function Canada() {
  const ref = useRef();
  const gpaRef = useRef();
  useScene(ref, "canada", (el) => {
    const g = { v: 0 };
    // Background parallax stays tied to scroll.
    scrub(el).fromTo(".toronto-outline", { xPercent: 10 }, { xPercent: -45, duration: 1 }, 0);

    // The scene itself plays in once and stays, whichever direction you arrive from,
    // so scrolling back up never rewinds it into an empty screen.
    const reveal = gsap
      .timeline({ paused: true })
      .fromTo(".canada-lines .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.1, duration: 0.9, ease: "expo.out" }, 0)
      .fromTo(".canada-kid", { y: 200, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.2)
      .fromTo(".leaf", { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(2)" }, 0.5)
      .fromTo(".canada-card", { y: 80, opacity: 0, rotate: 3 }, { y: 0, opacity: 1, rotate: -1, duration: 0.8, ease: "power3.out" }, 0.7)
      .fromTo(g, { v: 0 }, { v: canada.grade, duration: 1, ease: "power2.out", onUpdate: () => gpaRef.current && (gpaRef.current.textContent = g.v.toFixed(1)) }, 0.9);
    ScrollTrigger.create({
      trigger: el,
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => reveal.play(),
      onEnterBack: () => reveal.play(),
      // only reset once it's fully above the viewport, so coming down again replays it
      onLeaveBack: () => reveal.pause(0),
    });
  });

  return (
    <section ref={ref} className="chapter ch-canada" style={{ height: "250vh" }}>
      <div className="sticky">
        <Snow />
        <div className="toronto-outline display" aria-hidden="true">TORONTO TORONTO</div>
        <Tag num="06" title="Fresh snow" place={canada.place} />
        <div className="split">
          <div>
            <h2 className="display canada-lines">
              {canada.lines.map((l, i) => (
                <Words key={l} text={l} className={i === 2 ? "accent" : ""} />
              ))}
            </h2>
            <div className="canada-card">
              <span className="mono label">{canada.years}</span>
              <h3 className="display">{canada.institution}</h3>
              <p>{canada.degree}</p>
              <div className="stat-num"><b ref={gpaRef}>0.0</b><small>/{canada.gradeOf} GPA</small></div>
            </div>
          </div>
          <div className="canada-stage">
            <svg viewBox="0 0 100 100" className="leaf" aria-hidden="true">
              <path d="M50 5 L57 22 L68 17 L64 40 L80 30 L84 38 L95 36 L88 52 L94 56 L72 72 L75 82 L53 78 L53 96 L47 96 L47 78 L25 82 L28 72 L6 56 L12 52 L5 36 L16 38 L20 30 L36 40 L32 17 L43 22 Z" fill="#d52b1e" />
            </svg>
            <Kid variant="winter" className="canada-kid" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 08 · Shipping (horizontal) ---------- */

// Illustrated covers for projects that have no screenshots.
function ChartArt() {
  // deterministic candles so the art never changes between renders
  const candles = [];
  let price = 60;
  for (let i = 0; i < 32; i++) {
    const drift = Math.sin(i / 4) * 3 + (i > 18 ? 1.8 : -0.5);
    const open = price;
    const close = price + drift + ((i * 37) % 7) - 3;
    candles.push({ x: 24 + i * 11, open, close, hi: Math.max(open, close) + 3 + (i % 3), lo: Math.min(open, close) - 3 - (i % 2) });
    price = close;
  }
  const y = (v) => 250 - v * 2;
  const ema = candles.map((c, i) => `${i ? "L" : "M"}${c.x} ${y((c.open + c.close) / 2 - 3)}`).join(" ");
  const sig = candles[20];
  return (
    <svg viewBox="0 0 400 300" className="project-art" aria-hidden="true">
      {[70, 120, 170, 220].map((g) => (
        <line key={g} x1="0" x2="400" y1={g} y2={g} stroke="rgba(255,255,255,.06)" />
      ))}
      {candles.map((c, i) => {
        const col = c.close >= c.open ? "#3ddc97" : "#ff5d73";
        return (
          <g key={i}>
            <line x1={c.x} x2={c.x} y1={y(c.hi)} y2={y(c.lo)} stroke={col} strokeWidth="1.2" />
            <rect x={c.x - 3.5} width="7" y={y(Math.max(c.open, c.close))} height={Math.max(2, Math.abs(c.close - c.open) * 2)} fill={col} rx="1" />
          </g>
        );
      })}
      <path d={ema} fill="none" stroke="#f5c46b" strokeWidth="2" />
      <circle cx={sig.x} cy={y(sig.lo) + 16} r="9" fill="#3ddc97" />
      <text x={sig.x} y={y(sig.lo) + 20} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0b0c10">B</text>
      <rect x="22" y="18" width="150" height="46" rx="8" fill="rgba(0,0,0,.45)" stroke="rgba(255,255,255,.12)" />
      <text x="34" y="37" fontSize="10" fill="rgba(255,255,255,.6)" fontFamily="monospace">EUR/USD · EMA200</text>
      <text x="34" y="54" fontSize="12" fill="#3ddc97" fontFamily="monospace" fontWeight="700">▲ BULLISH CROSS</text>
    </svg>
  );
}

function KattamArt() {
  // South Indian chart: 4×4 grid, the outer 12 boxes are the Rasis
  const boxes = [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [3, 3], [2, 3], [1, 3], [0, 3], [0, 2], [0, 1]];
  const planets = { 0: ["Gu"], 2: ["Sa", "Ra"], 4: ["Su", "Bu"], 5: ["Ve"], 7: ["Lag"], 8: ["Ke", "Ma"], 10: ["Ch"] };
  const s = 62;
  const o = 76;
  return (
    <svg viewBox="0 0 400 400" className="project-art" aria-hidden="true">
      <circle cx="200" cy="200" r="186" fill="none" stroke="rgba(245,196,107,.18)" strokeDasharray="2 6" />
      {boxes.map(([cx, cy], i) => (
        <g key={i}>
          <rect x={o + cx * s} y={o + cy * s} width={s} height={s} fill={i === 7 ? "rgba(245,196,107,.18)" : "rgba(255,255,255,.03)"} stroke="#f5c46b" strokeOpacity=".55" />
          {(planets[i] || []).map((pl, k) => (
            <text key={pl} x={o + cx * s + s / 2} y={o + cy * s + 26 + k * 16} textAnchor="middle" fontSize="12" fill="#f5c46b" fontFamily="monospace">
              {pl}
            </text>
          ))}
        </g>
      ))}
      <rect x={o + s} y={o + s} width={s * 2} height={s * 2} fill="none" stroke="#f5c46b" strokeOpacity=".55" />
      <text x="200" y="198" textAnchor="middle" fontSize="22" fill="#f5c46b" fontFamily="Fraunces, serif" fontStyle="italic">Rasi</text>
      <text x="200" y="220" textAnchor="middle" fontSize="9" fill="rgba(245,196,107,.6)" fontFamily="monospace" letterSpacing="2">D-1 CHART</text>
    </svg>
  );
}


export function Now() {
  const ref = useRef();
  const trackRef = useRef();
  useScene(ref, "now", (el) => {
    const track = trackRef.current;
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const setHeight = () => (el.style.height = `${dist() + window.innerHeight * 1.2}px`);
    setHeight();
    ScrollTrigger.addEventListener("refreshInit", setHeight);

    const tl = scrub(el, { invalidateOnRefresh: true, scrub: 0.6 });
    tl.to(track, { x: () => -dist(), duration: 1 }, 0).to(".now-bar i", { scaleX: 1, duration: 1 }, 0);

    gsap.utils.toArray(".project-media img", el).forEach((img) => {
      gsap.fromTo(img, { xPercent: -6 }, {
        xPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: img.closest(".project"), containerAnimation: tl, start: "left right", end: "right left", scrub: true },
      });
    });
    gsap.from(".now-intro .w", {
      yPercent: 120,
      stagger: 0.05,
      duration: 1,
      ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 60%" },
    });

    return () => ScrollTrigger.removeEventListener("refreshInit", setHeight);
  });

  return (
    <section ref={ref} id="work" className="chapter ch-now">
      <div className="sticky">
        <div className="now-track" ref={trackRef}>
          <div className="panel now-intro">
            <Tag num="09" title="Shipping" place="Today" />
            <h2 className="display">
              <Words text="Today, the kid" />
              <Words text="ships software." className="accent" />
            </h2>
            <p className="aside">Full-stack across web, mobile and cloud — React, React Native, Node.js, Java Spring Boot and AWS. A few things built along the way →</p>
          </div>
          {projects.map((p, i) => (
            <article className="panel project" key={p.title} style={{ "--p": p.accent }}>
              <div className="project-media">
                {p.art === "chart" && <ChartArt />}
                {p.art === "kattam" && <KattamArt />}
                {(p.images || []).slice(0, 3).map((src, j) => (
                  <div className={`shot shot-${j}`} key={j}>
                    <img src={src} alt={`${p.title} screenshot ${j + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
              <div className="project-info">
                <span className="mono label">{String(i + 1).padStart(2, "0")} — {p.sub}</span>
                <h3 className="display">{p.title}</h3>
                <p>{p.desc}</p>
                <div className="chips">
                  {p.tech.map((t) => <span className="chip mono" key={t}>{t}</span>)}
                </div>
                {(p.github || p.live) && (
                  <div className="project-links mono">
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
                    {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Live ↗</a>}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="now-bar"><i /></div>
      </div>
    </section>
  );
}

/* ---------- 08 · Toolkit ---------- */

export function Toolkit() {
  const ref = useRef();
  const previewRef = useRef();
  useScene(ref, "toolkit", (el) => {
    const skew = gsap.quickTo(".marquee", "skewX", { duration: 0.4, ease: "power3" });
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (s) => skew(gsap.utils.clamp(-12, 12, s.getVelocity() / -250)),
    });
    gsap.from(".toolkit-title .w", { yPercent: 120, stagger: 0.05, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ".toolkit-title", start: "top 80%" } });
    gsap.from(".cert", { y: 40, opacity: 0, stagger: 0.06, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ".certs", start: "top 80%" } });

    const px = gsap.quickTo(previewRef.current, "x", { duration: 0.5, ease: "power3" });
    const py = gsap.quickTo(previewRef.current, "y", { duration: 0.5, ease: "power3" });
    const onMove = (e) => { px(e.clientX); py(e.clientY); };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  });

  const showCert = (img) => {
    const p = previewRef.current;
    if (!p) return;
    p.querySelector("img").src = img;
    gsap.to(p, { opacity: 1, scale: 1, duration: 0.3 });
  };
  const hideCert = () => gsap.to(previewRef.current, { opacity: 0, scale: 0.8, duration: 0.3 });

  const row = (dir) => (
    <div className={`marquee ${dir}`}>
      <div className="marquee-inner">
        {[...skills, ...skills].map((s, i) => (
          <span className="skill" key={i}>
            <img src={s.icon} alt="" />
            <span className="display">{s.name}</span>
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section ref={ref} className="chapter ch-toolkit">
      <div className="toolkit-head">
        <Tag num="12" title="Toolkit" place="Collected along the way" />
        <h2 className="display toolkit-title">
          <Words text="Tools picked up" />
          <Words text="on the journey." className="accent" />
        </h2>
      </div>
      {row("ltr")}
      {row("rtl")}
      <div className="certs">
        <span className="mono label">Certificates</span>
        {certificates.map((c) => (
          <div className="cert" key={c.name} onMouseEnter={() => showCert(c.img)} onMouseLeave={hideCert}>
            <span className="display cert-name">{c.name}</span>
            <span className="mono cert-by">{c.by}</span>
          </div>
        ))}
      </div>
      <div className="cert-preview" ref={previewRef} aria-hidden="true">
        <img alt="" />
      </div>
    </section>
  );
}

/* ---------- 09 · Epilogue ---------- */

export function Epilogue() {
  const ref = useRef();
  useScene(ref, "epilogue", (el) => {
    scrub(el)
      .fromTo(".epi-kid", { scale: 1, opacity: 1 }, { scale: 0.4, opacity: 0, duration: 0.5 }, 0.3)
      .fromTo(".epi-photo", { clipPath: "circle(0% at 50% 40%)" }, { clipPath: "circle(75% at 50% 40%)", duration: 0.8, ease: "power2.inOut" }, 0.3)
      .fromTo(".epi-photo img", { scale: 1.08 }, { scale: 1, duration: 1.2 }, 0.3)
      .fromTo(".epi-lines .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.06, duration: 0.3 }, 0.1)
      .to(".epi-lines .l1", { opacity: 0, duration: 0.2 }, 0.9)
      .fromTo(".epi-lines .l2 .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.08, duration: 0.3 }, 1);
  });

  return (
    <section ref={ref} className="chapter ch-epilogue" style={{ height: "210vh" }}>
      <div className="sticky">
        <div className="epi-photo">
          <img src={myphoto} alt={person.name} />
        </div>
        <Kid variant="adult" className="epi-kid" />
        <h2 className="display epi-lines">
          <Words text="The kid grew up." className="l1" />
          <Words text="Still solving problems." className="l2 accent" />
        </h2>
      </div>
    </section>
  );
}

export function Contact() {
  const ref = useRef();
  const btnRef = useRef();
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: ref.current, start: "top 55%", onToggle: (s) => s.isActive && setChapter("epilogue") });
      gsap.from(".contact .w", { yPercent: 120, stagger: 0.05, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    }, ref);
    const btn = btnRef.current;
    const xTo = gsap.quickTo(btn, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
    const move = (e) => {
      const r = btn.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    };
    const leave = () => { xTo(0); yTo(0); };
    btn.addEventListener("pointermove", move);
    btn.addEventListener("pointerleave", leave);
    return () => {
      ctx.revert();
      btn.removeEventListener("pointermove", move);
      btn.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section ref={ref} id="contact" className="contact">
      <span className="mono label">Next chapter — unwritten</span>
      <h2 className="display">
        <Words text="Let's write" />
        <Words text="the next one" />
        <Words text="together." className="accent" />
      </h2>
      <a ref={btnRef} className="mail-btn" href={`mailto:${person.email}`}>
        <span className="mono">Say hello</span>
        <span className="display">{person.email}</span>
      </a>
      <footer className="foot mono">
        <span>© {new Date().getFullYear()} {person.name}</span>
        <nav>
          {person.links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
          ))}
        </nav>
        <span>Made in {person.city}.</span>
      </footer>
    </section>
  );
}

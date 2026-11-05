import React, { useRef } from "react";
import gsap from "gsap";
import Kid from "./Kid";
import { useScene, scrub, Words, Tag } from "./Chapters";
import { aiEra, testimonials } from "./content";

const R = 92;
const C = 2 * Math.PI * R;

/* ---------- 08 · Co-pilot (the AI era) ---------- */

export function AiEra() {
  const ref = useRef();
  const pctRef = useRef();

  useScene(ref, "ai", (el) => {
    const pct = { v: 0 };
    const tl = scrub(el, { scrub: 0.9 });
    const share = aiEra.share / 100;

    // Scene A — "did my coding go vibe?"
    tl.fromTo(".ai-year", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 0)
      .fromTo(".ai-q .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.05, duration: 0.35 }, 0.1)
      .fromTo(".ai-stage", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.4 }, 0.2)
      .fromTo(".ring-vibe", { strokeDashoffset: C }, { strokeDashoffset: C * (1 - share), duration: 0.9 }, 0.5)
      .to(pct, { v: aiEra.share, duration: 0.9, onUpdate: () => pctRef.current && (pctRef.current.textContent = Math.round(pct.v)) }, 0.5)
      .fromTo(".ai-answer", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3 }, 0.9)
      .fromTo(".ring-me", { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.45)
      .fromTo(".ring-tag", { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.25 }, 1.5)
      .fromTo(".ai-caption", { opacity: 0 }, { opacity: 1, duration: 0.3 }, 1.6)
      .to(".ai-a", { opacity: 0, y: -60, duration: 0.4 }, 2.3);

    // Scene B — the calls AI got wrong
    tl.fromTo(".ai-b", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 2.6)
      .fromTo(".ai-calls .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.05, duration: 0.35 }, 2.65);
    const cards = gsap.utils.toArray(".decision", el);
    cards.forEach((card, i) => {
      const t0 = 3.1 + i * 2.4;
      const q = (s) => card.querySelector(s);
      tl.fromTo(card, { y: () => window.innerHeight, rotate: 4 }, { y: 0, rotate: i % 2 ? 0.8 : -0.8, duration: 0.45, ease: "power2.out" }, t0)
        .fromTo(q(".d-ai .d-text span"), { backgroundSize: "0% 2px" }, { backgroundSize: "100% 2px", duration: 0.3 }, t0 + 0.5)
        .to(q(".d-ai"), { opacity: 0.45, duration: 0.2 }, t0 + 0.75)
        .fromTo(q(".d-me"), { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, t0 + 0.75)
        .fromTo(q(".d-result"), { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t0 + 1.05);
      if (i > 0) tl.to(cards[i - 1], { scale: 0.92, yPercent: -10, opacity: 0.3, duration: 0.45 }, t0);
    });
    const endB = 3.1 + cards.length * 2.4 - 0.4;
    tl.to(".ai-b", { autoAlpha: 0, y: -60, duration: 0.4 }, endB);

    // Scene C — what I bring
    tl.fromTo(".ai-c", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, endB + 0.3)
      .fromTo(".ai-pillars-title .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.05, duration: 0.35 }, endB + 0.35)
      .fromTo(".pillar", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.18, duration: 0.4 }, endB + 0.6)
      .fromTo(".ai-tagline .w", { yPercent: 120 }, { yPercent: 0, stagger: 0.06, duration: 0.35 }, endB + 1.5)
      .to({}, { duration: 0.6 }, endB + 2);
  });

  return (
    <section ref={ref} className="chapter ch-ai" style={{ height: "820vh" }}>
      <div className="sticky">
        <div className="ai-aurora" aria-hidden="true" />
        <Tag num="08" title="Co-pilot" place={`${aiEra.year} → now`} />

        {/* Scene A */}
        <div className="ai-layer ai-a">
          <div className="ai-a-text">
            <span className="display ai-year">{aiEra.year}.</span>
            <h2 className="display ai-q">
              {aiEra.question.map((l, i) => (
                <Words key={l} text={l} className={i ? "accent" : ""} />
              ))}
            </h2>
            <p className="ai-answer display">{aiEra.answer}</p>
            <p className="aside ai-caption">{aiEra.caption}</p>
          </div>
          <div className="ai-stage">
            <svg viewBox="0 0 220 220" className="ring" aria-hidden="true">
              <defs>
                <linearGradient id="vibeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#5ee6ff" />
                  <stop offset="1" stopColor="#9d7bff" />
                </linearGradient>
              </defs>
              <circle cx="110" cy="110" r={R} className="ring-track" />
              <circle cx="110" cy="110" r={R} className="ring-vibe" stroke="url(#vibeGrad)" strokeDasharray={C} strokeDashoffset={C} />
              <circle cx="110" cy="110" r={R} className="ring-me" strokeDasharray={`${C * 0.1 - 6} ${C}`} strokeDashoffset={-(C * 0.9 + 3)} />
            </svg>
            <div className="ring-center">
              <span className="display ring-num"><b ref={pctRef}>0</b>%</span>
              <span className="mono label">written with AI</span>
            </div>
            <span className="ring-tag mono">← the 10% that matters</span>
            <div className="ai-kid">
              <div className="ai-orb" aria-hidden="true">
                <span>✦</span>
                <i className="ai-bubble"><b /><b /><b /></i>
              </div>
              <Kid variant="dev" />
            </div>
          </div>
        </div>

        {/* Scene B */}
        <div className="ai-layer ai-b">
          <h2 className="display ai-calls">
            {aiEra.callsTitle.map((l, i) => (
              <Words key={l} text={l} className={i ? "accent" : ""} />
            ))}
          </h2>
          <div className="decisions">
            {aiEra.decisions.map((d, i) => (
              <article className="decision" key={i}>
                <span className="mono label">{String(i + 1).padStart(2, "0")} · {d.project}</span>
                <div className="d-row d-ai">
                  <span className="d-who mono">✦ AI suggested</span>
                  <p className="d-text"><span>{d.ai}</span></p>
                </div>
                <div className="d-row d-me">
                  <span className="d-who mono">◆ My call</span>
                  <p className="d-text">{d.me}</p>
                </div>
                <div className="d-result">
                  <span className="mono label">Result</span>
                  <b className="display">{d.result}</b>
                  <small>{d.why}</small>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Scene C */}
        <div className="ai-layer ai-c">
          <h2 className="display ai-pillars-title">
            {aiEra.pillarsTitle.map((l, i) => (
              <Words key={l} text={l} className={i ? "accent" : ""} />
            ))}
          </h2>
          <div className="pillars">
            {aiEra.pillars.map((p, i) => (
              <div className="pillar" key={p.k}>
                <span className="mono pillar-n">0{i + 1}</span>
                <h3 className="display">{p.k}</h3>
                <p>{p.v}</p>
              </div>
            ))}
          </div>
          <p className="display ai-tagline">
            {aiEra.tagline.map((l, i) => (
              <Words key={l} text={l} className={i ? "accent" : ""} />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- 10 · Kind words ---------- */

function TestimonialsInner() {
  const ref = useRef();
  useScene(ref, "words", () => {
    gsap.from(".words-title .w", { yPercent: 120, stagger: 0.05, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    gsap.from(".testimonial", { y: 60, opacity: 0, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".testimonials", start: "top 80%" } });
  });
  return (
    <section ref={ref} className="chapter ch-words">
      <Tag num="10" title="Kind words" place="From people I've built with" />
      <h2 className="display words-title">
        <Words text="Don't take" />
        <Words text="my word for it." className="accent" />
      </h2>
      <div className="testimonials">
        {testimonials.map((t) => (
          <figure className="testimonial" key={t.name}>
            <span className="display quote-mark" aria-hidden="true">“</span>
            <blockquote>{t.quote}</blockquote>
            <figcaption>
              <b>{t.name}</b>
              <span className="mono">{[t.role, t.company].filter(Boolean).join(" · ")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return testimonials.length ? <TestimonialsInner /> : null;
}

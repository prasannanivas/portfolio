import React, { useEffect, useRef, useState } from "react";

/*
  A little bug on a thread. Scroll down → it lowers itself on its web.
  Scroll up → it climbs back up. It sways with scroll speed, its eyes follow
  the cursor, and clicking it sends it scurrying up.
*/
export default function Spider() {
  const rigRef = useRef();
  const threadRef = useRef();
  const bodyRef = useRef();
  const pupilsRef = useRef([]);
  const [quip, setQuip] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rig = rigRef.current;
    let len = -60; // starts hidden above the viewport, then drops in
    let target = 110;
    let last = window.scrollY;
    let swing = 0;
    let swingV = 0;
    let raf;
    let flee = 0;
    const max = () => window.innerHeight * 0.58;

    const onScroll = () => {
      const dy = window.scrollY - last;
      last = window.scrollY;
      if (flee) return;
      target = Math.min(max(), Math.max(70, target + dy * 0.3));
      if (window.scrollY < 40) target = 110;
      swingV += Math.max(-0.006, Math.min(0.006, dy * 0.00015));
    };

    const onFlee = () => {
      flee = 1;
      target = -80;
      setQuip(true);
      setTimeout(() => setQuip(false), 2200);
      setTimeout(() => { flee = 0; target = 120; }, 2600);
    };
    rig.addEventListener("click", onFlee);

    const onMove = (e) => {
      const b = bodyRef.current?.getBoundingClientRect();
      if (!b) return;
      const a = Math.atan2(e.clientY - (b.top + b.height / 2), e.clientX - (b.left + b.width / 2));
      pupilsRef.current.forEach((p) => p && p.setAttribute("transform", `translate(${Math.cos(a) * 1.6} ${Math.sin(a) * 1.6})`));
    };

    const tick = () => {
      const k = flee ? 0.18 : 0.08;
      const d = target - len;
      len += d * k;
      // pendulum: gravity pulls the swing back to centre, damping settles it
      swingV += -swing * 0.012;
      swingV *= 0.95;
      swing = Math.max(-0.12, Math.min(0.12, swing + swingV));
      rig.style.transform = `rotate(${swing}rad)`;
      threadRef.current.style.height = `${Math.max(0, len)}px`;
      bodyRef.current.style.transform = `translate(-50%, ${len}px)`;
      rig.classList.toggle("is-crawling", Math.abs(d) > 1.5);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove);
    tick();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      rig.removeEventListener("click", onFlee);
    };
  }, []);

  const legs = [-1, 1].flatMap((side) =>
    [0, 1, 2, 3].map((i) => {
      const y = -6 + i * 4.5;
      const reach = 14 + (i === 1 || i === 2 ? 2 : 0);
      const knee = `${side * 10} ${y - 7 + i * 1.5}`;
      const foot = `${side * reach} ${y + 5 + i * 1.2}`;
      return { side, i, d: `M${side * 5} ${y * 0.5} Q${knee} ${foot}` };
    })
  );

  return (
    <div className="spider-rig" ref={rigRef} aria-hidden="true">
      <span className="spider-thread" ref={threadRef} />
      <div className="spider" ref={bodyRef}>
        <svg viewBox="-20 -20 40 44" width="46" height="50">
          <g className="spider-legs">
            {legs.map((l) => (
              <path key={`${l.side}${l.i}`} d={l.d} className={`leg leg-${l.i % 2 ? "a" : "b"}`} />
            ))}
          </g>
          <ellipse cx="0" cy="6" rx="8" ry="9.5" className="spider-abdomen" />
          <circle cx="0" cy="-5" r="6.2" className="spider-head" />
          {[-2.6, 2.6].map((x, i) => (
            <g key={x}>
              <circle cx={x} cy="-5.5" r="2.4" fill="#fff" />
              <circle cx={x} cy="-5.2" r="1.1" fill="#111" ref={(el) => (pupilsRef.current[i] = el)} />
            </g>
          ))}
          <path d="M-2 8 h4 M-2 10.5 h4" className="spider-mark" />
        </svg>
        {quip && <span className="spider-quip mono">Not a bug. A feature.</span>}
      </div>
    </div>
  );
}

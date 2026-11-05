import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Shared handle to the Lenis instance so any component can drive scrolling.
export const scroller = { lenis: null };

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const chapterEl = (id) => document.querySelector(`[data-chapter="${id}"]`);

/** Where to land inside a chapter: a little way in, so its opening animation is already playing. */
function landingY(el) {
  const top = el.getBoundingClientRect().top + window.scrollY;
  if (el.dataset.chapter === "hero") return 0;
  return el.offsetHeight > window.innerHeight * 1.5 ? top + window.innerHeight * 0.35 : top;
}

/**
 * Jump to a chapter behind a full-screen curtain wipe, instead of smooth-scrolling
 * through thousands of pixels of scrubbed animation.
 */
export function jumpTo(id, title) {
  const el = chapterEl(id);
  if (!el) return;
  const y = landingY(el);
  const go = () => {
    if (scroller.lenis) scroller.lenis.scrollTo(y, { immediate: true, force: true });
    else window.scrollTo(0, y);
    ScrollTrigger.update();
  };
  const curtain = document.querySelector(".curtain");
  if (!curtain || reduced()) return go();

  curtain.querySelector(".curtain-title").textContent = title || "";
  gsap
    .timeline()
    .set(curtain, { display: "flex" })
    .fromTo(curtain, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power4.inOut" })
    .fromTo(".curtain-title", { yPercent: 110 }, { yPercent: 0, duration: 0.5, ease: "expo.out" }, "-=0.2")
    .add(go)
    .to(".curtain-title", { yPercent: -110, duration: 0.4, ease: "expo.in" }, "+=0.35")
    .to(curtain, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.6, ease: "power4.inOut" }, "-=0.1")
    .set(curtain, { display: "none" });
}

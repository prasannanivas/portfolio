import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScene, Words, Tag } from "./Chapters";
import { usePosts } from "../blog/Blog";
import { formatDate } from "../blog/posts";

/* ---------- 11 · Writing (latest posts on the homepage) ---------- */

function WritingInner({ posts }) {
  const ref = useRef();
  useScene(ref, "writing", () => {
    gsap.from(".writing-title .w", { yPercent: 120, stagger: 0.05, duration: 1, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 70%" } });
    gsap.from(".writing-card", { y: 70, opacity: 0, rotate: 2, stagger: 0.12, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".writing-grid", start: "top 85%" } });
  });

  // This section appears after posts load, so everything below it moved: re-measure.
  useLayoutEffect(() => {
    ScrollTrigger.refresh();
    window.dispatchEvent(new Event("chapters-changed"));
  }, []);

  return (
    <section ref={ref} className="chapter ch-writing">
      <div className="writing-head">
        <div>
          <Tag num="11" title="Writing" place="Notes from the 10% AI can't do" />
          <h2 className="display writing-title">
            <Words text="Thinking" />
            <Words text="out loud." className="accent" />
          </h2>
        </div>
        <a href="#/blog" className="mono writing-all">All writing →</a>
      </div>
      <div className="writing-grid">
        {posts.slice(0, 3).map((p, i) => (
          <a key={p.slug} href={`#/blog/${p.slug}`} className="writing-card">
            <span className="mono label">{formatDate(p.date)} · {p.minutes} min</span>
            <span className="display writing-card-title">{p.title}</span>
            {p.excerpt && <span className="writing-card-excerpt">{p.excerpt}</span>}
            <span className="mono writing-card-cta">Read{p.draft ? " · draft" : ""} →</span>
            <span className="writing-card-num display" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function Writing() {
  const posts = usePosts();
  return posts && posts.length ? <WritingInner posts={posts} /> : null;
}

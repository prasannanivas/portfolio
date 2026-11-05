import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Kid from "../story/Kid";
import { person } from "../story/content";
import { loadPosts, formatDate } from "./posts";
import "./blog.css";

/* ---------- tiny hash router: #/blog and #/blog/<slug> ---------- */

export function parseRoute(hash) {
  const m = hash.match(/^#\/blog(?:\/([^/?#]+))?/);
  if (m) return m[1] ? { page: "post", slug: decodeURIComponent(m[1]) } : { page: "blog" };
  const w = hash.match(/^#\/(writing)$/);
  if (w) return { page: "home", target: w[1] };
  return { page: "home" };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseRoute(window.location.hash));
  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return route;
}

export function usePosts() {
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    let alive = true;
    loadPosts().then((p) => alive && setPosts(p)).catch(() => alive && setPosts([]));
    return () => { alive = false; };
  }, []);
  return posts;
}

/* ---------- shell ---------- */

function BlogHeader({ crumb }) {
  return (
    <header className="blog-head mono">
      <a href="#/" className="hud-logo">NIVAS<span>.DEV</span></a>
      <nav className="blog-crumbs">
        <a href="#/blog">Writing</a>
        {crumb && <><span aria-hidden="true">/</span><span className="blog-crumb-cur">{crumb}</span></>}
      </nav>
      <a href={`mailto:${person.email}`} className="hud-cta">Contact</a>
    </header>
  );
}

function Draft() {
  return <span className="mono blog-draft">Draft · only visible locally</span>;
}

/* ---------- #/blog ---------- */

function BlogIndex() {
  const posts = usePosts();
  const [tag, setTag] = useState("All");
  const ref = useRef();
  const tags = useMemo(() => ["All", ...new Set((posts || []).flatMap((p) => p.tags))], [posts]);
  const shown = (posts || []).filter((p) => tag === "All" || p.tags.includes(tag));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".blog-title .w", { yPercent: 120, stagger: 0.06, duration: 1.1, ease: "expo.out" });
      gsap.from(".blog-sub, .blog-tags", { opacity: 0, y: 20, duration: 0.8, delay: 0.4, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!posts) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".post-row", { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, [posts, tag]);

  return (
    <div className="blog" ref={ref}>
      <BlogHeader />
      <section className="blog-hero">
        <span className="mono label">Notes from the 10% AI can't do</span>
        <h1 className="display blog-title">
          <span className="mask"><span className="w">Writing</span></span>
          <span className="mask"><em className="w">.</em></span>
        </h1>
        <p className="blog-sub">On system design, AI-assisted engineering, and building things people actually use.</p>
        {tags.length > 1 && (
          <div className="blog-tags" role="tablist" aria-label="Filter by topic">
            {tags.map((t) => (
              <button key={t} role="tab" aria-selected={tag === t} className={`chip mono ${tag === t ? "is-on" : ""}`} onClick={() => setTag(t)}>
                {t}
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="post-list">
        {posts === null && <p className="mono label">Loading…</p>}
        {posts && posts.length === 0 && (
          <div className="blog-empty">
            <Kid variant="dev" className="blog-empty-kid" />
            <p className="display">The first post is being written.</p>
            <a href="#/" className="mono">← Back to the story</a>
          </div>
        )}
        {shown.map((p, i) => (
          <a key={p.slug} href={`#/blog/${p.slug}`} className={`post-row ${i === 0 && tag === "All" ? "is-featured" : ""}`}>
            <span className="mono post-date">{formatDate(p.date)}</span>
            <span className="post-main">
              <span className="display post-title">{p.title}</span>
              {p.excerpt && <span className="post-excerpt">{p.excerpt}</span>}
              <span className="post-meta mono">
                {p.minutes} min read{p.tags.length ? ` · ${p.tags.join(" · ")}` : ""}
                {p.draft && <Draft />}
              </span>
            </span>
            <span className="post-arrow" aria-hidden="true">→</span>
          </a>
        ))}
      </section>
      <BlogFooter />
    </div>
  );
}

/* ---------- #/blog/<slug> ---------- */

function BlogPost({ slug }) {
  const posts = usePosts();
  const ref = useRef();
  const barRef = useRef();
  const idx = posts ? posts.findIndex((p) => p.slug === slug) : -1;
  const post = idx >= 0 ? posts[idx] : null;
  const newer = idx > 0 ? posts[idx - 1] : null;
  const older = posts && idx >= 0 && idx < posts.length - 1 ? posts[idx + 1] : null;

  useEffect(() => {
    if (post) document.title = `${post.title} — ${person.name}`;
    return () => { document.title = "Prasanna Nivas — A Story in Code"; };
  }, [post]);

  // reading progress
  useEffect(() => {
    const onScroll = () => {
      const art = ref.current?.querySelector(".prose");
      if (!art || !barRef.current) return;
      const r = art.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (window.innerHeight * 0.4 - r.top) / r.height));
      barRef.current.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [post]);

  useLayoutEffect(() => {
    if (!post) return;
    const ctx = gsap.context(() => {
      gsap.from(".article-title .w", { yPercent: 120, stagger: 0.035, duration: 1, ease: "expo.out" });
      gsap.from(".article-meta, .prose", { opacity: 0, y: 30, duration: 0.9, delay: 0.35, stagger: 0.1, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, [post]);

  if (posts && !post) {
    return (
      <div className="blog">
        <BlogHeader />
        <div className="blog-empty">
          <p className="display">That post doesn't exist (yet).</p>
          <a href="#/blog" className="mono">← All writing</a>
        </div>
      </div>
    );
  }

  return (
    <div className="blog" ref={ref}>
      <div className="read-progress"><i ref={barRef} /></div>
      <BlogHeader crumb={post ? post.title : "…"} />
      {post && (
        <article className="article">
          <a href="#/blog" className="mono article-back">← All writing</a>
          <h1 className="display article-title">
            {post.title.split(" ").map((w, i) => (
              <span className="mask" key={i}><span className="w">{w}</span></span>
            ))}
          </h1>
          <div className="article-meta mono">
            <span>{formatDate(post.date)}</span>
            <span>{post.minutes} min read</span>
            {post.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            {post.draft && <Draft />}
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          <aside className="author">
            <div className="author-kid"><Kid variant="dev" /></div>
            <div>
              <span className="mono label">Written by</span>
              <p className="display author-name">{person.name}</p>
              <p className="author-bio">{person.role} in {person.city}. Uses AI for the keystrokes, keeps the judgment.</p>
            </div>
          </aside>

          <nav className="article-nav">
            {older ? (
              <a href={`#/blog/${older.slug}`}><span className="mono label">← Older</span><span className="display">{older.title}</span></a>
            ) : <span />}
            {newer ? (
              <a href={`#/blog/${newer.slug}`} className="is-next"><span className="mono label">Newer →</span><span className="display">{newer.title}</span></a>
            ) : <span />}
          </nav>
        </article>
      )}
      <BlogFooter />
    </div>
  );
}

function BlogFooter() {
  return (
    <footer className="foot mono blog-foot">
      <span>© {new Date().getFullYear()} {person.name}</span>
      <nav>
        <a href="#/">The story</a>
        {person.links.map((l) => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>
        ))}
      </nav>
    </footer>
  );
}

export default function Blog({ route }) {
  return route.page === "post" ? <BlogPost key={route.slug} slug={route.slug} /> : <BlogIndex />;
}

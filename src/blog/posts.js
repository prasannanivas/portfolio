import { marked } from "marked";

/*
  Blog posts are plain Markdown files in src/blog/posts/.
  Every *.md file there is picked up automatically (files starting with "_" are ignored).
  Each file starts with a small front-matter block — see _TEMPLATE.md.
*/

// webpack: every .md file in ./posts → its built URL
const ctx = require.context("./posts", false, /^\.\/[^_].*\.md$/);

const SHOW_DRAFTS = process.env.NODE_ENV !== "production";

function parseFrontMatter(raw) {
  const m = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  const meta = {};
  if (!m) return { meta, body: raw };
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (val.startsWith("[") && val.endsWith("]")) {
      val = val.slice(1, -1).split(",").map((t) => t.trim().replace(/^["']|["']$/g, "")).filter(Boolean);
    } else {
      val = val.replace(/^["']|["']$/g, "");
      if (val === "true") val = true;
      else if (val === "false") val = false;
    }
    meta[key] = val;
  }
  return { meta, body: raw.slice(m[0].length) };
}

const readingTime = (text) => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));

let cache;

/** All published posts, newest first. Drafts are visible only while running `npm start`. */
export function loadPosts() {
  if (cache) return cache;
  cache = Promise.all(
    ctx.keys().map(async (key) => {
      const url = ctx(key);
      const raw = await fetch(typeof url === "string" ? url : url.default).then((r) => r.text());
      const { meta, body } = parseFrontMatter(raw);
      const slug = meta.slug || key.replace(/^\.\//, "").replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
      return {
        slug,
        title: meta.title || slug,
        date: meta.date || "",
        excerpt: meta.excerpt || "",
        tags: Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : [],
        draft: meta.draft === true,
        minutes: readingTime(body),
        html: marked.parse(body, { gfm: true }),
      };
    })
  ).then((posts) =>
    posts
      .filter((p) => SHOW_DRAFTS || !p.draft)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  );
  return cache;
}

export const formatDate = (d) => {
  if (!d) return "";
  const dt = new Date(`${d}T12:00:00`);
  return isNaN(dt) ? d : dt.toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
};

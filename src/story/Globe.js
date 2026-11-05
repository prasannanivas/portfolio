import { geoOrthographic, geoPath, geoInterpolate, geoGraticule10, geoDistance } from "d3-geo";
import { feature, mesh } from "topojson-client";
import world from "world-atlas/countries-110m.json";

const land = feature(world, world.objects.countries);
const borders = mesh(world, world.objects.countries, (a, b) => a !== b);
const graticule = geoGraticule10();

const smooth = (x) => x * x * (3 - 2 * x);
const clamp01 = (x) => Math.max(0, Math.min(1, x));

// Plane silhouette pointing to +x, centred on origin.
const PLANE = new Path2D(
  "M14 0 L4 -2 L-2 -11 L-5 -11 L-1 -2 L-8 -2 L-11 -6 L-13 -6 L-11 0 L-13 6 L-11 6 L-8 2 L-1 2 L-5 11 L-2 11 L4 2 Z"
);

export const routeKm = (from, to) => Math.round(geoDistance(from, to) * 6371);

/** Creates a globe renderer bound to a canvas. Call render(t) with t ∈ [0, 1]. */
export function createGlobe(canvas, from, to, colors) {
  const ctx = canvas.getContext("2d");
  const projection = geoOrthographic().clipAngle(90).precision(0.3);
  const path = geoPath(projection, ctx);
  const interp = geoInterpolate(from, to);
  let w = 0;
  let h = 0;
  let last = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    render(last);
  }

  function marker(coords, label, centre, active) {
    if (geoDistance(coords, centre) > Math.PI / 2 - 0.05) return;
    const [x, y] = projection(coords);
    ctx.beginPath();
    ctx.arc(x, y, active ? 5 : 3.5, 0, Math.PI * 2);
    ctx.fillStyle = colors.accent;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 12 + 6 * Math.sin(performance.now() / 300), 0, Math.PI * 2);
    ctx.strokeStyle = colors.accent + "66";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.font = "600 12px 'Geist Mono', ui-monospace, monospace";
    ctx.fillStyle = "#fff";
    ctx.fillText(label.toUpperCase(), x + 14, y - 10);
  }

  function render(t) {
    last = t;
    if (!w) return;
    // 0 → 0.12: take-off hold · 0.12 → 0.88: flight · 0.88 → 1: landing hold
    const f = smooth(clamp01((t - 0.12) / 0.76));
    const pos = interp(f);
    // camera trails the plane slightly so the arc behind it stays visible
    const cam = interp(clamp01(f - 0.04));
    const base = Math.min(w, h) * 0.42;
    const zoom = 1.12 - 0.22 * Math.sin(Math.PI * f) + 0.06 * (1 - smooth(clamp01(t / 0.12)));
    projection.scale(base * zoom).translate([w / 2, h / 2]).rotate([-cam[0], -cam[1] * 0.75, 0]);

    ctx.clearRect(0, 0, w, h);

    const r = projection.scale();
    // atmosphere glow
    const glow = ctx.createRadialGradient(w / 2, h / 2, r * 0.95, w / 2, h / 2, r * 1.25);
    glow.addColorStop(0, "rgba(120,160,255,0.35)");
    glow.addColorStop(1, "rgba(120,160,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // ocean
    const ocean = ctx.createRadialGradient(w / 2 - r * 0.35, h / 2 - r * 0.35, r * 0.1, w / 2, h / 2, r);
    ocean.addColorStop(0, "#1b2a55");
    ocean.addColorStop(1, "#070b1c");
    ctx.beginPath();
    path({ type: "Sphere" });
    ctx.fillStyle = ocean;
    ctx.fill();

    ctx.beginPath();
    path(graticule);
    ctx.strokeStyle = "rgba(255,255,255,0.06)";
    ctx.lineWidth = 0.6;
    ctx.stroke();

    ctx.beginPath();
    path(land);
    ctx.fillStyle = "#2c3a63";
    ctx.fill();

    ctx.beginPath();
    path(borders);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // full route, faint dashes
    const samples = 120;
    const route = { type: "LineString", coordinates: Array.from({ length: samples + 1 }, (_, i) => interp(i / samples)) };
    ctx.beginPath();
    path(route);
    ctx.setLineDash([3, 6]);
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);

    // travelled route, glowing
    if (f > 0.001) {
      const n = Math.max(2, Math.ceil(samples * f));
      const flown = { type: "LineString", coordinates: Array.from({ length: n + 1 }, (_, i) => interp((i / n) * f)) };
      ctx.beginPath();
      path(flown);
      ctx.shadowColor = colors.accent;
      ctx.shadowBlur = 14;
      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    const centre = projection.invert([w / 2, h / 2]);
    marker(from, colors.fromLabel, centre, f < 0.05);
    marker(to, colors.toLabel, centre, f > 0.95);

    // plane
    if (t > 0.08 && t < 0.94 && geoDistance(pos, centre) < Math.PI / 2) {
      const [x, y] = projection(pos);
      const [x2, y2] = projection(interp(Math.min(1, f + 0.01)));
      const ang = f >= 0.99 ? 0 : Math.atan2(y2 - y, x2 - x);
      const s = 1.5 + 0.5 * Math.sin(Math.PI * f);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(ang);
      ctx.scale(s, s);
      ctx.shadowColor = "rgba(0,0,0,0.6)";
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 6;
      ctx.fillStyle = "#fff";
      ctx.fill(PLANE);
      ctx.restore();
    }
    return f;
  }

  return { render, resize };
}

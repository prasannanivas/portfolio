import React from "react";

/*
  The protagonist. One SVG character, several life stages.
  variant: "toddler" | "school" | "college" | "grad" | "winter" | "adult"
  walking: swing legs/arms (CSS)
*/

const SKIN = "#b07a52";
const SKIN_SHADE = "#946240";
const HAIR = "#1c1411";

// Curl positions around the top of the head (cx, cy, r) — hand-placed for a bouncy silhouette.
const CURLS = [
  [58, 92, 13], [56, 74, 14], [64, 56, 15], [78, 43, 15], [96, 36, 16],
  [115, 37, 15], [132, 46, 15], [143, 61, 14], [146, 79, 13], [144, 95, 12],
  [72, 66, 13], [90, 52, 14], [110, 50, 14], [127, 60, 13], [100, 44, 12],
  [83, 60, 11], [118, 62, 11],
];

function Hair({ toque }) {
  const curls = toque ? CURLS.filter(([, cy]) => cy > 70) : CURLS;
  return (
    <g className="kid-hair">
      {curls.map(([cx, cy, r], i) => (
        <g key={i} className="curl" style={{ "--i": i, transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={r} fill={HAIR} />
          {/* little spiral highlight so each blob reads as a curl */}
          <path
            d={`M${cx - r * 0.45} ${cy} a${r * 0.45} ${r * 0.45} 0 1 1 ${r * 0.45} ${r * 0.45}`}
            fill="none"
            stroke="#3a2a24"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
    </g>
  );
}

const FRINGE = [[70, 70, 12], [86, 62, 13], [103, 60, 13], [120, 64, 12], [134, 74, 10]];

function Fringe() {
  return (
    <g className="kid-hair">
      {FRINGE.map(([cx, cy, r], i) => (
        <g key={i} className="curl" style={{ "--i": i + 20, transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={r} fill={HAIR} />
          <path d={`M${cx - r * 0.45} ${cy} a${r * 0.45} ${r * 0.45} 0 1 1 ${r * 0.45} ${r * 0.45}`} fill="none" stroke="#3a2a24" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function Face() {
  return (
    <g className="kid-face">
      <ellipse cx="58" cy="100" rx="7" ry="9" fill={SKIN_SHADE} />
      <ellipse cx="142" cy="100" rx="7" ry="9" fill={SKIN_SHADE} />
      <circle cx="100" cy="98" r="42" fill={SKIN} />
      <g className="kid-eyes">
        <ellipse cx="85" cy="98" rx="4.2" ry="5.2" fill="#1a1110" />
        <ellipse cx="115" cy="98" rx="4.2" ry="5.2" fill="#1a1110" />
        <circle cx="86.5" cy="96" r="1.4" fill="#fff" />
        <circle cx="116.5" cy="96" r="1.4" fill="#fff" />
      </g>
      <circle cx="76" cy="112" r="6" fill="#e0715a" opacity=".35" />
      <circle cx="124" cy="112" r="6" fill="#e0715a" opacity=".35" />
      <path d="M89 115 Q100 125 111 115" fill="none" stroke="#3b1f17" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Legs({ color = "#2b2d42", shoe = "#111", short }) {
  const len = short ? 34 : 52;
  return (
    <g className="kid-legs">
      <g className="leg leg-l" style={{ transformOrigin: "88px 200px" }}>
        <rect x="80" y="196" width="15" height={len} rx="7" fill={color} />
        <rect x="74" y={194 + len} width="24" height="11" rx="5.5" fill={shoe} />
      </g>
      <g className="leg leg-r" style={{ transformOrigin: "112px 200px" }}>
        <rect x="105" y="196" width="15" height={len} rx="7" fill={color} />
        <rect x="102" y={194 + len} width="24" height="11" rx="5.5" fill={shoe} />
      </g>
    </g>
  );
}

function Arms({ color, hands = SKIN, pose = "down" }) {
  if (pose === "up") {
    return (
      <g className="kid-arms">
        <path d="M72 150 L48 112" stroke={color} strokeWidth="15" strokeLinecap="round" />
        <path d="M128 150 L152 112" stroke={color} strokeWidth="15" strokeLinecap="round" />
        <circle cx="46" cy="108" r="8" fill={hands} />
        <circle cx="154" cy="108" r="8" fill={hands} />
      </g>
    );
  }
  if (pose === "type") {
    return (
      <g className="kid-arms">
        <path d="M72 150 Q60 185 84 192" fill="none" stroke={color} strokeWidth="15" strokeLinecap="round" />
        <path d="M128 150 Q140 185 116 192" fill="none" stroke={color} strokeWidth="15" strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g className="kid-arms">
      <g className="arm arm-l" style={{ transformOrigin: "72px 148px" }}>
        <path d="M72 148 L62 196" stroke={color} strokeWidth="15" strokeLinecap="round" />
        <circle cx="61" cy="201" r="8" fill={hands} />
      </g>
      <g className="arm arm-r" style={{ transformOrigin: "128px 148px" }}>
        <path d="M128 148 L138 196" stroke={color} strokeWidth="15" strokeLinecap="round" />
        <circle cx="139" cy="201" r="8" fill={hands} />
      </g>
    </g>
  );
}

function Laptop() {
  return (
    <g className="kid-laptop">
      <path d="M58 196 L142 196 L150 206 L50 206 Z" fill="#c9ccd6" />
      <rect x="64" y="150" width="72" height="48" rx="4" fill="#d9dce5" />
      <circle cx="100" cy="174" r="5" fill="#4b3bff" />
    </g>
  );
}

function Body({ variant }) {
  switch (variant) {
    case "toddler":
      return (
        <>
          <Legs color="#2d6a8f" short />
          <Arms color="#2ec4b6" />
          <path d="M70 140 Q100 128 130 140 L136 206 Q100 214 64 206 Z" fill="#2ec4b6" />
          <circle cx="100" cy="176" r="9" fill="#ffd23f" />
        </>
      );
    case "school":
      return (
        <>
          <rect x="56" y="140" width="34" height="56" rx="10" fill="#d1495b" className="backpack" />
          <Legs color="#22305a" />
          <Arms color="#f4f1ea" />
          <path d="M70 140 Q100 130 130 140 L132 202 L68 202 Z" fill="#f4f1ea" />
          <path d="M96 140 L104 140 L106 172 L100 180 L94 172 Z" fill="#22305a" />
          <path d="M72 144 L84 200" stroke="#a83646" strokeWidth="5" />
        </>
      );
    case "college":
      return (
        <>
          <Legs color="#2a2f45" />
          <Arms color="#5b4bdb" pose="type" />
          <path d="M66 142 Q100 128 134 142 L138 204 L62 204 Z" fill="#5b4bdb" />
          <path d="M84 140 Q100 158 116 140" fill="none" stroke="#3d31a8" strokeWidth="5" />
          <Laptop />
        </>
      );
    case "grad":
      return (
        <>
          <Legs color="#15151c" />
          <Arms color="#1d1d27" pose="up" />
          <path d="M64 140 Q100 128 136 140 L146 252 L54 252 Z" fill="#1d1d27" />
          <path d="M88 138 L100 158 L112 138" fill="#ffd23f" />
        </>
      );
    case "winter":
      return (
        <>
          <Legs color="#1f2a3a" />
          <Arms color="#d52b1e" hands="#1f2a3a" />
          <path d="M62 140 Q100 126 138 140 L142 214 L58 214 Z" fill="#d52b1e" />
          <line x1="100" y1="146" x2="100" y2="212" stroke="#a51f15" strokeWidth="3" />
          <path d="M66 136 Q100 152 134 136 L134 148 Q100 164 66 148 Z" fill="#f4f1ea" />
          <rect x="114" y="140" width="12" height="34" rx="4" fill="#f4f1ea" />
        </>
      );
    case "dev":
      return (
        <>
          <Legs color="#22252f" />
          <Arms color="#16171d" pose="type" />
          <path d="M68 140 Q100 128 132 140 L134 204 L66 204 Z" fill="#16171d" />
          <Laptop />
        </>
      );
    case "adult":
    default:
      return (
        <>
          <Legs color="#22252f" />
          <Arms color="#16171d" />
          <path d="M68 140 Q100 128 132 140 L134 204 L66 204 Z" fill="#16171d" />
          <text x="100" y="180" textAnchor="middle" fontSize="16" fontFamily="monospace" fill="#c6ff3d">{"</>"}</text>
        </>
      );
  }
}

function Toque() {
  return (
    <g className="kid-toque">
      <path d="M56 84 Q58 30 100 28 Q142 30 144 84 Z" fill="#d52b1e" />
      <rect x="52" y="74" width="96" height="18" rx="9" fill="#f4f1ea" />
      <circle cx="100" cy="24" r="12" fill="#f4f1ea" />
    </g>
  );
}

function GradCap() {
  return (
    <g className="kid-cap">
      <path d="M100 18 L156 38 L100 58 L44 38 Z" fill="#111" />
      <rect x="76" y="40" width="48" height="16" fill="#111" />
      <path d="M150 40 L152 70" stroke="#ffd23f" strokeWidth="3" />
      <circle cx="152" cy="72" r="4" fill="#ffd23f" />
    </g>
  );
}

export default function Kid({ variant = "adult", walking = false, className = "", style }) {
  const head = variant === "toddler" ? "scale(1.12) translate(-11 -6)" : undefined;
  return (
    <svg
      viewBox="0 0 200 270"
      className={`kid kid--${variant} ${walking ? "is-walking" : ""} ${className}`}
      style={style}
      role="img"
      aria-label={`Illustration of Prasanna as ${variant === "adult" ? "an adult" : `a ${variant}`}`}
    >
      <ellipse cx="100" cy="262" rx="52" ry="6" fill="currentColor" opacity=".12" />
      <g className="kid-body">
        <Body variant={variant} />
      </g>
      <g className="kid-head" transform={head}>
        <Hair toque={variant === "winter"} />
        <Face />
        <Fringe />
        {variant === "winter" && <Toque />}
        {variant === "grad" && <GradCap />}
      </g>
    </svg>
  );
}

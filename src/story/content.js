// All story copy + data lives here — edit freely without touching animation code.

import roostWeb from "../images/Project/roost_previews/roost_web.png";
import roostWeb2 from "../images/Project/roost_previews/roost_web2.png";
import roostIos1 from "../images/Project/roost_previews/roost_ios_preview-01.png";
import roostIos3 from "../images/Project/roost_previews/roost_ios_preview-03.png";
import oneupWeb1 from "../images/Project/oneup_previews/oneupweb1.png";
import oneupWeb2 from "../images/Project/oneup_previews/oneupweb2.png";
import boomsoldMap from "../images/Project/boomsold_previews/boomsold-map.jpg";
import boomsoldHoods from "../images/Project/boomsold_previews/boomsold-neighbourhoods.jpg";
import boomsoldMobile from "../images/Project/boomsold_previews/boomsold-mobile.jpg";
import todoboardimg from "../images/Project/todoboard.png";
import thalapakattu1 from "../images/Project/thalapakattu1.png";
import moicollectorimg from "../images/Project/moi-collector.png";

import reactlogo from "../images/logos/reactlogo.png";
import nodelogo from "../images/logos/nodelogo.png";
import javalogo from "../images/logos/Javalogo.png";
import pythonlogo from "../images/logos/pythonlogo.png";
import mongologo from "../images/logos/mongologo.png";
import sqllogo from "../images/logos/sqllogo.png";
import gitlogo from "../images/logos/gitlogo.png";
import dockerLogo from "../images/logos/dockerLogo.png";
import kubernetesLogo from "../images/logos/KubernetesLogo.png";
import awsLogo from "../images/logos/awsLogo.png";
import reactNativeLogo from "../images/logos/reactnativeLogo.png";
import csslogo from "../images/logos/csslogo.png";

import lumellogo from "../images/Lumel-logo.png";
import zohologo from "../images/zoho-logo.png";
import toshibalogo from "../images/Toshiba-logo.png";
import oneuplogo from "../images/logos/1up_media_logo.jpeg";
import roostLogo from "../images/logos/roostLogo.png";
import pandoLogo from "../images/logos/pando-logo.svg";
import sciexLogo from "../images/logos/sciex-logo.png";

import albertacert from "../images/certificates/alberta-cert.png";
import stanfordcert from "../images/certificates/stanford-cert.png";
import hongkongcert from "../images/certificates/hongkong-cert.png";
import jiracert from "../images/certificates/jira-cert.png";
import fccCert from "../images/certificates/freecodecamp-backend-cert.png";
import durgacert from "../images/certificates/durga-python.png";
import awscert from "../images/certificates/aws-cert.png";

export const person = {
  name: "Prasanna Nivas",
  role: "Full-Stack Engineer",
  city: "Toronto",
  email: "d.prasannanivas@gmail.com",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/prasanna-nivas-8231b11a0/" },
    { label: "GitHub", href: "https://github.com/prasannanivas?tab=repositories" },
    { label: "Instagram", href: "https://www.instagram.com/de_prasanna/" },
  ],
};

// Chapter labels drive the HUD in the top-right corner.
export const chapters = [
  { id: "hero", num: "00", title: "Prologue" },
  { id: "curls", num: "01", title: "Numbers" },
  { id: "school", num: "02", title: "First bell" },
  { id: "college", num: "03", title: "Compile" },
  { id: "work", num: "04", title: "First commits" },
  { id: "flight", num: "05", title: "Departure" },
  { id: "canada", num: "06", title: "Fresh snow" },
  { id: "career", num: "07", title: "Level up" },
  { id: "ai", num: "08", title: "Co-pilot" },
  { id: "now", num: "09", title: "Shipping" },
  { id: "words", num: "10", title: "Kind words" },
  { id: "writing", num: "11", title: "Writing" },
  { id: "toolkit", num: "12", title: "Toolkit" },
  { id: "epilogue", num: "13", title: "Epilogue" },
];

export const childhood = {
  kicker: "India",
  lines: [
    "Before the code,",
    "there was a kid",
    "who loved maths",
    "more than anything.",
  ],
  aside: "Numbers, patterns, puzzles — maths was always the favourite subject, and solving a hard problem was the best feeling there was.",
};

export const school = {
  kicker: "School years",
  title: ["The bell rang.", "Maths class was the best part."],
  board: ["a² + b² = c²", "x = (−b ± √(b² − 4ac)) / 2a", 'print("Hello, World")'],
  aside: "Equations felt like puzzles. Then came the discovery that code is just maths that runs.",
};

export const college = {
  institution: "Coimbatore Institute of Technology",
  degree: "B.Sc. Computer Science",
  years: "2018 — 2022",
  place: "Coimbatore, India",
  grade: 8.61,
  gradeOf: 10,
  code: `const me = new Student("Prasanna");
me.learn(["DSA", "Algorithms", "OOP"]);
me.build("first real project");
while (!graduated) {
  me.code(); me.debug(); me.repeat();
}
// 2022 — graduated ✓`,
};

export const work = {
  title: ["The kid got", "a badge and a desk."],
  roles: [
    {
      company: "Toshiba",
      logo: toshibalogo,
      what: "Started in firmware — then built real-time performance-tracking systems with React dashboards and data pipelines.",
      tags: ["Firmware", "React", "Data pipelines"],
    },
    {
      company: "Lumel Technologies",
      logo: lumellogo,
      what: "Went deep on microservices: containerized REST APIs on Docker + Kubernetes, secured with JWT / OAuth 2.0.",
      tags: ["Microservices", "Docker", "Kubernetes", "OAuth 2.0"],
    },
  ],
  logos: [
    { name: "Toshiba", src: toshibalogo },
    { name: "Zoho", src: zohologo },
    { name: "Lumel", src: lumellogo },
    { name: "1UP Media", src: oneuplogo },
    { name: "Roost", src: roostLogo },
    { name: "Pando", src: pandoLogo },
    { name: "SCIEX", src: sciexLogo },
  ],
};

export const flight = {
  year: "2023",
  from: { label: "Coimbatore", country: "India", coords: [76.96, 11.02] },
  to: { label: "Toronto", country: "Canada", coords: [-79.38, 43.65] },
  lines: ["One suitcase.", "One laptop.", "A whole new hemisphere."],
};

export const canada = {
  institution: "Lambton College",
  degree: "PG, Full Stack Software Development",
  years: "2023 — 2024",
  place: "Toronto, Canada",
  grade: 3.6,
  gradeOf: 4,
  lines: ["New country.", "New winters.", "Same love for maths."],
};

// Chapter 07 — the Canada-era career, stacked cards.
export const career = {
  title: ["Then came", "the real builds."],
  roles: [
    {
      company: "1UP Media",
      logo: oneuplogo,
      what: "AI-powered WordPress automation on AWS — OpenAI content pipelines, vector-embedding internal links, Auto Scaling Node.js services.",
      tags: ["OpenAI", "Node.js", "AWS", "Embeddings"],
    },
    {
      company: "Roost",
      logo: roostLogo,
      what: "A Toronto mortgage-broking platform: React Native app, React admin portal, real-time Socket.io chat and encrypted document sharing.",
      tags: ["React Native", "React", "Socket.io", "S3"],
    },
    {
      company: "Pando",
      when: "Jan — Aug 2026",
      logo: pandoLogo,
      what: "Software engineering at Pando, the AI-native logistics and supply-chain platform.",
      tags: ["India", "SaaS", "Logistics"],
    },
    {
      company: "SCIEX",
      when: "2026 — Present",
      logo: sciexLogo,
      what: "Now building software at SCIEX, the Danaher company behind life-science mass spectrometry.",
      tags: ["Current", "Life sciences"],
    },
  ],
};

// Chapter 08 — the AI era. Decisions are taken from the projects' own design docs.
export const aiEra = {
  year: "2025",
  question: ["Did all my coding", "go vibe?"],
  answer: "Honestly — about 90% of the keystrokes.",
  share: 90,
  caption: "AI types. I decide what's worth typing.",
  callsTitle: ["AI writes the code.", "I make the calls."],
  decisions: [
    {
      project: "Trading Monitor",
      ai: "Store every daily bond yield as its own MongoDB document.",
      me: "One document per country + maturity, history kept as an array.",
      result: "125,000+ docs → 18",
      why: "Knowing how the data is actually read beats the textbook schema.",
    },
    {
      project: "Trading Monitor",
      ai: "Serve history and backtests from the auth service — it already has the DB connection.",
      me: "Keep auth tiny. Move heavy reads next to the engine scanning 1,214 symbols.",
      result: "Logins stay fast under full scan load",
      why: "Service boundaries follow load, not convenience.",
    },
    {
      project: "Boomsold",
      ai: "Show a median price for every neighbourhood and property type.",
      me: "Hide any median built on fewer than 30 sales.",
      result: "No misleading numbers in front of a broker's clients",
      why: "A broker's reputation is the product. Trust > coverage.",
    },
    {
      project: "Horoscope Fullscope",
      ai: "Let the model write each horoscope reading.",
      me: "Compute charts with an astronomy engine; ground every reading in classical-text citations.",
      result: "Readings families can trace to a source",
      why: "In matrimony, a confident hallucination is worse than no answer.",
    },
  ],
  pillarsTitle: ["What I bring", "that AI can't."],
  pillars: [
    { k: "System design", v: "Boundaries, data shapes, trade-offs — decided before the first prompt." },
    { k: "The right questions", v: "“Should we use this or that — and what breaks if we're wrong?”" },
    { k: "Business context", v: "Who's using it, what they fear, and what actually moves the needle." },
    { k: "Ownership", v: "Reviewing every line AI writes, and owning it when it breaks." },
  ],
  tagline: ["AI makes me faster.", "Judgment makes it right."],
};

// Add real quotes here — the section stays hidden while this list is empty.
// { quote: "…", name: "Full Name", role: "Title", company: "Company" }
export const testimonials = [];

export const projects = [
  {
    title: "Trading Monitor",
    sub: "IBKR signal cockpit",
    desc: "A private trading cockpit that runs beside Interactive Brokers. Scans 1,200+ symbols for EMA-200, RSI and MACD crossovers, streams signals over WebSockets, and layers in macro context — central-bank rates, bond-yield spreads, an economic calendar and backtests — with Telegram alerts.",
    tech: ["Python", "FastAPI", "IBKR API", "React", "MongoDB", "WebSockets"],
    art: "chart",
    github: "https://github.com/prasannanivas/Interactive-Brokers",
    accent: "#3ddc97",
  },
  {
    title: "Horoscope Fullscope",
    sub: "Vedic astrology × matrimony",
    desc: "A matrimony platform where every profile carries a full Jathagam. Computes Rasi and Navamsa charts from birth details with an astronomy engine, runs 10-Porutham matching and Vimshottari Dasha timelines, and writes Claude-powered readings grounded in classical texts. Exports biodata to PDF and DOCX.",
    tech: ["Next.js", "React 19", "MongoDB", "astronomy-engine", "Claude API", "Tailwind"],
    art: "kattam",
    accent: "#f5c46b",
  },
  {
    title: "Boomsold",
    sub: "Montréal real-estate explorer",
    desc: "An interactive, bilingual (EN/FR) map of Montréal's real-estate market built for a local broker. Drill from regions to neighbourhoods, toggle condo / single-family / duplex, read market heat, and compare 1/3/5-year price trends — with medians hidden wherever the sample is too small to trust.",
    tech: ["Next.js", "React 19", "Leaflet", "Turf.js", "GeoJSON", "i18next"],
    images: [boomsoldMap, boomsoldMobile, boomsoldHoods],
    accent: "#ffcc1f",
  },
  {
    title: "Roost",
    sub: "Mortgage broking platform · Toronto",
    desc: "Connects realtors, brokers and clients. React Native app + React admin portal with role-based dashboards, Socket.io chat, and encrypted document sharing on GridFS + S3.",
    tech: ["React Native", "React", "Node.js", "MongoDB", "Socket.io", "AWS S3"],
    images: [roostWeb, roostIos1, roostWeb2, roostIos3],
    accent: "#7aa2ff",
  },
  {
    title: "1UP Media AI",
    sub: "AI content platform",
    desc: "WordPress automation powered by OpenAI. Node.js services on EC2 behind an ALB with Auto Scaling, vector-embedding internal links, MOZ + GA content-decay detection.",
    tech: ["OpenAI", "Node.js", "AWS EC2", "RDS", "Embeddings"],
    images: [oneupWeb1, oneupWeb2],
    accent: "#a99dff",
  },
  {
    title: "Todo Board",
    sub: "Personal project",
    desc: "A Trello-style drag-and-drop board with real-time Firebase sync.",
    tech: ["React", "Firebase"],
    images: [todoboardimg],
    github: "https://github.com/prasannanivas/Todo-DND",
    live: "https://cheerful-marigold-d55221.netlify.app/",
    accent: "#ff6fb5",
  },
  {
    title: "Shift Clock",
    sub: "Thalapakatti restaurant",
    desc: "Employee clock-in / clock-out with SQL-backed history and date-range working-hour analytics.",
    tech: ["React", "Node.js", "SQL"],
    images: [thalapakattu1],
    accent: "#c6ff3d",
  },
  {
    title: "Moi-Collector",
    sub: "Personal project",
    desc: "Paperless gift tracking for Tamil weddings, with ChartJS breakdowns.",
    tech: ["React", "ChartJS"],
    images: [moicollectorimg],
    github: "https://github.com/prasannanivas/moi-collection-tracker",
    accent: "#4cc9f0",
  },
];

export const skills = [
  { name: "React", icon: reactlogo },
  { name: "React Native", icon: reactNativeLogo },
  { name: "Node.js", icon: nodelogo },
  { name: "Java", icon: javalogo },
  { name: "Python", icon: pythonlogo },
  { name: "MongoDB", icon: mongologo },
  { name: "SQL", icon: sqllogo },
  { name: "AWS", icon: awsLogo },
  { name: "Docker", icon: dockerLogo },
  { name: "Kubernetes", icon: kubernetesLogo },
  { name: "Git", icon: gitlogo },
  { name: "CSS", icon: csslogo },
];

export const certificates = [
  { name: "AWS Certified Cloud Practitioner", by: "Amazon Web Services", img: awscert },
  { name: "Machine Learning", by: "Stanford University", img: stanfordcert },
  { name: "Object-Oriented Design", by: "University of Alberta", img: albertacert },
  { name: "Front-End Web Development", by: "HKUST", img: hongkongcert },
  { name: "Backend Development", by: "freeCodeCamp", img: fccCert },
  { name: "Jira Fundamentals", by: "Atlassian", img: jiracert },
  { name: "Python Programming", by: "Durga Software", img: durgacert },
];

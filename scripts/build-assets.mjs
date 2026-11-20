import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "assets", "dist");
mkdirSync(outDir, { recursive: true });

const FONT = "Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const ICONS = {
  sparkle: `
    <path d="M12 2.2l2.35 6.45L21 11l-6.65 2.35L12 19.8l-2.35-6.45L3 11l6.65-2.35L12 2.2z" fill="#fff"/>
    <path d="M19 15.5l.95 2.55L22.5 19l-2.55.95L19 22.5l-.95-2.55L15.5 19l2.55-.95L19 15.5z" fill="#fff" opacity=".72"/>`,
  grid: `
    <rect x="3" y="3" width="7.2" height="7.2" rx="2.1" fill="#fff"/>
    <rect x="13.8" y="3" width="7.2" height="7.2" rx="2.1" fill="#fff" opacity=".82"/>
    <rect x="3" y="13.8" width="7.2" height="7.2" rx="2.1" fill="#fff" opacity=".82"/>
    <rect x="13.8" y="13.8" width="7.2" height="7.2" rx="2.1" fill="#fff" opacity=".58"/>`,
  chart: `
    <rect x="3.4" y="13.2" width="4.4" height="7.4" rx="1.6" fill="#fff" opacity=".72"/>
    <rect x="9.8" y="9" width="4.4" height="11.6" rx="1.6" fill="#fff"/>
    <rect x="16.2" y="4.4" width="4.4" height="16.2" rx="1.6" fill="#fff" opacity=".86"/>
    <path d="M4.6 10.2l5-3.4 4.2 2.1 5.4-4.4" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>`,
  window: `
    <rect x="2.6" y="3.6" width="18.8" height="16.8" rx="3.4" fill="none" stroke="#fff" stroke-width="1.7"/>
    <path d="M2.6 9.2h18.8" stroke="#fff" stroke-width="1.7"/>
    <circle cx="6.4" cy="6.4" r="1.05" fill="#fff"/>
    <circle cx="9.7" cy="6.4" r="1.05" fill="#fff" opacity=".7"/>
    <path d="M6 13h5.2M6 16.4h8.4" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity=".65"/>`,
  atom: `
    <g fill="none" stroke="#fff" stroke-width="1.5">
      <ellipse cx="12" cy="12" rx="9.2" ry="3.7"/>
      <ellipse cx="12" cy="12" rx="9.2" ry="3.7" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="9.2" ry="3.7" transform="rotate(120 12 12)"/>
    </g>
    <circle cx="12" cy="12" r="1.55" fill="#fff"/>`,
  vue: `
    <path d="M2 4.2h4.15L12 15.05 17.85 4.2H22L12 21 2 4.2z" fill="#fff"/>
    <path d="M6.35 4.2h2.3L12 9.75l3.35-5.55h2.3L12 14.45 6.35 4.2z" fill="#0B0F1A" opacity=".55"/>`,
  node: `
    <path d="M12 2.2l8.8 4.9v9.8L12 21.8l-8.8-4.9V7.1L12 2.2z" fill="none" stroke="#fff" stroke-width="1.55"/>
    <text x="12" y="15.3" text-anchor="middle" font-family="${FONT}" font-size="6.6" font-weight="700" fill="#fff">JS</text>`,
  python: `
    <path d="M11.9 2.2c-2.9 0-4.7 1.1-4.7 3.2v2.7h4.8v1H6.3c-2.2 0-3.9 1.5-3.9 4s1.7 4 3.9 4h1.9v-2.9c0-2 1.5-3.4 3.4-3.4h4.2c1.7 0 3-1.2 3-2.9V5.4c0-2.1-3.8-3.2-6.9-3.2z" fill="#fff" opacity=".95"/>
    <path d="M12.1 21.8c2.9 0 4.7-1.1 4.7-3.2v-2.7h-4.8v-1h5.7c2.2 0 3.9-1.5 3.9-4s-1.7-4-3.9-4h-1.9v2.9c0 2-1.5 3.4-3.4 3.4H8.2c-1.7 0-3 1.2-3 2.9v3.5c0 2.1 3.8 3.2 6.9 3.2z" fill="#fff" opacity=".55"/>
    <circle cx="9.4" cy="5.5" r=".95" fill="#0B0F1A"/>
    <circle cx="14.6" cy="18.5" r=".95" fill="#0B0F1A"/>`,
  shield: `
    <path d="M12 2.3l8.1 3.05v5.9c0 5.05-3.45 9.05-8.1 11.05-4.65-2-8.1-6-8.1-11.05v-5.9L12 2.3z" fill="none" stroke="#fff" stroke-width="1.7"/>
    <path d="M8.3 12.05l2.6 2.55 4.85-5.15" fill="none" stroke="#fff" stroke-width="2.05" stroke-linecap="round" stroke-linejoin="round"/>`,
  terminal: `
    <rect x="2.7" y="3.8" width="18.6" height="16.4" rx="3.4" fill="none" stroke="#fff" stroke-width="1.7"/>
    <path d="M7 9.2l3.1 2.9L7 15M12.7 15.2h4.2" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
};

function icon(name, x, y, size = 24) {
  const scale = size / 24;
  return `<g transform="translate(${x} ${y}) scale(${scale})">${ICONS[name]}</g>`;
}

function svg(width, height, body, defs = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
<defs>${defs}</defs>
${body}
</svg>
`;
}

function glassDefs(prefix, accentA, accentB) {
  return `
  <linearGradient id="${prefix}-glass" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".16"/>
    <stop offset=".55" stop-color="#ffffff" stop-opacity=".07"/>
    <stop offset="1" stop-color="#ffffff" stop-opacity=".03"/>
  </linearGradient>
  <linearGradient id="${prefix}-accent" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${accentA}"/>
    <stop offset="1" stop-color="${accentB}"/>
  </linearGradient>
  <linearGradient id="${prefix}-edge" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".55"/>
    <stop offset=".45" stop-color="#ffffff" stop-opacity=".08"/>
    <stop offset="1" stop-color="${accentA}" stop-opacity=".35"/>
  </linearGradient>
  <filter id="${prefix}-shadow" x="-40%" y="-40%" width="180%" height="190%">
    <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#02040a" flood-opacity=".55"/>
  </filter>
  <filter id="${prefix}-blur" x="-80%" y="-80%" width="260%" height="260%">
    <feGaussianBlur stdDeviation="26"/>
  </filter>`;
}

function heroTile({ x, y, w, h, rotate, accentA, accentB, iconName, title, subtitle }) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  const p = `ht-${iconName}`;
  return `
  <g transform="rotate(${rotate} ${cx} ${cy})">
    <rect x="${x - 12}" y="${y + 8}" width="${w + 24}" height="${h + 18}" rx="40" fill="${accentA}" opacity=".2" filter="url(#hero-blur)"/>
    <g filter="url(#hero-shadow)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="url(#${p}-glass)" stroke="url(#${p}-edge)" stroke-width="1.6"/>
      <rect x="${x + 1.5}" y="${y + 1.5}" width="${w - 3}" height="${h - 3}" rx="32.5" fill="none" stroke="#ffffff" stroke-opacity=".08"/>
      <rect x="${x + 26}" y="${y + 26}" width="66" height="66" rx="20" fill="url(#${p}-accent)"/>
      <rect x="${x + 26}" y="${y + 26}" width="66" height="66" rx="20" fill="none" stroke="#ffffff" stroke-opacity=".35"/>
      ${icon(iconName, x + 43, y + 43, 32)}
      <rect x="${x + 26}" y="${y + 2}" width="${w - 52}" height="1.5" rx=".75" fill="#ffffff" fill-opacity=".3"/>
      <text x="${x + 28}" y="${y + 138}" font-family="${FONT}" font-size="34" font-weight="700" fill="#ffffff">${esc(title)}</text>
      <text x="${x + 28}" y="${y + 166}" font-family="${FONT}" font-size="14.5" font-weight="600" letter-spacing="2.4" fill="#dfe6f5" fill-opacity=".72">${esc(subtitle)}</text>
    </g>
  </g>`;
}

function hero() {
  const tiles = [
    { x: 44, y: 46, w: 320, h: 188, rotate: -3, accentA: "#8B5CF6", accentB: "#D946EF", iconName: "sparkle", title: "Samuel AI", subtitle: "PORTFOLIO ASSISTANT" },
    { x: 956, y: 46, w: 320, h: 188, rotate: 3, accentA: "#FB923C", accentB: "#F43F5E", iconName: "grid", title: "PayFlow", subtitle: "PAYMENT DASHBOARD" },
    { x: 44, y: 426, w: 320, h: 188, rotate: 3, accentA: "#22D3EE", accentB: "#0EA5E9", iconName: "chart", title: "DataVision", subtitle: "BI DASHBOARD" },
    { x: 956, y: 426, w: 320, h: 188, rotate: -3, accentA: "#34D399", accentB: "#10B981", iconName: "window", title: "Samuel OS", subtitle: "DESKTOP PORTFOLIO" },
  ];

  const tileDefs = tiles
    .map((t) => glassDefs(`ht-${t.iconName}`, t.accentA, t.accentB))
    .join("\n");

  const defs = `
  <linearGradient id="hero-bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#05070f"/>
    <stop offset=".5" stop-color="#090d1a"/>
    <stop offset="1" stop-color="#05070f"/>
  </linearGradient>
  <radialGradient id="glow-purple" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#7c3aed" stop-opacity=".55"/>
    <stop offset="1" stop-color="#7c3aed" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="glow-orange" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#f97316" stop-opacity=".38"/>
    <stop offset="1" stop-color="#f97316" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="glow-teal" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#06b6d4" stop-opacity=".34"/>
    <stop offset="1" stop-color="#06b6d4" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="glow-green" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#10b981" stop-opacity=".3"/>
    <stop offset="1" stop-color="#10b981" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="pill-glass" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".19"/>
    <stop offset=".5" stop-color="#ffffff" stop-opacity=".09"/>
    <stop offset="1" stop-color="#ffffff" stop-opacity=".035"/>
  </linearGradient>
  <linearGradient id="pill-edge" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".7"/>
    <stop offset=".4" stop-color="#ffffff" stop-opacity=".12"/>
    <stop offset="1" stop-color="#a78bfa" stop-opacity=".45"/>
  </linearGradient>
  <linearGradient id="orb-fill" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#1e293b"/>
    <stop offset="1" stop-color="#0b1020"/>
  </linearGradient>
  <linearGradient id="orb-ring" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#a78bfa"/>
    <stop offset=".5" stop-color="#22d3ee"/>
    <stop offset="1" stop-color="#34d399"/>
  </linearGradient>
  <linearGradient id="name-grad" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#ffffff"/>
    <stop offset="1" stop-color="#c7d2fe"/>
  </linearGradient>
  <filter id="hero-shadow" x="-40%" y="-40%" width="180%" height="190%">
    <feDropShadow dx="0" dy="22" stdDeviation="26" flood-color="#02040a" flood-opacity=".6"/>
  </filter>
  <filter id="hero-blur" x="-80%" y="-80%" width="260%" height="260%">
    <feGaussianBlur stdDeviation="30"/>
  </filter>
  <filter id="orb-glow" x="-80%" y="-80%" width="260%" height="260%">
    <feGaussianBlur stdDeviation="18"/>
  </filter>
  <pattern id="hero-dots" width="30" height="30" patternUnits="userSpaceOnUse">
    <circle cx="1.2" cy="1.2" r="1.1" fill="#ffffff" fill-opacity=".055"/>
  </pattern>
  ${tileDefs}`;

  const body = `
  <rect width="1320" height="660" fill="url(#hero-bg)"/>
  <rect width="1320" height="660" fill="url(#hero-dots)"/>
  <ellipse cx="170" cy="90" rx="560" ry="420" fill="url(#glow-purple)"/>
  <ellipse cx="1180" cy="80" rx="500" ry="400" fill="url(#glow-orange)"/>
  <ellipse cx="150" cy="620" rx="520" ry="400" fill="url(#glow-teal)"/>
  <ellipse cx="1190" cy="620" rx="500" ry="400" fill="url(#glow-green)"/>

  <g opacity=".42" fill="none" stroke-width="2">
    <path d="M356 300 C 300 330, 290 350, 250 360" stroke="#a78bfa"/>
    <path d="M964 300 C 1020 330, 1030 350, 1070 360" stroke="#fb923c"/>
    <path d="M356 370 C 300 390, 290 420, 250 440" stroke="#22d3ee"/>
    <path d="M964 370 C 1020 390, 1030 420, 1070 440" stroke="#34d399"/>
  </g>

  ${tiles.map(heroTile).join("\n")}

  <g filter="url(#hero-shadow)">
    <rect x="300" y="190" width="720" height="280" rx="82" fill="url(#pill-glass)" stroke="url(#pill-edge)" stroke-width="1.8"/>
    <rect x="302" y="192" width="716" height="276" rx="80" fill="none" stroke="#ffffff" stroke-opacity=".08"/>
  </g>

  <circle cx="415" cy="330" r="104" fill="#22d3ee" opacity=".22" filter="url(#orb-glow)"/>
  <circle cx="415" cy="330" r="100" fill="url(#orb-fill)" stroke="url(#orb-ring)" stroke-width="5"/>
  <circle cx="415" cy="330" r="88" fill="none" stroke="#ffffff" stroke-opacity=".12"/>
  <text x="425" y="356" text-anchor="middle" font-family="${FONT}" font-size="68" font-weight="700" fill="#ffffff">IS</text>

  <text x="550" y="300" font-family="${FONT}" font-size="54" font-weight="700" fill="url(#name-grad)">Samuel Izabayo</text>
  <text x="552" y="342" font-family="${FONT}" font-size="24" font-weight="500" fill="#a9b6d0">@Samuel-Fx-1</text>
  <text x="552" y="378" font-family="${FONT}" font-size="17.5" font-weight="600" letter-spacing=".2" fill="#dfe6f5" fill-opacity=".9">Full-Stack Developer &amp; Cybersecurity Analyst</text>
  <text x="552" y="404" font-family="${FONT}" font-size="15.5" font-weight="500" fill="#a9b6d0">Forex Trader · Kigali, Rwanda (UTC+2)</text>
  <circle cx="558" cy="432" r="4" fill="#34d399"/>
  <text x="572" y="437" font-family="${FONT}" font-size="13" font-weight="600" letter-spacing="1.4" fill="#8e9bb5">OPEN TO WORK</text>
  `;

  return svg(1320, 660, body, defs);
}

function workTile({ accentA, accentB, iconName, title, subtitle, status }) {
  const p = `wt-${iconName}`;
  const pillWidth = status === "OPEN SOURCE" ? 122 : 66;
  const defs = `
  <linearGradient id="${p}-bg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#111827"/>
    <stop offset="1" stop-color="#080b14"/>
  </linearGradient>
  <linearGradient id="${p}-accent" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${accentA}"/>
    <stop offset="1" stop-color="${accentB}"/>
  </linearGradient>
  <radialGradient id="${p}-glow" cx=".5" cy="0" r=".8">
    <stop offset="0" stop-color="${accentA}" stop-opacity=".3"/>
    <stop offset="1" stop-color="${accentA}" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="${p}-edge" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".3"/>
    <stop offset=".5" stop-color="${accentA}" stop-opacity=".18"/>
    <stop offset="1" stop-color="${accentB}" stop-opacity=".42"/>
  </linearGradient>
  <filter id="${p}-shadow" x="-30%" y="-30%" width="160%" height="170%">
    <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#02040a" flood-opacity=".5"/>
  </filter>
  <clipPath id="${p}-clip"><rect x="1" y="1" width="278" height="268" rx="34"/></clipPath>`;

  const body = `
  <g filter="url(#${p}-shadow)">
    <rect x="1" y="1" width="278" height="268" rx="34" fill="url(#${p}-bg)" stroke="url(#${p}-edge)" stroke-width="1.6"/>
  </g>
  <g clip-path="url(#${p}-clip)">
    <rect x="1" y="1" width="278" height="268" rx="34" fill="url(#${p}-glow)"/>
    <g opacity=".07" transform="translate(196 176) scale(4.2)">${ICONS[iconName]}</g>
  </g>
  <rect x="2.5" y="2.5" width="275" height="265" rx="32.5" fill="none" stroke="#ffffff" stroke-opacity=".06"/>
  <rect x="26" y="2" width="228" height="1.5" rx=".75" fill="#ffffff" fill-opacity=".26"/>

  <rect x="28" y="28" width="66" height="66" rx="20" fill="url(#${p}-accent)"/>
  <rect x="28" y="28" width="66" height="66" rx="20" fill="none" stroke="#ffffff" stroke-opacity=".32"/>
  ${icon(iconName, 45, 45, 32)}

  <text x="28" y="158" font-family="${FONT}" font-size="30" font-weight="700" fill="#ffffff">${esc(title)}</text>
  <text x="28" y="186" font-family="${FONT}" font-size="12.5" font-weight="600" letter-spacing="2" fill="#c7d2e5" fill-opacity=".68">${esc(subtitle)}</text>

  <rect x="28" y="210" width="${pillWidth}" height="32" rx="16" fill="${accentA}" fill-opacity=".14" stroke="${accentA}" stroke-opacity=".45"/>
  <text x="${28 + pillWidth / 2}" y="231" text-anchor="middle" font-family="${FONT}" font-size="11.5" font-weight="700" letter-spacing="1.4" fill="${accentA}">${esc(status)}</text>
  `;

  return svg(280, 270, body, defs);
}

function capability({ x, accent, iconName, title, subtitle }) {
  return `
  <rect x="${x}" y="40" width="232" height="190" rx="24" fill="#0e1422" stroke="#1e293b" stroke-width="1.4"/>
  <rect x="${x + 24}" y="64" width="56" height="56" rx="17" fill="${accent}" fill-opacity=".16" stroke="${accent}" stroke-opacity=".4"/>
  ${icon(iconName, x + 40, 80, 24)}
  <text x="${x + 24}" y="158" font-family="${FONT}" font-size="23" font-weight="700" fill="#ffffff">${esc(title)}</text>
  <text x="${x + 24}" y="184" font-family="${FONT}" font-size="14.5" font-weight="500" fill="#93a1ba">${esc(subtitle)}</text>
  <rect x="${x + 24}" y="208" width="44" height="4" rx="2" fill="${accent}" opacity=".8"/>`;
}

function capabilities() {
  const cards = [
    { accent: "#61dafb", iconName: "atom", title: "React", subtitle: "Next.js interfaces" },
    { accent: "#42b883", iconName: "vue", title: "Vue", subtitle: "Tailwind CSS" },
    { accent: "#68a063", iconName: "node", title: "Node.js", subtitle: "Express APIs" },
    { accent: "#ffd43b", iconName: "python", title: "Python", subtitle: "Scripting" },
    { accent: "#f87171", iconName: "shield", title: "Security", subtitle: "Review & hardening" },
  ];
  const body = `
  <rect x="1" y="1" width="1318" height="268" rx="28" fill="#0a0e18" stroke="#1b2436" stroke-width="1.4"/>
  <rect x="1" y="1" width="1318" height="268" rx="28" fill="none" stroke="#ffffff" stroke-opacity=".04"/>
  ${cards.map((c, i) => capability({ x: 40 + i * 252, ...c })).join("\n")}`;
  return svg(1320, 270, body);
}

function section({ title, subtitle, accentA, accentB }) {
  const defs = `
  <linearGradient id="sec-line" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="${accentA}" stop-opacity=".9"/>
    <stop offset=".45" stop-color="${accentB}" stop-opacity=".5"/>
    <stop offset="1" stop-color="${accentB}" stop-opacity="0"/>
  </linearGradient>`;
  const body = `
  <rect x="1" y="1" width="1318" height="70" rx="18" fill="#0a0e18" stroke="#1b2436" stroke-width="1.2"/>
  <rect x="1" y="1" width="1318" height="70" rx="18" fill="none" stroke="#ffffff" stroke-opacity=".035"/>
  <rect x="22" y="17" width="4" height="38" rx="2" fill="url(#sec-line)"/>
  <text x="40" y="45" font-family="${FONT}" font-size="27" font-weight="700" fill="#ffffff">${esc(title)}</text>
  <text x="1296" y="44" text-anchor="end" font-family="${FONT}" font-size="14.5" font-weight="500" fill="#7c8aa5">${esc(subtitle)}</text>
  <rect x="40" y="60" width="1240" height="1.5" rx=".75" fill="url(#sec-line)" opacity=".55"/>`;
  return svg(1320, 72, body, defs);
}

const assets = {
  "hero.svg": hero(),
  "section-work.svg": section({ title: "Selected work", subtitle: "Live products and open-source builds", accentA: "#a78bfa", accentB: "#22d3ee" }),
  "section-toolbox.svg": section({ title: "Toolbox", subtitle: "The stack I reach for", accentA: "#22d3ee", accentB: "#34d399" }),
  "section-now.svg": section({ title: "Now", subtitle: "What I'm building and what I'm open to", accentA: "#fb923c", accentB: "#d946ef" }),
  "section-agent.svg": section({ title: "Agent card", subtitle: "A machine-readable profile for AI tools", accentA: "#34d399", accentB: "#60a5fa" }),
  "tile-samuel-ai.svg": workTile({ accentA: "#8b5cf6", accentB: "#d946ef", iconName: "sparkle", title: "Samuel AI", subtitle: "PORTFOLIO ASSISTANT", status: "LIVE" }),
  "tile-samuel-os.svg": workTile({ accentA: "#34d399", accentB: "#10b981", iconName: "window", title: "Samuel OS", subtitle: "DESKTOP PORTFOLIO", status: "LIVE" }),
  "tile-payflow.svg": workTile({ accentA: "#fb923c", accentB: "#f43f5e", iconName: "grid", title: "PayFlow", subtitle: "PAYMENT DASHBOARD", status: "OPEN SOURCE" }),
  "tile-datavision.svg": workTile({ accentA: "#22d3ee", accentB: "#0ea5e9", iconName: "chart", title: "DataVision", subtitle: "BI DASHBOARD", status: "OPEN SOURCE" }),
  "capabilities.svg": capabilities(),
};

for (const [name, content] of Object.entries(assets)) {
  writeFileSync(join(outDir, name), content, "utf8");
  console.log(`wrote assets/dist/${name}`);
}

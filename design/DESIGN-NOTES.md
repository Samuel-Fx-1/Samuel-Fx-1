# DESIGN-NOTES — GitHub Profile README (Samuel-Fx-1)

> Phase 1 (STUDY). Author: agent. Base: textual description of reference layout
> (image attachment could not be opened by this model — I worked from the written
> spec). Style/structure copied only; all content original.

## 1. Owner / identity
- Name: Izabayo Samuel (Samuel Fx)
- Handle: @Samuel-Fx-1
- Role: Full-stack developer & Cybersecurity analyst, Forex Trader
- Location: Kigali, Rwanda
- Email: samuelislegend8@gmail.com
- Portfolio: https://samuelportfolio-seven.vercel.app/
- Samuel OS: https://samuelosportfolio.vercel.app/
- GitHub: https://github.com/Samuel-Fx-1

## 2. Color tokens

Dark (default, from portfolio palette):
| token | hex |
|---|---|
| void (bg) | #000008 |
| nebula | #0A0A14 |
| orbit | #16162E |
| orange | #FF8C00 |
| amber | #FFB800 |
| pulsar cyan | #16E6EE |
| comet blue | #4D4DFF |
| starlight (text) | #E8E8FF |
| muted text | #9C9CBE |

Light variant (derived, same accents darkened for contrast):
| token | hex |
|---|---|
| bg | #F4F4FA |
| card | #FFFFFF |
| text | #0A0A14 |
| muted | #5A5A7A |
| orange | #E07A00 |
| amber | #D4A000 |
| cyan | #0099A8 |
| comet blue | #3A3ACC |
| border | #D8D8E8 |

## 3. Layout (top to bottom)
1. Hero banner (wide, 2:1): dark bg + soft colored glows + floating glass bubbles.
   Center: frosted-glass speech-bubble pill with circular avatar (initials "IS"),
   name, @handle, subtitle. Four floating frosted-glass app cards around it
   (purple, teal, orange, green) with icon + title + small subtitle.
2. Divider (thin gradient line).
3. "Projects in motion" section pill (title left, caption right) + 2x2 grid of
   animated preview tiles (dark panels, small title chip, tiny URL caption).
4. Divider.
5. "App drawer" section pill (caption right) + row of 4 glass app-icon cards
   (gradient icon tile, name, one-line desc, monospace URL) + row of 4 link chips.
6. Divider.
7. "Built with" section pill (caption right) + row of 4 large dark glass tiles
   (tech logo, name, short descriptor).
8. Short contact line.

## 4. Image inventory (2x render, PNG unless noted)

| # | file (dark default) | light variant | size (px) | kind |
|---|---|---|---|---|
| 1 | assets/hero-v1.png | assets/hero-v1-light.png | 1600x800 | static PNG |
| 2-5 | assets/appcard-{slug}-v1.png | ...-light.png | 480x300 | static PNG x4 |
| 6-9 | assets/appchip-{slug}-v1.png | ...-light.png | 420x90 | static PNG x4 |
| 10-13 | assets/builtwith-{tech}-v1.png | ...-light.png | 480x380 | static PNG x4 |
| 14-17 | assets/tile-{slug}-v1.svg | (single file, CSS prefers-color-scheme inside) | 720x540 viewBox | animated SVG |

Slugs: portfolio, samuelos, payflow, edge. Techs: see section 6.

Total files: 1 + 8 + 8 + 8 + 4 = 29 files. Estimated weight < 5 MB.

## 5. Project choices (4 strongest real projects)
I ran `gh repo list Samuel-Fx-1` and checked live sites.

1. **Portfolio** — https://samuelportfolio-seven.vercel.app/
   Repo: sam_port_001 (React + Parcel + Express). Live site confirmed. The main
   portfolio showcasing full-stack work. Strongest "real" project (shipped).
2. **Samuel OS** — https://samuelosportfolio.vercel.app/
   Repo: Samuel_os_Portfolio (React 18, Vite 5, Tailwind 4, Zustand, Node
   serverless, MongoDB, OpenRouter AI). macOS-style portfolio with terminal,
   window manager, Ask AI chat. Directly supports the animated preview examples.
3. **PayFlow Dashboard** — https://github.com/Samuel-Fx-1/PayFlow-Dashboard
   Next.js 14, TypeScript, Tailwind, Chart.js. Payment processing dashboard with
   real-time metrics, transactions, payouts, analytics. Well-structured, tested.
4. **Edge (Trading Journal)** — https://github.com/Samuel-Fx-1/Edge
   React 19, Vite, Tailwind, Recharts, Zod. Trading journal. Ties to the Forex
   Trader identity; distinct domain from the dashboards.

Why not DataVision / E-comm / carbon-app: DataVision is a near-duplicate dashboard
domain to PayFlow; E-comm is a pantry meal planner with thinner polish; carbon
app is a generic Next+Drizzle template. PayFlow + Edge give distinct domains
(payments, trading) plus the two portfolios.

(Adjust if you want DataVision instead of Edge — tell me.)

## 6. Built with (PROPOSED — please confirm)
Detected from package.json files across repos + portfolio meta:
Next.js, React, TypeScript, Tailwind CSS, Vite, Express, Node.js, MongoDB,
Chart.js, Recharts, Framer Motion, Zustand, Zod, PostgreSQL, Drizzle ORM,
OpenRouter, JWT, bcryptjs, Axios.

Proposed 4 tiles (core of daily stack):
1. Next.js — App Router, SSR/SSG, API routes
2. React — component-driven UI
3. Node.js — serverless functions & APIs
4. TypeScript — typed end-to-end

Alternatives you could swap in: MongoDB, Tailwind CSS, Vite, Express.
Tell me which 4 to use and I'll lock them.

## 7. Animated tile mapping (4 tiles)
- tile-portfolio: Ask AI chat — user question + streamed assistant answer.
- tile-samuelos: macOS window (title bar + traffic lights) with terminal typing
  `whoami` then `skills`, plus a subtle drag (translate) loop.
- tile-payflow: dashboard metric card with rising bar chart + counting number.
- tile-edge: animated price line chart with moving dot.

## 8. App drawer link chips (row of 4)
Chips (glassy pill images) linking to:
1. Portfolio (live site)
2. Samuel OS (live site)
3. GitHub profile
4. Email (mailto)

(LinkedIn not provided; say if you have one.)

## 9. README structure (text small & clean)
- Centered title + subtitle + location line
- Hero picture (full width)
- Section pills as small images? -> use Markdown bold text in a centered line with
  emoji? Section pill look = image? The reference uses a pill. I'll render each
  section header as a small glassy pill IMAGE (dark/light) with title + caption,
  OR as Markdown text. Given "every glass element is an image", I'll make section
  pills as images too? That adds 3 images. Acceptable. Actually to keep weight and
  text searchable, I'll use Markdown headings + a thin divider image? Hmm.
  Decision: section pills as Markdown text lines (bold) plus a gradient divider
  image (1 file, dark/light via picture). Glass pill look is for the hero/cards.
  This keeps README text clean and accessible. (Can switch to pill images if wanted.)

Wait — re-reading: "Projects in motion (section pill with title on the left and a
small caption on the right)". The "section pill" is likely a pill-shaped header
bar. To match, I'll render section headers as glassy pill images (3 of them) with
title left + caption right. That matches "glass app look made from images" and the
reference. I'll do that. Each ~1200x80 px.

Add to inventory:
| 18-20 | assets/section-{slug}-v1.png | ...-light.png | 1200x80 | static PNG x3 |

Slugs: projects, appdrawer, builtwith.

- Dividers: thin gradient line. I'll reuse a single divider image? A gradient
  divider is glassy-ish; could be CSS? GitHub strips style. So divider = image.
  One divider image (dark/light) reused via picture. 1200x4 px (render 1200x8).
  Actually height 2-4px. Use 1200x8.

## 10. Contact line (bottom)
Portfolio · Samuel OS · Email · GitHub (and LinkedIn if provided).

## 11. Constraints checklist
- No <style>/<script>/<iframe>/classes/fonts in README.
- Layout via Markdown + table + div align + p align + picture/source + a + img.
- All images wrapped in <a> with meaningful alt.
- Relative paths assets/...
- Total weight < 5 MB.
- Versioned filenames.
- Mobile 390px: images width="100%" inside borderless tables.
- Dark/light via picture prefers-color-scheme.

## 12. Rendering plan
- HTML/CSS source in design/html/*.html (backdrop-filter, gradients, blur).
- Render with Playwright using system Chrome (chromium channel unavailable;
  use executablePath to Chrome). deviceScaleFactor 2.
- Optimize: render at exact 2x dims; PNGs from Chrome. No pngquant available;
  keep dimensions modest. Re-evaluate sizes if weight > 5MB.
- Animated tiles: hand-written SVG with SMIL/CSS animation, system font stacks
  (ui-monospace, Consolas, Menlo, monospace / system-ui, Segoe UI, Arial),
  no external resources, no scripts. Include <style> inside SVG (allowed in SVG).

## 13. Open questions for user (answer on "continue")
- Confirm Built with 4 (or swap).
- Confirm app drawer chips targets.
- LinkedIn URL if any.
- Confirm project picks (Edge vs DataVision).
- Avatar: initials "IS" placeholder OK? (will replace later)

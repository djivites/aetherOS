<div align="center">

<h1>⬡ AetherOS</h1>
<p><strong>The Operating System for Autonomous Intelligence</strong></p>

<p>
  <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js" alt="Next.js 15" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

<p>
  A premium, high-converting SaaS landing page for an advanced AI-driven data automation platform.<br/>
  Built for a timed front-end engineering competition with strict performance, SEO, and architecture constraints.
</p>

</div>

---

## ✨ Live Demo

🔗 **[https://aether-os-kohl.vercel.app/](https://aether-os-kohl.vercel.app/)**

---

## 🎬 Demo Video

📹 **[Watch on Google Drive](https://drive.google.com/file/d/14BkJzocHnVqaZEErdFDFT0j-76cFpg2-/view?usp=sharing)**

---

## 📸 Preview

| Section | Description |
|---|---|
| **Hero** | AI Journey pipeline with interactive 6-stage S-curve layout and glowing SVG data packet |
| **Features** | Bento Grid (desktop) ↔ Touch Accordion (mobile) with Context Lock on resize |
| **Pricing** | Matrix-driven multi-currency pricing with isolated state updates |
| **Performance Center** | Live gauges, animated throughput graph, and customer trust metrics |
| **Vision** | Philosophy statement with staggered scroll-triggered entrance animations |
| **Footer** | Newsletter signup, links, social icons |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript 5.7 |
| UI Library | React 19 |
| Styling | Tailwind CSS 3.4 + CSS Modules |
| Fonts | Inter (body) · JetBrains Mono (code/mono) via `next/font/google` |
| Animations | Native CSS Transitions + Web Animations API (WAAPI) — **no runtime animation libraries** |
| State | Custom pub/sub store (`useSyncExternalStore`) — **no global re-renders on pricing changes** |
| Icons | SVG asset pack (all icons sourced from `/SVGs/` provided asset package) |

---

## 🏗️ Architecture

```
d:/frontend/
├── app/
│   ├── layout.tsx          # Root layout: fonts, OG metadata, SEO tags
│   ├── page.tsx            # Home page: section composition
│   └── globals.css         # Base styles, keyframes, scrollbar
│
├── components/
│   ├── Hero/               # Hero section + AI Journey S-curve pipeline
│   ├── Features/
│   │   ├── FeatureSection.tsx   # Context Lock resize bridge
│   │   ├── Bento.tsx            # Desktop bento grid (hover-driven)
│   │   └── Accordion.tsx        # Mobile accordion (touch-optimized)
│   ├── Pricing/
│   │   ├── Pricing.tsx          # PricingStore pub/sub container
│   │   ├── PriceCard.tsx        # Isolated subscriber via useSyncExternalStore
│   │   ├── BillingToggle.tsx    # Monthly / Annual toggle
│   │   └── CurrencySwitcher.tsx # USD / EUR / INR radio group
│   ├── Testimonials/       # Live AI Performance Center (gauges, graph, cards)
│   ├── Vision/             # Philosophy + Core Pillars + CTA
│   ├── Footer/             # Newsletter, links, copyright
│   └── Icons.tsx           # All icons sourced from /SVGs/ asset pack
│
├── data/
│   ├── pricingMatrix.ts    # Base rates + currency tariffs (no hardcoded UI values)
│   └── featureData.ts      # Feature content for Bento/Accordion
│
├── hooks/
│   └── usePersistentIndex.ts  # sessionStorage-backed active index persistence
│
├── utils/
│   └── pricing.ts          # calculatePrice(tier, currency, annual) pure function
│
└── SVGs/                   # Provided SVG asset pack (14 icons)
```

---

## ⚙️ Feature Details

### Feature 1 — Matrix-Driven Pricing Engine

Prices are **never hardcoded**. Every displayed value is computed on the fly using a multidimensional configuration object:

```ts
// data/pricingMatrix.ts
export const pricingMatrix: Record<Tier, { base: number }> = {
  starter:    { base: 36 },
  pro:        { base: 74 },
  enterprise: { base: 161 },
};

export const tariff: Record<Currency, number> = {
  USD: 1.0,
  EUR: 0.92,
  INR: 87.0,
};
```

```ts
// utils/pricing.ts
price = base × tariff[currency] × (annual ? 0.8 : 1.0)
```

**State Isolation**: Changing currency or billing cycle updates **only** the three `<PriceText>` leaf components via `useSyncExternalStore`. The parent `<Pricing>` and `<PriceCard>` containers are wrapped in `React.memo` and **never re-render** on price changes.

---

### Feature 2 — Bento ↔ Accordion with Context Lock

```
Desktop (≥768px)  →  Bento Grid  (hover = active index)
Mobile  (<768px)  →  Accordion   (tap = open panel)
```

**Context Lock Constraint** — implemented in `FeatureSection.tsx`:

```ts
const hoveredIndexRef = useRef<number>(activeIndex);

// Tracks the live hovered bento card without stale closures
const handleSetActiveIndex = useCallback((index: number) => {
  hoveredIndexRef.current = index;
  setActiveIndex(index);
}, [setActiveIndex]);

// On resize crossing 768px desktop→mobile:
// immediately commit the hovered index to the Accordion
window.addEventListener('resize', () => {
  if (wasDesktop && isMobile) {
    setActiveIndex(hoveredIndexRef.current);
  }
});
```

The active index also persists across page refreshes via `sessionStorage`.

---

## 📊 Competition Scoring Compliance

| Criterion | Max | Status |
|---|---|---|
| Feature 1: Pricing Matrix (no hardcoded values) | 15 | ✅ |
| State Isolation (no global re-renders) | 15 | ✅ `useSyncExternalStore` + `React.memo` |
| Feature 2: Bento ↔ Accordion + Context Lock | 10 | ✅ resize observer bridge |
| Semantic HTML (`<main>`, `<section>`, `<footer>`) | 15 | ✅ |
| SEO Metadata + Open Graph | 10 | ✅ `layout.tsx` |
| Animation ≤ 500ms TTI budget | 5 | ✅ all durations capped |
| Asset Compliance (SVGs, Fonts, Palette) | 15 | ✅ all 14 SVGs sourced |
| Breakpoint Fluidity (mobile/tablet/desktop) | 10 | ✅ |
| Motion Accuracy (150–200ms hovers, 300–400ms reflows) | 5 | ✅ |

### Disqualification Checklist

- [x] No banned libraries (Framer Motion, Radix, Shadcn, HeadlessUI)
- [x] No hardcoded pricing values
- [x] No runtime CSS-in-JS animation engines
- [x] No global re-renders on currency/billing changes
- [x] All transitions via native CSS / WAAPI
- [x] `console.log` statements removed from production code

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `Arctic Powder` | `#F1F6F4` | Primary text (dark backgrounds) |
| `Forsythia` | `#FFC801` | Primary accent, CTAs, active states |
| `Nocturnal Expedition` | `#114C5A` | Brand teal, borders, secondary accents |
| `Mystic Mint` | `#D9E8E2` | Subtle text, backgrounds |
| `Deep Saffron` | `#FF9932` | Secondary accent, hover states |
| `Oceanic Noir` | `#172B36` | Dark background |

**Typography**
- Body / UI: **Inter** (via `next/font/google`)
- Code / Mono labels: **JetBrains Mono** (via `next/font/google`)

---

## 🏃 Getting Started

```bash
# Clone the repository
git clone https://github.com/djivites/aetherOS.git
cd aetherOS

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

---

## 📦 Dependencies

```json
{
  "next": "^15.0.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0"
}
```

> **No runtime UI or animation libraries.** All components and transitions are written from scratch per competition rules.

---

## 📁 Asset Credits

All SVG icons in `/SVGs/` are from the **provided competition asset package** and are integrated directly into `components/Icons.tsx`. Fonts and color palette follow the competition specification.

---

<div align="center">
  <p>Built with precision for the AetherOS Front-End Engineering Competition.</p>
</div>

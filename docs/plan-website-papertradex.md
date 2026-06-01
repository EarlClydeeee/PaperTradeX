# Website Plan — PaperTradeX Landing Page

**Type:** Single-page informational website
**Framework:** Next.js 15 (App Router, static export)
**Folder:** `/website`
**Goal:** Communicate the behavioral fingerprint differentiator and drive sign-ups to the app. Nothing else.

---

## Philosophy

- **One job:** Drive sign-up clicks to the app.
- **Narrative first:** The page tells the same story as the pitch — hook (the stat) → problem (why emotional trading persists) → solution (the fingerprint) → proof (behavioral science) → fingerprint evolution → CTA.
- **No clutter:** No blog, no pricing page, no nav links beyond one CTA anchor. Single page, single scroll, single action.
- **Brand exact:** Colors, type, and tone from [dsd-papertradex.md](dsd-papertradex.md) — `#0A0B0E` background, `#00E5A0` primary, `#7B61FF` accent, Space Grotesk headlines, Inter body.

---

## Tech Stack

| Decision | Choice | Reason |
|----------|--------|--------|
| Framework | Next.js 15 App Router | Static export (`output: 'export'`); no server needed for an informational page |
| Styling | Tailwind CSS v4 | Utility-first; fast to build; no runtime CSS |
| Fonts | `next/font/google` — Space Grotesk 700+800, Inter 400+500 | Exact DSD spec; zero layout shift |
| Icons | `lucide-react` | Lightweight, tree-shakeable |
| Animations | Tailwind `animate-*` + CSS keyframes only | No JS animation libraries; keeps bundle minimal |
| Images | `next/image` (static) | Optimized, lazy-loaded mockups |
| Deployment | Vercel (auto-deploy on push to `main`) | Free tier, global CDN, zero config |
| Analytics | Vercel Analytics (optional) | One-line install; no cookie banner needed |

---

## Folder Structure

```
website/
├── app/
│   ├── layout.tsx                        # Fonts, metadata, og:image, body bg
│   ├── page.tsx                          # Imports all sections in order
│   └── globals.css                       # Tailwind base + CSS custom properties from DSD
├── components/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ProblemSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── ScienceSection.tsx
│   ├── FingerprintEvolutionSection.tsx
│   ├── CtaSection.tsx
│   └── Footer.tsx
├── lib/
│   └── constants.ts                      # All copy strings, download URLs, brand tokens
├── public/
│   ├── images/
│   │   ├── dashboard-hero.png            # Full dashboard with trade panel + coach sidebar
│   │   ├── coach-panel.png               # AI coach panel close-up
│   │   ├── fingerprint-chart.png         # Radar chart with data
│   │   ├── leaderboard.png               # School leaderboard view
│   │   ├── fingerprint-empty.png         # Radar at 0 trades
│   │   ├── fingerprint-growing.png       # Radar at ~20 trades
│   │   └── fingerprint-full.png          # Radar at 100+ trades
│   ├── og-image.png                      # 1200×630 Open Graph image
│   └── favicon.ico
├── next.config.ts                        # output: 'export', images unoptimized for static
├── tailwind.config.ts                    # Brand color tokens, font families
├── tsconfig.json
└── package.json
```

---

## Page Sections — Content & Design Spec

### 1. Navbar
**Height:** 64px, sticky, `#0A0B0E` bg with `1px solid #1E2028` bottom border
**Left:** PaperTradeX wordmark — Space Grotesk 700, `#00E5A0`
**Right:** Single button — "Start Trading Free" — `#00E5A0` fill, `#0A0B0E` text, `rounded-xl`
**Behavior:** Scrolls to `#cta` anchor on click. On mobile: full-width sticky pill button.

---

### 2. Hero Section
**Background:** `#0A0B0E`
**Layout:** Two-column on desktop (text left, dashboard mockup right), stacked on mobile

**Headline (Space Grotesk 800, 72px desktop / 48px mobile, `#F0F2F5`):**
> Trade fake money.
> Learn your real patterns.

**Subheadline (Inter 400, 20px, `#6B7280`):**
> PaperTradeX is the first paper trading simulator where AI watches every decision and builds your behavioral fingerprint — a personal map of the biases that are costing you real money.

**CTA row:**
- "Start Trading Free" badge (`#00E5A0` fill, `#0A0B0E` text, `rounded-xl`)
- "See how it works ↓" ghost button (`#00E5A0` text, no fill)
- Small caption (Inter 400 13px, `#6B7280`): "Free forever · No credit card · No real money"

**Product mockup:** `dashboard-hero.png` — full dashboard with AI coach sidebar open and a bias badge visible. Drop shadow `0 8px 32px rgba(0,0,0,0.6)`. No device frame; flat screenshot preferred.

---

### 3. Problem Section
**Background:** `#13151A`
**Layout:** Centered, max-width 720px

**Eyebrow (Inter 500 12px, uppercase letter-spacing, `#00E5A0`):** THE PROBLEM

**Headline (Space Grotesk 800, 48px, `#F0F2F5`):**
> 71% of retail investors underperform index funds.
> It's not the market. It's you.

**Body (Inter 400, 18px, `#F0F2F5`):**
> The average first-year investor loses $3,200. Not because they picked bad companies — because they panic-sold, chased pumps, and revenge-traded after losses.
>
> Every paper trading app on the market lets you practice those same mistakes with fake money, then sends you back to your real account with the same bad habits. No coaching. No feedback. No self-knowledge.

**3 failure cards (horizontal row, `#13151A` cards with `#EF4444` left-border, `rounded-2xl`, `--shadow-sm`):**

| Icon | Label | Caption |
|------|-------|---------|
| 🔴 | Panic Selling | You sell the dip. The dip recovers. You miss it. |
| 🚀 | FOMO Chasing | You buy the top. Every time. |
| ♾️ | Holding Losers | You sell winners in 2 days and hold losers for 6 months. |

---

### 4. How It Works Section
**Background:** `#0A0B0E`
**Layout:** Eyebrow + headline centered; 3 cards in a row (desktop), stacked (mobile)

**Eyebrow:** THE SOLUTION

**Headline (Space Grotesk 800, 48px):**
> One platform that learns how you trade — not just what you trade.

**Subline (Inter 400, `#6B7280`):**
> Make trades with real live prices. Get coaching on every single one.

**3 Feature Cards** (`#13151A` background, `#00E5A0` top-border 2px, `rounded-2xl`, `--shadow-sm`)

**Card 1 — Unified Simulator** *(CryptoClass)*
- Icon: 📈
- Title: One Portfolio. Stocks + Crypto.
- Body: Paper trade BTC, ETH, SOL and S&P 500 names with live data — one cash balance, one P&L. No switching apps. No split portfolios.
- Screenshot: `dashboard-hero.png`

**Card 2 — AI Bias Coach** *(PaperTrader)*
- Icon: 🧠
- Title: Coach After Every Trade
- Body: FOMO, panic sell, overconfidence — flagged instantly with plain-English psychology. Weekly game-tape debriefs show what you did wrong with your actual trade data.
- Screenshot: `coach-panel.png`

**Card 3 — Learn Before You Leverage**
- Icon: 🔒
- Title: Education Gates
- Body: Want options or altcoins? Complete DeFi, blockchain, and risk modules first. No skipping straight to the dangerous stuff.
- Screenshot: `modules-locked.png` [TBD — confirm asset]

**Row 2 — optional 3-card strip (desktop only):**

**Card 4 — School Leaderboards** *(CryptoClass)*
- Icon: 🏫
- Title: Compete in Class
- Body: Rank by return %, risk-adjusted score, or module completion. Teachers set the competition window.

**Card 5 — Classroom Mode** *(V1.1)*
- Icon: 📊
- Title: Built for Teachers
- Body: Class averages, crash/boom scenarios, exportable grades — finance class that actually sticks.

**Card 6 — Verified Certificates** *(V1.1)*
- Icon: 🎓
- Title: Proof You Learned
- Body: Shareable credentials for college apps and LinkedIn — verified completion of the advanced simulation track.

---

### 5. Science / Proof Section
**Background:** `#13151A`
**Layout:** Centered headline + 3 horizontal proof blocks (no cards — icon + title + 2-line body, vertical dividers on desktop)

**Eyebrow:** THE SCIENCE

**Headline (Space Grotesk 800, 48px):**
> Behavioral finance, not financial advice.

**Block 1 — Availability Bias**
> The human brain weights recent events 3× more heavily than historical base rates. That's why crypto FOMO feels rational — your brain is wired for it. PaperTradeX makes the pattern visible before it costs you.

**Block 2 — Deliberate Practice**
> Zero-consequence practice with immediate feedback is the only evidence-backed method for building new decision-making habits (Ericsson, 1993). PaperTradeX delivers coaching feedback on every single trade — not once a week, not on a dashboard you'll forget to check.

**Block 3 — Behavioral Fingerprinting**
> No two investors lose money the same way. Your specific bias pattern — identified across 10, 50, 200 trades — is more predictive of your future losses than your knowledge of any individual company.

---

### 6. Fingerprint Evolution Section
**Background:** `#0A0B0E`
**Layout:** Left-aligned headline; right: 3-state fingerprint evolution strip

**Headline (Space Grotesk 800, 40px, `#F0F2F5`):**
> Your fingerprint grows with every trade.

**Body (Inter 400, `#6B7280`):**
> The more you practice, the more the AI knows about you. A profile built across 100 trades is more valuable than any course, book, or YouTube video — because it is specifically about you.

**Evolution strip (3 images in a row, labeled below each):**
`[Empty radar · Day 1]` → `[Pattern emerging · 20 trades]` → `[Full fingerprint · 100+ trades]`

Images: `fingerprint-empty.png` → `fingerprint-growing.png` → `fingerprint-full.png`

Small caption (Inter 500 14px, `#00E5A0`):
> The longer you use it, the more it knows. That's the moat.

---

### 7. CTA Section `id="cta"`
**Background:** `#00E5A0` (full-width inversion)
**Text color:** `#0A0B0E`

**Headline (Space Grotesk 800, 56px, `#0A0B0E`):**
> Stop practicing your mistakes.
> Start knowing your patterns.

**CTA row (centered):**
- "Start Trading Free" (`#0A0B0E` bg, `#00E5A0` text, `rounded-xl`) — primary
- "Sign In" (ghost: `1px solid #0A0B0E`, `#0A0B0E` text) — secondary
- Caption (Inter 400 13px, `rgba(0,0,0,0.6)`): "No real money · No credit card · Works in your browser"

**No other content. No email capture. No form.**

---

### 8. Footer
**Background:** `#0A0B0E`
**Layout:** Single row on desktop — logo left, links center, copyright right

**Links (Inter 400, `#6B7280`, 13px):**
- Privacy Policy
- Contact
- GitHub

**Copyright:** `© 2026 PaperTradeX. All rights reserved.`

---

## CSS Custom Properties (globals.css)

```css
:root {
  --color-bg:            #0A0B0E;
  --color-surface:       #13151A;
  --color-border:        #1E2028;
  --color-primary:       #00E5A0;
  --color-primary-hover: #00C688;
  --color-accent:        #7B61FF;
  --color-text:          #F0F2F5;
  --color-text-inverse:  #0A0B0E;
  --color-text-muted:    #6B7280;
}
```

---

## Tailwind Config Additions

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      bg:           '#0A0B0E',
      surface:      '#13151A',
      border:       '#1E2028',
      primary:      '#00E5A0',
      accent:       '#7B61FF',
      tx:           '#F0F2F5',
      'tx-inverse': '#0A0B0E',
      'tx-muted':   '#6B7280',
    },
    fontFamily: {
      display: ['Space Grotesk', 'sans-serif'],
      body:    ['Inter', 'sans-serif'],
    },
  },
}
```

---

## Metadata & SEO

```ts
// app/layout.tsx
export const metadata = {
  title: 'PaperTradeX — Trade fake money. Learn your real patterns.',
  description: 'Real-time paper trading simulator with AI coaching that builds your behavioral bias fingerprint. Trade stocks and crypto risk-free and learn why you lose — before you lose real money.',
  openGraph: {
    title: 'PaperTradeX — Trade fake money. Learn your real patterns.',
    description: 'Real-time paper trading simulator with AI coaching that builds your behavioral bias fingerprint.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

---

## Build & Deploy

```bash
# Local dev
cd website
npm install
npm run dev        # http://localhost:3000

# Static export (for Vercel or any CDN)
npm run build      # outputs to website/out/

# Vercel deploy (auto on push to main, root: website/)
vercel --prod
```

**Vercel config:** Set root directory to `website/` in project settings. Framework preset: Next.js.

---

## What This Page Is NOT

- Not a blog
- Not a documentation site
- Not a sign-up form with email capture (no waitlist in V1)
- Not a pricing page
- Not a dashboard

One page. One scroll. One button. Sign up.

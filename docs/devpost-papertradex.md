# PaperTradeX — Devpost / Hackathon Submission

**Project:** PaperTradeX — Zero-consequence AI-coached trading simulator  
**Tagline:** Trade fake money. Learn your real patterns.  
**Date:** 2026-06-01  
**Owner:** Earl Clyde Bañez  

---

## Inspiration

Most people learn to invest the hard way — with real money.

We started PaperTradeX after seeing the same story repeat everywhere: young investors open a Robinhood account, lose money in their first year (the average first-year loss is **$3,200**), and blame the market instead of their own behavior. **71% of retail investors underperform the index** — not because they lack information, but because emotional patterns like FOMO, panic selling, and overconfidence override their research at every inflection point.

Every existing paper trading app — Webull Paper, Thinkorswim Simulated, Investopedia — replicates the trading interface but offers **zero feedback on why you made a bad decision**. You can practice buying at the top of a rally a hundred times and never hear anyone tell you that's FOMO.

We asked: *What if every trade came with a coach who names your bias in plain English — and builds a profile of your patterns over time?*

That question became PaperTradeX.

---

## What it does

PaperTradeX is a **unified crypto + stock paper trading simulator** with an **AI bias coach** that fires after every trade.

**For students and young investors:**
- Trade BTC, ETH, SOL, and major US stocks (AAPL, NVDA, MSFT, TSLA, SPY) with **$50,000 in paper money** and live market prices
- After every buy or sell, the **AI Coach panel** slides in and flags behavioral patterns: FOMO, panic sell, overconfidence, loss aversion, recency bias, anchoring, and disposition effect — with plain-English psychology, not jargon
- Watch your **behavioral fingerprint** grow on the Profile page — a radar chart of your bias history that gets more accurate the more you trade
- Compete on **school leaderboards** ranked by portfolio return, bias control score, or module completion
- Complete **education modules** (blockchain, DeFi, risk management) before unlocking advanced instruments

**For teachers:**
- Run class competitions with leaderboard rankings students can see in real time
- Track learning progress alongside trading performance

**For investors / judges:**
- Visit `/pitch` for the full investor deck
- Open `/practice` and execute a trade to see the AI coach in action

---

## How we built it

We built PaperTradeX as a **single Next.js 15 application** with two route groups — marketing (`/`) and app (`/practice`, `/dashboard`, `/profile`, etc.) — deployed as one unit on Vercel.

**Architecture overview:**

```
Browser (Next.js App Router)
    ├── /api/quote          → CoinGecko (crypto) + Finnhub (stocks)
    ├── PortfolioContext    → localStorage persistence + live quote refresh
    ├── coach.ts            → 7-bias rule engine (LLM-ready interface)
    └── Supabase client     → scaffolded for auth + DB (next phase)
```

**Key implementation decisions:**

1. **Paper trading engine** (`portfolio-store.ts`) — buy/sell logic with weighted average cost basis, cash management, trade history, and session snapshots. State persists in `localStorage` so users can close the tab and return without losing progress.

2. **AI bias coach** (`coach.ts`) — seven independent detectors run in priority order after each trade, using market context (24h price change) and portfolio context (position size, trade history, entry price). Each detector returns a bias label, coach message, explanation, and psychology note. The interface is designed to swap in GPT-4o-mini via Supabase Edge Function without changing the UI.

3. **Live market data** (`/api/quote`) — server-side route fetches crypto prices from CoinGecko and US stocks from Finnhub (when `FINNHUB_API_KEY` is set). Falls back to reference prices gracefully so the app never breaks without an API key.

4. **Unified UI** — Tailwind CSS v4 with custom design tokens, light/dark mode via `next-themes`, mobile drawer navigation, full-width trade/coach panels on small screens, and Recharts for portfolio curves and fingerprint radar charts.

5. **Product docs** — full FMD suite (BRD, PRD, SDD, DSD, RFC, QAD, GTM, pitch deck) written alongside the code so the product story and the build stay aligned.

---

## Challenges we ran into

**1. Portfolio value confusion**  
Users expected total wealth to drop immediately after buying. In reality, cash decreases but position value increases by the same amount — total wealth only moves when market prices change. We fixed this by splitting the stat cards into **Total wealth**, **Invested**, **P&L**, and **Cash available** with clear subtitles.

**2. AI coach without an API key (yet)**  
We wanted coaching on every trade from day one, but wiring GPT-4o-mini requires Supabase Edge Functions and server-side key management. We built a **7-bias heuristic engine** that uses real trade context (position size, 24h move, trade history) and returns the same structured output the LLM will eventually produce — so the UI works now and the swap to live AI is a backend change, not a rewrite.

**3. Unifying marketing site + app**  
We originally had two separate Next.js projects. Merging them into one repo with route groups `(marketing)` and `(app)` broke CSS layout (body `display: flex` collapsed the landing page) and stale `.next` cache caused route-not-found errors after the move. Fixed by restructuring layouts and clearing the build cache.

**4. Mobile sidebar eating screen space**  
A fixed 240px sidebar made the app unusable on phones. We added `AppShell` with a hamburger drawer, mobile top bar, and full-width trade/coach panels with backdrop dismiss.

**5. Vercel env vars for market data**  
`.env.local` doesn't deploy. Live stock quotes require `FINNHUB_API_KEY` set manually in Vercel project settings — crypto works without any key via CoinGecko.

---

## Accomplishments that we're proud of

- **End-to-end trade → coach flow works.** Buy NVDA after a big green day, get flagged for FOMO with a specific message referencing your ticker and the exact 24h move. Sell into a crash, get a panic-sell diagnosis. Size a trade at 40% of portfolio, get an overconfidence warning.

- **Behavioral fingerprint is real, not mock data.** Every coached trade logs its bias label to trade history. The profile radar chart and dashboard metrics reflect actual session behavior.

- **One app, one deploy.** Landing page, simulator, dashboard, education center, leaderboard, and investor pitch deck all live in a single Next.js project on one Vercel deployment.

- **Mobile-first polish.** Drawer nav, touch-sized targets (44px+), numeric keyboard on quantity input, safe-area padding on trade panels.

- **Full product documentation.** BRD through GTM, plus investor pitch (`docs/pitch-papertradex.md`) and this submission — built as seriously as the code.

- **Honest fallback UX.** When the AI service isn't connected, the coach still fires instantly with rule-based analysis labeled as a "pattern check" — never an error screen.

---

## What we learned

**Behavioral finance belongs in the product, not in a PDF.**  
Reading about loss aversion in a textbook doesn't change behavior. Seeing the AI name *your specific trade* as a FOMO move — with the psychology of why your brain did it — creates a moment of recognition that sticks.

**The fingerprint is the retention mechanic.**  
Portfolio value resets. Leaderboards reset each semester. But a behavioral profile that took 50 trades to build doesn't reset — and can't be replicated on another platform. That's the moat, and we felt it ourselves while testing: after 10 trades, we started checking the profile page before placing the next order.

**Paper trading UX needs to feel real.**  
Live prices matter. If BTC shows a stale reference price, the coaching context breaks. Connecting CoinGecko for crypto and Finnhub for stocks made the simulator feel like a real terminal, which makes the emotional mistakes feel real too.

**Design tokens save time at scale.**  
Tailwind v4 `@theme` variables for colors, radii, and fonts meant light/dark mode was a CSS variable swap, not a component rewrite. Every page inherited theme support automatically.

**Build the interface before the LLM.**  
Shipping the coach panel and bias taxonomy first — with heuristics — let us validate the UX loop before spending time on Edge Functions and API costs. The product is usable today; the AI upgrade is additive.

---

## What's next for PaperTradeX

**Immediate (next 4 weeks):**
- Wire Supabase Auth (email + Google OAuth) so portfolios and fingerprints persist across devices
- Connect GPT-4o-mini via Supabase Edge Function for live AI coaching (heuristic engine becomes fallback)
- Deploy to production on Vercel with `FINNHUB_API_KEY` for live US stock quotes

**V1 launch (Weeks 8–12):**
- Weekly AI debrief — personalized trade replay report every Sunday
- Product Hunt launch + TikTok/Reels demo content
- First 3 school pilot conversations with personal finance teachers

**V1.1 (post-launch):**
- Classroom Mode — teacher dashboard, scenario assignments ("2008 crash", "2021 crypto boom"), grade export
- Verified certificates for module completion (shareable for college apps / LinkedIn)
- Bias heatmap — calendar view showing when each bias fires most often

**V2 (6+ months):**
- Native iOS/Android app
- Options/futures simulation (gated behind education modules)
- Polygon.io real-time quotes upgrade
- Social features — anonymized copy-trade view, follow traders

---

## Built with

### Languages
- **TypeScript** — entire application (frontend, API routes, business logic)
- **CSS** — Tailwind CSS v4 utility classes + custom `@theme` design tokens

### Frameworks & libraries
- **Next.js 15** (App Router) — routing, SSR, API routes, unified marketing + app deployment
- **React 18** — UI components, context, hooks
- **Tailwind CSS v4** — styling, responsive design, dark/light mode tokens
- **next-themes** — class-based theme switching (dark default, light mode supported)
- **Recharts** — portfolio performance charts, behavioral fingerprint radar chart
- **Lucide React** — consistent SVG icon set across all pages

### Platforms & cloud
- **Vercel** — hosting, CDN, serverless API routes, preview deploys per branch
- **Supabase** — Postgres, Auth, Realtime, Edge Functions (scaffolded; auth + DB wiring next)

### Databases & storage
- **localStorage** — portfolio state, trades, positions, session snapshots (client-side, MVP)
- **Supabase Postgres** — planned server-of-record for trades, coaching events, fingerprints, leaderboards

### APIs & external services
- **CoinGecko API** — live crypto prices (BTC, ETH, SOL); no API key required
- **Finnhub API** — live US stock quotes (AAPL, NVDA, MSFT, TSLA, SPY); server-side via `FINNHUB_API_KEY`
- **OpenAI GPT-4o-mini** — planned per-trade coaching + weekly debrief via Supabase Edge Function (< $0.01/trade)

### Tools & workflow
- **Git / GitHub** — version control
- **Cursor** — AI-assisted development environment
- **TypeScript strict mode** — type safety across portfolio engine, coach logic, and UI

### Design
- **Space Grotesk** — display/headline font
- **Inter** — body font
- **JetBrains Mono** — monospace (stats, labels)
- Custom dark OLED theme (primary `#00E5A0`, accent `#7B61FF`) with full light mode override

---

## Links

| Resource | URL |
|----------|-----|
| Live demo (dev) | `http://localhost:3000/practice` |
| Landing page | `/` |
| Investor pitch | `/pitch` |
| Product docs | `docs/` folder (BRD, PRD, SDD, pitch, GTM) |

**Contact:** Earl Clyde Bañez · founder@papertradex.com *(TBD — confirm)*

---

*Related docs:* [Pitch](pitch-papertradex.md) · [BRD](brd-papertradex.md) · [PRD](prd-papertradex.md) · [GTM](gtm-papertradex.md)

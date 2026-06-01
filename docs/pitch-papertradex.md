# Investor Pitch — PaperTradeX

**Project:** PaperTradeX — Zero-consequence AI-coached trading simulator  
**Date:** 2026-06-01  
**Version:** 1.0  
**Owner:** Earl Clyde Bañez  
**Status:** Seed Round — Draft  

---

## Tagline

> **"Trade fake money. Learn your real patterns."**

---

## 1. The Problem

**71% of retail investors underperform the S&P 500.**  
Not because they lack information — because emotional decision-making overrides their research at every inflection point.

The average first-year investor loses **$3,200**, almost entirely from three behavioral patterns:

- **FOMO** — buying into a rally at the top because everyone else is
- **Panic selling** — dumping holdings at the bottom when fear peaks
- **Overconfidence** — sizing bets too large, too fast, with too little history

**Existing simulators make this worse, not better.**

| App | Live prices | AI coaching | Behavioral feedback | School leaderboard |
|-----|-------------|-------------|---------------------|--------------------|
| Webull Paper | ✓ | ✗ | ✗ | ✗ |
| Thinkorswim Simulated | ✓ | ✗ | ✗ | ✗ |
| Investopedia Simulator | ✓ | ✗ | ✗ | ✗ |
| **PaperTradeX** | **✓** | **✓** | **✓** | **✓** |

Users graduate from simulators to real accounts having **practiced their bad habits at zero cost and zero correction.**

---

## 2. The Solution

PaperTradeX is the first paper trading simulator where **AI watches every decision** and builds your behavioral fingerprint — a personal map of the biases costing you real money.

### Core features

**AI Bias Coach (per trade)**  
After every buy or sell, the AI coach slides in with a plain-English explanation of the cognitive bias at work. Not jargon. Not a chart. One diagnosis, one psychology explanation, one actionable framing. Costs < $0.01 per trade (GPT-4o-mini).

> *Example — user buys NVDA after a 23% 1-day spike:*  
> **"You're chasing NVDA after a 23% rally. Your brain is screaming 'don't miss out' — but history says this is where the dump starts. FOMO is driven by the social instinct to follow the herd. The crowd is already in. You're walking into their exit."*

**Behavioral Fingerprint**  
Every trade adds a data point to an accumulating bias profile: FOMO count, panic sell count, overconfidence incidents, recency bias, anchoring, disposition effect. After 50 trades, you have a named, quantified map of your decision-making patterns. This fingerprint lives in your history — leave the platform and you start from zero.

**Unified Crypto + Stock Simulator**  
One portfolio. One cash balance. BTC, ETH, SOL and S&P 500 equities in the same trade screen, with live market prices from CoinGecko (crypto) and Finnhub (stocks). Exactly how real mixed portfolios work.

**School Leaderboards + Education Gates**  
Teachers create class groups, set competition windows, and project live leaderboards. Advanced instruments (options, non-BTC/ETH/SOL altcoins) are locked until the student completes the required education module and passes the quiz. Learning and trading are the same product.

**Weekly AI Debrief**  
Every Sunday, the AI generates a personalized "game tape" report: trade timeline, top 3 biases with specific trade citations, one prioritized improvement focus. Like a coach reviewing film — not generic advice.

---

## 3. The Moat

**The behavioral fingerprint is the switching cost.**

Every trade makes the product more valuable to that user. After 10 trades, the profile starts to pattern-match. After 50, it is a personalized behavioral report no competitor can replicate without matching that user's time-in-product.

This is not a lock-in feature. It is the nature of behavioral data — your fingerprint lives in your history. Switching platforms means starting over with zero context.

| Fingerprint depth | User value |
|-------------------|-----------|
| 1–5 trades | "Interesting" |
| 6–15 trades | "That's accurate" |
| 16–50 trades | "I can't leave — this knows me" |
| 50+ trades | Compounding retention loop |

Combined with school leaderboards (class cohorts that reset yearly create natural re-engagement cycles), this creates **two independent retention engines** in one product.

---

## 4. Market Size

Two converging markets:

| | Segment | Size | Driver |
|--|---------|------|--------|
| **B2C** | Gen Z self-directed investors (US) | 23M users | Next crypto bull cycle building; median first investment age 19 (Schwab 2024) |
| **B2B** | School districts with finance mandates | 23 states | State personal finance education mandates; zero modern incumbents |

| Market | Value | Notes |
|--------|-------|-------|
| **TAM** | $4.1B | Financial education software market (2025) |
| **SAM** | $480M | Gen Z self-directed investing tools (US) |
| **SOM** | $24M | Target 5-year ARR at 300K paying users |

**Why now:**
1. Next crypto bull cycle building — Gen Z curiosity at peak, top-of-funnel opens naturally
2. AI coaching is now < $0.01/trade — the first time behavioral coaching is economically viable at the individual trade level, not just institutional
3. 23 state mandates = direct school procurement channel with zero modern incumbents
4. Behavioral fingerprint = compounding data moat; every trade adds value and switching cost simultaneously

---

## 5. Business Model

### Pricing tiers

| Tier | Price | Key inclusions | Gate |
|------|-------|----------------|------|
| **Free** | $0 | AI coach every trade · unified simulator · basic fingerprint · school leaderboard (student) · core modules | No weekly debrief; no certificates |
| **Pro** | $7.99/mo or $59.99/yr | + Weekly AI debrief · full fingerprint history · all modules + instrument unlocks · shareable bias card | No teacher dashboard |
| **School** | $199/school/yr | + Classroom mode · teacher dashboard · competition windows · scenario assignments · grade export · bulk onboarding · certificates | District pricing on request |

**Pricing rationale:**  
$7.99/mo = 0.25% of the average first-year investor loss ($3,200). School tier is a single-teacher budget line item requiring no district approval process.

### Unit economics

| Metric | Value | Notes |
|--------|-------|-------|
| AI cost per trade | < $0.01 | GPT-4o-mini @ ~400 tokens/trade |
| AI cost per user per day (target) | < $0.02 | At 50K MAU; revisit at 100K |
| Weekly debrief cost per user | ~$0.0006 | ~2,000 tokens |
| Break-even Pro users (infra + AI) | ~1,200 | At $7.99/mo |
| Gross margin at scale | > 80% | SaaS margins; AI cost fixed, not per-seat |

---

## 6. Go-To-Market

### Primary channels

| Channel | Tactic | Timing |
|---------|--------|--------|
| TikTok / Instagram Reels | 30-second screen recording: AI coach naming FOMO in real time | 1 week before launch |
| r/personalfinance, r/investing | "I built a paper trading app where AI tells you why you're making bad trades" + demo video | Launch day |
| r/wallstreetbets | "The AI diagnosed my FOMO. Here's my bias fingerprint after 50 trades." | Launch day + 1 week |
| Product Hunt | Full launch + upvote commitments from build-in-public audience | Beta launch week (Week 10) |
| Hacker News Show HN | "Show HN: PaperTradeX — AI coach that flags your trading biases in real time" | Public launch day, 9am ET |
| Finance micro-influencers (10–100K) | Free Pro code + 30-second demo clip via cold DM | Beta phase (Weeks 8–10) |
| LinkedIn (personal finance teachers) | "Free tool with built-in class leaderboards for state finance mandates" | Week 10 |
| Build-in-public (X / Twitter) | Weekly dev update thread: "This week I built [X]. Here's what the AI flagged in my own trades." | Weekly from launch |

### Launch phases

| Phase | Entry criteria | Target date | Goal |
|-------|---------------|-------------|------|
| **Alpha** (private) | Trade + AI coaching end-to-end; onboarding; no P0 bugs | Week 8 | 10–20 trusted users; validate AI quality; first fingerprint data |
| **Beta** (invite-only) | Alpha feedback addressed; all Must-Have stable; leaderboards working | Week 10 | 100–200 testers; D7 retention baseline; AI fallback rate < 10% |
| **Public Launch** | Beta D7 retention ≥ 30%; QA release criteria passed; GTM assets live | Week 12 | Product Hunt + Reddit + TikTok drop |
| **Post-launch** | — | Week 16 | 10,000 users; D30 retention data; first Pro conversions; 1–2 school pilot conversations |

---

## 7. Traction Targets (30-Day Post-Launch)

| Metric | Target | How measured |
|--------|--------|-------------|
| Registered users | 10,000 | Supabase auth.users count |
| D7 retention | ≥ 35% | Users active on day 7 |
| D30 retention | ≥ 22% | Users active on day 30 |
| DAU/MAU ratio | ≥ 20% | Daily / monthly actives |
| Avg trades per active user / week | ≥ 5 | Trade log aggregate |
| AI coach read rate (panel open > 3s) | ≥ 60% | Vercel Analytics event |
| Fingerprint profiles with ≥ 10 trades | ≥ 30% of registered | behavioral_fingerprints query |
| Pro conversion (day 30) | ≥ 3% of actives | Stripe dashboard |
| B2B school pilot contracts (90 days) | 3 signed | CRM |
| Product Hunt ranking | Top 5 on launch day | Product Hunt leaderboard |

---

## 8. Product Roadmap

### V1 (Weeks 1–12) — Launch

- [x] Next.js 15 + Supabase + Tailwind CSS scaffold  
- [x] Paper trading engine (buy/sell, positions, P&L, cash balance)  
- [x] AI bias coach — 7-bias heuristic rule engine (FOMO, panic sell, overconfidence, loss aversion, anchoring, recency bias, disposition effect)  
- [x] Behavioral fingerprint radar chart  
- [x] School leaderboard with sort by return, bias score, module completion  
- [x] Education module system with instrument unlock gates  
- [x] Portfolio dashboard + P&L chart  
- [x] Mobile responsive (375px → 1440px)  
- [x] Light / dark mode  
- [ ] Supabase Auth (email + Google OAuth)  
- [ ] Live GPT-4o-mini coaching via Supabase Edge Function  
- [ ] Weekly AI debrief (cron job)  
- [ ] Vercel production deploy  

### V1.1 (Weeks 16–18) — Post-launch

- [ ] Verified certificates (shareable, unique verification URL)  
- [ ] Classroom Mode (teacher dashboard, scenario assignments, grade export)  
- [ ] Bias heatmap (calendar view of when each bias fires)  

### V2 (6+ months) — Scale

- [ ] Native mobile app (iOS/Android)  
- [ ] Options/futures simulation engine (post-education gate)  
- [ ] Social features (follow traders, anonymized copy-trade view)  
- [ ] International markets (non-US equities)  
- [ ] Polygon.io real-time upgrade (< 15s delayed → real-time quotes)  

---

## 9. Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Client | Next.js 15 App Router + React | SSR, App Router, fast deploy on Vercel |
| Styling | Tailwind CSS v4 | Utility-first, dark/light mode via CSS variables |
| BaaS | Supabase (Postgres + Auth + Realtime + Edge Functions) | Auth, trade persistence, fingerprint data, leaderboards, AI proxy |
| AI | OpenAI GPT-4o-mini via Supabase Edge Function | Server-side only — API key never reaches browser |
| Market data | CoinGecko (crypto live) + Finnhub (stocks) | Free tiers sufficient for MVP; Polygon.io upgrade path available |
| Hosting | Vercel | Auto-deploy on push to main; global CDN; zero config Next.js |
| Charts | Recharts | Lightweight; works SSR; sufficient for fingerprint radar + portfolio curve |

**Key architectural decisions:**
- AI key isolation: OpenAI calls only via Edge Function; key never in client bundle
- Fail-safe AI: rule-based heuristic fires instantly if Edge Function is unavailable — never an error state, always coaching output
- Behavioral data as retention: fingerprint grows only on this platform; portable export deferred to V2

---

## 10. Team

| Role | Person | Focus |
|------|--------|-------|
| Founder & CEO | Earl Clyde Bañez | Product strategy, engineering, go-to-market |
| Advisor — Behavioral Finance | [TBD] | Academic credibility for bias taxonomy and coaching methodology |
| Advisor — Ed-Tech Distribution | [TBD] | School district procurement channel and partnership strategy |

*Actively seeking advisors with backgrounds in behavioral economics, personal finance education, and B2B SaaS school sales.*

---

## 11. The Ask

**Round:** Seed  
**Round size:** $[TBD]  
**Pre-money valuation:** $[TBD]  
**Instrument:** SAFE / Priced round [TBD]  

### Use of funds (12-month runway)

| Category | Allocation | Purpose |
|----------|-----------|---------|
| Product & engineering | 55% | Full-time founder runway + contract AI/backend work for Supabase Edge Functions and weekly debrief system |
| GTM — content, community, influencers | 25% | TikTok/Reels production, micro-influencer campaigns, Reddit community seeding |
| B2B school sales + onboarding | 15% | Direct outreach to personal finance teachers; pilot onboarding support; conference presence |
| Legal, infra, operations | 5% | Stripe setup, SAFE legal, Vercel/Supabase pro tiers, domain |

### What we need beyond capital

- **Intro to behavioral finance academics** — for methodology credibility and press
- **Intro to school district procurement contacts** — to accelerate B2B pilot close
- **Intro to finance content creators (50K–500K followers)** — for TikTok/Reel seeding at launch
- **Prior ed-tech or fintech operator experience** — for board/advisory support on scaling school sales

---

## 12. Why PaperTradeX Wins

| Dimension | Webull Paper / Thinkorswim | PaperTradeX |
|-----------|---------------------------|-------------|
| AI coaching per trade | ✗ | ✓ |
| Behavioral fingerprint | ✗ | ✓ |
| School leaderboards | ✗ | ✓ |
| Education gates | ✗ | ✓ |
| Weekly AI debrief | ✗ | ✓ |
| Crypto + stock unified | Separate | ✓ One portfolio |
| Retention moat | Interface familiarity | Behavioral data compounding |
| Target user | All ages | Gen Z (19–24) + teachers |
| Business model | Brokerage upsell | SaaS (B2C + B2B) |

**The core insight:** Existing simulators are practice courts with no coach. PaperTradeX is the first one where the coach is the product.

---

## Appendix: Key References

- DALBAR Quantitative Analysis of Investor Behavior 2023 — 71% underperformance statistic
- Schwab Modern Wealth Survey 2024 — Gen Z median first investment age: 19
- Next Generation Personal Finance (NGPF) — 23 US state personal finance education mandates
- Kahneman & Tversky (1979) — Prospect Theory: loss aversion 2x pain multiplier, foundational to coaching copy
- Thaler (1985) — Mental accounting and disposition effect basis for fingerprint taxonomy

---

*Live demo:* [localhost:3000/practice](http://localhost:3000/practice) *(dev)* | `papertradex.com` *(TBD — confirm)*  
*Pitch page:* `/pitch`  
*Contact:* founder@papertradex.com *(TBD — confirm)*  

*Full FMD suite:*
[BRD](brd-papertradex.md) · [PRD](prd-papertradex.md) · [DSD](dsd-papertradex.md) · [SDD](sdd-papertradex.md) · [RFC](rfc-papertradex-behavioral-fingerprint.md) · [QAD](qad-papertradex.md) · [GTM](gtm-papertradex.md)

# Business Requirements Document (BRD)

**Project:** PaperTradeX — Zero-consequence AI-coached trading simulator
**Date:** 2026-06-01
**Version:** 0.2
**Owner:** Earl Clyde Bañez
**Status:** MVP

---

## 1. Executive Summary

PaperTradeX is a real-time paper trading simulator for stocks and crypto that uses live market data and an AI coach to teach young investors *why* they keep making the same emotional mistakes — not just *what* the market is doing. Every trade triggers a plain-English AI response that names the bias, explains the pattern, and adds one data point to the user's behavioral fingerprint. The product exists because 71% of retail investors underperform index funds and the average first-year investor loses $3,200 — almost entirely due to emotional decision-making that no existing simulator surfaces or corrects.

---

## 2. The Problem & Opportunity

**The Problem:**

Young investors lose an average of $3,200 in their first year, primarily from emotional trading: panic-selling drawdowns, FOMO-chasing pumps, and revenge-trading after losses. 71% of retail investors underperform the S&P 500. Existing paper-trading apps (Webull paper, Thinkorswim simulated) replicate the trading interface but offer zero coaching or behavioral feedback. "Investopedia Stock Simulator" teaches mechanics; none teach psychology. The result: users graduate from simulators to real accounts having practiced the same bad habits at zero cost and zero learning.

**The Opportunity:**

Three forces converge right now. First, the next crypto bull cycle is building — Gen Z curiosity peaks during market excitement, creating a natural top-of-funnel moment. Second, Gen Z invests earlier than any prior generation (median age of first investment: 19, per Schwab 2024); they are entering before they have the behavioral vocabulary to understand why they lose. Third, AI coaching is now cheap enough (<$0.01 per trade commentary using GPT-4o-mini) to run on every single trade. On the B2B side, 23 states now mandate personal finance education — creating a direct school district procurement channel with zero incumbents offering a product this modern.

**Target Customer / User:**

Jordan, 20, college sophomore. Has $500 in a Robinhood account opened during the last meme-stock cycle. Lost 40% of it in 3 months panic-selling. Blames "market manipulation." Follows 5 finance TikTok accounts. Wants to invest but doesn't trust himself. Would try a zero-risk simulator if it felt like a game rather than homework.

---

## 3. Strategic Alignment

**Primary OKR (6 months post-launch):** Reach 50,000 active users [TBD — confirm], with D30 retention ≥ 25%, demonstrating that users return weekly to check their behavioral profile — not just to trade.

**Secondary goals:**

- Establish behavioral fingerprint data moat: every trade logged enriches user profiles, making the switching cost real. The longer you use PaperTradeX, the more accurate your bias report.
- Land first 3 school district B2B contracts through public leaderboard demos.
- Demonstrate AI coaching cost-efficiency: keep AI cost ≤ $0.02 per active user per day at 50K MAU.

---

## 4. Scope

**In Scope (V1):**

- **Crypto + Stock Unified Simulator** *(CryptoClass)* — live-data paper trading for BTC, ETH, SOL and S&P 500 equities in one portfolio; both asset classes share cash balance and P&L
- **AI Bias Coach** *(PaperTrader)* — flags emotional patterns (FOMO, panic sell, overconfidence, loss aversion, recency bias, anchoring, disposition effect) after each trade with plain-English psychology explanations
- **Behavioral fingerprint** — accumulating bias profile; switching platforms loses history (retention moat)
- **School Leaderboards** *(CryptoClass)* — class competition on % portfolio return, risk-adjusted score, and learning-module completion; teachers set competition start/end window
- **Unlock-Gated Education Modules** — DeFi, blockchain basics, and risk management required before unlocking advanced instruments (options, altcoins beyond BTC/ETH/SOL); completion tracked for leaderboards
- **Trade Replay + AI Debrief** *(PaperTrader)* — weekly personalized report: trade timeline, bias summary, and "what you did wrong" coaching narrative from session data
- User portfolio dashboard: unified P&L, trade history, bias heatmap
- Web app (desktop-first, mobile responsive)
- Email auth + Google OAuth

**In Scope (V1.1 — post-launch, 30–60 days):**

- **Verified Certificates** — shareable credentials (e.g. "Completed Advanced Crypto Trading Simulation") for college apps and LinkedIn
- **Classroom Mode** *(new)* — teacher dashboard, class portfolio average, custom market scenarios ("2008 crash", "2021 crypto boom"), exportable grades

**Out of Scope (V1):**

- Real money trading or brokerage integrations — deferred; regulatory complexity
- Options/futures *simulation* until user completes prerequisite education module — mechanics gated, not removed from roadmap
- Native iOS/Android app — deferred; web-first ships faster
- Social features (follow traders, copy trades) — deferred to V2
- International markets / non-US equities — deferred to V2
- Advanced charting (TradingView parity) — deferred; not core to the coaching UX

---

## 5. Success Metrics

| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| Registered users | 0 | 10,000 | 30 days post-launch |
| DAU/MAU ratio | 0 | ≥ 20% | 60 days post-launch |
| D7 retention | 0 | ≥ 35% | Measured week 2 |
| D30 retention | 0 | ≥ 22% | Measured month 2 |
| Avg trades per active user per week | 0 | ≥ 5 | 30 days post-launch |
| AI coach feedback read rate (>3s on insight) | 0 | ≥ 60% | 30 days post-launch |
| App rating (Product Hunt / G2) | 0 | ≥ 4.3 | Launch week |
| B2B school pilot contracts | 0 | 3 signed [TBD — confirm] | 90 days post-launch |

---

## 6. Stakeholders & Owners

| Role | Person | Responsibility |
|------|--------|----------------|
| Sponsor / Decision Maker | Founder [TBD — confirm] | Final approval, product direction, investor narrative |
| Business Owner | Founder [TBD — confirm] | Accountable for retention and B2B growth metrics |
| Product / Tech Lead | Founder [TBD — confirm] | Architecture, build, deployment |

---

## Self-Check

- [ ] Section 1 can be read by a non-technical person and makes immediate sense
- [ ] Section 2 quantifies the problem (not just describes it)
- [ ] Section 5 has at least one metric with a number and a timeline
- [ ] Section 4 explicitly names at least one thing that is out of scope
- [ ] Nothing in this document describes *how* to build the solution (that's the SDD's job)

---

*Next document: [PRD](prd-papertradex.md)*

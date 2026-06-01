# Product Requirements Document (PRD)

**Project:** PaperTradeX — Zero-consequence AI-coached trading simulator
**Date:** 2026-06-01
**Version:** 0.2
**Owner:** Founder [TBD — confirm]
**Status:** Draft
**BRD:** [brd-papertradex.md](brd-papertradex.md)

---

## 1. Product Purpose & Value Proposition

PaperTradeX is a unified crypto + stock paper trading simulator with live market data and an AI bias coach that flags emotional patterns after every trade — FOMO, panic selling, overconfidence — with plain-English psychology, not jargon. One portfolio holds BTC, ETH, SOL and S&P 500 names together. Students compete on school leaderboards; teachers set the window. Advanced trading (options, altcoins) stays locked until education modules are completed. After a week of trading, AI generates a personalized debrief like a coach reviewing game tape. The behavioral fingerprint grows with every decision; leave the platform and you lose that history.

---

## 2. Target Personas

**Primary Persona — The Burned Beginner (Jordan)**
- *Who they are:* 18–24, in college or just started working. Opened a real brokerage account within the last 18 months. Lost money or saw significant drawdown. Currently too scared to put more in but too curious to quit.
- *Their core frustration:* Every YouTube video tells them *what* to do, but nobody explains *why they keep doing the wrong thing* anyway. They know they panic-sell. They cannot stop.
- *What success looks like for them:* After 30 days, they have a named, specific list of their biases and at least 3 trades they chose differently because the AI warned them. They feel like they understand themselves as an investor — not just the market.

**Secondary Persona — The Finance Teacher (Ms. Rivera)**
- *Who they are:* 30–55, high school or community college personal finance teacher. Required to teach investing. Has students who won't engage with traditional curricula.
- *Their core frustration:* Every existing simulator is either too complex (Thinkorswim) or too simplified (Excel sheets). No tool has a leaderboard she can project in class, and no tool ties learning outcomes to specific behavioral mistakes.

---

## 3. Core Features & Priorities

| Feature | Source | Description | Priority |
|---------|--------|-------------|----------|
| Crypto + Stock Unified Simulator | CryptoClass | Live-data paper trading for BTC, ETH, SOL + S&P 500 stocks in **one portfolio**; shared cash, unified P&L | Must-Have |
| AI Bias Coach | PaperTrader | After each trade: flags FOMO, panic sell, overconfidence, etc.; plain-English **psychology** explanation (why the brain does this) | Must-Have |
| Behavioral Fingerprint Profile | PaperTrader | Accumulating bias map; profile does not transfer if user leaves platform | Must-Have |
| Portfolio Dashboard | — | Unified P&L across asset classes, trade history, return vs S&P benchmark | Must-Have |
| School Leaderboards | CryptoClass | Compete on % portfolio return, risk-adjusted score, or learning completion; teacher sets competition window | Must-Have |
| Unlock-Gated Education Modules | New | Must complete DeFi, blockchain basics, risk management before trading options or extended altcoins; gates enforced in trade UI | Must-Have |
| Trade Replay + AI Debrief | PaperTrader | Weekly AI report: trade replay timeline + personalized "what you did wrong" narrative with data | Should-Have |
| Bias Heatmap Visualization | — | Calendar + frequency chart of when each bias fires | Should-Have |
| Classroom Mode | New | Teacher dashboard, class portfolio average, custom scenarios ("2008 crash", "2021 crypto boom"), exportable grades | Should-Have (V1.1) |
| Verified Certificates | New | Shareable completion credentials for college apps / LinkedIn | Could-Have (V1.1) |
| Social Share Card | — | Shareable bias fingerprint card | Could-Have |
| Options/Futures Simulation | — | Simulated instruments only after prerequisite module completion | Won't-Have (V1 launch) / Gated (post-education) |

---

## 4. User Stories & Acceptance Criteria

**US-01 — Execute a paper trade with AI coaching**
> As Jordan, I want to buy a stock and immediately see what the AI coach thinks about my decision so that I can learn whether my reasoning was biased.

Acceptance Criteria:
- Given Jordan is on the trade screen, when he submits a buy order, then the AI coach panel slides in within 3 seconds displaying: (1) trade summary, (2) detected bias if any, (3) plain-English explanation.
- Given the trade is executed, when the coach panel loads, then the bias label is drawn from a fixed taxonomy: FOMO, panic_sell (maps to loss_aversion), loss_aversion, overconfidence, recency_bias, anchoring, disposition_effect, or null.
- Given a bias is detected, when the coach panel renders, then the message includes at least one sentence explaining the **psychology** behind the pattern (not only what happened).
- Given the AI service is unavailable, when a trade is executed, then the trade persists and a rule-based fallback message shows within 200ms with "Quick pattern check" framing.

**US-02 — View my behavioral fingerprint**
> As Jordan, I want to see my behavioral fingerprint profile so that I can understand which biases are hurting me most.

Acceptance Criteria:
- Given Jordan has made ≥ 3 trades, when he opens the Profile page, then a bias radar chart renders with scores for at least 4 bias dimensions.
- Given Jordan has made < 3 trades, when he opens the Profile page, then a "Building your profile" state is shown with a trades-needed counter.
- Given the fingerprint has been built, when Jordan views it, then each bias includes a count of how many trades triggered it and a brief description.

**US-03 — Join a school leaderboard**
> As Jordan, I want to join my finance class's leaderboard so that I can compare my P&L and bias control against classmates.

Acceptance Criteria:
- Given a teacher has created a group with a join code, when Jordan enters the code, then he is added to the group leaderboard within 5 seconds.
- Given he is on the leaderboard, when he views it, then entries show: rank, username, portfolio return %, and Bias Control Score (inverse bias frequency).
- Given the leaderboard has ≥ 2 members, when the page loads, then rank #1 is visually highlighted.

**US-04 — Complete education before advanced trading**
> As Jordan, I want to complete required education modules before I can trade options or altcoins so that I learn risk management before touching complex instruments.

Acceptance Criteria:
- Given Jordan has not completed "Risk Management 101", when he attempts to trade an options ticker or a non-whitelisted altcoin, then the trade is blocked and he is routed to the required module.
- Given Jordan completes a module (quiz score ≥ 80% [TBD — confirm]), when he returns to trade, then the corresponding instrument class is unlocked and progress counts toward leaderboard "learning completion."
- Given a module is incomplete, when he views the modules list, then each module shows: locked/unlocked state, estimated time, and which instruments it gates.

**US-05 — Compete on a school leaderboard with teacher-defined window**
> As Jordan, I want to compete with classmates on returns and learning progress during my teacher's competition period.

Acceptance Criteria:
- Given Ms. Rivera sets a competition window (start/end date), when students view the leaderboard, then only activity within that window affects rank.
- Given the leaderboard is active, when Jordan views it, then he can toggle sort by: % portfolio return, risk-adjusted score (return / max drawdown), or learning-module completion %.
- Given the window has not started, when students open the leaderboard, then a countdown and rules summary are shown.

**US-06 — Receive weekly trade replay and AI debrief**
> As Jordan, I want a weekly AI report that replays my trades and explains what I did wrong so that I can improve like reviewing game tape with a coach.

Acceptance Criteria:
- Given Jordan made ≥ 3 trades in the past 7 days, when Sunday 00:00 UTC passes [TBD — confirm], then a "Weekly Debrief" is generated and surfaced in-app and via email opt-in.
- Given the debrief is opened, when Jordan views it, then it includes: (1) trade count and net P&L, (2) top 3 biases with examples linked to specific trades, (3) one prioritized improvement suggestion, (4) optional trade replay list (chronological).
- Given Jordan made < 3 trades, when the week ends, then no debrief is generated; a "Trade more to unlock your debrief" nudge is shown.

**US-07 — Teacher runs classroom mode**
> As Ms. Rivera, I want a teacher dashboard with class averages, scenario assignments, and exportable grades so that I can run PaperTradeX as a graded classroom activity.

Acceptance Criteria:
- Given Ms. Rivera has a School tier account, when she opens Classroom Mode, then she sees: class avg portfolio return, avg bias-control score, module completion rates, and per-student drill-down.
- Given she assigns a scenario ("2008 crash" or "2021 crypto boom"), when students log in, then their market context uses the scenario's historical price replay or labeled synthetic conditions [TBD — confirm implementation].
- Given the term ends, when she clicks "Export grades", then a CSV downloads with: student name, return %, risk-adjusted score, modules completed, bias incidents.

**US-08 — Earn and share a verified certificate**
> As Jordan, I want a shareable certificate when I complete the advanced simulation track so that I can add it to college applications or LinkedIn.

Acceptance Criteria:
- Given Jordan completes all required modules and meets minimum trade count (≥ 20) with debrief engagement, when he finishes the capstone module, then a certificate is issued with unique verification ID.
- Given a certificate exists, when Jordan shares it, then a public verification URL resolves to: name, completion date, track title, and non-editable proof hash.
- Given verification fails (invalid ID), when a third party opens the link, then a clear "Certificate not found" page is shown.

**US-09 — Complete onboarding and make first trade**
> As a new user, I want to set up my paper portfolio and make my first trade in under 3 minutes so that I can reach the AI coach experience before losing interest.

Acceptance Criteria:
- Given first launch after sign-up, when the user begins onboarding, then the flow starts: (1) choose starting capital, (2) select market interests, (3) self-diagnosis question, (4) one-screen coaching primer.
- Given onboarding completion, when the user lands on the dashboard, then a guided first-trade prompt is visible pointing to the search bar.
- Given the user completes their first trade, when the AI coach panel appears, then the first coaching message always opens with: "Your first trade — let's see what it tells us about you."

---

## 5. UX & Design Intent

**Design reference:** [dsd-papertradex.md](dsd-papertradex.md)

**Key flows:**
- First trade → AI coach response: ≤ 3 steps, ≤ 3 seconds for coach panel; psychology line visible without expanding
- Unified portfolio: single search finds both `AAPL` and `BTC`; one cash balance
- Education gate: blocked trade → module CTA → quiz → unlock instrument class
- Weekly debrief: notification → replay list → AI narrative (≤ 3 min read)
- Teacher: create class → set window → assign scenario → export grades

**Constraints:**
- Web app, desktop-first (1280px+), mobile responsive down to 375px
- AI coaching panel must be scannable in ≤ 15 seconds — no wall-of-text responses
- Live market data latency ≤ 15 seconds from exchange (Polygon.io free tier, labeled in UI)
- All bias labels must be consistent across UI; no synonym drift between coach panel and fingerprint chart

---

## 6. Out of Scope for This Release

- Real brokerage integration (Alpaca, IBKR) — deferred to V2; regulatory and legal review required
- Native mobile app (iOS/Android) — deferred to V2; web ships faster
- Social follow / copy-trading — deferred to V2; scope risk
- Verified certificates — V1.1 (30–60 days post-launch)
- Full Classroom Mode (scenarios + grade export) — V1.1; basic teacher leaderboard in V1
- Advanced charting (TradingView widget embed) — deferred to V2; not core to coaching UX
- Options/futures *simulation engine* — ships only after education gate satisfied; engine build may trail gate UI in V1 by 1 sprint [TBD — confirm]

---

## 7. AI / Agent Feature Specifications

**AI Components:** (1) Per-trade behavioral bias coaching; (2) Weekly trade replay + debrief generation

### 7a. Per-Trade Bias Coach (PaperTrader lineage)

**Model(s) considered:** GPT-4o (high quality, higher cost), GPT-4o-mini (fast, cheap, sufficient for short coaching responses), Claude Haiku (alternative)

**Selected model:** GPT-4o-mini — *reason: ~$0.00015 per trade at scale; output quality sufficient for structured bias labeling + 2–3 sentence coaching; latency ≤ 1500ms average*

**What the AI does:**
On every buy/sell order submission, a structured prompt is sent containing: ticker, price, user's current position, recent trade history (last 5 trades), market context (% move in last 24h), and user's bias profile history. The model returns a JSON object: `{ bias_label, confidence, explanation, coach_message }`. The `coach_message` is displayed in the coaching panel; `bias_label` is logged to the behavioral fingerprint.

**Input → Output contract:**
- Input: `{ ticker, action: "buy"|"sell", price, quantity, portfolio_context, last_5_trades, market_24h_change, user_bias_history }` — per trade
- Output: `{ bias_label: "FOMO"|"loss_aversion"|"overconfidence"|"recency_bias"|"anchoring"|"disposition_effect"|null, confidence: 0–1, explanation: string (≤100 chars), coach_message: string (≤200 chars) }`
- Latency expectation: ≤ 2000ms p95

**Human-in-the-loop points:**
- User must initiate every trade; AI is purely reactive — never initiates
- User can tap "Disagree with this assessment" to flag a coaching response; logged for model improvement

**Fallback behavior when AI fails or is unavailable:**
A lightweight rule-based heuristic fires automatically: if asset is up >10% in 24h and user is buying → label "Possible FOMO"; if user just sold at a loss and is buying again within 5 minutes → label "Possible revenge trading." Coach message: "AI coach is temporarily unavailable — here's a quick pattern check." Never shown as an error state.

**Token / cost budget per operation:**
~400 tokens per trade × $0.00015 per call. At 100 trades/day × 50K MAU = ~$750/day at peak. Acceptable at scale; revisit at 100K MAU.

**Coaching copy requirements:**
- Must name the bias in the first sentence
- Must include one sentence of **psychology** (e.g. "Your brain treats recent gains as proof the trend will continue — that's availability bias, not analysis.")
- Must not give buy/sell advice; educational framing only

### 7b. Weekly Trade Replay + AI Debrief (PaperTrader lineage)

**Model:** GPT-4o-mini (batch job via Supabase Edge Function cron, weekly)

**Input:** All trades + coaching events from past 7 days; fingerprint deltas; portfolio P&L; benchmark comparison

**Output:** `{ summary_paragraph, top_biases: [{label, trade_ids, explanation}], improvement_focus, replay_entries: [{trade_id, timestamp, ticker, action, coach_snippet}] }`

**Latency:** Async; user notified when ready (no blocking UI)

**Token budget:** ~2,000 tokens per user per week; ~$0.0006 per debrief

---

## 8. Dependencies & Assumptions

**Dependencies:**
- Next.js 15 (App Router) + React 19
- Supabase (auth, Postgres, Realtime, Edge Functions)
- Polygon.io — live market data (free tier: ≤15s delayed; paid for real-time)
- OpenAI API (GPT-4o-mini)
- Vercel (hosting + edge CDN)
- Recharts — portfolio and fingerprint charts
- Tailwind CSS v4

**Assumptions:**
- Users grant email/Google OAuth; no phone number required in V1
- Polygon.io free tier provides ≤ 15-second delayed quotes; labeled clearly in UI [TBD — confirm real-time upgrade budget]
- Users access primarily via desktop browser (≥ 70% of sessions estimated)
- US market hours awareness: after-hours orders queue but prices reflect last close until market open

---

## 9. Milestones

| Milestone | Deliverable | Target Date |
|-----------|-------------|-------------|
| M0 | Repo scaffolded, Supabase project live, auth working, Polygon.io connected, CI passing | Week 1 |
| M1 | Vertical slice: buy 1 stock → AI coach response → bias logged to fingerprint | Week 4 |
| M2 | All Must-Have: unified portfolio, education gates, enhanced leaderboards, fingerprint | Week 7 |
| M3 | Should-Have: weekly AI debrief, bias heatmap; QA sign-off; staging build | Week 10 |
| Launch | Public release; QAD passed; GTM assets live; Product Hunt launch | Week 12 |
| M4 (V1.1) | Classroom Mode, verified certificates, scenario library | Week 16–18 [TBD — confirm] |

---

## Self-Check

- [ ] Every Must-Have feature in Section 3 has at least one user story in Section 4
- [ ] Acceptance criteria are testable (Given/When/Then format)
- [ ] Section 6 explicitly names things that were discussed but cut
- [ ] Section 7 is filled or marked N/A
- [ ] Section 9 has realistic dates
- [ ] This document answers *what* to build, not *how* (architecture goes in the SDD)

---

*Next document: [DSD](dsd-papertradex.md) | [SDD](sdd-papertradex.md)*

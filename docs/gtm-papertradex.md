# Go-To-Market (GTM) Strategy

**Project:** PaperTradeX — Zero-consequence AI-coached trading simulator
**Date:** 2026-06-01
**Version:** 0.2
**Owner:** Founder [TBD — confirm]
**Status:** Draft
**PRD:** [prd-papertradex.md](prd-papertradex.md)

---

## 1. Product Summary (GTM View)

**What it does (one sentence):** PaperTradeX is one portfolio for BTC, ETH, SOL and S&P 500 stocks — with an AI coach that flags FOMO and panic selling after every trade, weekly game-tape debriefs, school leaderboards, and education gates before you touch options or altcoins.

**Who it's for:** 18–24 year olds who have already lost money in the market, follow finance content on TikTok/YouTube, and want to improve without risking more real capital.

**Core value proposition:** Your behavioral fingerprint — an accumulating AI-built map of your trading biases that no other platform has and that only grows more accurate the longer you use PaperTradeX. Switching means starting over.

**Category:** Education / Finance

---

## 2. Target Audience

**Primary ICP (Ideal Customer Profile):**

- *Who:* 18–24, early investor, lost money in a real account in the last 12–18 months. Follows finance TikTokers and crypto subreddits. Currently scared to invest more but obsessively watches their Robinhood app.
- *Where they hang out:* r/wallstreetbets, r/investing, r/personalfinance, r/stocks, r/CryptoCurrency, TikTok (#stocks, #investing101, #cryptotok), YouTube (Graham Stephan, Andrei Jikh, Humphrey Yang)
- *What they already believe:* "I know I'm emotional with money but I don't know how to fix it." "Paper trading apps are boring because there's no feedback." "The market is rigged against retail investors."
- *What will make them try this:* A 30-second TikTok/Reel showing the AI coach naming someone's exact mistake in plain English. The conversion moment is seeing their own bias pattern labeled — not an error message, a *diagnosis*.

**Secondary audience:**

- *Who:* High school and community college personal finance teachers (28–55), required to teach investing under new state financial literacy mandates. Actively seeking modern classroom tools.
- *Why secondary:* They discover the product through school procurement channels and teacher forums; slower top-of-funnel but each teacher contract brings 20–200 student accounts and is high-retention by default.

---

## 3. Pricing Model

**Model:** Freemium

| Tier | Price | What's Included | Limit / Gate |
|------|-------|-----------------|--------------|
| Free | $0 | Unified crypto+stock paper trading, AI bias coach per trade, basic fingerprint, school leaderboard (student), core education modules | No weekly AI debrief; no certificates; no classroom scenarios |
| Pro | $7.99/mo or $59.99/yr [TBD — confirm] | Weekly trade replay + AI debrief, full fingerprint history, all education modules + instrument unlocks, shareable bias card | No teacher dashboard |
| School | $199/school/yr [TBD — confirm] | Classroom Mode: teacher dashboard, competition windows, risk-adjusted leaderboard, scenario assignments, grade export, bulk onboarding | District pricing on request; certificates included for students [TBD — confirm] |

**Pricing rationale:** $7.99/mo is positioned as less than one bad trade. The average first-year loss is $3,200 — one month of Pro is 0.25% of that. School tier is priced as a single-teacher budget line item requiring no district approval.

**Payment processor:** Stripe (web). RevenueCat added when native apps ship.

---

## 4. Positioning & Messaging

**Tagline:** `"Trade fake money. Learn your real patterns."`

**Primary message (for landing page hero):**
Most paper trading apps teach you *what* stocks do. PaperTradeX teaches you *what you do*. Every trade runs through an AI coach that names your emotional patterns — FOMO, panic-selling, overconfidence — in plain English, and builds a behavioral fingerprint that gets sharper the more you trade. The longer you use it, the better it knows you. That is the moat.

**Proof points:**

- 71% of retail investors underperform index funds — almost entirely due to behavioral mistakes, not research failures (DALBAR Quantitative Analysis 2023)
- The average first-year investor loses $3,200 from emotional trading; zero-consequence practice with feedback is the evidence-backed corrective
- AI coaching costs less than $0.01 per trade — PaperTradeX is the first platform to make this economically viable at the individual trade level

**Objection handling:**

| Objection | Response |
|-----------|----------|
| "Paper trading isn't real — I won't learn anything" | The market behavior is real (live prices). What you're practicing is your own decision-making. That transfers. |
| "I already use Webull paper trading" | Webull has no coaching, no bias feedback, no behavioral profile. You're practicing your mistakes, not correcting them. |
| "I'm not emotional — I do research" | 71% of researched investors still underperform. Overconfidence is the most common bias in people who believe they are rational. |
| "I only trade crypto, not stocks" | PaperTradeX covers BTC, ETH, SOL and all major US equities. Your crypto FOMO is exactly what the AI is best at catching. |

---

## 5. Launch Channels & Tactics

**Owned channels:**

| Channel | Audience Size | Planned Action |
|---------|---------------|----------------|
| GitHub (public repo) | 0 → target 200 stars [TBD — confirm] | "How I built an AI bias coach for retail investors" technical writeup |
| X / Twitter | 0 → build-in-public series | Weekly dev update thread: "This week I built [X]. Here's what the AI flagged in my own trades." |
| TikTok / Instagram Reels | 0 → target 10K views on launch video [TBD — confirm] | 30-second screen recording: AI coach naming FOMO in real time |

**Community / earned channels:**

| Channel | Tactic | Timing |
|---------|--------|--------|
| r/personalfinance, r/investing | "I built a paper trading app where AI tells you why you're making bad trades" — demo video post | Launch day |
| r/wallstreetbets | "The AI diagnosed my FOMO. Here's my bias fingerprint after 50 trades." | Launch day + 1 week |
| Product Hunt | Full launch — gather upvote commitments from build-in-public audience during beta | Beta launch week (Week 10) |
| TikTok #investing101, #papertrading | 30–60s demo: search ticker → place trade → AI coach slides in → bias labeled | 1 week before public launch |
| Hacker News Show HN | "Show HN: PaperTradeX — AI coach that flags your trading biases in real time" | Public launch day, 9am ET |
| Finance micro-influencers (10–100K followers) | Cold DM with free Pro code + 30-second demo clip | Beta phase (Week 8–10) |
| Personal finance teachers (LinkedIn + teacher forums) | "Free tool that shows students their investment biases — built-in class leaderboards" | Week 10 |

**Content assets needed before launch:**

- [ ] Demo video (30–60 sec): screen record — search NVDA → buy after +25% 1-day spike → AI coach slides in → labels "FOMO" → shows fingerprint incrementing. No narration needed; caption only.
- [ ] Product Hunt gallery: 5 screenshots (dashboard, AI coach panel, fingerprint radar, school leaderboard, module unlock)
- [ ] Product Hunt listing: tagline + description + first comment explaining the behavioral fingerprint switching cost
- [ ] Landing page at `papertradex.com` [TBD — confirm]: hero + problem stats + feature cards + fingerprint evolution strip + sign-up CTA
- [ ] Reddit post copy (primary investing subs): concise, honest, leads with the 71% statistic — not the feature list
- [ ] Teacher outreach email template: leaderboard demo GIF + state mandate reference + free tier emphasis

---

## 6. Launch Phases

| Phase | Criteria to Enter | Target Date | Goal |
|-------|-------------------|-------------|------|
| **Alpha** (private) | Trade + AI coaching working end-to-end; onboarding complete; no P0 bugs | Week 8 | 10–20 trusted users; validate AI coaching quality; collect first fingerprint data |
| **Beta** (invite-only via waitlist) | Alpha feedback addressed; all Must-Have features stable; leaderboards working | Week 10 | 100–200 testers; D7 retention baseline; verify AI fallback rate < 10% |
| **Public Launch** | Beta D7 retention ≥ 30%; QAD release criteria passed; landing page live; GTM assets ready | Week 12 | Product Hunt launch + Reddit posts + TikTok drop |
| **Post-launch (30 days)** | — | Week 16 | 10,000 registered users [TBD — confirm]; D30 retention data; first Pro conversions; 1–2 school pilot conversations initiated |

---

## 7. Success Metrics (30-day post-launch)

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Registered users | 10,000 [TBD — confirm] | Supabase `auth.users` count |
| D7 retention | ≥ 30% | Users active on day 7 — Supabase query |
| D30 retention | ≥ 20% | Users active on day 30 — Supabase query |
| AI coaching engagement (panel viewed > 3s) | ≥ 60% of all trades | Custom event — Vercel Analytics |
| Fingerprint profiles with ≥ 10 trades | ≥ 30% of registered users | `behavioral_fingerprints.total_trades` query |
| Product Hunt ranking | Top 5 on launch day [TBD — confirm] | Product Hunt leaderboard |
| Pro conversion rate | ≥ 3% of active users by day 30 [TBD — confirm] | Stripe dashboard |

---

## Self-Check

- [ ] Section 2 ICP is specific enough — can name the archetype clearly
- [ ] Section 3 pricing has a clear gate between free and paid
- [ ] Section 5 content assets are enumerated and all need to be created before launch
- [ ] Section 6 has binary criteria for moving between phases
- [ ] Section 7 metrics are measurable on day 1
- [ ] This document is drafted before launch, not written as a retrospective

---

*Full FMD suite complete. Document index:*
- *[BRD](brd-papertradex.md) — Why build this*
- *[PRD](prd-papertradex.md) — What to build*
- *[DSD](dsd-papertradex.md) — How it looks*
- *[SDD](sdd-papertradex.md) — How it's built*
- *[RFC](rfc-papertradex-behavioral-fingerprint.md) — How the behavioral fingerprint works*
- *[QAD](qad-papertradex.md) — How we test it*
- *[GTM](gtm-papertradex.md) — How we launch it*
- *[ONBOARDING](onboarding-papertradex.md) — First-run experience*
- *[DEV WORKFLOW](plan-dev-workflow-papertradex.md) — How the team ships*
- *[WEBSITE](plan-website-papertradex.md) — Landing page spec*

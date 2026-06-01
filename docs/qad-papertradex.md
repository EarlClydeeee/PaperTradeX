# QA & Test Plan (QAD)

**Project:** PaperTradeX — Zero-consequence AI-coached trading simulator
**Date:** 2026-06-01
**Version:** 0.2
**Owner:** Founder [TBD — confirm]
**Status:** Draft
**PRD:** [prd-papertradex.md](prd-papertradex.md)
**RFC(s):** [rfc-papertradex-behavioral-fingerprint.md](rfc-papertradex-behavioral-fingerprint.md)

---

## 1. Testing Strategy & Scope

**In Scope:**

- All Must-Have and Should-Have features from PRD §3
- Paper trading engine (buy/sell execution, position management, P&L calculation)
- AI coaching system (LLM path + rule-based fallback path)
- Behavioral fingerprint accumulation and radar visualization
- School leaderboard creation and join flow
- Blockchain education module unlock flow
- Onboarding flow (3-question personalization + coaching primer)
- Auth: sign-up (email + Google OAuth), login, session persistence, logout
- Network degradation behavior (Polygon.io unavailable, Supabase unavailable, OpenAI unavailable)

**Out of Scope:**

- Load/stress testing above 1,000 concurrent users — V1 scale; revisit at beta
- Full WCAG AAA accessibility audit — AA is the V1 floor
- iOS/Android native app — deferred
- Options/futures simulation — deferred

**Testing levels:**

| Level | Tooling | Owner |
|-------|---------|-------|
| Unit tests | Vitest + React Testing Library | Engineer (write alongside code) |
| Integration tests | Vitest + local Supabase (`supabase start`) | Engineer |
| E2E tests | Playwright | Engineer / QA |
| Manual exploratory | Chrome + Firefox, physical hardware | Founder [TBD — confirm] |
| AI eval suite | Manual 100-trade golden set | Founder [TBD — confirm] |

---

## 2. Test Environments & Data

**Staging URL:** Vercel preview URL (auto-generated per PR) + `staging.papertradex.com` [TBD — confirm]
**Test credentials:** Stored in local `.env.test`; test accounts: `qa-student@papertradex.test` and `qa-teacher@papertradex.test`
**Data policy:** Seeded test accounts in Supabase staging project. Never use production user data. Reset test data before each major test cycle.

**Test data setup:**
```bash
# Reset staging DB and seed test accounts
supabase db reset --db-url $STAGING_DB_URL
npx tsx scripts/seed-test-data.ts
```

---

## 3. Core Test Scenarios

### Happy Paths (must all pass before launch)

| ID | Scenario | Steps | Expected Result | US-ID |
|----|----------|-------|-----------------|-------|
| H-01 | New user completes onboarding and reaches first value | Sign up → choose capital → select interests → self-diagnosis → coaching primer → land on dashboard → execute first trade | AI coach panel appears within 3s; "Your first trade" welcome coaching message shown | US-05 |
| H-02 | Execute buy trade and receive AI coaching | Search ticker → set quantity → submit buy → wait for panel | Coach panel slides in with bias_label + coach_message; fingerprint counter increments by 1 | US-01 |
| H-03 | Execute sell trade and receive coaching | Hold a position → sell → wait | Coach panel reflects sell action; disposition_effect detected correctly if selling winner quickly after buying | US-01 |
| H-04 | View behavioral fingerprint after 3+ trades | Make 3 trades → navigate to Profile | Radar chart renders with all 4+ bias dimensions; trade counts visible per dimension | US-02 |
| H-05 | Join school leaderboard with valid code | Obtain join code from teacher account → enter code in student account | Student appears on leaderboard within 5s; P&L and Bias Control Score visible | US-03 |
| H-06 | Unlock blockchain education module at milestone | Execute 10 cumulative trades → check modules list | "Module Unlocked" celebration fires; Module 1 accessible and interactive | US-04 |
| H-07 | Session persistence across browser restart | Log in → execute trade → close browser → reopen → navigate to portfolio | All positions, trades, and fingerprint data present; no re-login required within 30 days | — |
| H-08 | Unified portfolio: stock + crypto same balance | Buy AAPL → buy BTC → view portfolio | Single cash balance deducted; both positions listed; unified P&L | — |
| H-09 | Education gate blocks options until module done | Attempt options trade without module → complete module → retry | Blocked with module CTA; succeeds after completion | US-04 |
| H-10 | Weekly AI debrief generated | ≥3 trades in week → wait for cron / manual trigger in staging | Debrief visible with replay list and top biases | US-06 |
| H-11 | Leaderboard respects teacher window | Trades before window → trades inside window | Only in-window activity affects rank | US-05 |

### Sad Paths (edge cases and error handling)

| ID | Scenario | Input / Trigger | Expected Behavior |
|----|----------|-----------------|-------------------|
| S-01 | Insufficient cash for buy order | Buy quantity that exceeds cash_balance | Inline error "Insufficient paper funds"; trade not submitted; no coaching call made |
| S-02 | Sell more shares than owned | Sell quantity > position quantity | Inline error "You don't own that many shares"; trade blocked |
| S-03 | Invalid ticker symbol | Enter "XYZFAKE123" in search | Empty state with no results; no trade attempted; no error crash |
| S-04 | AI coaching service unavailable | Disable OpenAI key in staging env → execute trade | Trade persists in DB; heuristic fallback fires within 200ms; "Quick pattern check" panel shown; no error toast |
| S-05 | Leaderboard join with invalid code | Enter wrong join code | "Invalid code — check with your teacher" inline error; user not added to any group |
| S-06 | Market data unavailable | Block Polygon.io requests in DevTools → search ticker | "Market data temporarily delayed" banner shown; existing positions display last-known price with "stale" badge |
| S-07 | Fingerprint with zero bias events | Make 5 trades; all return bias_label: null | Profile page shows radar chart at baseline (all zeros) with "No dominant biases detected yet" message — not an error state |
| S-08 | Google OAuth denial | Click "Sign in with Google" → deny permissions | Redirected to login page; "Sign-in cancelled" message shown; no account created; no crash |
| S-09 | Network drops during trade submission | Submit buy → disable network before Supabase write completes | Trade does not persist; error toast "Trade not submitted — check your connection"; form state preserved for retry |
| S-10 | Duplicate coaching call for same trade_id | Call `/functions/v1/coach-trade` twice with identical trade_id | Second call returns existing coaching_event_id; no duplicate fingerprint increment; idempotent |

---

## 4. Automation vs. Manual Testing

### Automated (CI pipeline)

```yaml
# Runs on every PR:
- pnpm lint            # ESLint + Prettier
- pnpm typecheck       # tsc --noEmit
- pnpm test            # Vitest unit: trade logic, P&L calc, bias heuristics, fingerprint aggregation
- pnpm test:integration  # Vitest + local Supabase: auth flow, trade write, fingerprint increment, module unlock

# E2E runs on merge to main:
- playwright test tests/e2e/onboarding.spec.ts
- playwright test tests/e2e/trade-and-coach.spec.ts
- playwright test tests/e2e/fingerprint-profile.spec.ts
```

**CI gate:** PR cannot merge if lint, typecheck, or unit tests fail. E2E failures on `main` trigger Discord/Slack alert.

### Manual / Exploratory

- Full onboarding flow on Chrome (desktop 1280px) and Safari Mobile (375px viewport)
- AI coaching tested with 20 diverse trades: FOMO scenario, loss-aversion scenario, disposition-effect scenario, no-bias scenario
- School leaderboard: teacher creates group → student joins → leaderboard verified on both accounts simultaneously
- Module unlock: confirmed at 10-trade milestone with visual celebration
- Network offline test: airplane mode in DevTools → execute trade → reconnect → verify graceful degradation (S-04, S-09)
- 20-minute free-form exploratory session simulating a real student user session

---

## 5. Bug Triage Protocol

| Severity | Definition | Action |
|----------|------------|--------|
| **P0 — Blocker** | Trade executes but position not recorded; AI coaching crashes the browser; auth broken; data loss on refresh | Cannot launch. Fix immediately. |
| **P1 — High** | Fingerprint counter does not increment after coaching; leaderboard shows wrong P&L; module unlock never fires at milestone; fallback heuristic crashes | Cannot launch. Fix before release. |
| **P2 — Medium** | Coaching panel appears but takes >3s; stale price badge missing; minor chart rendering glitch; slow leaderboard load | Can launch. Fix in next update. |
| **P3 — Low** | Cosmetic issue, copy typo, animation jank on slower devices | Can launch. Backlog. |

**Bug tracking:** GitHub Issues with labels `bug/P0`, `bug/P1`, `bug/P2`, `bug/P3`

---

## 6. Release Criteria (Definition of Done)

Launch is approved when all of the following are true:

- [ ] All P0 bugs resolved
- [ ] All P1 bugs resolved
- [ ] All happy path scenarios H-01 through H-07 pass on Chrome (desktop) and Safari Mobile
- [ ] Sad paths S-01 through S-10 verified manually
- [ ] Automated test suite passes: lint + typecheck + unit + integration
- [ ] E2E green for: onboarding, trade-and-coach, fingerprint-profile
- [ ] 20-minute exploratory session completed with no new P0/P1 issues
- [ ] AI coaching latency ≤ 2000ms p95 verified on staging (sample 50 trades)
- [ ] Heuristic fallback fires correctly and within 200ms when OpenAI key disabled
- [ ] Vercel production deploy confirmed healthy; Supabase production migrations applied

---

## 7. AI / LLM Evaluation

**What makes an AI response "correct" in this product?**
A response is correct if: (1) `bias_label` matches the expected classification in the golden eval set with ≥ 80% agreement; (2) `coach_message` is ≤ 200 chars with no financial jargon; (3) `bias_label` is `null` when no bias is present in ≥ 90% of neutral scenarios.

### Eval Suite

| Eval ID | Input | Expected Behavior | Pass Criterion |
|---------|-------|------------------|----------------|
| AI-01 | Buy asset that pumped 35% in 24h, user has no prior position | FOMO label | `bias_label == 'FOMO'` |
| AI-02 | Buy asset +2% in 24h, diversified portfolio, no momentum context | No bias | `bias_label == null` |
| AI-03 | Sell losing position after holding 3 days, re-buy same ticker within 10 min | `loss_aversion` or `disposition_effect` | `bias_label IN ('loss_aversion','disposition_effect')` |
| AI-04 | Sell winning position on day 1 of holding while holding 3 losers for 30+ days | Disposition effect | `bias_label == 'disposition_effect'` |
| AI-05 | Single ticker represents >40% of portfolio value after buy | Overconfidence | `bias_label == 'overconfidence'` |
| AI-06 | Buy same crypto that pumped 60% last week; no recent event today | Recency bias | `bias_label == 'recency_bias'` |
| AI-07 | Routine buy, balanced portfolio, asset flat for 7 days | No bias | `bias_label == null` |
| AI-08 | Very first trade, zero history | No bias / null | `bias_label == null` |

**Regression evals:** Re-run all AI-XX scenarios manually before any model version upgrade or system prompt change.

**Model upgrade protocol:**
1. Run full eval suite against new model version on staging
2. Any regression in pass rate → block upgrade; investigate root cause
3. Log all eval results in `docs/eval-log.md`

**Observability:**
- Traces: Supabase Edge Function structured logs (one JSON object per invocation: `{ trade_id, bias_label, is_fallback, latency_ms }`)
- Key metric: LLM path success rate (non-fallback) — target ≥ 90% of all coaching calls
- Fallback rate target: < 10% of all coaching calls
- Alert: if fallback rate > 20% over any 3-day rolling window → investigate OpenAI reliability or budget

---

## Self-Check

- [ ] Every Must-Have PRD feature has at least one Happy Path scenario
- [ ] Every Happy Path has at least one corresponding Sad Path
- [ ] Automated checks are defined and will run in CI
- [ ] Section 7 is filled or marked N/A
- [ ] Release criteria are binary (pass/fail), not subjective
- [ ] Test data setup command is documented

---

*Next document: [GTM](gtm-papertradex.md)*

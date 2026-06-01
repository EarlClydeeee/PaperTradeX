# PaperTradeX — Team Workflow Plan

**Purpose:** Ship in parallel with minimum blocking. Define ownership, integration contracts, and sync cadence so developers can work on the same product without stepping on each other.
**Baseline docs:** [prd-papertradex.md](prd-papertradex.md), [sdd-papertradex.md](sdd-papertradex.md), [rfc-papertradex-behavioral-fingerprint.md](rfc-papertradex-behavioral-fingerprint.md), [dsd-papertradex.md](dsd-papertradex.md)

**Team size:** 1–2 (solo founder or founder + one engineer)
**Persistence scope:** Cloud-backed (Supabase Postgres) + React Query client cache
**Mode:** Build (12-week sprint)

---

## 0. Operating Mode

**Default timebox:** Ship one vertical slice first: **user signs up → searches a ticker → executes a buy → AI coach panel renders with bias label → fingerprint increments by 1.** Then widen to full feature set.

**Simultaneous work rule:** Spend the first 30–60 minutes together on Section 4 (shared `types.ts` + integration stubs), then split. Re-pair whenever integration is stuck more than 30 minutes.

**Scope knives (use when behind):**

| If time is tight | Cut or defer |
|------------------|--------------| 
| Backend custom logic | Rely entirely on Supabase PostgREST; defer Edge Functions except `coach-trade` |
| School leaderboard | Ship after public launch as a "coming soon" page |
| Blockchain modules | Static HTML content; defer interactive lesson engine |
| Bias heatmap calendar | Ship plain counts first; calendar heatmap deferred to V1.1 |
| CI/GitHub Actions | Run `tsc` + lint locally; GitHub Actions added in Week 3 |
| Mobile responsive polish | Lock to desktop viewport; responsive comes after core flows work |

**Demo / milestone checklist (minimum):** User signs up → buys NVDA → AI coach labels the decision → behavioral fingerprint radar updates with one data point.

---

## 1. Principles

1. **Critical-path ownership is non-overlapping:** Each workstream has exactly one owner. Other developers consume through the contract in Section 4, never reach across.
2. **Thin integration surface:** Shared types + a small set of agreed functions beat cross-importing feature folders. Prefer 3 small contracts over 1 giant interface.
3. **Merge constantly:** 1–2 devs: merge to `main` every 1–2 hours.
4. **One source of truth per concern:** Schema in `supabase/migrations/`, types in `src/types/index.ts`, env vars in `.env.local`.

---

## 2. Workstreams (ownership map)

| # | Workstream | Owner | Scope |
|---|------------|-------|-------|
| W1 | **Platform & scaffold** | Founder | Next.js 15 repo, Supabase init, Vercel deploy, CI, golden run command |
| W2 | **Data & persistence** | Founder | Schema migrations, Supabase RLS, React Query setup, seed scripts |
| W3 | **Auth & identity** | Founder | Supabase Auth email + Google OAuth, session management, `useUser` hook |
| W4 | **Coaching engine** | Founder | `coach-trade` Edge Function, `BiasHeuristicClassifier`, `FingerprintAggregator` |
| W5 | **App shell & routing** | Founder | Next.js App Router layout, sidebar nav, DSD token implementation in `globals.css` |
| W6 | **Trade feature** | Founder / Eng | Ticker search (Polygon.io), trade form, position management, P&L calculation |
| W7 | **Fingerprint & profile** | Founder / Eng | `FingerprintChart`, `useCoachingResult` hook, `CoachPanel` component |
| W8 | **Leaderboards & modules** | Founder / Eng | School group creation/join, leaderboard view, module unlock flow + celebration |
| W9 | **Onboarding** | Founder | 3-question flow, primer screen, first-trade guided prompt |
| W10 | **QA & release** | Founder | Test suite execution, E2E, staging validation, Vercel prod deploy |

### Team size mapping

| Team size | Recommended split |
|-----------|-------------------|
| **1 dev (solo)** | Sequence: W1 → W2+W3 → W4 → W5 → W6 → W7 → W9 → W8 → W10. Cut nothing from critical path. |
| **2 devs** | Dev A = W1+W2+W3+W4. Dev B = W5+W6+W7+W9. Share W8+W10 in Week 9–12. |

---

## 3. Roles

- **Platform owner:** W1+W2+W3 — schema, deploy, env. Keeps the `README.md` golden run command working at all times.
- **Engine owner:** W4 — coaching Edge Function. Owns the public `CoachTradeRequest` / `CoachTradeResponse` interface. Other workstreams consume this, never modify it.
- **Feature owner:** W6+W7+W8 — wires UI to engine contract. Does not modify the schema or Edge Function.
- **QA / release owner:** W10 — test plan execution, staging validation, Vercel production deploy.

---

## 4. Integration Contracts (define in first 30–60 minutes)

Agree on these in code on day one. Each contract is a tiny named interface that other workstreams import.

| # | Contract | Owner | Consumers |
|---|----------|-------|-----------|
| C1 | **`src/types/index.ts`** — `Trade`, `Position`, `Portfolio`, `BehavioralFingerprint`, `BiasLabel` enum, `CoachingEvent`, `EducationModule` | W2 | Everyone |
| C2 | **`getPortfolio(userId)`** + **`getPositions(portfolioId)`** — read path for portfolio | W2 | W6, W7 |
| C3 | **`executeTrade(payload)`** — writes trade to DB, updates position, calls coach | W4+W6 | W6 |
| C4 | **`useCoachingResult(tradeId)`** — Supabase Realtime subscription hook | W7 | W6 (renders `CoachPanel`) |
| C5 | **`getFingerprint(userId)`** — reads `behavioral_fingerprints` | W2 | W7 |
| C6 | **`/functions/v1/coach-trade`** — Edge Function interface (`CoachTradeRequest` / `CoachTradeResponse`) | W4 | W6 |
| C7 | **`useUser()`** — Supabase Auth session hook | W3 | Everyone |
| C8 | **Feature flags** — `NEXT_PUBLIC_FLAG_COACHING_ENABLED` env var | W1 | W4, W6 |

> Paste agreed TypeScript signatures into `CONTRACT.md` at repo root on day one. 30 seconds of writing saves hours of interface drift later.

---

## 5. Time Blocks (parallel tracks)

| Block | Platform (W1–3) | Engine (W4) | Features (W5–8) | Onboarding (W9) | QA (W10) |
|-------|----------------|-------------|-----------------|-----------------|----------|
| **T0 — Kickoff (Week 1)** | Repo + Supabase init + schema v1 + auth working + `types.ts` agreed | Stub Edge Function interface; mock implementation returns hardcoded coaching result | Next.js shell + routing + DSD CSS tokens | Placeholder onboarding screens | Dev setup docs + `README.md` golden run command |
| **T1 — Vertical Slice (Week 2–4)** | Schema stable + RLS live + React Query configured | One real coach call end-to-end (LLM path + fallback path) | Trade search + form → real buy → coach panel renders | Onboarding placeholder flow | Manual smoke tests on vertical slice |
| **T2 — Widen (Week 5–7)** | Staging environment live + CI passing | Fallback heuristic battle-tested + fingerprint aggregation stable | Portfolio dashboard + P&L + fingerprint radar chart | Full 3-question onboarding flow live | Unit tests + integration tests |
| **T3 — Polish (Week 8–10)** | Edge cases: network drops, Polygon.io rate limits, cold start | Golden eval suite run; bias scoring validated on 100-trade set | Leaderboards + module unlock + mobile responsive pass | First-trade guided prompt + primer screen final | E2E Playwright suite |
| **T4 — Freeze (Week 11–12)** | Build rehearsal + Supabase prod migration dry-run | Code freeze + coaching smoke test on staging | All features stable + DSD visual pass | Final copy review | QAD release criteria checklist — all green |

**Convergence rule:** T1 is not done until all workstreams have pulled `main` and seen the full vertical slice run. T2 cannot start until T1 converges.

---

## 6. Git Habits

- **Branching strategy:** Trunk-based (1–2 devs: commit directly to `main` with frequent small commits; short-lived feature branches `feat/W4-coach-engine` with lifespan ≤ 24h)
- **Conflict hotspots:** `src/types/index.ts`, `supabase/migrations/`, `package.json` — one person edits at a time; flag in Discord before editing
- **Required checks per PR (2 devs):** `tsc` + lint locally + manual smoke of the affected flow before merging
- **Merge debt rule:** If a branch has not merged in 3 days → stop features and integrate

---

## 7. Sync Cadence

| When | Solo / 2 devs |
|------|---------------|
| Start of day | 5m self-checkin: what is blocking, what is next |
| Every 1–2h while building | Commit + push; note in Discord channel |
| Daily | 15m end-of-day: what shipped, what is blocked |
| Weekly | 30m demo of working vertical slice; update milestone tracking |
| Before each phase gate | 60m: freeze + full QA pass + release rehearsal |

**Tooling:** Discord or Slack — one channel per workstream. Pin `CONTRACT.md` and the current vertical slice goal at the top.

---

## 8. Risk Hotspots

- **OpenAI API reliability:** Keep `BiasHeuristicClassifier` battle-tested at all times. The product must be fully usable without the LLM. Never skip fallback testing.
- **Polygon.io rate limits:** Build a price-caching layer in Week 2 (store last known price per ticker); never fetch prices on every render cycle.
- **Schema churn:** Lock `trades`, `behavioral_fingerprints`, and `ai_coaching_events` schemas before T1 converges. Changing them mid-build risks breaking fingerprint integrity and requiring a data migration.
- **Merge debt:** Branch older than 3 days → stop new features and integrate. No exceptions.
- **Onboarding the second developer:** Add `docs/onboarding-devs.md` the moment a second engineer joins — golden run command, `CONTRACT.md` pointer, who owns each workstream.

---

## 9. Done Definition

**Must-have for public launch:**

- [ ] Stakeholders see: search ticker → execute trade → AI coach labels bias → fingerprint radar updates.
- [ ] Works on Chrome desktop (1280px+) and Safari Mobile (375px).
- [ ] All workstream owners have signed off on their workstream.
- [ ] [QAD release criteria](qad-papertradex.md#6-release-criteria-definition-of-done) all green.
- [ ] Vercel production deploy confirmed; Supabase production migrations applied.

**Nice-to-have:** Bias heatmap calendar, weekly digest email, shareable fingerprint card, advanced charting.

---

*Scale this plan to your team — solo, pair, or small squad. The contracts in Section 4 and the workstreams in Section 2 are what keep developers from stepping on each other. Everything else is tuning.*

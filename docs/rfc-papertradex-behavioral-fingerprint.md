# Request for Comments (RFC) / Tech Spec

**Title:** Behavioral Fingerprint Engine — Real-time per-trade bias accumulation and profile rendering
**Date:** 2026-06-01
**Author:** Founder [TBD — confirm]
**Status:** Draft
**PRD Reference:** [prd-papertradex.md §7 — AI Feature Specifications, US-02](prd-papertradex.md)
**SDD Reference:** [sdd-papertradex.md §8 — AI / Agent Architecture, §3 — Data Architecture](sdd-papertradex.md)
**RFC ID:** `papertradex-rfc-001`

---

## 1. Context & Objective

**The problem this solves:**
The behavioral fingerprint is PaperTradeX's primary moat and retention mechanism. It must reliably accumulate bias signals across all trades, correctly classify AI coaching results into a 6-dimension bias taxonomy, and render a compelling radar chart visualization. The complexity lives in three places: (1) the AI output must map reliably to a fixed taxonomy — hallucinated labels break the fingerprint; (2) the fingerprint aggregation must be atomic with the trade write to prevent count drift; (3) the UI must meaningfully communicate increasing profile accuracy at all data densities (1 trade through 200+).

**Reference in PRD/SDD:**
This RFC implements PRD §7 (AI coaching input/output contract, bias taxonomy, HITL points) and the AI architecture described in SDD §8. It defines the exact TypeScript contracts for the coaching Edge Function and the client-side hook.

**Success criteria:**

- AI bias classification returns a valid taxonomy label or `null` on ≥ 95% of coaching calls (no hallucinated labels)
- Bias label accuracy ≥ 80% agreement with rule-based baseline on clear-cut cases — measured on a 100-trade golden eval set
- Fingerprint update is atomic with coaching event write — zero missed increments at 99.9% of trades
- Fingerprint radar chart renders correctly at all data densities (1 trade through 200+)
- Fallback heuristic fires within 200ms when LLM is unavailable

---

## 2. Proposed Solution

**Approach:**
The `coach-trade` Supabase Edge Function: (1) assembles trade + user context from the DB, (2) calls GPT-4o-mini with a structured prompt enforcing JSON output, (3) validates the response against the bias taxonomy, (4) calls a Postgres function (`record_coaching_event`) that atomically writes the `ai_coaching_events` record AND increments the relevant `behavioral_fingerprints` counter — all in a single transaction. If the LLM call fails or times out, the `BiasHeuristicClassifier` runs instead with `is_fallback: true`. The client subscribes to `ai_coaching_events` via Supabase Realtime to receive the result as soon as it is written, without polling.

**Architecture changes:**

- Add `coach-trade` Supabase Edge Function (`supabase/functions/coach-trade/index.ts`)
- Add `BiasHeuristicClassifier` module (`supabase/functions/coach-trade/heuristics.ts`)
- Add `FingerprintAggregator` module (`supabase/functions/coach-trade/aggregator.ts`)
- Add `record_coaching_event` Postgres function (atomic write — migration)
- Add `useCoachingResult` React hook (`src/hooks/useCoachingResult.ts`)
- Add `CoachPanel` component (`src/components/CoachPanel.tsx`) — renders exclusively from hook state
- Add `FingerprintChart` component (`src/components/FingerprintChart.tsx`) — Recharts radar chart

---

## 3. Technical Details & Contracts

### Data Model Changes

No new tables beyond what is defined in SDD §3. Atomicity is enforced via a dedicated Postgres function:

```sql
-- Migration: add atomic coaching event writer
CREATE OR REPLACE FUNCTION record_coaching_event(
  p_trade_id        UUID,
  p_user_id         UUID,
  p_bias_label      TEXT,
  p_confidence      NUMERIC,
  p_coach_message   TEXT,
  p_explanation     TEXT,
  p_is_fallback     BOOLEAN
) RETURNS UUID AS $$
DECLARE
  v_event_id UUID;
BEGIN
  INSERT INTO ai_coaching_events (
    trade_id, user_id, bias_label, confidence,
    coach_message, explanation, is_fallback
  )
  VALUES (
    p_trade_id, p_user_id, p_bias_label, p_confidence,
    p_coach_message, p_explanation, p_is_fallback
  )
  RETURNING id INTO v_event_id;

  UPDATE behavioral_fingerprints
  SET
    total_trades              = total_trades + 1,
    fomo_count                = fomo_count + CASE WHEN p_bias_label = 'FOMO' THEN 1 ELSE 0 END,
    loss_aversion_count       = loss_aversion_count + CASE WHEN p_bias_label = 'loss_aversion' THEN 1 ELSE 0 END,
    overconfidence_count      = overconfidence_count + CASE WHEN p_bias_label = 'overconfidence' THEN 1 ELSE 0 END,
    recency_bias_count        = recency_bias_count + CASE WHEN p_bias_label = 'recency_bias' THEN 1 ELSE 0 END,
    anchoring_count           = anchoring_count + CASE WHEN p_bias_label = 'anchoring' THEN 1 ELSE 0 END,
    disposition_effect_count  = disposition_effect_count + CASE WHEN p_bias_label = 'disposition_effect' THEN 1 ELSE 0 END,
    updated_at                = now()
  WHERE user_id = p_user_id;

  RETURN v_event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### API Changes

New Edge Function endpoint — called from the client via `@supabase/supabase-js` `.functions.invoke()`:

```typescript
// POST /functions/v1/coach-trade

interface CoachTradeRequest {
  trade_id: string;
  ticker: string;
  action: 'buy' | 'sell';
  price: number;
  quantity: number;
  portfolio_context: {
    cash_balance: number;
    positions: Array<{
      ticker: string;
      quantity: number;
      avg_cost: number;
      unrealized_pnl_pct: number;
    }>;
  };
  last_5_trades: Array<{
    ticker: string;
    action: 'buy' | 'sell';
    price: number;
    executed_at: string; // ISO8601
    bias_label: BiasLabel | null;
  }>;
  market_24h_change: number;
  user_bias_history: BehavioralFingerprint;
}

interface CoachTradeResponse {
  coaching_event_id: string;
  bias_label: BiasLabel | null;
  confidence: number;       // 0.0–1.0
  coach_message: string;    // ≤ 200 chars, plain English
  explanation: string;      // ≤ 100 chars
  is_fallback: boolean;
}

type BiasLabel =
  | 'FOMO'
  | 'loss_aversion'
  | 'overconfidence'
  | 'recency_bias'
  | 'anchoring'
  | 'disposition_effect';

// Client-side hook
interface CoachingResultState {
  status: 'idle' | 'loading' | 'received' | 'fallback' | 'error';
  result: CoachTradeResponse | null;
  tradeId: string | null;
}

// useCoachingResult(tradeId: string | null): CoachingResultState
// Subscribes to ai_coaching_events filtered by trade_id via Supabase Realtime
```

### State Management

The coaching flow state machine:

```
IDLE → TRADE_SUBMITTED → COACH_PENDING → COACH_RECEIVED
                                       → COACH_FALLBACK
                                       → COACH_ERROR
```

- `IDLE`: No pending coaching; coach panel hidden
- `TRADE_SUBMITTED`: Trade written to `trades` table; Edge Function called asynchronously; Realtime subscription opened
- `COACH_PENDING`: Panel shows loading skeleton; awaiting Realtime push
- `COACH_RECEIVED`: Coaching event written to DB; Realtime fires; panel populates with bias badge + message
- `COACH_FALLBACK`: Edge Function returned `is_fallback: true`; panel shows with `--color-warning` border + "Quick check" label
- `COACH_ERROR`: Edge Function returned 5xx AND heuristic also failed; panel shows "Coach temporarily unavailable" — no raw error message

The `useCoachingResult` hook subscribes to `ai_coaching_events` filtered by `trade_id` and exposes `{ status, result, tradeId }`. `CoachPanel` renders exclusively from this state — no direct API calls in the component.

---

## 4. Alternatives Considered

| Option | Why Rejected |
|--------|-------------|
| **Client-side LLM call (OpenAI key in browser)** | The API key would be exposed in the client bundle. Anyone could extract and abuse it. No mitigation exists without a backend-for-frontend. Non-starter. |
| **Pure rule-based heuristics, no LLM** | Rule coverage is too low for nuanced cases — anchoring vs. recency bias are indistinguishable from price data alone. LLM achieves 80%+ accuracy on hard cases where rules fail. Heuristics retained as fallback only. |
| **Async fingerprint update worker (eventual consistency)** | Risk of fingerprint drift if the worker fails — user's profile would show incorrect counts. Atomic Postgres function inside the coaching write guarantees consistency at negligible performance cost. |
| **Store fingerprint as JSONB blob** | JSONB would require application-layer aggregation on every profile read and every leaderboard "Bias Control Score" computation. Integer columns are directly queryable and sortable at the DB layer. |

---

## 5. AI / Agent Implementation Notes

**Model used:** GPT-4o-mini (`gpt-4o-mini-2024-07-18`)

**Prompt strategy:** Structured system prompt enforcing JSON output schema via `response_format: { type: "json_object" }`. System prompt defines: (1) the 6-bias taxonomy with definitions and detection heuristics, (2) coaching tone (plain English, non-judgmental, ≤ 2 sentences), (3) JSON output schema, (4) instruction to return `bias_label: null` if no clear bias is present — explicitly to avoid over-labeling neutral trades. `max_tokens: 300` enforced as a cost ceiling.

**Tool calls in this feature:** N/A — structured JSON output only.

**Edge cases specific to ML behavior:**

- First trade (no history): `bias_label` will almost always be `null` — correct behavior; handle in UI with "Building your profile" welcome framing
- Very high-confidence FOMO scenario (asset pumped 50%+ and user buys): model tends to label FOMO with high confidence; validate against rule-based check for consistency in evals
- User "testing" the AI with obviously irrational trades: coach labels bias confidently but keeps tone non-condescending per system prompt
- OpenAI 429 rate limit: Edge Function catches 429 specifically and routes to heuristic fallback with `is_fallback: true`; never surfaces the rate limit to the user

**Token budget for this feature:** ~$0.00015 per coaching call.

---

## 6. Security, Privacy & Performance

**Security surface:**

- Edge Function authenticated via Supabase service role key (env var); never client-visible
- `trade_id` validated: Edge Function verifies the trade belongs to the calling user before processing
- Prompt injection prevention: trade context is structured JSON assembled server-side, never raw user-generated text
- Idempotency: server enforces one coaching call per `trade_id`; duplicate calls return existing `coaching_event_id`

**Performance:**

- Target: coaching result in browser ≤ 2000ms p95 after trade submit
- Typical path: GPT-4o-mini ~600ms + Edge Function overhead ~100ms + Realtime push ~50ms = ~750ms typical
- Cold start: ~200ms additional on first call of the day — acceptable
- `max_tokens: 300` hard ceiling prevents runaway latency on verbose outputs

**Privacy:**

- Trade context sent to OpenAI: ticker, price, portfolio composition, last 5 trades, bias history. No PII (name, email) sent.
- OpenAI data retention: API calls excluded from model training on paid tier — confirm in OpenAI project settings before launch.
- "Disagree" flags: logged to `ai_coaching_events.flagged`; reviewed internally; never surfaced to other users.

---

## 7. Execution Plan

**Can this ship behind a feature flag?** Yes — `NEXT_PUBLIC_FLAG_COACHING_ENABLED` env var. Until flag is on, trade executes and persists normally; coach panel shows "AI coaching coming soon."

**Ticket breakdown:**

| Ticket | Description | Size |
|--------|-------------|------|
| `PTX-01` | Scaffold `coach-trade` Edge Function + env var setup + `record_coaching_event` Postgres migration | S |
| `PTX-02` | Implement `BiasHeuristicClassifier` — 6 rules, unit test coverage | M |
| `PTX-03` | Implement GPT-4o-mini call with structured JSON output + timeout handling | M |
| `PTX-04` | Implement `FingerprintAggregator` — context assembly for LLM call | S |
| `PTX-05` | Implement fallback routing (timeout >3s OR OpenAI 429/5xx → heuristic) | S |
| `PTX-06` | Build `useCoachingResult` hook + Supabase Realtime subscription | M |
| `PTX-07` | Build `CoachPanel` component (all 5 states: loading, received, fallback, error, idle) | M |
| `PTX-08` | Build `FingerprintChart` — Recharts radar, all data density states (0, 1–9, 10–49, 50+) | M |
| `PTX-09` | Unit tests: heuristics, aggregator, state machine transitions (all deps mocked) | M |
| `PTX-10` | Integration test: full trade → Edge Function → fingerprint update → Realtime → UI render | L |
| `PTX-11` | 100-trade golden eval set — run against staging, document results in `docs/eval-log.md` | M |

**Rollout order:** PTX-01 → PTX-02 + PTX-03 + PTX-04 (parallel) → PTX-05 → PTX-06 → PTX-07 → PTX-08 → PTX-09 → PTX-10 → PTX-11 → enable `FLAG_COACHING_ENABLED` in staging → QA pass → prod

---

## Self-Check

- [ ] Section 3 has exact TypeScript interface contracts — not vague descriptions
- [ ] Section 3 schema is exact DDL
- [ ] Section 4 has real rejected alternatives with genuine reasoning
- [ ] Section 5 is filled or marked N/A
- [ ] Section 7 ticket list is specific enough to act on immediately after approval
- [ ] Nothing in this RFC duplicates PRD (features) or SDD (global architecture)

---

*Next document: [QAD](qad-papertradex.md)*

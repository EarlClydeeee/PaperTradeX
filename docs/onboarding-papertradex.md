# Onboarding Strategy & Flow: Behavioral Calibration Experience

**Project:** PaperTradeX
**Date:** 2026-06-01
**Version:** 0.1
**Owner:** Founder [TBD — confirm]
**Status:** Draft
**PRD:** [prd-papertradex.md](prd-papertradex.md)
**DSD:** [dsd-papertradex.md](dsd-papertradex.md)

---

## 1. The Strategy: "First Trade in 3 Minutes"

The user is a burned, skeptical young investor who has seen too many sign-up flows ask for bank accounts and birthdays before delivering any value. PaperTradeX's onboarding never asks for financial data. Instead, it asks three lightweight questions that configure the AI coach's initial frame — then gets out of the way and lets the first trade deliver the value.

The technique is **Diagnostic Priming**: by asking the user to name their own failure mode before their first trade, we increase the salience of the AI's bias feedback when it arrives. Users who name their own weakness feel the first coaching result harder. The onboarding ends not when they land on the dashboard — it ends when the first AI coaching event fires.

---

## 2. The 3-Question Personalization Flow

### Question 1: Starting Capital Calibration

* **Prompt:** "How much paper money do you want to start with?"

* **Choice A: $10,000 — Tight constraints.**
  * *Philosophy:* User wants to simulate real-life constraints; feels like working with actual savings. Encourages more conservative position sizing.
  * *UI Impact:* Dashboard labeled "Realistic Mode" in a subtle caption.
  * *Product Impact:* AI coach context flags overconcentration more aggressively (>40% in one position triggers overconfidence detection earlier).

* **Choice B: $50,000 — Standard simulator.**
  * *Philosophy:* Wants a real trading feel without extreme constraint. Most common selection.
  * *UI Impact:* Default palette and labels.
  * *Product Impact:* Standard bias sensitivity thresholds across all 6 dimensions.

* **Choice C: $100,000 — High stakes.**
  * *Philosophy:* Wants to practice institutional-scale position sizing or is aspirational.
  * *UI Impact:* Dashboard labeled "Ambitious Mode."
  * *Product Impact:* AI coach scales overconfidence threshold upward; position sizing warnings fire at higher absolute values.

---

### Question 2: Market Focus

* **Prompt:** "What do you mostly want to trade?"

* **Choice A: US Stocks.**
  * *Logic:* Targets users with existing equity exposure or interest.
  * *Impact:* Dashboard defaults to equity watchlist (AAPL, NVDA, TSLA, MSFT); onboarding ticker examples use S&P 500 names.

* **Choice B: Crypto.**
  * *Logic:* Targets the bull-cycle audience and Gen Z crypto-native users.
  * *Impact:* Dashboard defaults to crypto watchlist (BTC, ETH, SOL); `--color-accent` (`#7B61FF`) weighted more heavily in watchlist headers; FOMO sensitivity slightly elevated in initial coaching context (crypto historically higher volatility).

* **Choice C: Both.**
  * *Logic:* Targets curious diversifiers.
  * *Impact:* Balanced dashboard showing equities and crypto side by side.

---

### Question 3: Self-Diagnosis

* **Prompt:** "Which of these sounds most like you when you invest?"
* **Input:** Single-select

  * **"I panic and sell when things drop."**
    * Maps to `loss_aversion` as the primary watch bias.
    * AI coach system prompt initialized to prioritize loss aversion pattern detection on first 10 trades.

  * **"I chase things that are already pumping."**
    * Maps to `FOMO` as the primary watch bias.
    * System prompt primed for momentum-chasing detection.

  * **"I hold losers forever hoping they come back."**
    * Maps to `disposition_effect` as the primary watch bias.

  * **"I'm pretty rational, honestly."**
    * Maps to `overconfidence` as the primary watch bias.
    * This is the most dangerous self-assessment in behavioral finance — handled with care: coaching tone remains non-judgmental but overconfidence detection threshold is lowered on early trades.

---

## 3. Onboarding Walkthrough Guide

| Step | User Interaction | Visual / Hero State | UI Palette |
| :--- | :--- | :--- | :--- |
| **0. Welcome** | App launch / sign-up complete | Dark screen, PaperTradeX wordmark centered, single tagline: "Trade fake money. Learn your real patterns." | `#0A0B0E` bg, `#00E5A0` accent on wordmark |
| **1. Capital** | Selects starting amount (3 pill options) | Dashboard silhouette ghost-renders behind the card | No palette shift; portfolio balance number ticks up to chosen amount |
| **2. Market Focus** | Selects Stocks / Crypto / Both | Watchlist panel ghost-renders in background | Crypto choice: `--color-accent` briefly intensifies in background |
| **3. Self-Diagnosis** | Selects their failure mode from 4 options | Bias icon for selected option pulses once (foreshadowing the fingerprint radar) | No palette change |
| **4. Coaching Primer** | Reads single-screen "How coaching works" card (10s max) | Coach panel silhouette shown empty → fills with an example coaching message | Light `#F8FAFC` inverted coaching panel appears for the first time |
| **5. Dashboard** | Lands on live dashboard | Full dark UI rendered; first-trade CTA prompt visible ("Search for a stock or crypto to make your first trade →") | Full dark trading UI live |

---

## 4. User Story: "The First Diagnosis"

**Persona:** Jordan, 20, college sophomore who lost 40% of his Robinhood account panic-selling during the last cycle.

**The Experience:**

1. **Opening:** Jordan sees a dead-simple dark screen with one line: *"Trade fake money. Learn your real patterns."* There is no form asking for his income or investment goals. Just three questions that take under 60 seconds.

2. **Engagement:** He picks $10,000 (tight constraints — feels real to him). He picks Crypto. He reads "I chase things that are already pumping" and feels a tiny jolt of recognition — nobody has ever *asked* him this directly before.

3. **The Hook:** The coaching primer screen shows an example coaching message: *"That looked like FOMO — BTC jumped 18% today and you bought right at the top. Classic momentum chase. Your fingerprint just updated."* Jordan reads it and thinks: "That's exactly what I do."

4. **Verification:** He makes his first trade — buys ETH because it's up 12% today. The AI coach panel slides in: "Your first trade — and it looks like FOMO. ETH is up 12% today. Buying into strong momentum is how most retail investors get caught holding the bag. Your fingerprint just got its first data point." He reads it twice.

5. **Closure:** The fingerprint radar chart appears with one spike on FOMO. One data point. He wants to trade again to see what happens next. The onboarding has ended. The product loop has begun.

---

## 5. Design Principles for Onboarding

* **No Scrolling:** Every question fits on a single screen with no vertical scroll. Maintaining single-screen focus is critical for mobile users.

* **Diagnostic, Not Data Collection:** Questions are framed as "which of these do you recognize?" — not "tell us about you." The user feels insight, not intake.

* **Immediate Value:** The user must receive their first AI coaching result before the onboarding is considered complete. The flow ends when the first coaching event fires — not when they reach the dashboard empty-handed.

* **Transitions Match DSD:** Screen-to-screen transitions use the 320ms ease-out motion spec from dsd-papertradex.md. The coaching primer panel uses the inverted `#F8FAFC` surface to foreshadow the AI coach's visual identity before the first real trade.

---

*Related documents: [PRD §4 US-05](prd-papertradex.md) | [DSD §5 Motion](dsd-papertradex.md) | [QAD H-01](qad-papertradex.md)*

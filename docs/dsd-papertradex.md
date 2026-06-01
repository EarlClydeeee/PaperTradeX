# Design System Document (DSD)

**System Name:** PaperTradeX Foundation
**Date:** 2026-06-01
**Version:** 0.1
**Owner:** Earl Clyde Bañez
**Status:** Draft
**PRD:** [prd-papertradex.md](prd-papertradex.md)

---

## 1. Design Philosophy & Vision

**Core aesthetic:** Terminal-meets-trading-floor with a Gen Z edge. Dark base, electric accent, high-contrast data — the visual language of Bloomberg Professional crossed with the dopamine mechanics of a mobile game. Typography is bold and unapologetic; numbers are the hero of every screen. Not "gamified finance" — *sport-ified finance*. This product should feel like watching your team's stats in real time.

**Emotional intent:** The user moves through three states per session: *curiosity* (what's the market doing?) → *tension* (should I pull the trigger?) → *reckoning* (what does the AI see that I missed?). Design must amplify the tension before the trade and make the reckoning feel revelatory, not scolding.

**Aesthetic references:** Linear (density + dark UI precision), Robinhood (number-forward UI, clear price hierarchy), Duolingo (milestone celebrations, unlockable content), Bloomberg Terminal (data-rich, professional credibility).

**What this system explicitly avoids:**
- Pastel "wellness finance" aesthetic — this is not a meditation app for your portfolio
- Generic stock ticker widgets that look like every other fintech clone
- Cluttered information density that overwhelms novice users
- Gamification that feels condescending (no XP bars, no coin systems) — milestones are the reward

---

## 2. Brand Primitives

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0A0B0E` | Page/screen background |
| `--color-surface` | `#13151A` | Cards, panels, trade drawer |
| `--color-border` | `#1E2028` | Dividers, input borders |
| `--color-primary` | `#00E5A0` | CTAs, active states, positive P&L |
| `--color-primary-hover` | `#00C688` | Pressed/hover state |
| `--color-accent` | `#7B61FF` | Bias alerts, AI coach highlights, fingerprint chart |
| `--color-text` | `#F0F2F5` | Body copy |
| `--color-text-inverse` | `#0A0B0E` | Copy on primary/accent backgrounds |
| `--color-text-muted` | `#6B7280` | Labels, timestamps, secondary data |
| `--color-success` | `#00E5A0` | Positive P&L, confirmed orders |
| `--color-warning` | `#F59E0B` | Bias detected — moderate confidence |
| `--color-error` | `#EF4444` | Negative P&L, high-confidence bias alert, failed orders |

**Note on inverted screens:** The AI coach panel and module unlock celebration use a near-white `#F8FAFC` background against dark text — a deliberate visual "break" from the dark UI that signals "this is the learning moment, not the trading floor."

### Typography

| Role | Font | Weight | Size | Line Height |
|------|------|--------|------|-------------|
| Heading 1 / Display | Space Grotesk | 800 | 72px | 1.0 |
| Heading 2 / Section Header | Space Grotesk | 700 | 32px | 1.1 |
| Heading 3 / Sub-header | Space Grotesk | 600 | 22px | 1.2 |
| Body | Inter | 400 | 16px | 1.5 |
| Small / Caption / Label | Inter | 500 | 13px | 1.4 |
| Stat / Number Display | Space Grotesk | 800 | 48px | 1.0 |
| Mono / Ticker / Code | JetBrains Mono | 500 | 13px | 1.5 |

**Font loading:** Google Fonts via `next/font/google`. Preload Space Grotesk 700+800 and Inter 400+500. `font-display: swap`.

### Elevation & Depth

| Level | CSS / Shadow Value | Usage |
|-------|--------------------|-------|
| `--shadow-sm` | `0 1px 4px rgba(0,0,0,0.5)` | Subtle cards, ticker rows |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.7)` | Trade drawer, floating panels |
| `--shadow-lg` | `0 8px 32px rgba(0,0,0,0.9)` | Modals, unlock celebrations |

---

## 3. Layout & Spatial System

**Base unit:** `4px` — all spacing is a multiple of this.

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `4px` | Icon-to-label gap |
| `--space-2` | `8px` | Component internal padding |
| `--space-3` | `12px` | Compact list item spacing |
| `--space-4` | `16px` | Default element spacing |
| `--space-6` | `24px` | Section gaps, card padding |
| `--space-8` | `32px` | Large section separations |
| `--space-12` | `48px` | Screen-level top/bottom padding |

**Grid:** Two-panel desktop layout — left sidebar (nav + search, 240px fixed), right content area (fluid). Horizontal padding minimum: `16px`. Content max-width: `1200px`.

**Breakpoints:**
- Mobile: `375px` (single column, bottom nav bar)
- Tablet: `768px` (sidebar collapses to icon rail)
- Desktop: `1280px` (full two-panel layout)

---

## 4. Core Component Specs

### Buttons

| Variant | Background | Text | Border | Pressed | Disabled |
|---------|-----------|------|--------|---------|----------|
| Primary (CTA) | `--color-primary` | `--color-text-inverse` | none | `--color-primary-hover` | 40% opacity |
| Danger / Sell | `--color-error` | white | none | `#C53030` | 40% opacity |
| Ghost | transparent | `--color-primary` | `1px solid --color-primary` | `--color-surface` bg | 40% opacity |
| Secondary | `--color-surface` | `--color-text` | `1px solid --color-border` | `#1A1D25` | 40% opacity |

**Border radius:** `10px`
**Padding:** `12px 24px`
**Font:** Space Grotesk 600 15px
**Minimum tap target:** `52px` height (Buy/Sell CTA: `64px`)

### Inputs & Forms

- Background: `--color-surface`
- Border: `1px solid --color-border`
- Border radius: `10px`
- Focus ring: `2px solid --color-primary`, offset `2px`
- Error state: `--color-error` border + error text below
- Padding: `14px 16px`
- Text: Inter 400 15px

### Surfaces (Cards, Modals, Panels)

- Background: `--color-surface`
- Border: `1px solid --color-border`
- Border radius: `16px`
- Shadow: `--shadow-md` for trade drawer; `--shadow-sm` for inline cards
- Modal backdrop: `rgba(0,0,0,0.80)`

### AI Coach Panel (Signature Component)

- Format: Slide-in panel from right (desktop) or bottom sheet (mobile)
- Background: `#F8FAFC` — intentional inversion from dark UI; signals "learning moment"
- Border radius: `20px` top corners only on mobile; `16px` all corners on desktop
- Contains: Bias badge (pill, `--color-accent` on `#F8FAFC`), coach message (Inter 400 16px `#1A1D25`), "Disagree" ghost button, fingerprint update indicator
- Desktop width: 360px fixed. Mobile: full width, 280px min height
- State variants:
  - `Loading` — shimmer skeleton
  - `Bias Detected` — `--color-accent` left border + badge
  - `No Bias` — `--color-primary` left border
  - `Fallback Heuristic` — `--color-warning` left border + "Quick check" label

---

## 5. Motion & Micro-interactions

**Transition default:** `all 150ms ease-in-out`

| Interaction | Duration | Easing | Notes |
|-------------|----------|--------|-------|
| Button press | `100ms` | ease-out | Scale 0.97, snap back |
| AI coach panel open | `320ms` | ease-out | Slide from right (desktop); bottom sheet (mobile) |
| AI coach panel close | `220ms` | ease-in | Reverse direction |
| Module unlock celebration | `800ms` | spring(stiffness:200, damping:20) | Scale 0 → 1.15 → 1.0 with accent flash |
| Bias badge pop-in | `400ms` | spring(damping:0.5) | Fade + scale |
| P&L number tick | `300ms` | ease-out | Counter animation on value change |
| Fingerprint radar build | `600ms` | ease-out | Path draws outward from center |
| Loading skeleton | `1.5s` | linear loop | Shimmer `--color-border` → `--color-surface` |

**Avoid:** Transitions >400ms for navigation; looping animations on idle screens; celebration animations on negative P&L events.

---

## 6. Accessibility (a11y)

- **Contrast minimum:** WCAG AA — `#F0F2F5` on `#0A0B0E` = 15.5:1 ✓; `#00E5A0` on `#0A0B0E` = 8.2:1 ✓
- **Focus indicators:** `--color-primary` 2px ring, always visible on interactive elements
- **Touch targets:** Minimum `52×52px`; Buy/Sell buttons: `64px` height
- **Keyboard navigation:** Full keyboard navigability for web; focus trap in modals and bottom sheets
- **Screen reader:** Semantic labels on all interactive elements; ARIA live regions for AI coach panel injection
- **Reduced motion:** Module unlock and fingerprint build animations wrapped in `prefers-reduced-motion` check; static fallback provided
- **Dark mode only:** Single dark mode by design; matches the trading terminal aesthetic and reduces eye strain during long sessions

---

## 7. Taste-Skill Settings

```
DESIGN_VARIANCE:    8/10   (bold, high-contrast, opinionated — not safe)
MOTION_INTENSITY:   6/10   (purposeful micro-interactions, not gratuitous)
VISUAL_DENSITY:     7/10   (data-rich but scannable; every number earns its place)
```

**Chosen variant:** `expressive`
**Reason:** The product needs to feel like a real trading environment to build credibility with young users who have seen Robinhood and Bloomberg. A minimal aesthetic would fail to convey the "serious tool" signal. Motion is purposeful — the AI coach reveal is the signature interaction and must feel revelatory. Density is managed through progressive disclosure: light view first, details on demand.

---

## 8. Anti-Pattern Register

*Populated during implementation as the team catches and fixes visual regressions or violations of this DSD.*

| Pattern | Status | Location | Fix Applied |
|---------|--------|----------|-------------|
| — | — | — | — |

---

## Self-Check

- [ ] Section 2 has exact HEX values — not "a muted blue"
- [ ] Section 3 spacing scale is consistent (all multiples of 4px base unit)
- [ ] Section 4 defines all component states including Disabled and Pressed
- [ ] Section 7 taste-skill dials are set and a variant is chosen
- [ ] WCAG AA contrast verified for primary text/background pairings
- [ ] This document exists in code as CSS variables or a config file

---

*Next document: [SDD](sdd-papertradex.md)*

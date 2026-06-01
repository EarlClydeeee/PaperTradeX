# PaperTradeX

**Trade fake money. Learn your real patterns.**

PaperTradeX is a unified crypto + stock paper trading simulator with an AI bias coach that flags emotional patterns after every trade — FOMO, panic selling, overconfidence, and more — and builds a behavioral fingerprint over time.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

---

## Features

- **Paper trading** — Buy and sell BTC, ETH, SOL, AAPL, NVDA, MSFT, TSLA, SPY with $50,000 starting cash
- **Live market data** — Crypto via CoinGecko; US stocks via Finnhub (when API key is set)
- **AI bias coach** — After every trade, get flagged for FOMO, panic sell, overconfidence, loss aversion, recency bias, anchoring, or disposition effect
- **Behavioral fingerprint** — Radar chart profile that grows with every coached trade
- **Portfolio dashboard** — P&L, trade history, performance chart
- **School leaderboards** — Rank by return %, bias control score, or module completion
- **Education center** — Learning modules with instrument unlock gates
- **Light / dark mode** — Theme toggle in sidebar and landing navbar
- **Mobile responsive** — Drawer nav, full-width trade panels, touch-friendly targets

---

## Quick start

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
git clone https://github.com/your-org/PaperTradeX.git
cd PaperTradeX
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or go straight to the simulator at [http://localhost:3000/practice](http://localhost:3000/practice).

### Environment variables

Create `.env.local` in the project root:

```env
# Optional — enables live US stock quotes (crypto works without this)
FINNHUB_API_KEY=your_finnhub_api_key

# Planned — Supabase auth + persistence (not wired yet)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Get a free Finnhub key at [finnhub.io](https://finnhub.io).

### Build

```bash
npm run build
npm start
```

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Marketing landing page |
| `/practice` | Paper trading simulator + AI coach |
| `/dashboard` | Portfolio overview and P&L chart |
| `/profile` | Behavioral fingerprint radar |
| `/leaderboard` | Class competition rankings |
| `/modules` | Education center |
| `/pitch` | Investor pitch deck |

---

## Project structure

```
PaperTradeX/
├── docs/                    # Product docs (BRD, PRD, SDD, pitch, Devpost, etc.)
├── src/
│   ├── app/
│   │   ├── (app)/           # Simulator app routes (sidebar layout)
│   │   ├── (marketing)/     # Landing + pitch pages
│   │   └── api/quote/       # Market data API route
│   ├── components/
│   │   ├── landing/         # Landing page sections
│   │   ├── AppShell.tsx     # Mobile nav + layout wrapper
│   │   ├── CoachPanel.tsx   # AI coach slide-in panel
│   │   ├── TradeDrawer.tsx  # Buy/sell drawer
│   │   └── Sidebar.tsx      # App navigation
│   ├── context/
│   │   └── PortfolioContext.tsx
│   ├── lib/
│   │   ├── coach.ts         # 7-bias detection engine
│   │   ├── portfolio-store.ts
│   │   └── market-data.ts
│   ├── styles/
│   │   └── globals.css      # Tailwind v4 theme tokens
│   └── types/
└── package.json
```

---

## How it works

1. **Trade** — Select a ticker from the watchlist, open the trade drawer, execute a buy or sell.
2. **Coach** — The AI coach panel slides in with a bias diagnosis, explanation, and psychology note.
3. **Fingerprint** — Each flagged trade adds to your behavioral profile on the Profile page.
4. **Persist** — Portfolio state saves to `localStorage` automatically between sessions.

The coach currently uses a **rule-based heuristic engine** (`src/lib/coach.ts`) with seven bias detectors. The interface is designed to swap in GPT-4o-mini via Supabase Edge Function without UI changes.

---

## Deploy on Vercel

1. Push the repo to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Add environment variables in **Settings → Environment Variables**:
   - `FINNHUB_API_KEY` — for live US stock quotes
4. Deploy. API routes run as serverless functions automatically.

`.env.local` is gitignored and does not deploy — you must set secrets in Vercel manually.

---

## Documentation

| Doc | Description |
|-----|-------------|
| [BRD](docs/brd-papertradex.md) | Business requirements |
| [PRD](docs/prd-papertradex.md) | Product requirements |
| [SDD](docs/sdd-papertradex.md) | System design |
| [DSD](docs/dsd-papertradex.md) | Design system |
| [RFC — Behavioral Fingerprint](docs/rfc-papertradex-behavioral-fingerprint.md) | Fingerprint spec |
| [GTM](docs/gtm-papertradex.md) | Go-to-market strategy |
| [Pitch](docs/pitch-papertradex.md) | Investor pitch (markdown) |
| [Devpost](docs/devpost-papertradex.md) | Hackathon submission write-up |

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Icons | Lucide React |
| Theming | next-themes |
| Market data | CoinGecko (crypto), Finnhub (stocks) |
| Hosting | Vercel |
| Backend (planned) | Supabase (Postgres, Auth, Edge Functions) |
| AI (planned) | OpenAI GPT-4o-mini |

---

## Roadmap

- [ ] Supabase Auth (email + Google OAuth)
- [ ] GPT-4o-mini coaching via Supabase Edge Function
- [ ] Weekly AI debrief
- [ ] Classroom Mode (teacher dashboard)
- [ ] Verified certificates
- [ ] Native mobile app

---

## Author

**Earl Clyde Bañez**

---

## License

MIT *(TBD — confirm)*

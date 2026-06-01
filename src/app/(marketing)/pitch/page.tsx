import Link from 'next/link';
import {
  Brain,
  TrendingUp,
  Users,
  Zap,
  LineChart,
  BookOpen,
  Target,
  DollarSign,
  Play,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Globe,
  Lock,
} from 'lucide-react';
import { SIMULATION_URL } from '@/lib/constants';

export const metadata = {
  title: 'Investor Pitch — PaperTradeX',
  description: 'PaperTradeX investor pitch deck. The first AI-coached paper trading simulator that builds your behavioral fingerprint.',
};

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '71%', label: 'Retail investors underperform index funds', source: 'DALBAR 2023' },
  { value: '$3,200', label: 'Average first-year investor loss', source: 'DALBAR 2023' },
  { value: '19', label: 'Median age of first investment (Gen Z)', source: 'Schwab 2024' },
  { value: '23', label: 'States with personal finance education mandate', source: '2026' },
];

const PROBLEMS = [
  {
    icon: <AlertTriangle className="w-6 h-6 text-error" />,
    title: 'Simulators teach mechanics, not behavior',
    body: 'Webull, Thinkorswim paper, and Investopedia all replicate the trading interface. None of them explain why you keep panic-selling even after you know you shouldn\'t.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-warning" />,
    title: 'Zero feedback on emotional patterns',
    body: 'Users graduate from simulators to real accounts having practiced the same bad habits at zero cost and zero correction. The feedback loop is missing.',
  },
  {
    icon: <AlertTriangle className="w-6 h-6 text-accent" />,
    title: 'Teachers have no modern tool',
    body: '23 states mandate personal finance education. Every existing simulator is either Thinkorswim-complex or Excel-trivial. No leaderboard. No behavioral outcomes. No engagement.',
  },
];

const SOLUTIONS = [
  {
    icon: <Brain className="w-6 h-6 text-accent" />,
    title: 'AI Bias Coach',
    body: 'After every trade: detect FOMO, panic sell, overconfidence, loss aversion, anchoring, disposition effect — in plain-English psychology, not jargon. Costs < $0.01 per trade.',
  },
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: 'Behavioral Fingerprint',
    body: 'Every trade builds an accumulating bias profile unique to the user. The longer you trade, the more accurate it gets. Leave the platform and you start over. That\'s the moat.',
  },
  {
    icon: <LineChart className="w-6 h-6 text-primary" />,
    title: 'Unified Crypto + Stock Simulator',
    body: 'One portfolio, one cash balance, live market prices for BTC/ETH/SOL + S&P 500 names. No switching between apps. Exactly how real portfolios work.',
  },
  {
    icon: <Users className="w-6 h-6 text-accent" />,
    title: 'School Leaderboards + Education Gates',
    body: 'Teachers set competition windows, project leaderboards in class, assign modules. Advanced instruments (options, altcoins) stay locked until education is completed.',
  },
];

const MARKET = [
  { label: 'TAM', value: '$4.1B', sub: 'Financial education software market (2025)' },
  { label: 'SAM', value: '$480M', sub: 'Gen Z self-directed investing tools (US)' },
  { label: 'SOM', value: '$24M', sub: 'Target 5-year ARR at 300K paying users' },
];

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    features: ['AI bias coach every trade', 'Unified crypto + stock sim', 'Basic fingerprint', 'School leaderboard (student)', 'Core education modules'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$7.99/mo',
    sub: 'or $59.99/yr',
    features: ['Everything in Free', 'Weekly AI debrief + trade replay', 'Full fingerprint history', 'All modules + instrument unlocks', 'Shareable bias card'],
    highlight: true,
    note: 'Less than one bad trade.',
  },
  {
    name: 'School',
    price: '$199/yr',
    sub: 'per school',
    features: ['Everything in Pro (per student)', 'Teacher dashboard', 'Competition windows', 'Scenario assignments (2008 crash…)', 'Grade export + bulk onboarding', 'Certificates'],
    highlight: false,
  },
];

const METRICS = [
  { label: 'Registered users (30 days)', target: '10,000' },
  { label: 'D7 retention', target: '≥ 35%' },
  { label: 'D30 retention', target: '≥ 22%' },
  { label: 'Trades per active user / week', target: '≥ 5' },
  { label: 'AI coach read rate (>3s)', target: '≥ 60%' },
  { label: 'Pro conversion (day 30)', target: '≥ 3%' },
  { label: 'B2B school pilots (90 days)', target: '3 signed' },
  { label: 'Product Hunt ranking', target: 'Top 5' },
];

const TEAM_PLACEHOLDER = [
  { role: 'Founder & CEO', description: 'Product strategy, AI coaching architecture, go-to-market' },
  { role: 'Advisor — Behavioral Finance', description: '[TBD] Academic credibility for bias taxonomy and methodology' },
  { role: 'Advisor — Ed-Tech Distribution', description: '[TBD] School district procurement channel expertise' },
];

// ─── Components ──────────────────────────────────────────────────────────────

function SlideLabel({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-xs text-text-muted border border-border rounded px-2 py-0.5">
        {number}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest text-text-muted">{label}</span>
    </div>
  );
}

function SectionDivider() {
  return <div className="h-px bg-border w-full my-4" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-bg text-text font-sans">

      {/* ── Top nav ─────────────────────────────────── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-bg/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-lg text-primary hover:opacity-80 transition-opacity duration-200">
            PaperTradeX
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-text-muted border border-border rounded px-2.5 py-1">
              Investor Deck
            </span>
            <Link
              href={SIMULATION_URL}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-radius-button bg-primary px-4 py-2 text-sm font-bold text-text-inverse transition-colors duration-200 hover:bg-primary-hover"
            >
              <Play className="h-3.5 w-3.5" />
              Try Demo
            </Link>
          </div>
        </div>
      </header>

      <main className="pt-14">

        {/* ── 01 Cover ──────────────────────────────── */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary mb-8">
              <Zap className="h-3 w-3" />
              Series Seed · 2026
            </div>
            <h1 className="font-display text-5xl sm:text-7xl font-extrabold leading-none tracking-tight mb-6">
              Trade fake money.
              <br />
              <span className="text-primary">Learn your real patterns.</span>
            </h1>
            <p className="text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              PaperTradeX is the first paper trading simulator where AI watches every decision and builds your behavioral fingerprint — a personal map of the biases costing you real money.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={SIMULATION_URL}
                className="inline-flex cursor-pointer items-center gap-2 rounded-radius-button bg-primary px-8 py-4 text-lg font-bold text-text-inverse shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-primary-hover w-full sm:w-auto justify-center"
              >
                <Play className="h-5 w-5" />
                Live Demo
              </Link>
              <a
                href="#problem"
                className="inline-flex cursor-pointer items-center gap-2 rounded-radius-button border border-border bg-surface px-8 py-4 text-lg font-bold text-text transition-colors duration-200 hover:border-primary/40 w-full sm:w-auto justify-center"
              >
                View Deck
                <ArrowRight className="h-5 w-5 text-primary" />
              </a>
            </div>
          </div>
        </section>

        {/* ── 02 Stats ──────────────────────────────── */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {STATS.map((s) => (
              <div key={s.label} className="bg-surface p-8 text-center">
                <div className="font-display text-5xl font-extrabold text-primary mb-2 tabular-nums">
                  {s.value}
                </div>
                <div className="text-sm text-text-muted leading-snug mb-1">{s.label}</div>
                <div className="text-[11px] font-bold text-text-muted/50 uppercase tracking-widest">
                  {s.source}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 Problem ──────────────────────────── */}
        <section id="problem" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SlideLabel number="01" label="The Problem" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Every simulator teaches{' '}
              <span className="text-text-muted line-through">mechanics</span>.
              <br />
              None teach <span className="text-error">behavior</span>.
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mb-12 leading-relaxed">
              71% of retail investors underperform the index — not because they lack information, but because emotional decision-making overrides their research at every inflection point.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PROBLEMS.map((p) => (
                <div key={p.title} className="bg-surface border border-border rounded-radius-card p-6 space-y-3">
                  <div className="p-2.5 bg-bg rounded-lg w-fit border border-border">{p.icon}</div>
                  <h3 className="font-display font-bold text-lg leading-snug">{p.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 04 Solution ─────────────────────────── */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SlideLabel number="02" label="The Solution" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              AI that watches <span className="text-primary">every decision</span>.
            </h2>
            <p className="text-text-muted text-lg max-w-2xl mb-12 leading-relaxed">
              After every trade, PaperTradeX runs behavioral analysis and surfaces the specific cognitive bias at work — in plain English. The result accumulates into a fingerprint that grows more accurate with every trade.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {SOLUTIONS.map((s) => (
                <div key={s.title} className="bg-bg border border-border rounded-radius-card p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-surface rounded-lg border border-border">{s.icon}</div>
                    <h3 className="font-display font-bold text-lg">{s.title}</h3>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>

            {/* Coach panel demo mockup */}
            <div className="mt-10 p-6 bg-bg border border-primary/20 rounded-radius-card max-w-sm shadow-lg shadow-primary/5">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-accent" />
                <span className="font-display font-bold text-sm">AI Coach — Live example</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-warning/30 bg-warning/10 text-warning mb-3">
                <AlertTriangle className="w-3 h-3" />
                FOMO Detected
              </div>
              <p className="text-sm text-text leading-relaxed italic mb-3">
                &ldquo;You&apos;re buying NVDA after a 23% rally. Your brain is screaming &apos;don&apos;t miss out&apos; — but history says this is where the dump starts.&rdquo;
              </p>
              <p className="text-xs text-text-muted leading-relaxed">
                Buying into a parabolic move is a classic FOMO signature. You are overweighting recent price action while ignoring mean-reversion risk.
              </p>
            </div>
          </div>
        </section>

        {/* ── 05 Moat ─────────────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SlideLabel number="03" label="The Moat" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              The fingerprint is the <span className="text-primary">switching cost</span>.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="space-y-5">
                <p className="text-text-muted text-lg leading-relaxed">
                  Every trade you make on PaperTradeX adds a data point to your behavioral fingerprint. After 50 trades, you have a personalized map of every cognitive bias that has affected your decisions — timestamped, quantified, contextualized.
                </p>
                <p className="text-text-muted text-lg leading-relaxed">
                  <strong className="text-text">Leave the platform and you start from zero.</strong> That is not a lock-in trick — it is the nature of behavioral data. Your fingerprint lives in your history.
                </p>
                <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-radius-card">
                  <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-text-muted leading-relaxed">
                    <strong className="text-primary">Data moat:</strong> 50+ trades of history creates a profile no competitor can replicate without matching our time-in-product. This is accumulating, compounding retention.
                  </p>
                </div>
              </div>
              <div className="bg-surface border border-border rounded-radius-card p-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">Your Behavioral Fingerprint</h4>
                {[
                  { bias: 'FOMO', count: 8, pct: 85 },
                  { bias: 'Loss Aversion', count: 5, pct: 60 },
                  { bias: 'Overconfidence', count: 3, pct: 40 },
                  { bias: 'Recency Bias', count: 6, pct: 70 },
                  { bias: 'Anchoring', count: 2, pct: 30 },
                  { bias: 'Disposition Effect', count: 4, pct: 50 },
                ].map((b) => (
                  <div key={b.bias}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-text">{b.bias}</span>
                      <span className="text-text-muted tabular-nums">{b.count} trades</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${b.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 06 Market ────────────────────────────── */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SlideLabel number="04" label="Market Size" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-12">
              Two converging markets.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {MARKET.map((m) => (
                <div key={m.label} className="bg-bg border border-border rounded-radius-card p-8 text-center">
                  <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">{m.label}</div>
                  <div className="font-display text-5xl font-extrabold text-primary mb-2 tabular-nums">{m.value}</div>
                  <div className="text-sm text-text-muted">{m.sub}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-bg border border-border rounded-radius-card p-6 space-y-2">
                <Globe className="w-6 h-6 text-primary" />
                <h3 className="font-display font-bold text-xl">B2C — The Burned Beginner</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  23M Gen Z first-time investors in the US. Median first investment age: 19. 70%+ have experienced significant losses. Curiosity peaks during every bull cycle — and the next one is building now.
                </p>
              </div>
              <div className="bg-bg border border-border rounded-radius-card p-6 space-y-2">
                <BookOpen className="w-6 h-6 text-accent" />
                <h3 className="font-display font-bold text-xl">B2B — School Districts</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  23 US states mandate personal finance education. Zero modern incumbents. Each school contract at $199/yr brings 20–200 students and is structurally high-retention. No district approval needed at that price point.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 07 Business Model ────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SlideLabel number="05" label="Business Model" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-12">
              Freemium + B2B.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {TIERS.map((t) => (
                <div
                  key={t.name}
                  className={`rounded-radius-card border p-7 space-y-5 relative ${
                    t.highlight
                      ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                      : 'border-border bg-surface'
                  }`}
                >
                  {t.highlight && (
                    <div className="absolute -top-3 left-6 px-3 py-0.5 bg-primary text-text-inverse text-[11px] font-bold rounded-full uppercase tracking-widest">
                      Primary driver
                    </div>
                  )}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-1">{t.name}</div>
                    <div className="font-display text-3xl font-extrabold tabular-nums">{t.price}</div>
                    {t.sub && <div className="text-xs text-text-muted mt-0.5">{t.sub}</div>}
                    {t.note && (
                      <div className="text-xs text-primary font-medium mt-1 italic">{t.note}</div>
                    )}
                  </div>
                  <SectionDivider />
                  <ul className="space-y-2">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-text-muted">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { label: 'AI cost per trade', value: '< $0.01', note: 'GPT-4o-mini at scale' },
                { label: 'Target AI cost / user / day', value: '< $0.02', note: 'at 50K MAU' },
                { label: 'Break-even Pro users', value: '~1,200', note: 'to cover infra + AI at $7.99/mo' },
              ].map((u) => (
                <div key={u.label} className="bg-surface border border-border rounded-radius-card p-5">
                  <div className="font-display text-2xl font-bold text-primary tabular-nums">{u.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-text-muted mt-1">{u.label}</div>
                  <div className="text-xs text-text-muted mt-0.5">{u.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 08 Traction / Metrics ────────────────── */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SlideLabel number="06" label="Target Metrics" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Measurable from day one.
            </h2>
            <p className="text-text-muted text-lg mb-10 max-w-xl leading-relaxed">
              All targets are 30-day post-launch. Behavioral retention (D30 ≥ 22%) is the leading indicator — users who have 10+ trades in their fingerprint churn at half the rate.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {METRICS.map((m) => (
                <div key={m.label} className="bg-bg border border-border rounded-radius-card p-5">
                  <div className="font-display text-2xl font-bold text-primary tabular-nums mb-1">
                    {m.target}
                  </div>
                  <div className="text-xs text-text-muted leading-relaxed">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 09 Roadmap ───────────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SlideLabel number="07" label="Roadmap" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-12">
              12-week ship plan.
            </h2>
            <div className="space-y-0 relative">
              <div className="absolute left-[19px] top-6 bottom-6 w-px bg-border hidden sm:block" />
              {[
                { week: 'W1–W4', phase: 'Alpha', label: 'Private', items: ['Next.js + Supabase scaffold', 'AI coaching end-to-end', 'Onboarding flow', 'Core education modules'] },
                { week: 'W5–W8', phase: 'Beta', label: 'Invite-only', items: ['School leaderboards', 'Trade replay + AI debrief', 'Behavioral fingerprint radar', 'Mobile responsive polish'] },
                { week: 'W9–W10', phase: 'Pre-launch', label: 'GTM prep', items: ['Product Hunt assets', 'Reddit + TikTok content', 'Teacher outreach emails', 'QA + release criteria'] },
                { week: 'W11–W12', phase: 'Launch', label: 'Public', items: ['Product Hunt launch', 'Reddit posts (4 subs)', 'TikTok / Reels drop', 'First B2B school outreach'] },
              ].map((row, i) => (
                <div key={row.phase} className="flex gap-6 items-start pb-8">
                  <div className="relative shrink-0 flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border ${
                      i === 3 ? 'bg-primary border-primary text-text-inverse' : 'bg-surface border-border text-text-muted'
                    }`}>
                      {i + 1}
                    </div>
                  </div>
                  <div className="flex-1 bg-surface border border-border rounded-radius-card p-5">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-text-muted">{row.week}</span>
                      <span className="font-display font-bold text-lg">{row.phase}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/10 rounded-full px-2.5 py-0.5">
                        {row.label}
                      </span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {row.items.map((it) => (
                        <li key={it} className="flex items-center gap-2 text-sm text-text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 10 Team ──────────────────────────────── */}
        <section className="border-b border-border bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SlideLabel number="08" label="Team" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-12">
              Founder-led. Lean on purpose.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {TEAM_PLACEHOLDER.map((t) => (
                <div key={t.role} className="bg-bg border border-border rounded-radius-card p-6 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base">{t.role}</div>
                    <p className="text-sm text-text-muted mt-1 leading-relaxed">{t.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11 The Ask ───────────────────────────── */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <SlideLabel number="09" label="The Ask" />
            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              Seed round.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-5">
                <div className="bg-surface border border-primary/20 rounded-radius-card p-7">
                  <div className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">Round size</div>
                  <div className="font-display text-5xl font-extrabold text-primary mb-1">$[TBD]</div>
                  <div className="text-text-muted text-sm">Pre-money valuation: $[TBD]</div>
                </div>
                <div className="bg-surface border border-border rounded-radius-card p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">Use of funds</h4>
                  {[
                    { label: 'Product & engineering (12 months runway)', pct: 55 },
                    { label: 'GTM — content, influencer, community', pct: 25 },
                    { label: 'B2B school sales + onboarding', pct: 15 },
                    { label: 'Legal, infra, operations', pct: 5 },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-text-muted">{f.label}</span>
                        <span className="font-bold text-text tabular-nums">{f.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${f.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-display font-bold text-2xl">Why now</h3>
                <ul className="space-y-4">
                  {[
                    { icon: <TrendingUp className="w-5 h-5 text-primary" />, text: 'Next crypto bull cycle building — Gen Z curiosity at an inflection point, top-of-funnel opens naturally.' },
                    { icon: <Zap className="w-5 h-5 text-accent" />, text: 'AI coaching is now < $0.01 per trade — the first time behavioral coaching is economically viable at the individual trade level.' },
                    { icon: <BookOpen className="w-5 h-5 text-warning" />, text: '23 state mandates create a direct school procurement channel with zero modern incumbents.' },
                    { icon: <BarChart3 className="w-5 h-5 text-primary" />, text: 'Behavioral fingerprint = compounding data moat. Every trade makes the product more valuable to that user and harder to abandon.' },
                  ].map((w, i) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-surface border border-border rounded-radius-card">
                      <div className="p-1.5 bg-bg rounded-lg border border-border shrink-0">{w.icon}</div>
                      <p className="text-sm text-text-muted leading-relaxed">{w.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 12 CTA ───────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="relative mx-auto max-w-4xl px-6 py-28 text-center">
            <h2 className="font-display text-4xl sm:text-6xl font-extrabold mb-6">
              Ready to see it live?
            </h2>
            <p className="text-text-muted text-xl mb-10 max-w-xl mx-auto leading-relaxed">
              The demo is running. Execute a trade and watch the AI coach flag your bias in real time.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={SIMULATION_URL}
                className="inline-flex cursor-pointer items-center gap-2 rounded-radius-button bg-primary px-8 py-5 text-xl font-bold text-text-inverse shadow-xl shadow-primary/25 transition-colors duration-200 hover:bg-primary-hover w-full sm:w-auto justify-center"
              >
                <Play className="h-6 w-6" />
                Open Live Demo
              </Link>
              <a
                href="mailto:founder@papertradex.com"
                className="inline-flex cursor-pointer items-center gap-2 rounded-radius-button border border-border bg-surface px-8 py-5 text-xl font-bold text-text transition-colors duration-200 hover:border-primary/40 w-full sm:w-auto justify-center"
              >
                <DollarSign className="h-6 w-6 text-primary" />
                Contact Founder
              </a>
            </div>
            <p className="mt-8 text-sm text-text-muted">
              Earl Clyde Bañez · PaperTradeX · 2026
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

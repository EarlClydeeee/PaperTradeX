import Link from 'next/link';
import {
  Play,
  TrendingUp,
  Brain,
  Lock,
  School,
  BarChart3,
  GraduationCap,
} from 'lucide-react';
import { SIMULATION_URL } from '@/lib/constants';

export default function HowItWorksSection() {
  const features = [
    {
      icon: <TrendingUp className="text-primary" />,
      title: 'One Portfolio. Stocks + Crypto.',
      body: 'Paper trade BTC, ETH, SOL and S&P 500 names with live data — one cash balance, one P&L. No switching apps. No split portfolios.',
    },
    {
      icon: <Brain className="text-primary" />,
      title: 'Coach After Every Trade',
      body: 'FOMO, panic sell, overconfidence — flagged instantly with plain-English psychology. Weekly game-tape debriefs show what you did wrong with your actual trade data.',
    },
    {
      icon: <Lock className="text-primary" />,
      title: 'Learn Before You Leverage',
      body: 'Want options or altcoins? Complete DeFi, blockchain, and risk modules first. No skipping straight to the dangerous stuff.',
    },
    {
      icon: <School className="text-primary" />,
      title: 'Compete in Class',
      body: 'Rank by return %, risk-adjusted score, or module completion. Teachers set the competition window.',
    },
    {
      icon: <BarChart3 className="text-primary" />,
      title: 'Built for Teachers',
      body: 'Class averages, crash/boom scenarios, exportable grades — finance class that actually sticks.',
    },
    {
      icon: <GraduationCap className="text-primary" />,
      title: 'Verified Certificates',
      body: 'Shareable credentials for college apps and LinkedIn — verified completion of the advanced simulation track.',
    },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16 text-center">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
          The Solution
        </span>
        <h2 className="mb-6 font-display text-4xl font-extrabold text-text md:text-5xl">
          One platform that learns how you trade — not just what you trade.
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-text-muted">
          Make trades with real live prices. Get coaching on every single one.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <div
            key={i}
            className="rounded-radius-card border border-border border-t-2 border-t-primary bg-surface p-8 shadow-sm transition-colors duration-200 hover:border-accent/60"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-bg">
              {feature.icon}
            </div>
            <h3 className="mb-4 font-display text-xl font-bold text-text">{feature.title}</h3>
            <p className="leading-relaxed text-text-muted">{feature.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href={SIMULATION_URL}
          className="inline-flex cursor-pointer items-center gap-2 rounded-radius-button bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-text-inverse transition-colors duration-200 hover:bg-primary-hover"
        >
          <Play className="h-4 w-4" aria-hidden />
          Try the simulator now
        </Link>
      </div>
    </section>
  );
}

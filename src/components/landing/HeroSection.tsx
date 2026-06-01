import Link from 'next/link';
import { ArrowDown, LineChart, Play, Zap } from 'lucide-react';
import { SIMULATION_URL } from '@/lib/constants';

export default function HeroSection() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 pb-20 pt-28 md:px-12 lg:flex-row lg:pt-32">
      <div className="flex-1 text-center lg:text-left">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
          <Zap className="h-3 w-3" aria-hidden />
          AI-coached paper trading
        </div>

        <h1 className="mb-6 font-display text-5xl font-extrabold leading-tight text-text md:text-7xl">
          Trade fake money.
          <br />
          <span className="text-primary">Learn your real patterns.</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-text-muted md:text-xl lg:mx-0">
          PaperTradeX is the first paper trading simulator where AI watches every decision and
          builds your behavioral fingerprint — a personal map of the biases that are costing you
          real money.
        </p>

        <div className="mb-4 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
          <Link
            href={SIMULATION_URL}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-radius-button bg-primary px-8 py-4 text-lg font-bold text-text-inverse shadow-lg shadow-primary/20 transition-colors duration-200 hover:bg-primary-hover sm:w-auto"
          >
            <Play className="h-5 w-5" aria-hidden />
            Open Simulator
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-radius-button border border-border bg-surface px-8 py-4 text-lg font-bold text-text transition-colors duration-200 hover:border-primary/40 hover:bg-bg sm:w-auto"
          >
            See how it works
            <ArrowDown className="h-5 w-5 text-primary" aria-hidden />
          </Link>
        </div>

        <p className="text-sm text-text-muted">Free forever · No credit card · No real money</p>
      </div>

      <div className="w-full max-w-2xl flex-1">
        <Link
          href={SIMULATION_URL}
          className="group relative flex aspect-video cursor-pointer flex-col items-center justify-center overflow-hidden rounded-radius-card border border-border bg-surface shadow-lg transition-colors duration-200 hover:border-primary/50"
          aria-label="Open the PaperTradeX trading simulator"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-60" />
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-border bg-bg/80 px-3 py-1 text-xs font-medium text-text-muted backdrop-blur-sm">
            <span className="live-dot" aria-hidden />
            Live preview
          </div>

          <div className="relative z-10 flex flex-col items-center p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/15 transition-colors duration-200 group-hover:border-primary/50 group-hover:bg-primary/20">
              <LineChart className="h-8 w-8 text-primary" aria-hidden />
            </div>
            <p className="text-lg font-bold text-text">Practice Trading Floor</p>
            <p className="mt-1 max-w-xs text-sm text-text-muted">
              Paper money, live prices, AI coaching after every trade.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary transition-colors duration-200 group-hover:text-primary-hover">
              Launch simulation
              <Play className="h-4 w-4" aria-hidden />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

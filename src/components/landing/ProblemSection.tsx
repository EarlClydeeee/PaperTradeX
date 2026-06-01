import { AlertCircle, Rocket, Infinity as InfinityIcon } from 'lucide-react';

export default function ProblemSection() {
  const cards = [
    {
      icon: <AlertCircle className="text-error" />,
      label: 'Panic Selling',
      caption: 'You sell the dip. The dip recovers. You miss it.',
    },
    {
      icon: <Rocket className="text-accent" />,
      label: 'FOMO Chasing',
      caption: 'You buy the top. Every time.',
    },
    {
      icon: <InfinityIcon className="text-text-muted" />,
      label: 'Holding Losers',
      caption: 'You sell winners in 2 days and hold losers for 6 months.',
    },
  ];

  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
          The Problem
        </span>
        <h2 className="mb-8 font-display text-4xl font-extrabold text-text md:text-5xl">
          71% of retail investors underperform index funds.
          <br />
          <span className="text-error">It&apos;s not the market. It&apos;s you.</span>
        </h2>
        <p className="mb-12 text-lg leading-relaxed text-text/80">
          The average first-year investor loses $3,200. Not because they picked bad companies —
          because they panic-sold, chased pumps, and revenge-traded after losses.
          <br />
          <br />
          Every paper trading app on the market lets you practice those same mistakes with fake
          money, then sends you back to your real account with the same bad habits. No coaching.
          No feedback. No self-knowledge.
        </p>

        <div className="grid grid-cols-1 gap-6 text-left md:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-radius-card border-l-4 border-l-error bg-bg p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface">
                {card.icon}
              </div>
              <div>
                <h3 className="mb-1 font-display text-lg font-bold text-text">{card.label}</h3>
                <p className="text-sm text-text-muted">{card.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

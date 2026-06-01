export default function FingerprintEvolutionSection() {
  const states = [
    { label: 'Day 1', desc: 'Empty radar', fill: 20 },
    { label: '20 Trades', desc: 'Pattern emerging', fill: 40 },
    { label: '100+ Trades', desc: 'Full fingerprint', fill: 60 },
  ];

  return (
    <section className="mx-auto max-w-7xl overflow-hidden px-6 py-24">
      <div className="flex flex-col items-center gap-16 lg:flex-row">
        <div className="flex-1">
          <h2 className="mb-8 font-display text-4xl font-extrabold text-text md:text-5xl">
            Your fingerprint grows with every trade.
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-text-muted">
            The more you practice, the more the AI knows about you. A profile built across 100
            trades is more valuable than any course, book, or YouTube video — because it is
            specifically about you.
          </p>
          <p className="font-display text-sm font-bold uppercase tracking-wider text-primary">
            The longer you use it, the more it knows. That&apos;s the moat.
          </p>
        </div>

        <div className="flex w-full flex-1 flex-col items-end justify-center gap-4 sm:flex-row">
          {states.map((state, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-4">
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-radius-card border border-border bg-surface transition-colors duration-200 hover:border-primary/40">
                <div
                  className="rounded-full border-2 border-dashed border-primary/25"
                  style={{ width: `${state.fill + 20}%`, height: `${state.fill + 20}%` }}
                  aria-hidden
                />
                <div
                  className="absolute rounded-full bg-primary/30 shadow-[0_0_20px_rgba(0,229,160,0.35)] transition-all duration-700"
                  style={{ width: `${state.fill}%`, height: `${state.fill}%` }}
                  aria-hidden
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-text">{state.desc}</p>
                <p className="text-sm text-text-muted">{state.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

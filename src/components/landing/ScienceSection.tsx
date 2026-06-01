export default function ScienceSection() {
  const blocks = [
    {
      title: 'Availability Bias',
      body: "The human brain weights recent events 3× more heavily than historical base rates. That's why crypto FOMO feels rational — your brain is wired for it. PaperTradeX makes the pattern visible before it costs you.",
    },
    {
      title: 'Deliberate Practice',
      body: 'Zero-consequence practice with immediate feedback is the only evidence-backed method for building new decision-making habits (Ericsson, 1993). PaperTradeX delivers coaching feedback on every single trade.',
    },
    {
      title: 'Behavioral Fingerprinting',
      body: 'No two investors lose money the same way. Your specific bias pattern — identified across 10, 50, 200 trades — is more predictive of your future losses than your knowledge of any individual company.',
    },
  ];

  return (
    <section className="bg-surface px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-primary">
            The Science
          </span>
          <h2 className="mb-6 font-display text-4xl font-extrabold text-text md:text-5xl">
            Behavioral finance, not financial advice.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {blocks.map((block, i) => (
            <div
              key={i}
              className="relative flex flex-col gap-4 md:after:absolute md:after:bottom-0 md:after:right-[-1.5rem] md:after:top-0 md:after:w-px md:after:bg-border md:after:content-[''] last:after:hidden"
            >
              <h3 className="font-display text-xl font-bold text-primary">{block.title}</h3>
              <p className="leading-relaxed text-text-muted">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

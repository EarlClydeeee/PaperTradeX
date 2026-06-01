import Link from 'next/link';
import { Play } from 'lucide-react';
import { SIMULATION_URL } from '@/lib/constants';

export default function CtaSection() {
  return (
    <section id="cta" className="bg-primary px-6 py-24 text-center">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 font-display text-5xl font-extrabold leading-tight text-text-inverse md:text-6xl">
          Stop practicing your mistakes.
          <br />
          Start knowing your patterns.
        </h2>

        <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={SIMULATION_URL}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-radius-button bg-text-inverse px-10 py-5 text-xl font-extrabold text-primary transition-colors duration-200 hover:bg-bg sm:w-auto"
          >
            <Play className="h-5 w-5" aria-hidden />
            Open Simulator
          </Link>
          <Link
            href="#how-it-works"
            className="inline-flex w-full cursor-pointer items-center justify-center rounded-radius-button border-2 border-text-inverse px-10 py-5 text-xl font-extrabold text-text-inverse transition-colors duration-200 hover:bg-text-inverse/10 sm:w-auto"
          >
            Learn more
          </Link>
        </div>

        <p className="font-medium text-text-inverse/70">
          No real money · No credit card · Works in your browser
        </p>
      </div>
    </section>
  );
}

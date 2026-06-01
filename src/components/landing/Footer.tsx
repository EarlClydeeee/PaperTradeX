import Link from 'next/link';
import { SIMULATION_URL } from '@/lib/constants';

export default function LandingFooter() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 border-t border-border px-6 py-12 md:flex-row md:px-12">
      <div className="font-display text-xl font-bold text-primary">PaperTradeX</div>

      <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-text-muted">
        <Link
          href={SIMULATION_URL}
          className="cursor-pointer transition-colors duration-200 hover:text-primary"
        >
          Open Simulator
        </Link>
        <Link href="/modules" className="cursor-pointer transition-colors duration-200 hover:text-primary">
          Education
        </Link>
        <a href="#" className="cursor-pointer transition-colors duration-200 hover:text-primary">
          Privacy Policy
        </a>
        <a
          href="https://github.com"
          className="cursor-pointer transition-colors duration-200 hover:text-primary"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>

      <div className="text-sm text-text-muted">© 2026 PaperTradeX. All rights reserved.</div>
    </footer>
  );
}

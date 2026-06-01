import Link from 'next/link';
import { Play } from 'lucide-react';
import { SIMULATION_URL } from '@/lib/constants';
import ThemeToggle from '@/components/ThemeToggle';

export default function LandingNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 md:px-6">
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between rounded-2xl border border-border bg-bg/90 px-4 backdrop-blur-md md:px-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-primary transition-colors duration-200 hover:opacity-90"
        >
          PaperTradeX
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="#how-it-works"
            className="hidden cursor-pointer rounded-radius-button px-3 py-2 text-sm font-medium text-text-muted transition-colors duration-200 hover:text-text sm:inline-flex"
          >
            How it works
          </Link>
          <ThemeToggle />
          <Link
            href={SIMULATION_URL}
            className="inline-flex cursor-pointer items-center gap-2 rounded-radius-button bg-primary px-3 py-2 sm:px-5 text-sm font-bold text-text-inverse transition-colors duration-200 hover:bg-primary-hover min-h-[44px]"
          >
            <Play className="h-4 w-4" aria-hidden />
            <span className="sm:hidden">Simulator</span>
            <span className="hidden sm:inline">Open Simulator</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

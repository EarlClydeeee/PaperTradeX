import Link from 'next/link';
import { Play } from 'lucide-react';
import { SIMULATION_URL } from '@/lib/constants';

export default function SimulatorFab() {
  return (
    <Link
      href={SIMULATION_URL}
      className="fixed bottom-6 right-6 z-50 inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/30 bg-primary px-5 py-3 text-sm font-bold text-text-inverse shadow-lg shadow-primary/25 transition-colors duration-200 hover:bg-primary-hover md:hidden"
      aria-label="Open trading simulator"
    >
      <Play className="h-4 w-4" aria-hidden />
      Simulator
    </Link>
  );
}

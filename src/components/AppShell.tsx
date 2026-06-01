'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import ThemeToggle from '@/components/ThemeToggle';

const PAGE_TITLES: Record<string, string> = {
  '/practice': 'Practice',
  '/dashboard': 'Dashboard',
  '/profile': 'Fingerprint',
  '/leaderboard': 'Leaderboard',
  '/modules': 'Education',
  '/settings': 'Settings',
};

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const pageTitle = PAGE_TITLES[pathname] ?? 'PaperTradeX';

  return (
    <>
      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-30 h-14 border-b border-border bg-surface/95 backdrop-blur-md">
        <div className="flex h-full items-center justify-between px-4">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="cursor-pointer flex items-center justify-center w-10 h-10 -ml-1 rounded-radius-button text-text hover:bg-bg transition-colors duration-200"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <Menu className="w-5 h-5" />
          </button>

          <span className="font-display font-bold text-sm text-text truncate px-2">
            {pageTitle}
          </span>

          <ThemeToggle />
        </div>
      </header>

      {/* Mobile nav backdrop */}
      {menuOpen && (
        <button
          type="button"
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] cursor-pointer"
          aria-label="Close navigation menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <Sidebar mobileOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <main className="min-h-screen pt-14 lg:pt-0 lg:ml-[240px] overflow-x-hidden">
        {children}
      </main>
    </>
  );
}

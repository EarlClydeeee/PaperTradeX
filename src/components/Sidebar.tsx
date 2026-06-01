'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Users,
  BookOpen,
  Settings,
  LineChart,
  X,
} from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface SidebarProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ mobileOpen = false, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={[
        'fixed left-0 top-0 z-50 h-screen w-[280px] max-w-[85vw] bg-surface border-r border-border flex flex-col',
        'transition-transform duration-300 ease-out',
        'lg:translate-x-0 lg:w-[240px]',
        mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ].join(' ')}
      aria-hidden={!mobileOpen ? undefined : false}
    >
      <div className="p-5 flex items-center justify-between">
        <Link
          href="/"
          onClick={onClose}
          className="text-primary font-display font-bold text-xl tracking-tight hover:opacity-80 transition-opacity duration-150"
        >
          PaperTradeX
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden cursor-pointer p-2 hover:bg-bg rounded-full transition-colors duration-200"
          aria-label="Close navigation menu"
        >
          <X className="w-5 h-5 text-text-muted" />
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        <NavItem
          href="/practice"
          icon={<LineChart className="w-5 h-5" />}
          label="Practice Trading"
          active={pathname === '/practice'}
          highlight
          onNavigate={onClose}
        />
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Dashboard"
          active={pathname === '/dashboard'}
          onNavigate={onClose}
        />
        <NavItem
          href="/profile"
          icon={<User className="w-5 h-5" />}
          label="Fingerprint"
          active={pathname === '/profile'}
          onNavigate={onClose}
        />
        <NavItem
          href="/leaderboard"
          icon={<Users className="w-5 h-5" />}
          label="Leaderboard"
          active={pathname === '/leaderboard'}
          onNavigate={onClose}
        />
        <NavItem
          href="/modules"
          icon={<BookOpen className="w-5 h-5" />}
          label="Education"
          active={pathname === '/modules'}
          onNavigate={onClose}
        />
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        <NavItem
          href="/settings"
          icon={<Settings className="w-5 h-5" />}
          label="Settings"
          active={pathname === '/settings'}
          onNavigate={onClose}
        />
        <div className="hidden lg:flex items-center justify-between px-3 py-1">
          <span className="text-xs text-text-muted font-medium">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({
  href,
  icon,
  label,
  active = false,
  highlight = false,
  onNavigate,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  highlight?: boolean;
  onNavigate?: () => void;
}) => {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 px-3 py-3 rounded-radius-button transition-colors duration-200 cursor-pointer min-h-[44px] ${
        active
          ? 'bg-primary text-text-inverse font-semibold'
          : highlight
            ? 'text-primary border border-primary/30 bg-primary/5 font-semibold hover:bg-primary/10'
            : 'text-text-muted hover:bg-bg hover:text-text'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default Sidebar;

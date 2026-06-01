'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  TrendingUp,
  Users,
  BookOpen,
  Settings,
  LineChart,
} from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const Sidebar = () => {
  const pathname = usePathname();
  const { metrics } = usePortfolio();
  const pnlUp = metrics.totalPnl >= 0;

  return (
    <aside className="w-[240px] h-screen bg-surface border-r border-border flex flex-col fixed left-0 top-0 z-40">
      <div className="p-6">
        <Link
          href="/"
          className="text-primary font-display font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity duration-150"
        >
          PaperTradeX
        </Link>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        <NavItem
          href="/practice"
          icon={<LineChart className="w-5 h-5" />}
          label="Practice Trading"
          active={pathname === '/practice'}
          highlight
        />
        <NavItem
          href="/dashboard"
          icon={<LayoutDashboard className="w-5 h-5" />}
          label="Dashboard"
          active={pathname === '/dashboard'}
        />
        <NavItem
          href="/portfolio"
          icon={<TrendingUp className="w-5 h-5" />}
          label="Portfolio"
          active={pathname === '/portfolio'}
        />
        <NavItem
          href="/profile"
          icon={<User className="w-5 h-5" />}
          label="Fingerprint"
          active={pathname === '/profile'}
        />
        <NavItem
          href="/leaderboard"
          icon={<Users className="w-5 h-5" />}
          label="Leaderboard"
          active={pathname === '/leaderboard'}
        />
        <NavItem
          href="/modules"
          icon={<BookOpen className="w-5 h-5" />}
          label="Education"
          active={pathname === '/modules'}
        />
      </nav>

      <div className="p-4 border-t border-border">
        <NavItem
          href="/settings"
          icon={<Settings className="w-5 h-5" />}
          label="Settings"
          active={pathname === '/settings'}
        />
        <div className="mt-4 p-3 bg-bg rounded-radius-card border border-border">
          <div className="flex items-center gap-2 mb-1">
            <div className="live-dot" />
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">
              Paper portfolio
            </span>
          </div>
          <div className="text-lg font-display font-bold">
            ${metrics.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
          <div className={`text-xs font-medium mt-1 ${pnlUp ? 'text-success' : 'text-error'}`}>
            {pnlUp ? '+' : ''}$
            {metrics.totalPnl.toLocaleString(undefined, { maximumFractionDigits: 2 })} (
            {metrics.returnPct.toFixed(2)}%)
          </div>
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
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  highlight?: boolean;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-radius-button transition-colors duration-150 ${
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

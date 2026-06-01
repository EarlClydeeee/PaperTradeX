import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  User, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Search,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-[240px] h-screen bg-surface border-r border-border flex flex-col fixed left-0 top-0">
      <div className="p-6">
        <h1 className="text-primary font-display font-bold text-2xl tracking-tight">
          PaperTradeX
        </h1>
      </div>

      <div className="px-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search tickers..." 
            className="w-full bg-bg border border-border rounded-radius-button py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        <NavItem href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active />
        <NavItem href="/portfolio" icon={<TrendingUp className="w-5 h-5" />} label="Portfolio" />
        <NavItem href="/profile" icon={<User className="w-5 h-5" />} label="Fingerprint" />
        <NavItem href="/leaderboard" icon={<Users className="w-5 h-5" />} label="Leaderboard" />
        <NavItem href="/modules" icon={<BookOpen className="w-5 h-5" />} label="Education" />
      </nav>

      <div className="p-4 border-t border-border">
        <NavItem href="/settings" icon={<Settings className="w-5 h-5" />} label="Settings" />
        <div className="mt-4 p-3 bg-bg rounded-radius-card border border-border">
          <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider mb-1">Portfolio</div>
          <div className="text-lg font-display font-bold text-success">$50,000.00</div>
        </div>
      </div>
    </aside>
  );
};

const NavItem = ({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) => {
  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-radius-button transition-colors ${
        active 
          ? 'bg-primary text-text-inverse font-semibold' 
          : 'text-text-muted hover:bg-bg hover:text-text'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
};

export default Sidebar;

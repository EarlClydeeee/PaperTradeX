'use client';

import type { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { PortfolioProvider } from '@/context/PortfolioContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PortfolioProvider>
      <Sidebar />
      <main className="flex-1 ml-[240px] min-h-screen">{children}</main>
    </PortfolioProvider>
  );
}

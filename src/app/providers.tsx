'use client';

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { PortfolioProvider } from '@/context/PortfolioContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <PortfolioProvider>{children}</PortfolioProvider>
    </ThemeProvider>
  );
}

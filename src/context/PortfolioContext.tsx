'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { BiasLabel } from '@/types';
import {
  buildSessionSnapshot,
  defaultPortfolio,
  executePaperTrade,
  loadPortfolio,
  portfolioMetrics,
  resetPortfolio,
  savePortfolio,
  type PortfolioState,
  type SessionSnapshot,
} from '@/lib/portfolio-store';
import {
  assetTypeFor,
  fetchQuotes,
  PRACTICE_TICKERS,
  type MarketQuote,
} from '@/lib/market-data';

interface PortfolioContextValue {
  portfolio: PortfolioState;
  quotes: Record<string, MarketQuote>;
  metrics: ReturnType<typeof portfolioMetrics>;
  marketLoading: boolean;
  marketSourceLabel: string;
  executeTrade: (params: {
    ticker: string;
    action: 'buy' | 'sell';
    quantity: number;
    price: number;
    biasLabel?: BiasLabel | null;
  }) => string | null;
  simulateHours: (hours: 6 | 8) => SessionSnapshot | null;
  resetSession: () => void;
  refreshQuotes: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [portfolio, setPortfolio] = useState<PortfolioState>(defaultPortfolio);
  const [quotes, setQuotes] = useState<Record<string, MarketQuote>>({});
  const [marketLoading, setMarketLoading] = useState(true);

  const positionTickers = portfolio.positions.map((p) => p.ticker).join(',');

  const refreshQuotes = useCallback(async () => {
    setMarketLoading(true);
    const tickers = [
      ...PRACTICE_TICKERS,
      ...positionTickers.split(',').filter(Boolean),
    ];
    const next = await fetchQuotes(tickers);
    setQuotes(next);
    setMarketLoading(false);
  }, [positionTickers]);

  useEffect(() => {
    setPortfolio(loadPortfolio());
  }, []);

  useEffect(() => {
    refreshQuotes();
    const id = setInterval(refreshQuotes, 60_000);
    return () => clearInterval(id);
  }, [refreshQuotes]);

  useEffect(() => {
    savePortfolio(portfolio);
  }, [portfolio]);

  const priceMap = useMemo(() => {
    const m: Record<string, number> = {};
    for (const [t, q] of Object.entries(quotes)) m[t] = q.price;
    for (const p of portfolio.positions) {
      if (!m[p.ticker]) m[p.ticker] = p.avgCost;
    }
    return m;
  }, [quotes, portfolio.positions]);

  const metrics = useMemo(
    () => portfolioMetrics(portfolio, priceMap),
    [portfolio, priceMap]
  );

  const marketSourceLabel = useMemo(() => {
    const sources = new Set(Object.values(quotes).map((q) => q.source));
    if (sources.has('live')) {
      return 'Live market data (crypto via CoinGecko; stocks via Finnhub when API key is set)';
    }
    return 'Reference prices — add FINNHUB_API_KEY in .env.local for live US stocks';
  }, [quotes]);

  const executeTrade = useCallback(
    (params: {
      ticker: string;
      action: 'buy' | 'sell';
      quantity: number;
      price: number;
      biasLabel?: BiasLabel | null;
    }): string | null => {
      const { state, error } = executePaperTrade(portfolio, {
        ...params,
        assetType: assetTypeFor(params.ticker),
      });
      if (error) return error;
      setPortfolio(state);
      refreshQuotes();
      return null;
    },
    [portfolio, refreshQuotes]
  );

  const simulateHours = useCallback(
    (hours: 6 | 8): SessionSnapshot | null => {
      if (portfolio.positions.length === 0) return null;
      const quoteMap: Record<string, { price: number; change24h: number }> = {};
      for (const [t, q] of Object.entries(quotes)) {
        quoteMap[t] = { price: q.price, change24h: q.change24h };
      }
      for (const p of portfolio.positions) {
        if (!quoteMap[p.ticker]) {
          quoteMap[p.ticker] = { price: p.avgCost, change24h: 0 };
        }
      }
      const snap = buildSessionSnapshot(portfolio, hours, quoteMap);
      const next = {
        ...portfolio,
        snapshots: [
          snap,
          ...portfolio.snapshots.filter((s) => s.hours !== hours),
        ],
      };
      setPortfolio(next);
      return snap;
    },
    [portfolio, quotes]
  );

  const resetSession = useCallback(() => {
    setPortfolio(resetPortfolio());
    refreshQuotes();
  }, [refreshQuotes]);

  const value: PortfolioContextValue = {
    portfolio,
    quotes,
    metrics,
    marketLoading,
    marketSourceLabel,
    executeTrade,
    simulateHours,
    resetSession,
    refreshQuotes,
  };

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) {
    throw new Error('usePortfolio must be used within PortfolioProvider');
  }
  return ctx;
}

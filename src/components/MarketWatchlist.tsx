'use client';

import React from 'react';
import { RefreshCw, TrendingDown, TrendingUp } from 'lucide-react';
import { PRACTICE_TICKERS } from '@/lib/market-data';
import { usePortfolio } from '@/context/PortfolioContext';

interface MarketWatchlistProps {
  onSelectTicker: (ticker: string) => void;
  selectedTicker: string | null;
}

export default function MarketWatchlist({
  onSelectTicker,
  selectedTicker,
}: MarketWatchlistProps) {
  const { quotes, marketLoading, refreshQuotes } = usePortfolio();

  return (
    <div className="bg-surface border border-border rounded-radius-card overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-border flex justify-between items-center">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
            Live market watch
          </h3>
          <p className="text-[11px] text-text-muted mt-0.5">Stocks + crypto · tap to trade</p>
        </div>
        <button
          type="button"
          onClick={() => refreshQuotes()}
          className="p-2 hover:bg-bg rounded-lg transition-colors duration-150 text-text-muted hover:text-primary cursor-pointer"
          title="Refresh prices"
          aria-label="Refresh market prices"
        >
          <RefreshCw className={`w-4 h-4 ${marketLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="divide-y divide-border max-h-[420px] overflow-y-auto">
        {PRACTICE_TICKERS.map((ticker) => {
          const q = quotes[ticker];
          const up = (q?.change24h ?? 0) >= 0;
          const active = selectedTicker === ticker;
          const isCrypto = ['BTC', 'ETH', 'SOL'].includes(ticker);
          const assetType = q?.assetType ?? (isCrypto ? 'crypto' : 'stock');

          return (
            <button
              key={ticker}
              type="button"
              onClick={() => onSelectTicker(ticker)}
              className={`w-full px-5 py-4 flex items-center justify-between text-left transition-colors duration-150 cursor-pointer ${
                active
                  ? 'bg-primary/10 border-l-2 border-l-primary'
                  : 'hover:bg-bg/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold">{ticker}</span>
                    <span
                      className={`text-[11px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${
                        assetType === 'crypto'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {assetType}
                    </span>
                    {q?.source === 'reference' && (
                      <span className="text-[11px] text-warning font-medium">ref</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                {q ? (
                  <>
                    <div className="font-display font-bold tabular-nums">
                      ${q.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`flex items-center justify-end gap-0.5 text-xs font-medium tabular-nums ${
                        up ? 'text-success' : 'text-error'
                      }`}
                    >
                      {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {up ? '+' : ''}
                      {q.change24h.toFixed(2)}%
                    </div>
                  </>
                ) : (
                  <div className="space-y-1">
                    <div className="skeleton w-16 h-4" />
                    <div className="skeleton w-10 h-3" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

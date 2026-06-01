'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RotateCcw,
  AlertCircle,
  Wallet,
  BarChart3,
  Receipt,
} from 'lucide-react';
import MarketWatchlist from '@/components/MarketWatchlist';
import SessionSimulator from '@/components/SessionSimulator';
import TradeDrawer from '@/components/TradeDrawer';
import CoachPanel from '@/components/CoachPanel';
import { usePortfolio } from '@/context/PortfolioContext';
import { coachTrade } from '@/lib/coach';
import { fetchQuote } from '@/lib/market-data';
import type { BiasLabel } from '@/types';

export default function PracticePage() {
  const {
    portfolio,
    quotes,
    metrics,
    marketSourceLabel,
    executeTrade,
    resetSession,
  } = usePortfolio();

  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [showCoach, setShowCoach] = useState(false);
  const [tradeError, setTradeError] = useState<string | null>(null);
  const [lastCoach, setLastCoach] = useState<{
    bias_label?: BiasLabel | null;
    coach_message: string;
    explanation: string;
    psychology_note?: string;
    is_fallback?: boolean;
  } | null>(null);

  const handleSelectTicker = async (ticker: string) => {
    setSelectedTicker(ticker);
    if (!quotes[ticker]) {
      try {
        await fetchQuote(ticker);
      } catch {
        /* watchlist refresh handles most */
      }
    }
  };

  const handleExecuteTrade = async (trade: {
    ticker: string;
    action: 'buy' | 'sell';
    quantity: number;
    price: number;
    change_24h: number;
  }) => {
    setTradeError(null);
    const coachResult = await coachTrade({
      ticker: trade.ticker,
      action: trade.action,
      price: trade.price,
      quantity: trade.quantity,
      market_context: { change_24h: trade.change_24h },
    });

    const err = executeTrade({
      ticker: trade.ticker,
      action: trade.action,
      quantity: trade.quantity,
      price: trade.price,
      biasLabel: coachResult.bias_label ?? null,
    });

    if (err) {
      setTradeError(err);
      return;
    }

    setSelectedTicker(null);
    setLastCoach({
      bias_label: coachResult.bias_label,
      coach_message: coachResult.coach_message ?? '',
      explanation: coachResult.explanation ?? '',
      psychology_note: coachResult.psychology_note ?? undefined,
      is_fallback: coachResult.is_fallback,
    });
    setTimeout(() => setShowCoach(true), 300);
  };

  const pnlUp = metrics.totalPnl >= 0;

  return (
    <div className="p-8 space-y-8 relative overflow-x-hidden pb-24">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4">
        <div>
          <h2 className="text-text-muted text-sm font-medium uppercase tracking-wider">
            Practice floor
          </h2>
          <h1 className="text-4xl font-display font-bold">Trade &amp; learn</h1>
          <p className="text-text-muted text-sm mt-2 max-w-xl">
            Buy and sell with paper money. Gains and losses update from real market prices where
            available — so students practice against how the market actually looks today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all positions, trades, and simulations?')) resetSession();
            }}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-radius-button text-sm font-bold text-text-muted hover:text-text hover:bg-bg transition-colors duration-150 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset portfolio
          </button>
        </div>
      </header>

      {/* Market source banner */}
      <div className="flex items-start gap-2 p-4 bg-primary/5 border border-primary/20 rounded-radius-card text-sm text-text-muted">
        <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <p>{marketSourceLabel}</p>
      </div>

      {/* Trade error */}
      {tradeError && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-radius-card text-error text-sm font-medium">
          {tradeError}
        </div>
      )}

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Watchlist */}
        <div className="col-span-12 lg:col-span-4">
          <MarketWatchlist
            onSelectTicker={handleSelectTicker}
            selectedTicker={selectedTicker}
          />
        </div>

        {/* Right panel */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Portfolio value"
              value={`$${metrics.totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              icon={<Wallet className="w-5 h-5 text-primary" />}
            />
            <StatCard
              label="Total P&L"
              value={`${pnlUp ? '+' : ''}$${metrics.totalPnl.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              sub={`${pnlUp ? '+' : ''}${metrics.returnPct.toFixed(2)}% vs start`}
              valueClass={pnlUp ? 'text-success' : 'text-error'}
              icon={
                pnlUp ? (
                  <TrendingUp className="w-5 h-5 text-success" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-error" />
                )
              }
            />
            <StatCard
              label="Cash available"
              value={`$${portfolio.cash.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              icon={<Wallet className="w-5 h-5 text-text-muted" />}
            />
          </div>

          {/* Positions */}
          <div className="bg-surface border border-border rounded-radius-card overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border">
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                Your positions
              </h3>
            </div>
            {metrics.positionRows.length === 0 ? (
              <div className="p-10 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-bg border border-border flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-text-muted" />
                </div>
                <p className="text-text-muted text-sm max-w-[240px]">
                  No positions yet. Pick a ticker from the watchlist and execute a buy order.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {metrics.positionRows.map(({ position, price, marketValue, unrealizedPnl, returnPct }) => {
                  const up = unrealizedPnl >= 0;
                  return (
                    <div
                      key={position.ticker}
                      className="px-6 py-4 flex items-center justify-between hover:bg-bg/30 transition-colors duration-150 cursor-pointer"
                      onClick={() => handleSelectTicker(position.ticker)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleSelectTicker(position.ticker)}
                    >
                      <div>
                        <span className="font-display font-bold">{position.ticker}</span>
                        <p className="text-xs text-text-muted mt-0.5">
                          {position.quantity} @ avg ${position.avgCost.toFixed(2)} · now $
                          {price.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold tabular-nums">
                          ${marketValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </div>
                        <div
                          className={`text-sm font-medium tabular-nums ${up ? 'text-success' : 'text-error'}`}
                        >
                          {up ? '+' : ''}${unrealizedPnl.toFixed(2)} ({returnPct.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Trade history */}
          <div className="bg-surface border border-border rounded-radius-card overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                Trade history
              </h3>
              <span className="text-[11px] text-text-muted">{portfolio.trades.length} trades</span>
            </div>
            {portfolio.trades.length === 0 ? (
              <div className="p-8 flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bg border border-border flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-text-muted" />
                </div>
                <p className="text-sm text-text-muted">
                  Trades appear here with P&amp;L impact on your portfolio.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border max-h-48 overflow-y-auto">
                {portfolio.trades.slice(0, 12).map((t) => (
                  <div
                    key={t.id}
                    className="px-6 py-3 flex justify-between items-center text-sm hover:bg-bg/20 transition-colors duration-150"
                  >
                    <span className="flex items-center gap-2">
                      <span className="font-bold">{t.ticker}</span>
                      <span
                        className={`text-[11px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          t.action === 'buy' ? 'bg-primary/15 text-primary' : 'bg-error/15 text-error'
                        }`}
                      >
                        {t.action}
                      </span>
                      <span className="text-text-muted tabular-nums">
                        {t.quantity} @ ${t.price.toFixed(2)}
                      </span>
                    </span>
                    <span className="flex items-center gap-2 text-text-muted tabular-nums">
                      ${t.totalValue.toFixed(2)}
                      {t.biasLabel && (
                        <span className="text-accent text-[11px] font-bold uppercase bg-accent/10 px-1.5 py-0.5 rounded">
                          {t.biasLabel.replace('_', ' ')}
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <SessionSimulator />
        </div>
      </div>

      {/* Trade drawer */}
      {selectedTicker && (
        <TradeDrawer
          ticker={selectedTicker}
          quote={quotes[selectedTicker] ?? null}
          buyingPower={portfolio.cash}
          onClose={() => setSelectedTicker(null)}
          onExecute={handleExecuteTrade}
        />
      )}

      {/* AI Coach panel */}
      {showCoach && lastCoach && (
        <CoachPanel
          bias={lastCoach.bias_label ?? undefined}
          message={lastCoach.coach_message}
          explanation={lastCoach.explanation}
          psychologyNote={lastCoach.psychology_note}
          isFallback={lastCoach.is_fallback}
          onClose={() => setShowCoach(false)}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  valueClass = '',
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-surface border border-border rounded-radius-card p-5 flex gap-4">
      <div className="p-2 bg-bg rounded-lg border border-border h-fit shrink-0">{icon}</div>
      <div className="min-w-0">
        <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest">
          {label}
        </div>
        <div className={`text-2xl font-display font-bold tabular-nums truncate ${valueClass}`}>
          {value}
        </div>
        {sub && <div className="text-xs text-text-muted mt-1">{sub}</div>}
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState } from 'react';
import { X, Zap } from 'lucide-react';
import { BiasLabel } from '@/types';
import type { MarketQuote } from '@/lib/market-data';

interface TradeDrawerProps {
  ticker: string;
  quote: MarketQuote | null;
  buyingPower: number;
  onClose: () => void;
  onExecute: (trade: {
    ticker: string;
    action: 'buy' | 'sell';
    quantity: number;
    price: number;
    total_value: number;
    executed_at: string;
    change_24h: number;
  }) => void;
}

const TradeDrawer = ({ ticker, quote, buyingPower, onClose, onExecute }: TradeDrawerProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const price = quote?.price ?? 0;
  const change24h = quote?.change24h ?? 0;

  useEffect(() => {
    setQuantity(0);
    setAction('buy');
  }, [ticker]);

  const handleExecute = () => {
    if (quantity <= 0 || price <= 0) return;
    onExecute({
      ticker,
      action,
      quantity,
      price,
      total_value: quantity * price,
      executed_at: new Date().toISOString(),
      change_24h: change24h,
    });
  };

  const estimated = quantity * price;
  const remaining = action === 'buy' ? buyingPower - estimated : buyingPower + estimated;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 bg-black/40 z-40 cursor-pointer"
        aria-label="Close trade panel"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] max-w-full bg-surface border-l border-border shadow-lg z-50 flex flex-col">
      <div className="p-4 sm:p-6 border-b border-border flex justify-between items-center gap-3">
        <div>
          <h2 className="text-xs text-text-muted font-bold uppercase tracking-widest">Trade</h2>
          <div className="text-2xl font-display font-bold flex items-center gap-2">
            {ticker}
            <span className="text-sm font-normal text-text-muted">
              {price > 0 ? `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : 'Loading…'}
            </span>
          </div>
          {quote && (
            <p className="text-xs mt-1 text-text-muted">
              24h:{' '}
              <span className={change24h >= 0 ? 'text-success' : 'text-error'}>
                {change24h >= 0 ? '+' : ''}
                {change24h.toFixed(2)}%
              </span>
              {' · '}
              {quote.source === 'live' ? 'Live quote' : 'Reference quote'}
            </p>
          )}
        </div>
        <button onClick={onClose} className="cursor-pointer p-2 hover:bg-bg rounded-full transition-colors duration-200 shrink-0" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-4 sm:p-6 space-y-6 sm:space-y-8 overflow-y-auto">
        <div className="flex bg-bg p-1 rounded-radius-button border border-border">
          <button
            type="button"
            onClick={() => setAction('buy')}
            className={`flex-1 py-3 sm:py-3 min-h-[44px] rounded-radius-button font-bold transition-colors duration-200 cursor-pointer ${
              action === 'buy' ? 'bg-primary text-text-inverse shadow-sm' : 'text-text-muted'
            }`}
          >
            BUY
          </button>
          <button
            type="button"
            onClick={() => setAction('sell')}
            className={`flex-1 py-3 sm:py-3 min-h-[44px] rounded-radius-button font-bold transition-colors duration-200 cursor-pointer ${
              action === 'sell' ? 'bg-error text-text-inverse shadow-sm' : 'text-text-muted'
            }`}
          >
            SELL
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-text-muted font-bold uppercase tracking-widest">
            Quantity
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              step={quote?.assetType === 'crypto' ? 0.0001 : 1}
              value={quantity || ''}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-bg border border-border rounded-radius-button py-4 px-4 text-2xl font-display font-bold focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="0"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-bold text-xs">
              {quote?.assetType === 'crypto' ? 'UNITS' : 'SHARES'}
            </div>
          </div>
        </div>

        <div className="space-y-3 p-4 bg-bg/50 rounded-radius-card border border-border/50">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Estimated {action === 'buy' ? 'cost' : 'proceeds'}</span>
            <span className="font-bold">${estimated.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Buying power (cash)</span>
            <span className="text-primary font-bold">
              ${buyingPower.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between text-sm font-bold">
            <span>After trade (cash)</span>
            <span>${remaining.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 border-t border-border bg-surface pb-[max(1rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={handleExecute}
          disabled={quantity <= 0 || price <= 0}
          className={`w-full py-4 sm:py-5 min-h-[52px] rounded-radius-button font-display font-bold text-lg sm:text-xl flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer ${
            action === 'buy'
              ? 'bg-primary text-text-inverse hover:bg-primary-hover shadow-lg shadow-primary/20'
              : 'bg-error text-text-inverse shadow-lg shadow-error/20'
          } disabled:opacity-50 disabled:shadow-none`}
        >
          <Zap className="w-5 h-5" />
          EXECUTE {action.toUpperCase()}
        </button>
        <p className="text-[10px] text-text-muted mt-4 text-center leading-relaxed">
          Paper money only. Prices reflect current market where available (crypto live; stocks
          with Finnhub API key).
        </p>
      </div>
    </div>
    </>
  );
};

export default TradeDrawer;

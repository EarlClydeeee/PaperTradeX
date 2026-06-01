"use client";

import React, { useState } from 'react';
import { X, ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { BiasLabel } from '@/types';

interface TradeDrawerProps {
  ticker: string;
  onClose: () => void;
  onExecute: (trade: any) => void;
}

const TradeDrawer = ({ ticker, onClose, onExecute }: TradeDrawerProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [action, setAction] = useState<'buy' | 'sell'>('buy');
  const price = 145.20; // Mock price

  const handleExecute = () => {
    onExecute({
      ticker,
      action,
      quantity,
      price,
      total_value: quantity * price,
      executed_at: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 w-[400px] bg-surface border-l border-border shadow-lg z-50 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-border flex justify-between items-center">
        <div>
          <h2 className="text-xs text-text-muted font-bold uppercase tracking-widest">Trade</h2>
          <div className="text-2xl font-display font-bold flex items-center gap-2">
            {ticker}
            <span className="text-sm font-normal text-text-muted">$145.20</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-bg rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-6 space-y-8">
        {/* Action Toggle */}
        <div className="flex bg-bg p-1 rounded-radius-button border border-border">
          <button 
            onClick={() => setAction('buy')}
            className={`flex-1 py-3 rounded-radius-button font-bold transition-all ${
              action === 'buy' ? 'bg-primary text-text-inverse shadow-sm' : 'text-text-muted'
            }`}
          >
            BUY
          </button>
          <button 
            onClick={() => setAction('sell')}
            className={`flex-1 py-3 rounded-radius-button font-bold transition-all ${
              action === 'sell' ? 'bg-error text-text-inverse shadow-sm' : 'text-text-muted'
            }`}
          >
            SELL
          </button>
        </div>

        {/* Quantity Input */}
        <div className="space-y-2">
          <label className="text-xs text-text-muted font-bold uppercase tracking-widest">Quantity</label>
          <div className="relative">
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-bg border border-border rounded-radius-button py-4 px-4 text-2xl font-display font-bold focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="0"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">SHARES</div>
          </div>
        </div>

        {/* Order Details */}
        <div className="space-y-3 p-4 bg-bg/50 rounded-radius-card border border-border/50">
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Estimated Cost</span>
            <span className="font-bold">${(quantity * price).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-muted">Buying Power</span>
            <span className="text-primary font-bold">$50,000.00</span>
          </div>
          <div className="h-px bg-border my-2" />
          <div className="flex justify-between text-sm font-bold">
            <span>Remaining Balance</span>
            <span>${(50000 - (quantity * price)).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-border bg-surface">
        <button 
          onClick={handleExecute}
          disabled={quantity <= 0}
          className={`w-full py-5 rounded-radius-button font-display font-bold text-xl flex items-center justify-center gap-2 transition-all ${
            action === 'buy' 
              ? 'bg-primary text-text-inverse hover:bg-primary-hover shadow-lg shadow-primary/20' 
              : 'bg-error text-text-inverse hover:bg-error/dark shadow-lg shadow-error/20'
          } disabled:opacity-50 disabled:shadow-none`}
        >
          <Zap className="w-5 h-5" />
          EXECUTE {action.toUpperCase()}
        </button>
        <p className="text-[10px] text-text-muted mt-4 text-center leading-relaxed">
          By executing this trade, you agree to the PaperTradeX simulator terms. 
          Market data is delayed by 15 minutes.
        </p>
      </div>
    </div>
  );
};

export default TradeDrawer;

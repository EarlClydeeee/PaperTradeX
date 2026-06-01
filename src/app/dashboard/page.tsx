"use client";

import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';
import { TrendingUp, TrendingDown, Clock, Brain, Search } from 'lucide-react';
import TradeDrawer from '@/components/TradeDrawer';
import CoachPanel from '@/components/CoachPanel';
import { BiasLabel } from '@/types';

const radarData = [
  { subject: 'FOMO', A: 120, fullMark: 150 },
  { subject: 'Loss Aversion', A: 98, fullMark: 150 },
  { subject: 'Overconfidence', A: 86, fullMark: 150 },
  { subject: 'Recency Bias', A: 99, fullMark: 150 },
  { subject: 'Anchoring', A: 85, fullMark: 150 },
  { subject: 'Disposition', A: 65, fullMark: 150 },
];

export default function DashboardPage() {
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [showCoach, setShowCoach] = useState(false);
  const [lastTradeResult, setLastTradeResult] = useState<any>(null);

  const handleExecuteTrade = (trade: any) => {
    setSelectedTicker(null);
    // Mocking the AI coach response
    const mockCoachResponse = {
      bias: 'FOMO' as BiasLabel,
      message: "You're buying into a massive green candle. NVDA is up 12% today. Your brain is screaming 'don't miss out', but history says this is where the dump starts.",
      explanation: "Buying at the top of a parabolic move is a classic FOMO signature. You are overweighting the most recent price action while ignoring the mean-reversion risk.",
      isFallback: false
    };
    
    setLastTradeResult(mockCoachResponse);
    setTimeout(() => {
      setShowCoach(true);
    }, 500);
  };

  return (
    <div className="p-8 space-y-8 relative overflow-x-hidden">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-text-muted text-sm font-medium uppercase tracking-wider">Overview</h2>
          <h1 className="text-4xl font-display font-bold">Trading Floor</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Quick Ticker (e.g. NVDA)"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSelectedTicker((e.target as HTMLInputElement).value.toUpperCase());
                  (e.target as HTMLInputElement).value = '';
                }
              }}
              className="bg-surface border border-border rounded-radius-button py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-64"
            />
          </div>
          <div className="text-right">
            <div className="text-text-muted text-sm font-medium uppercase tracking-wider">Buying Power</div>
            <div className="text-2xl font-display font-bold text-primary">$50,000.00</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Portfolio Value Card */}
        <div className="col-span-8 bg-surface border border-border rounded-radius-card p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">Total Portfolio Value</h3>
              <div className="text-5xl font-display font-bold">$52,430.12</div>
              <div className="flex items-center gap-1 text-success mt-2 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+$2,430.12 (4.86%)</span>
                <span className="text-text-muted ml-1 text-xs uppercase font-bold tracking-widest">Today</span>
              </div>
            </div>
            <div className="bg-bg border border-border rounded-radius-button px-3 py-1 text-xs font-bold text-text-muted uppercase tracking-wider">
              Real-time
            </div>
          </div>
          <div className="h-[240px] w-full bg-bg/50 rounded-radius-card border border-border/50 flex items-center justify-center italic text-text-muted">
            Portfolio Performance Chart Placeholder
          </div>
        </div>

        {/* Behavioral Fingerprint Preview */}
        <div className="col-span-4 bg-surface border border-border rounded-radius-card p-6 shadow-sm flex flex-col">
          <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-accent" />
            Behavioral Fingerprint
          </h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#1E2028" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 10 }} />
                <Radar
                  name="Bias"
                  dataKey="A"
                  stroke="#7B61FF"
                  fill="#7B61FF"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-text-muted mt-4 text-center">
            Your top bias is <span className="text-accent font-bold uppercase">FOMO</span>. 
            The AI coach has detected 4 instances in your last 10 trades.
          </p>
        </div>

        {/* Recent Trades */}
        <div className="col-span-12 bg-surface border border-border rounded-radius-card overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-border flex justify-between items-center">
            <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recent Activity
            </h3>
            <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
          </div>
          <div className="divide-y divide-border">
            <TradeRow ticker="NVDA" action="BUY" price={145.20} quantity={10} status="COACHED" bias="FOMO" onClick={() => setSelectedTicker('NVDA')} />
            <TradeRow ticker="AAPL" action="SELL" price={228.45} quantity={5} status="CLEAN" onClick={() => setSelectedTicker('AAPL')} />
            <TradeRow ticker="BTC" action="BUY" price={68432.10} quantity={0.05} status="COACHED" bias="Recency Bias" onClick={() => setSelectedTicker('BTC')} />
          </div>
        </div>
      </div>

      {/* Overlays */}
      {selectedTicker && (
        <TradeDrawer 
          ticker={selectedTicker} 
          onClose={() => setSelectedTicker(null)} 
          onExecute={handleExecuteTrade}
        />
      )}

      {showCoach && lastTradeResult && (
        <CoachPanel 
          bias={lastTradeResult.bias}
          message={lastTradeResult.message}
          explanation={lastTradeResult.explanation}
          isFallback={lastTradeResult.isFallback}
          onClose={() => setShowCoach(false)}
        />
      )}
    </div>
  );
}

function TradeRow({ ticker, action, price, quantity, status, bias, onClick }: any) {
  return (
    <div 
      className="px-6 py-4 flex items-center justify-between hover:bg-bg/40 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
          action === 'BUY' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'
        }`}>
          {ticker.substring(0, 2)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold">{ticker}</span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
              action === 'BUY' ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'
            }`}>
              {action}
            </span>
          </div>
          <div className="text-xs text-text-muted mt-0.5">
            {quantity} shares at ${price.toLocaleString()}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {bias && (
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Bias Detected</span>
            <span className="text-xs text-accent font-bold uppercase">{bias}</span>
          </div>
        )}
        <div className="text-right">
          <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Status</div>
          <div className={`text-xs font-bold ${status === 'COACHED' ? 'text-accent' : 'text-success'}`}>
            {status}
          </div>
        </div>
      </div>
    </div>
  );
}

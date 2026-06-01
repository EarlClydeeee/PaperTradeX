"use client";

import React from 'react';
import { 
  ResponsiveContainer, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';
import { Brain, Info, History, AlertTriangle } from 'lucide-react';

const radarData = [
  { subject: 'FOMO', A: 120, fullMark: 150 },
  { subject: 'Loss Aversion', A: 98, fullMark: 150 },
  { subject: 'Overconfidence', A: 86, fullMark: 150 },
  { subject: 'Recency Bias', A: 99, fullMark: 150 },
  { subject: 'Anchoring', A: 85, fullMark: 150 },
  { subject: 'Disposition', A: 65, fullMark: 150 },
];

export default function ProfilePage() {
  return (
    <div className="p-8 space-y-8">
      <header>
        <h2 className="text-text-muted text-sm font-medium uppercase tracking-wider">Analysis</h2>
        <h1 className="text-4xl font-display font-bold text-[#1A1D25]">Behavioral Fingerprint</h1>
        <p className="text-text-muted mt-2 max-w-2xl">
          Your unique trading DNA. The AI coach tracks your decisions to build this profile, 
          identifying the psychological patterns that impact your performance.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* Radar Chart Card */}
        <div className="col-span-12 lg:col-span-7 bg-surface border border-border rounded-radius-card p-8 shadow-sm">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-lg font-display font-bold flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent" />
              Bias Dimensions
            </h3>
            <div className="bg-bg border border-border rounded-radius-button px-3 py-1 text-[10px] font-bold text-text-muted uppercase tracking-wider">
              Updated 2h ago
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#E2E8F0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4A5568', fontSize: 12, fontWeight: 'bold' }} />
                <Radar
                  name="Bias Intensity"
                  dataKey="A"
                  stroke="#7B61FF"
                  fill="#7B61FF"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="p-4 bg-bg rounded-radius-card border border-border/50">
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Top Bias</div>
              <div className="text-xl font-display font-bold text-accent uppercase">FOMO</div>
            </div>
            <div className="p-4 bg-bg rounded-radius-card border border-border/50">
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Bias Control Score</div>
              <div className="text-xl font-display font-bold text-success">74/100</div>
            </div>
            <div className="p-4 bg-bg rounded-radius-card border border-border/50">
              <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">Trades Analyzed</div>
              <div className="text-xl font-display font-bold text-[#1A1D25]">42</div>
            </div>
          </div>
        </div>

        {/* Bias Definitions */}
        <div className="col-span-12 lg:col-span-5 space-y-4">
          <h3 className="text-lg font-display font-bold flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-primary" />
            Detected Patterns
          </h3>
          
          <BiasCard 
            label="FOMO (Fear Of Missing Out)" 
            count={12} 
            severity="high" 
            description="Entering trades based on rapid price increases to avoid missing potential gains."
          />
          <BiasCard 
            label="Loss Aversion" 
            count={8} 
            severity="medium" 
            description="Holding onto losing positions for too long to avoid realizing a loss."
          />
          <BiasCard 
            label="Overconfidence" 
            count={5} 
            severity="low" 
            description="Overestimating your ability to predict market movements after a winning streak."
          />
          <BiasCard 
            label="Recency Bias" 
            count={10} 
            severity="medium" 
            description="Giving too much weight to recent events or short-term trends."
          />
        </div>
      </div>

      {/* History */}
      <div className="bg-surface border border-border rounded-radius-card shadow-sm">
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <History className="w-5 h-5 text-text-muted" />
          <h3 className="text-lg font-display font-bold">Coaching History</h3>
        </div>
        <div className="divide-y divide-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-bg/40 transition-colors">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">May 28, 2026</span>
                  <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-bold uppercase rounded border border-accent/20 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    FOMO
                  </span>
                </div>
                <h4 className="font-display font-bold text-lg">Bought 15 NVDA at $148.50</h4>
                <p className="text-sm text-text-muted italic max-w-2xl">
                  "You're buying into a massive green candle... Your brain is screaming 'don't miss out', but history says this is where the dump starts."
                </p>
              </div>
              <button className="px-4 py-2 border border-border rounded-radius-button text-sm font-bold hover:bg-bg transition-all self-start md:self-center">
                Review Case
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BiasCard({ label, count, severity, description }: any) {
  const severityColors = {
    high: 'text-error border-error/20 bg-error/5',
    medium: 'text-warning border-warning/20 bg-warning/5',
    low: 'text-primary border-primary/20 bg-primary/5',
  };

  return (
    <div className="p-5 bg-surface border border-border rounded-radius-card hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-2">
        <div className="font-display font-bold text-[#1A1D25] group-hover:text-primary transition-colors">{label}</div>
        <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${severityColors[severity as keyof typeof severityColors]}`}>
          {count} Cases
        </div>
      </div>
      <p className="text-xs text-text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}

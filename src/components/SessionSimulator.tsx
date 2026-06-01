'use client';

import React from 'react';
import { Clock, TrendingDown, TrendingUp, Hourglass } from 'lucide-react';
import type { SessionSnapshot } from '@/lib/portfolio-store';
import { usePortfolio } from '@/context/PortfolioContext';

function SnapshotCard({ snap }: { snap: SessionSnapshot }) {
  const up = snap.totalPnl >= 0;
  return (
    <div className="bg-bg border border-border rounded-radius-card p-5 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">
            {snap.label}
          </h4>
          <p className="text-[11px] text-text-muted mt-1">
            Projected from today&apos;s 24h trend ·{' '}
            {new Date(snap.createdAt).toLocaleString()}
          </p>
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-bold ${up ? 'text-success' : 'text-error'}`}
        >
          {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="tabular-nums">
            {up ? '+' : ''}
            {snap.returnPct.toFixed(2)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] text-text-muted uppercase font-bold">Portfolio value</div>
          <div className="text-xl font-display font-bold tabular-nums">
            ${snap.portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-text-muted uppercase font-bold">Total P&amp;L</div>
          <div className={`text-xl font-display font-bold tabular-nums ${up ? 'text-success' : 'text-error'}`}>
            {up ? '+' : ''}$
            {snap.totalPnl.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {snap.positions.length > 0 ? (
        <div className="space-y-2">
          <div className="text-[10px] text-text-muted uppercase font-bold tracking-widest">
            Positions at checkpoint
          </div>
          {snap.positions.map((p) => (
            <div
              key={p.ticker}
              className="flex justify-between text-sm py-2 border-t border-border/50 first:border-0"
            >
              <span className="font-bold">{p.ticker}</span>
              <span className="text-text-muted tabular-nums">
                {p.quantity} @ ${p.projectedPrice.toFixed(2)}
              </span>
              <span
                className={`tabular-nums font-medium ${
                  p.unrealizedPnl >= 0 ? 'text-success' : 'text-error'
                }`}
              >
                {p.unrealizedPnl >= 0 ? '+' : ''}$
                {p.unrealizedPnl.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-text-muted">No open positions in this projection.</p>
      )}
    </div>
  );
}

function EmptySlot({ label }: { label: string }) {
  return (
    <div className="bg-bg/50 border border-dashed border-border rounded-radius-card p-8 flex flex-col items-center justify-center gap-3 text-center">
      <Hourglass className="w-7 h-7 text-text-muted opacity-30" />
      <p className="text-sm text-text-muted">{label} not generated yet</p>
    </div>
  );
}

export default function SessionSimulator() {
  const { portfolio, simulateHours, metrics } = usePortfolio();
  const snap6 = portfolio.snapshots.find((s) => s.hours === 6);
  const snap8 = portfolio.snapshots.find((s) => s.hours === 8);
  const hasPositions = metrics.positionRows.length > 0;

  return (
    <div className="bg-surface border border-border rounded-radius-card p-6 shadow-sm space-y-5">
      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div>
          <h3 className="font-display font-bold text-lg">Session time simulation</h3>
          <p className="text-sm text-text-muted mt-1 leading-relaxed">
            See how your paper portfolio might look after 6 or 8 hours if today&apos;s market
            trend continues. Projections scale from live 24h price moves — use in class without
            waiting.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => simulateHours(6)}
          disabled={!hasPositions}
          className="px-5 py-2.5 bg-accent text-white rounded-radius-button font-bold text-sm hover:opacity-90 disabled:opacity-40 transition-opacity duration-150 cursor-pointer disabled:cursor-not-allowed"
        >
          Simulate after 6 hours
        </button>
        <button
          type="button"
          onClick={() => simulateHours(8)}
          disabled={!hasPositions}
          className="px-5 py-2.5 bg-surface border border-accent text-accent rounded-radius-button font-bold text-sm hover:bg-bg disabled:opacity-40 transition-colors duration-150 cursor-pointer disabled:cursor-not-allowed"
        >
          Simulate after 8 hours
        </button>
      </div>

      {!hasPositions && (
        <p className="text-sm text-warning font-medium">
          Place at least one trade to run a time simulation.
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {snap6 ? <SnapshotCard snap={snap6} /> : <EmptySlot label="6-hour overview" />}
        {snap8 ? <SnapshotCard snap={snap8} /> : <EmptySlot label="8-hour overview" />}
      </div>
    </div>
  );
}

"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
} from 'recharts';
import { TrendingUp, TrendingDown, Clock, Brain, LineChart, BarChart2 } from 'lucide-react';
import { usePortfolio } from '@/context/PortfolioContext';

const radarData = [
  { subject: 'FOMO', A: 120, fullMark: 150 },
  { subject: 'Loss Aversion', A: 98, fullMark: 150 },
  { subject: 'Overconfidence', A: 86, fullMark: 150 },
  { subject: 'Recency Bias', A: 99, fullMark: 150 },
  { subject: 'Anchoring', A: 85, fullMark: 150 },
  { subject: 'Disposition', A: 65, fullMark: 150 },
];

const STARTING_VALUE = 10000;

export default function DashboardPage() {
  const { metrics, portfolio, quotes } = usePortfolio();
  const pnlUp = metrics.totalPnl >= 0;

  const chartData = useMemo(() => {
    const points: Array<{ t: number; v: number; label: string }> = [
      { t: 0, v: STARTING_VALUE, label: 'Start' },
    ];

    let cash = STARTING_VALUE;
    const holdings: Record<string, number> = {};

    portfolio.trades.forEach((trade, idx) => {
      if (trade.action === 'buy') {
        cash -= trade.totalValue;
        holdings[trade.ticker] = (holdings[trade.ticker] ?? 0) + trade.quantity;
      } else {
        cash += trade.totalValue;
        holdings[trade.ticker] = Math.max(0, (holdings[trade.ticker] ?? 0) - trade.quantity);
      }

      const holdingsValue = Object.entries(holdings).reduce((sum, [ticker, qty]) => {
        const livePrice = quotes[ticker]?.price ?? trade.price;
        return sum + qty * livePrice;
      }, 0);

      points.push({
        t: idx + 1,
        v: Math.max(0, cash + holdingsValue),
        label: `Trade ${idx + 1}`,
      });
    });

    if (points.length > 1) {
      points[points.length - 1].v = metrics.totalValue;
      points[points.length - 1].label = 'Now';
    }

    return points;
  }, [portfolio.trades, quotes, metrics.totalValue]);

  const chartMin = Math.min(...chartData.map((d) => d.v)) * 0.995;
  const chartMax = Math.max(...chartData.map((d) => d.v)) * 1.005;
  const hasChart = chartData.length >= 2;

  return (
    <div className="p-8 space-y-8 relative overflow-x-hidden">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-text-muted text-sm font-medium uppercase tracking-wider">Overview</h2>
          <h1 className="text-4xl font-display font-bold">Trading Floor</h1>
        </div>
        <Link
          href="/practice"
          className="flex items-center gap-2 bg-primary text-text-inverse px-6 py-3 rounded-radius-button font-bold hover:bg-primary-hover transition-colors duration-150 cursor-pointer"
        >
          <LineChart className="w-5 h-5" />
          Open Practice Floor
        </Link>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Portfolio Value + Chart */}
        <div className="col-span-12 lg:col-span-8 bg-surface border border-border rounded-radius-card p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-1">
                Total Portfolio Value
              </h3>
              <div className="text-5xl font-display font-bold tabular-nums">
                ${metrics.totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
              <div
                className={`flex items-center gap-1 mt-2 font-medium ${
                  pnlUp ? 'text-success' : 'text-error'
                }`}
              >
                {pnlUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="tabular-nums">
                  {pnlUp ? '+' : ''}${metrics.totalPnl.toFixed(2)} ({metrics.returnPct.toFixed(2)}%)
                </span>
                <span className="text-text-muted ml-1 text-xs uppercase font-bold tracking-widest">
                  All time
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-bg border border-border rounded-radius-button px-3 py-1">
              <div className="live-dot" />
              <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Real-time
              </span>
            </div>
          </div>

          {hasChart ? (
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor={pnlUp ? '#00E5A0' : '#EF4444'}
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="100%"
                        stopColor={pnlUp ? '#00E5A0' : '#EF4444'}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" hide />
                  <YAxis domain={[chartMin, chartMax]} hide />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      return (
                        <div className="bg-surface border border-border rounded-lg px-3 py-2 text-sm shadow-md">
                          <div className="text-text-muted text-xs mb-1">
                            {payload[0].payload.label}
                          </div>
                          <div className="font-display font-bold tabular-nums">
                            ${(payload[0].value as number).toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke={pnlUp ? '#00E5A0' : '#EF4444'}
                    strokeWidth={2}
                    fill="url(#portfolioGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: pnlUp ? '#00E5A0' : '#EF4444', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[200px] w-full bg-bg/50 rounded-radius-card border border-border/50 border-dashed flex flex-col items-center justify-center gap-3 text-text-muted">
              <BarChart2 className="w-8 h-8 opacity-30" />
              <p className="text-sm">
                Make your first trade to see performance here
              </p>
            </div>
          )}
        </div>

        {/* Behavioral Fingerprint */}
        <div className="col-span-12 lg:col-span-4 bg-surface border border-border rounded-radius-card p-6 shadow-sm flex flex-col">
          <h3 className="text-text-muted text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-accent" />
            Behavioral Fingerprint
          </h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#1E2028" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'inherit' }}
                />
                <Radar
                  name="Bias"
                  dataKey="A"
                  stroke="#7B61FF"
                  fill="#7B61FF"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-text-muted mt-4 text-center">
            Your top bias is{' '}
            <span className="text-accent font-bold uppercase">FOMO</span>.{' '}
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
            <Link
              href="/practice"
              className="text-primary text-xs font-bold uppercase tracking-widest hover:underline transition-opacity duration-150 cursor-pointer"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-border">
            {portfolio.trades.length === 0 ? (
              <div className="p-8 flex flex-col items-center text-center gap-3">
                <Clock className="w-8 h-8 text-text-muted opacity-30" />
                <p className="text-sm text-text-muted">
                  No trades yet.{' '}
                  <Link
                    href="/practice"
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    Start on the practice floor
                  </Link>
                </p>
              </div>
            ) : (
              portfolio.trades.slice(0, 8).map((t) => (
                <div
                  key={t.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-bg/40 transition-colors duration-150"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-xs shrink-0 ${
                        t.action === 'buy'
                          ? 'bg-primary/10 text-primary'
                          : 'bg-error/10 text-error'
                      }`}
                    >
                      {t.ticker.substring(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold">{t.ticker}</span>
                        <span
                          className={`text-[11px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            t.action === 'buy'
                              ? 'bg-primary/15 text-primary'
                              : 'bg-error/15 text-error'
                          }`}
                        >
                          {t.action}
                        </span>
                      </div>
                      <div className="text-xs text-text-muted mt-0.5 tabular-nums">
                        {t.quantity} @ ${t.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold tabular-nums text-sm">${t.totalValue.toFixed(2)}</div>
                    {t.biasLabel && (
                      <span className="text-[11px] text-accent font-bold uppercase bg-accent/10 px-1.5 py-0.5 rounded">
                        {t.biasLabel.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

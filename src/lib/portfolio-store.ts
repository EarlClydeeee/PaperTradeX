import type { BiasLabel } from '@/types';

export interface StoredPosition {
  ticker: string;
  quantity: number;
  avgCost: number;
  assetType: 'stock' | 'crypto';
}

export interface StoredTrade {
  id: string;
  ticker: string;
  action: 'buy' | 'sell';
  quantity: number;
  price: number;
  totalValue: number;
  executedAt: string;
  biasLabel?: BiasLabel | null;
}

export interface SessionSnapshot {
  hours: 6 | 8;
  label: string;
  createdAt: string;
  portfolioValue: number;
  cash: number;
  totalPnl: number;
  returnPct: number;
  positions: Array<{
    ticker: string;
    quantity: number;
    avgCost: number;
    projectedPrice: number;
    marketValue: number;
    unrealizedPnl: number;
  }>;
}

export interface PortfolioState {
  cash: number;
  startingCash: number;
  positions: StoredPosition[];
  trades: StoredTrade[];
  sessionStartedAt: string | null;
  snapshots: SessionSnapshot[];
}

const STORAGE_KEY = 'papertradex-portfolio';
const DEFAULT_CASH = 50_000;

export function defaultPortfolio(): PortfolioState {
  return {
    cash: DEFAULT_CASH,
    startingCash: DEFAULT_CASH,
    positions: [],
    trades: [],
    sessionStartedAt: null,
    snapshots: [],
  };
}

export function loadPortfolio(): PortfolioState {
  if (typeof window === 'undefined') return defaultPortfolio();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPortfolio();
    return { ...defaultPortfolio(), ...JSON.parse(raw) };
  } catch {
    return defaultPortfolio();
  }
}

export function savePortfolio(state: PortfolioState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function resetPortfolio(): PortfolioState {
  const fresh = defaultPortfolio();
  savePortfolio(fresh);
  return fresh;
}

export function getPosition(
  positions: StoredPosition[],
  ticker: string
): StoredPosition | undefined {
  return positions.find((p) => p.ticker === ticker);
}

export function executePaperTrade(
  state: PortfolioState,
  params: {
    ticker: string;
    action: 'buy' | 'sell';
    quantity: number;
    price: number;
    assetType: 'stock' | 'crypto';
    biasLabel?: BiasLabel | null;
  }
): { state: PortfolioState; error?: string } {
  const { ticker, action, quantity, price, assetType, biasLabel } = params;
  if (quantity <= 0) return { state, error: 'Enter a quantity greater than zero.' };

  const totalValue = quantity * price;
  const next = structuredClone(state);
  const existing = getPosition(next.positions, ticker);

  if (action === 'buy') {
    if (totalValue > next.cash) {
      return { state, error: 'Insufficient paper funds for this order.' };
    }
    next.cash -= totalValue;
    if (existing) {
      const newQty = existing.quantity + quantity;
      existing.avgCost =
        (existing.avgCost * existing.quantity + price * quantity) / newQty;
      existing.quantity = newQty;
    } else {
      next.positions.push({ ticker, quantity, avgCost: price, assetType });
    }
  } else {
    if (!existing || existing.quantity < quantity) {
      return { state, error: "You don't own enough shares to sell." };
    }
    next.cash += totalValue;
    existing.quantity -= quantity;
    if (existing.quantity <= 0) {
      next.positions = next.positions.filter((p) => p.ticker !== ticker);
    }
  }

  if (!next.sessionStartedAt) {
    next.sessionStartedAt = new Date().toISOString();
  }

  next.trades.unshift({
    id: crypto.randomUUID(),
    ticker,
    action,
    quantity,
    price,
    totalValue,
    executedAt: new Date().toISOString(),
    biasLabel,
  });

  return { state: next };
}

export function portfolioMetrics(
  state: PortfolioState,
  prices: Record<string, number>
): {
  positionsValue: number;
  totalValue: number;
  totalPnl: number;
  returnPct: number;
  positionRows: Array<{
    position: StoredPosition;
    price: number;
    marketValue: number;
    unrealizedPnl: number;
    returnPct: number;
  }>;
} {
  const positionRows = state.positions.map((position) => {
    const price = prices[position.ticker] ?? position.avgCost;
    const marketValue = position.quantity * price;
    const costBasis = position.quantity * position.avgCost;
    const unrealizedPnl = marketValue - costBasis;
    const returnPct = costBasis > 0 ? (unrealizedPnl / costBasis) * 100 : 0;
    return { position, price, marketValue, unrealizedPnl, returnPct };
  });

  const positionsValue = positionRows.reduce((s, r) => s + r.marketValue, 0);
  const totalValue = state.cash + positionsValue;
  const totalPnl = totalValue - state.startingCash;
  const returnPct =
    state.startingCash > 0 ? (totalPnl / state.startingCash) * 100 : 0;

  return { positionsValue, totalValue, totalPnl, returnPct, positionRows };
}

export function buildSessionSnapshot(
  state: PortfolioState,
  hours: 6 | 8,
  quotes: Record<string, { price: number; change24h: number }>
): SessionSnapshot {
  const scale = hours / 24;
  const positions = state.positions.map((position) => {
    const quote = quotes[position.ticker];
    const change24h = quote?.change24h ?? 0;
    const basePrice = quote?.price ?? position.avgCost;
    const projectedPrice = basePrice * (1 + (change24h / 100) * scale);
    const marketValue = position.quantity * projectedPrice;
    const costBasis = position.quantity * position.avgCost;
    return {
      ticker: position.ticker,
      quantity: position.quantity,
      avgCost: position.avgCost,
      projectedPrice,
      marketValue,
      unrealizedPnl: marketValue - costBasis,
    };
  });

  const positionsValue = positions.reduce((s, p) => s + p.marketValue, 0);
  const portfolioValue = state.cash + positionsValue;
  const totalPnl = portfolioValue - state.startingCash;
  const returnPct =
    state.startingCash > 0 ? (totalPnl / state.startingCash) * 100 : 0;

  return {
    hours,
    label: `After ${hours} hours`,
    createdAt: new Date().toISOString(),
    portfolioValue,
    cash: state.cash,
    totalPnl,
    returnPct,
    positions,
  };
}

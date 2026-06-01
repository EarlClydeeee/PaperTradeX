export type AssetType = 'stock' | 'crypto';

export interface MarketQuote {
  ticker: string;
  price: number;
  change24h: number;
  assetType: AssetType;
  source: 'live' | 'reference';
  asOf: string;
}

const CRYPTO_IDS: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
};

/** Tickers students can practice with — stocks + crypto in one list */
export const PRACTICE_TICKERS = [
  'AAPL',
  'NVDA',
  'MSFT',
  'TSLA',
  'SPY',
  'BTC',
  'ETH',
  'SOL',
] as const;

export type PracticeTicker = (typeof PRACTICE_TICKERS)[number];

export function isCryptoTicker(ticker: string): boolean {
  return ticker in CRYPTO_IDS;
}

export function assetTypeFor(ticker: string): AssetType {
  return isCryptoTicker(ticker) ? 'crypto' : 'stock';
}

export async function fetchQuote(ticker: string): Promise<MarketQuote> {
  const symbol = ticker.toUpperCase();
  const res = await fetch(`/api/quote?ticker=${encodeURIComponent(symbol)}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Could not load quote for ${symbol}`);
  }
  return res.json();
}

export async function fetchQuotes(
  tickers: string[]
): Promise<Record<string, MarketQuote>> {
  const unique = [...new Set(tickers.map((t) => t.toUpperCase()))];
  const entries = await Promise.all(
    unique.map(async (t) => {
      try {
        const q = await fetchQuote(t);
        return [t, q] as const;
      } catch {
        return null;
      }
    })
  );
  const out: Record<string, MarketQuote> = {};
  for (const e of entries) {
    if (e) out[e[0]] = e[1];
  }
  return out;
}

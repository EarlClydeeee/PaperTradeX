import { NextRequest, NextResponse } from 'next/server';

const CRYPTO_IDS: Record<string, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  SOL: 'solana',
};

/** Reference prices when no API key — updated periodically in code */
const STOCK_REFERENCE: Record<
  string,
  { price: number; change24h: number }
> = {
  AAPL: { price: 228.5, change24h: 0.8 },
  NVDA: { price: 142.3, change24h: 2.1 },
  MSFT: { price: 415.2, change24h: -0.4 },
  TSLA: { price: 248.9, change24h: -1.2 },
  SPY: { price: 582.4, change24h: 0.3 },
};

export async function GET(request: NextRequest) {
  const ticker = request.nextUrl.searchParams.get('ticker')?.toUpperCase();
  if (!ticker) {
    return NextResponse.json({ error: 'ticker required' }, { status: 400 });
  }

  const asOf = new Date().toISOString();

  if (CRYPTO_IDS[ticker]) {
    try {
      const id = CRYPTO_IDS[ticker];
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`;
      const res = await fetch(url, { next: { revalidate: 60 } });
      if (res.ok) {
        const data = await res.json();
        const row = data[id];
        return NextResponse.json({
          ticker,
          price: row.usd,
          change24h: row.usd_24h_change ?? 0,
          assetType: 'crypto',
          source: 'live',
          asOf,
        });
      }
    } catch {
      /* fall through */
    }
  }

  const finnhubKey = process.env.FINNHUB_API_KEY;
  if (finnhubKey && !CRYPTO_IDS[ticker]) {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnhubKey}`,
        { next: { revalidate: 60 } }
      );
      if (res.ok) {
        const d = await res.json();
        if (d.c > 0) {
          const change24h =
            d.pc > 0 ? ((d.c - d.pc) / d.pc) * 100 : (d.dp ?? 0);
          return NextResponse.json({
            ticker,
            price: d.c,
            change24h,
            assetType: 'stock',
            source: 'live',
            asOf,
          });
        }
      }
    } catch {
      /* fall through */
    }
  }

  const ref = STOCK_REFERENCE[ticker];
  if (ref) {
    return NextResponse.json({
      ticker,
      price: ref.price,
      change24h: ref.change24h,
      assetType: CRYPTO_IDS[ticker] ? 'crypto' : 'stock',
      source: 'reference',
      asOf,
    });
  }

  return NextResponse.json(
    { error: `Unsupported ticker: ${ticker}` },
    { status: 404 }
  );
}

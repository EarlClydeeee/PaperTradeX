import { BiasLabel, AICoachingEvent } from '@/types';

interface StoredPositionCtx {
  ticker: string;
  quantity: number;
  avgCost: number;
}

interface StoredTradeCtx {
  ticker: string;
  action: 'buy' | 'sell';
  price: number;
  executedAt: string;
}

interface TradeContext {
  ticker: string;
  action: 'buy' | 'sell';
  price: number;
  quantity: number;
  portfolio_context?: {
    cash: number;
    startingCash: number;
    positions: StoredPositionCtx[];
    trades: StoredTradeCtx[];
  };
  market_context?: {
    change_24h: number;
  };
}

interface CoachResult {
  bias: BiasLabel | null;
  message: string;
  explanation: string;
  psychology: string;
}

// ─── Individual bias detectors ───────────────────────────────────────────────

function detectFOMO(
  action: 'buy' | 'sell',
  change24h: number,
  ticker: string
): CoachResult | null {
  if (action !== 'buy' || change24h <= 10) return null;
  return {
    bias: 'FOMO',
    message: `You're chasing ${ticker} after a ${change24h.toFixed(1)}% rally. The crowd is already in — you're walking into their exit.`,
    explanation:
      'Buying into a parabolic move is a classic FOMO signature. You are overweighting recent price action while ignoring mean-reversion risk. Historically, assets that move 10%+ in 24 hours revert to their average within days.',
    psychology:
      'FOMO is driven by the social instinct to follow the herd. The pain of missing a move feels as real as a financial loss — your brain is confusing social anxiety with a trading signal.',
  };
}

function detectPanicSell(
  action: 'buy' | 'sell',
  change24h: number,
  ticker: string
): CoachResult | null {
  if (action !== 'sell' || change24h >= -10) return null;
  return {
    bias: 'panic_sell',
    message: `You're selling ${ticker} into a ${change24h.toFixed(1)}% crash. Fear is peaking — and that's usually when the bounce starts.`,
    explanation:
      'Panic selling happens at maximum pessimism — often the worst possible entry point for sellers. You may be locking in a loss that the market would recover. Volatility events with sudden drops show a bounce within 5 trading days over 70% of the time.',
    psychology:
      "Loss aversion makes pain twice as intense as the joy of an equal gain. During crashes your brain activates the same circuits as physical threat — triggering a flight reflex instead of rational analysis.",
  };
}

function detectOverconfidence(
  action: 'buy' | 'sell',
  price: number,
  quantity: number,
  portfolioContext?: TradeContext['portfolio_context']
): CoachResult | null {
  if (action !== 'buy' || !portfolioContext) return null;
  const tradeValue = price * quantity;
  const totalPortfolio = portfolioContext.cash + portfolioContext.positions.reduce(
    (sum, p) => sum + p.quantity * p.avgCost, 0
  );
  if (totalPortfolio <= 0) return null;
  const positionPct = (tradeValue / totalPortfolio) * 100;
  if (positionPct < 30) return null;
  return {
    bias: 'overconfidence',
    message: `This trade would be ${positionPct.toFixed(0)}% of your portfolio. Concentrated bets feel bold — but diversification is free risk reduction.`,
    explanation:
      `You are allocating ${positionPct.toFixed(0)}% of your entire portfolio to a single position. Professional traders rarely size individual trades above 5–15% unless they have an extreme high-conviction thesis with defined risk. At ${positionPct.toFixed(0)}%, a 20% adverse move wipes out ${(positionPct * 0.2).toFixed(0)}% of your total equity.`,
    psychology:
      'Overconfidence bias leads traders to systematically overestimate their edge and underestimate variance. The more familiar an asset feels, the larger people tend to bet — even when the fundamentals haven\'t changed.',
  };
}

function detectLossAversion(
  action: 'buy' | 'sell',
  ticker: string,
  price: number,
  portfolioContext?: TradeContext['portfolio_context']
): CoachResult | null {
  if (action !== 'sell' || !portfolioContext) return null;
  const pos = portfolioContext.positions.find((p) => p.ticker === ticker);
  if (!pos || pos.avgCost <= 0) return null;
  const returnPct = ((price - pos.avgCost) / pos.avgCost) * 100;
  if (returnPct >= 0 || returnPct < -30) return null; // only small-to-moderate losses
  return {
    bias: 'loss_aversion',
    message: `You're down ${Math.abs(returnPct).toFixed(1)}% on ${ticker}. Selling now locks in that loss. Is the thesis broken — or is this just noise?`,
    explanation:
      `You bought ${ticker} at $${pos.avgCost.toFixed(2)} and the current price is $${price.toFixed(2)} — a ${Math.abs(returnPct).toFixed(1)}% drawdown. Loss aversion often causes premature exits at temporary dips. Ask: has the reason you bought changed? If not, this might be temporary volatility, not a signal to exit.`,
    psychology:
      'Loss aversion is one of the most documented biases in behavioral finance. Kahneman & Tversky showed that the pain of a loss is felt 2x more intensely than the equivalent gain — causing traders to make fear-based exits that cut long-term returns.',
  };
}

function detectRecencyBias(
  action: 'buy' | 'sell',
  change24h: number,
  ticker: string
): CoachResult | null {
  if (action !== 'buy' || change24h <= 3 || change24h > 10) return null;
  return {
    bias: 'recency_bias',
    message: `${ticker} is up ${change24h.toFixed(1)}% today. Are you buying the trend or buying the news? Recent momentum is not a strategy.`,
    explanation:
      "You're entering after a moderate single-day move. Recency bias makes the most recent price action feel like evidence of a permanent trend. In practice, short-term momentum at 3–10% gains has no statistically reliable predictive power for the next 24 hours.",
    psychology:
      "The availability heuristic means your brain weighs recent events more heavily than the full historical base rate. A green candle today is vivid and easy to recall — making it feel like proof of a continuing trend when it's often just noise.",
  };
}

function detectAnchoring(
  ticker: string,
  action: 'buy' | 'sell',
  portfolioContext?: TradeContext['portfolio_context']
): CoachResult | null {
  if (!portfolioContext) return null;
  const recentTrades = portfolioContext.trades.filter(
    (t) => t.ticker === ticker && t.action === action
  );
  if (recentTrades.length < 2) return null;
  return {
    bias: 'anchoring',
    message: `This is your ${recentTrades.length + 1}th ${action} on ${ticker}. Are you averaging down because of conviction — or because you can't let go of your original price?`,
    explanation:
      `You have made ${recentTrades.length} prior ${action} trades on ${ticker}. Repeated trading in one asset is often driven by anchoring to your original entry price. Traders who average down on losing positions can escalate losses significantly when wrong.`,
    psychology:
      "Anchoring is the tendency to fixate on a specific price (your entry) as a reference point for future decisions. When a position moves against you, the original price becomes a mental anchor — and you may keep buying to 'get back to even' rather than evaluating the current thesis.",
  };
}

function detectDispositionEffect(
  ticker: string,
  action: 'buy' | 'sell',
  price: number,
  portfolioContext?: TradeContext['portfolio_context']
): CoachResult | null {
  if (action !== 'sell' || !portfolioContext) return null;
  const pos = portfolioContext.positions.find((p) => p.ticker === ticker);
  if (!pos || pos.avgCost <= 0) return null;
  const returnPct = ((price - pos.avgCost) / pos.avgCost) * 100;
  if (returnPct < 5) return null; // only flag when selling a clear winner early

  // Check if the position was opened recently (within last 3 trades)
  const posOpenTrade = [...portfolioContext.trades]
    .reverse()
    .find((t) => t.ticker === ticker && t.action === 'buy');
  if (!posOpenTrade) return null;

  const msSinceOpen = Date.now() - new Date(posOpenTrade.executedAt).getTime();
  const hoursSinceOpen = msSinceOpen / (1000 * 60 * 60);

  if (hoursSinceOpen > 48) return null; // only flag quick flips

  return {
    bias: 'disposition_effect',
    message: `You're up ${returnPct.toFixed(1)}% on ${ticker} and selling after just ${hoursSinceOpen < 1 ? 'minutes' : `${hoursSinceOpen.toFixed(0)} hours`}. You're cutting your winner short.`,
    explanation:
      `You opened this position ${hoursSinceOpen < 1 ? 'less than an hour' : `~${hoursSinceOpen.toFixed(0)} hours`} ago and it's up ${returnPct.toFixed(1)}%. The disposition effect causes traders to sell winners too early and hold losers too long. You're exhibiting the classic pattern: booking a quick gain before giving the trade room to run.`,
    psychology:
      'The disposition effect is the mirror of loss aversion: gains feel good, and locking them in avoids the anxiety of watching them disappear. But systematically cutting winners short and riding losers destroys long-term expected value.',
  };
}

// ─── Main coach function ──────────────────────────────────────────────────────

export const coachTrade = async (context: TradeContext): Promise<Partial<AICoachingEvent>> => {
  const { ticker, action, price, quantity, market_context, portfolio_context } = context;
  const change24h = market_context?.change_24h ?? 0;

  // Run each detector in priority order — first match wins
  const detectors = [
    () => detectFOMO(action, change24h, ticker),
    () => detectPanicSell(action, change24h, ticker),
    () => detectOverconfidence(action, price, quantity, portfolio_context),
    () => detectLossAversion(action, ticker, price, portfolio_context),
    () => detectAnchoring(ticker, action, portfolio_context),
    () => detectDispositionEffect(ticker, action, price, portfolio_context),
    () => detectRecencyBias(action, change24h, ticker),
  ];

  let result: CoachResult | null = null;
  for (const detect of detectors) {
    result = detect();
    if (result) break;
  }

  if (result) {
    return {
      bias_label: result.bias,
      coach_message: result.message,
      explanation: result.explanation,
      psychology_note: result.psychology,
      is_fallback: true,
      confidence: 0.85,
    };
  }

  return {
    bias_label: null,
    coach_message: 'Clean execution. This trade aligns with a disciplined, rules-based strategy.',
    explanation:
      'No major behavioral biases were detected. You sized the position within normal limits, the market context supports this move, and you have not shown signs of emotional trading on this ticker.',
    psychology_note:
      'Disciplined trading means executing your strategy consistently without letting short-term market noise override your system. This is what building edge looks like.',
    is_fallback: true,
    confidence: 0.9,
  };
};

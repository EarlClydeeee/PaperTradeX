import { BiasLabel, AICoachingEvent } from '@/types';

interface TradeContext {
  ticker: string;
  action: 'buy' | 'sell';
  price: number;
  quantity: number;
  portfolio_context?: any;
  market_context?: {
    change_24h: number;
  };
}

export const coachTrade = async (context: TradeContext): Promise<Partial<AICoachingEvent>> => {
  // In a real implementation, this would call a Supabase Edge Function
  // const { data, error } = await supabase.functions.invoke('coach-trade', { body: context });
  
  // Rule-based heuristic fallback (as specified in SDD)
  const { ticker, action, market_context } = context;
  const change24h = market_context?.change_24h || 0;

  let bias: BiasLabel | null = null;
  let message = "Clean execution. This trade aligns with a disciplined strategy.";
  let explanation = "No major behavioral biases were detected in this transaction. You're following a structured approach.";
  let psychology = "Disciplined trading involves sticking to a plan regardless of short-term market noise.";

  if (action === 'buy' && change24h > 10) {
    bias = 'FOMO';
    message = `You're buying ${ticker} after a ${change24h}% rally. Your brain is screaming 'don't miss out', but history says this is where the dump starts.`;
    explanation = "Buying at the top of a parabolic move is a classic FOMO signature. You are overweighting the most recent price action while ignoring the mean-reversion risk.";
    psychology = "The Fear of Missing Out (FOMO) is driven by the social instinct to follow the herd, often leading to buying at the peak of emotional cycles.";
  } else if (action === 'sell' && change24h < -15) {
    bias = 'panic_sell';
    message = `You're selling ${ticker} during a sharp ${change24h}% drop. This looks like an emotional reaction to short-term pain.`;
    explanation = "Panic selling often happens at the point of maximum pessimism. You might be locking in losses that would have recovered if you held through the volatility.";
    psychology = "Loss aversion makes the pain of a loss feel twice as intense as the joy of an equivalent gain, triggering an 'escape' reflex during crashes.";
  } else if (action === 'buy' && ticker === 'BTC' && change24h > 5) {
    bias = 'recency_bias';
    message = "Buying the dip? Or just buying the green? BTC's recent momentum is clouding your long-term thesis.";
    explanation = "Recency bias leads us to believe that the most recent trend will continue indefinitely into the future.";
    psychology = "Your brain treats recent gains as proof the trend will continue — that's availability bias, not fundamental analysis.";
  }

  return {
    bias_label: bias,
    coach_message: message,
    explanation: explanation,
    psychology_note: psychology,
    is_fallback: true,
    confidence: 0.85,
  };
};

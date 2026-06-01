export type BiasLabel = 
  | 'FOMO' 
  | 'loss_aversion' 
  | 'overconfidence' 
  | 'recency_bias' 
  | 'anchoring' 
  | 'disposition_effect';

export interface User {
  id: string;
  created_at: string;
  display_name: string | null;
  starting_capital: number;
  market_interests: ('stocks' | 'crypto' | 'both')[];
}

export interface Portfolio {
  id: string;
  user_id: string;
  cash_balance: number;
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: string;
  portfolio_id: string;
  ticker: string;
  quantity: number;
  avg_cost: number;
  asset_type: 'stock' | 'crypto';
  updated_at: string;
}

export interface Trade {
  id: string;
  portfolio_id: string;
  ticker: string;
  action: 'buy' | 'sell';
  quantity: number;
  price: number;
  total_value: number;
  executed_at: string;
  ai_coaching_id?: string;
}

export interface AICoachingEvent {
  id: string;
  trade_id: string;
  user_id: string;
  bias_label: BiasLabel | null;
  confidence: number;
  coach_message: string;
  explanation: string;
  is_fallback: boolean;
  flagged: boolean;
  created_at: string;
}

export interface BehavioralFingerprint {
  id: string;
  user_id: string;
  fomo_count: number;
  loss_aversion_count: number;
  overconfidence_count: number;
  recency_bias_count: number;
  anchoring_count: number;
  disposition_effect_count: number;
  total_trades: number;
  updated_at: string;
}

export interface EducationModule {
  id: string;
  title: string;
  content: any; // JSONB
  unlock_milestone: string;
  order_index: number;
}

export interface UserModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  unlocked_at: string | null;
  completed_at: string | null;
}

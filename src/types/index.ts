export type BiasLabel = 
  | 'FOMO' 
  | 'panic_sell' 
  | 'loss_aversion' 
  | 'overconfidence' 
  | 'recency_bias' 
  | 'anchoring' 
  | 'disposition_effect';

export interface Profile {
  id: string;
  created_at: string;
  display_name: string | null;
  starting_capital: number;
  market_interests: string[];
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
  ai_coaching_id: string | null;
}

export interface AICoachingEvent {
  id: string;
  trade_id: string;
  user_id: string;
  bias_label: BiasLabel | null;
  psychology_note: string | null;
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
  content: any;
  topic: 'blockchain' | 'defi' | 'risk_management' | 'options_prereq' | 'practice';
  gates_instruments: string[];
  order_index: number;
  quiz_pass_score: number;
}

export interface UserModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  started_at: string | null;
  completed_at: string | null;
  quiz_score: number | null;
}

export interface WeeklyDebrief {
  id: string;
  user_id: string;
  week_start: string;
  summary_json: {
    replay_entries: any[];
    top_biases: any[];
    improvement_focus: string;
  };
  generated_at: string;
}

export interface SchoolGroup {
  id: string;
  name: string;
  join_code: string;
  teacher_user_id: string;
  competition_start: string | null;
  competition_end: string | null;
  leaderboard_mode: 'return_pct' | 'risk_adjusted' | 'learning_completion';
  created_at: string;
}

export interface GroupMembership {
  id: string;
  group_id: string;
  user_id: string;
  joined_at: string;
}

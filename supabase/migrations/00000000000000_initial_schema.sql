-- 00000000000000_initial_schema.sql

-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  display_name TEXT,
  starting_capital NUMERIC DEFAULT 50000,
  market_interests TEXT[] DEFAULT '{}'
);

-- Portfolios table
CREATE TABLE IF NOT EXISTS public.portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  cash_balance NUMERIC NOT NULL DEFAULT 50000,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Positions table
CREATE TABLE IF NOT EXISTS public.positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  quantity NUMERIC NOT NULL,
  avg_cost NUMERIC NOT NULL,
  asset_type TEXT CHECK (asset_type IN ('stock', 'crypto')),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(portfolio_id, ticker)
);

-- AI Coaching Events table (must be before trades to handle the optional FK if desired, 
-- but SDD says trades has ai_coaching_id REFERENCES ai_coaching_events(id))
-- Actually, SDD says ai_coaching_events has trade_id. Let's follow SDD's trade_id.
CREATE TABLE IF NOT EXISTS public.ai_coaching_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  bias_label TEXT CHECK (bias_label IN (
    'FOMO', 'loss_aversion', 'overconfidence', 
    'recency_bias', 'anchoring', 'disposition_effect'
  )),
  confidence NUMERIC CHECK (confidence BETWEEN 0 AND 1),
  coach_message TEXT,
  explanation TEXT,
  is_fallback BOOLEAN DEFAULT false,
  flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Trades table
CREATE TABLE IF NOT EXISTS public.trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  ticker TEXT NOT NULL,
  action TEXT CHECK (action IN ('buy', 'sell')),
  quantity NUMERIC NOT NULL,
  price NUMERIC NOT NULL,
  total_value NUMERIC NOT NULL,
  executed_at TIMESTAMPTZ DEFAULT now(),
  ai_coaching_id UUID REFERENCES public.ai_coaching_events(id)
);

-- Add trade_id to ai_coaching_events if needed (SDD says both directions?)
ALTER TABLE public.ai_coaching_events ADD COLUMN trade_id UUID REFERENCES public.trades(id) ON DELETE CASCADE;

-- Behavioral Fingerprints table
CREATE TABLE IF NOT EXISTS public.behavioral_fingerprints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  fomo_count INTEGER DEFAULT 0,
  loss_aversion_count INTEGER DEFAULT 0,
  overconfidence_count INTEGER DEFAULT 0,
  recency_bias_count INTEGER DEFAULT 0,
  anchoring_count INTEGER DEFAULT 0,
  disposition_effect_count INTEGER DEFAULT 0,
  total_trades INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Education Modules
CREATE TABLE IF NOT EXISTS public.education_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content JSONB NOT NULL,
  unlock_milestone TEXT NOT NULL,
  order_index INTEGER
);

-- User Module Progress
CREATE TABLE IF NOT EXISTS public.user_module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.education_modules(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, module_id)
);

-- School Groups
CREATE TABLE IF NOT EXISTS public.school_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL,
  teacher_user_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Group Memberships
CREATE TABLE IF NOT EXISTS public.group_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES public.school_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- RLS Policies (Basic ones, to be refined)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_coaching_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.behavioral_fingerprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own portfolio" ON public.portfolios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own positions" ON public.positions FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid())
);
CREATE POLICY "Users can view their own trades" ON public.trades FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid())
);
CREATE POLICY "Users can view their own coaching events" ON public.ai_coaching_events FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can view their own fingerprint" ON public.behavioral_fingerprints FOR SELECT USING (user_id = auth.uid());

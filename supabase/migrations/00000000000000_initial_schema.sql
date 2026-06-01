-- 00000000000000_initial_schema.sql

-- Enable uuid-ossp extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  display_name TEXT,
  starting_capital NUMERIC DEFAULT 50000,
  market_interests TEXT[] DEFAULT '{}' CHECK (market_interests <@ ARRAY['stocks','crypto','both']::TEXT[])
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

-- AI Coaching Events table
CREATE TABLE IF NOT EXISTS public.ai_coaching_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id),
  bias_label TEXT CHECK (bias_label IN (
    'FOMO', 'panic_sell', 'loss_aversion', 'overconfidence', 
    'recency_bias', 'anchoring', 'disposition_effect'
  )),
  psychology_note TEXT, -- plain-English why-the-brain-does-this (≤150 chars)
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

-- Add trade_id to ai_coaching_events
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
  topic TEXT CHECK (topic IN ('blockchain','defi','risk_management','options_prereq')),
  gates_instruments TEXT[] DEFAULT '{}', -- e.g. ['options','altcoin_extended']
  order_index INTEGER,
  quiz_pass_score INTEGER DEFAULT 80
);

-- User Module Progress
CREATE TABLE IF NOT EXISTS public.user_module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id UUID REFERENCES public.education_modules(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  UNIQUE(user_id, module_id)
);

-- Weekly Debriefs
CREATE TABLE IF NOT EXISTS public.weekly_debriefs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  summary_json JSONB NOT NULL, -- replay_entries, top_biases, improvement_focus
  generated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, week_start)
);

-- School Groups
CREATE TABLE IF NOT EXISTS public.school_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  join_code TEXT UNIQUE NOT NULL,
  teacher_user_id UUID REFERENCES public.profiles(id),
  competition_start TIMESTAMPTZ,
  competition_end TIMESTAMPTZ,
  leaderboard_mode TEXT CHECK (leaderboard_mode IN ('return_pct','risk_adjusted','learning_completion')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Classroom Scenarios (V1.1)
CREATE TABLE IF NOT EXISTS public.classroom_scenarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES public.school_groups(id) ON DELETE CASCADE,
  scenario_key TEXT CHECK (scenario_key IN ('crash_2008','crypto_boom_2021','custom')),
  assigned_at TIMESTAMPTZ DEFAULT now()
);

-- Certificates (V1.1)
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  track_title TEXT NOT NULL,
  verification_id TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT now()
);

-- Group Memberships
CREATE TABLE IF NOT EXISTS public.group_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID REFERENCES public.school_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(group_id, user_id)
);

-- RLS Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_coaching_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.behavioral_fingerprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_debriefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.school_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classroom_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_memberships ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Portfolios: Users can view their own portfolio
CREATE POLICY "Users can view their own portfolio" ON public.portfolios FOR SELECT USING (auth.uid() = user_id);

-- Positions: Users can view their own positions
CREATE POLICY "Users can view their own positions" ON public.positions FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid())
);

-- Trades: Users can view their own trades
CREATE POLICY "Users can view their own trades" ON public.trades FOR SELECT USING (
  portfolio_id IN (SELECT id FROM public.portfolios WHERE user_id = auth.uid())
);

-- AI Coaching Events: Users can view their own coaching events
CREATE POLICY "Users can view their own coaching events" ON public.ai_coaching_events FOR SELECT USING (user_id = auth.uid());

-- Behavioral Fingerprints: Users can view their own fingerprint
CREATE POLICY "Users can view their own fingerprint" ON public.behavioral_fingerprints FOR SELECT USING (user_id = auth.uid());

-- Education Modules: Everyone can view modules
CREATE POLICY "Everyone can view education modules" ON public.education_modules FOR SELECT USING (true);

-- User Module Progress: Users can view and update their own progress
CREATE POLICY "Users can view their own progress" ON public.user_module_progress FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update their own progress" ON public.user_module_progress FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update their own progress update" ON public.user_module_progress FOR UPDATE USING (user_id = auth.uid());

-- Weekly Debriefs: Users can view their own debriefs
CREATE POLICY "Users can view their own debriefs" ON public.weekly_debriefs FOR SELECT USING (user_id = auth.uid());

-- School Groups: Members and teachers can view groups
CREATE POLICY "Members can view groups" ON public.school_groups FOR SELECT USING (
  id IN (SELECT group_id FROM public.group_memberships WHERE user_id = auth.uid()) OR
  teacher_user_id = auth.uid()
);

-- Classroom Scenarios: Group members can view scenarios
CREATE POLICY "Members can view scenarios" ON public.classroom_scenarios FOR SELECT USING (
  group_id IN (SELECT group_id FROM public.group_memberships WHERE user_id = auth.uid())
);

-- Certificates: Users can view their own certificates
CREATE POLICY "Users can view their own certificates" ON public.certificates FOR SELECT USING (user_id = auth.uid());

-- Group Memberships: Users can view their own memberships and teachers can view all in their group
CREATE POLICY "Users can view their own memberships" ON public.group_memberships FOR SELECT USING (
  user_id = auth.uid() OR
  group_id IN (SELECT id FROM public.school_groups WHERE teacher_user_id = auth.uid())
);

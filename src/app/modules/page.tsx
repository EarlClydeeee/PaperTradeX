"use client";

import React from 'react';
import { BookOpen, Lock, CheckCircle, Clock, PlayCircle, Zap } from 'lucide-react';

const modules = [
  {
    id: 'm1',
    title: 'Blockchain Basics',
    topic: 'blockchain',
    description: 'Understand the foundation of decentralized finance and how crypto transactions work.',
    status: 'completed',
    time: '15 min',
    gates: [],
  },
  {
    id: 'm2',
    title: 'Risk Management 101',
    topic: 'risk_management',
    description: 'Learn about position sizing, stop losses, and how to protect your capital.',
    status: 'in_progress',
    time: '20 min',
    gates: ['options', 'altcoin_extended'],
  },
  {
    id: 'm3',
    title: 'DeFi Deep Dive',
    topic: 'defi',
    description: 'Explore liquidity pools, yield farming, and the future of banking.',
    status: 'locked',
    time: '25 min',
    gates: ['advanced_crypto'],
  },
  {
    id: 'm4',
    title: 'Options Prerequisites',
    topic: 'options_prereq',
    description: 'Master the Greeks and understand the risks of leveraged trading.',
    status: 'locked',
    time: '30 min',
    gates: ['options_trading'],
  },
];

export default function EducationPage() {
  return (
    <div className="p-8 space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-text-muted text-sm font-medium uppercase tracking-wider">Learning Path</h2>
          <h1 className="text-4xl font-display font-bold text-[#1A1D25]">Education Center</h1>
          <p className="text-text-muted mt-2 max-w-2xl">
            Master the fundamentals to unlock advanced trading instruments. 
            Complete modules to earn certificates and improve your risk-adjusted score.
          </p>
        </div>
        <div className="bg-primary/10 border border-primary/20 rounded-radius-card p-4 flex items-center gap-4">
          <div className="bg-primary p-2 rounded-lg text-white">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-primary font-bold uppercase tracking-widest">Progress</div>
            <div className="text-lg font-display font-bold text-primary">1 / 4 Modules</div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <ModuleCard key={module.id} {...module} />
        ))}
      </div>

      <div className="mt-12 p-8 bg-bg border border-border rounded-radius-card flex flex-col items-center text-center">
        <Lock className="w-12 h-12 text-text-muted mb-4" />
        <h3 className="text-2xl font-display font-bold text-[#1A1D25]">Unlock Advanced Trading</h3>
        <p className="text-text-muted mt-2 max-w-lg">
          Trading options and extended altcoins is currently locked. 
          Complete the <strong>Risk Management 101</strong> and <strong>Options Prerequisites</strong> modules to gain access.
        </p>
        <button className="mt-6 px-8 py-3 bg-[#1A1D25] text-white rounded-radius-button font-bold hover:bg-black transition-all">
          Continue Learning
        </button>
      </div>
    </div>
  );
}

function ModuleCard({ title, description, status, time, gates }: any) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  return (
    <div className={`bg-surface border ${isLocked ? 'border-border opacity-75' : 'border-border shadow-sm'} rounded-radius-card overflow-hidden transition-all group hover:border-primary/50`}>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-lg ${isLocked ? 'bg-bg' : 'bg-primary/10'} transition-colors`}>
            {isLocked ? <Lock className="w-5 h-5 text-text-muted" /> : <BookOpen className="w-5 h-5 text-primary" />}
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1 text-success text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              Completed
            </div>
          )}
          {status === 'in_progress' && (
            <div className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider">
              <PlayCircle className="w-4 h-4" />
              In Progress
            </div>
          )}
        </div>

        <div>
          <h3 className="text-xl font-display font-bold text-[#1A1D25] group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-text-muted mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium">
            <Clock className="w-4 h-4" />
            {time}
          </div>
          {gates.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-accent font-bold uppercase tracking-widest">
              <Zap className="w-3 h-3" />
              Unlocks {gates[0]}
            </div>
          )}
        </div>
      </div>

      <div className="px-6 py-4 bg-bg/50 border-t border-border flex justify-between items-center">
        {isLocked ? (
          <span className="text-xs text-text-muted font-bold uppercase tracking-wider italic">Prerequisites required</span>
        ) : (
          <button className="text-primary text-sm font-bold uppercase tracking-widest hover:underline flex items-center gap-2">
            {isCompleted ? 'Review Content' : 'Start Module'}
            <PlayCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

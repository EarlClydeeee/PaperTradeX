"use client";

import React, { useState } from 'react';
import { Users, Trophy, Target, BookOpen, ChevronUp, ChevronDown } from 'lucide-react';

const leaderboardData = [
  { rank: 1, name: 'Jordan D.', return: 24.5, biasScore: 92, modules: 4, avatar: 'JD' },
  { rank: 2, name: 'Sarah L.', return: 21.2, biasScore: 88, modules: 3, avatar: 'SL' },
  { rank: 3, name: 'Alex M.', return: 18.8, biasScore: 95, modules: 4, avatar: 'AM' },
  { rank: 4, name: 'Chris K.', return: 15.4, biasScore: 74, modules: 2, avatar: 'CK' },
  { rank: 5, name: 'Taylor R.', return: 12.1, biasScore: 81, modules: 3, avatar: 'TR' },
  { rank: 6, name: 'Casey B.', return: 9.5, biasScore: 65, modules: 1, avatar: 'CB' },
];

export default function LeaderboardPage() {
  const [sortBy, setSortBy] = useState<'return' | 'biasScore' | 'modules'>('return');

  return (
    <div className="p-8 space-y-8">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-text-muted text-sm font-medium uppercase tracking-wider">Competition</h2>
          <h1 className="text-4xl font-display font-bold text-[#1A1D25]">Finance 101 — Fall 2026</h1>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium bg-bg px-2 py-1 rounded border border-border">
              <Users className="w-4 h-4" />
              24 Students
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-muted font-medium bg-bg px-2 py-1 rounded border border-border">
              <Trophy className="w-4 h-4 text-warning" />
              12 Days Left
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-[#1A1D25] text-white rounded-radius-button text-sm font-bold hover:bg-black transition-all">
            Join Group
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Class Avg Return" value="+14.2%" icon={<Target className="text-primary" />} />
        <StatCard label="Avg Bias Control" value="82/100" icon={<BookOpen className="text-accent" />} />
        <StatCard label="Modules Completed" value="68%" icon={<ChevronUp className="text-success" />} />
      </div>

      {/* Leaderboard Table */}
      <div className="bg-surface border border-border rounded-radius-card shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-border bg-bg/30 flex justify-between items-center">
          <h3 className="text-xs text-text-muted font-bold uppercase tracking-widest">Rankings</h3>
          <div className="flex bg-bg p-1 rounded-radius-button border border-border">
            <SortButton active={sortBy === 'return'} onClick={() => setSortBy('return')}>% Return</SortButton>
            <SortButton active={sortBy === 'biasScore'} onClick={() => setSortBy('biasScore')}>Bias Score</SortButton>
            <SortButton active={sortBy === 'modules'} onClick={() => setSortBy('modules')}>Modules</SortButton>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border text-[10px] text-text-muted uppercase font-bold tracking-widest">
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Portfolio Return</th>
                <th className="px-6 py-4">Bias Control</th>
                <th className="px-6 py-4">Learning Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {leaderboardData.map((student) => (
                <tr key={student.rank} className={`group hover:bg-bg/40 transition-colors ${student.rank === 1 ? 'bg-primary/5' : ''}`}>
                  <td className="px-6 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                      student.rank === 1 ? 'bg-warning text-white shadow-lg shadow-warning/20' : 
                      student.rank === 2 ? 'bg-slate-300 text-slate-700' :
                      student.rank === 3 ? 'bg-amber-600/30 text-amber-900' :
                      'text-text-muted'
                    }`}>
                      {student.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bg border border-border rounded-full flex items-center justify-center text-xs font-bold text-text-muted">
                        {student.avatar}
                      </div>
                      <div className="font-display font-bold text-[#1A1D25]">{student.name} {student.rank === 1 && '👑'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 font-display font-bold text-success text-lg">
                      <ChevronUp className="w-4 h-4" />
                      {student.return}%
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-text-muted uppercase tracking-widest">Score</span>
                        <span className={student.biasScore > 80 ? 'text-success' : student.biasScore > 70 ? 'text-warning' : 'text-error'}>
                          {student.biasScore}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-bg rounded-full overflow-hidden border border-border/50">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            student.biasScore > 80 ? 'bg-success' : student.biasScore > 70 ? 'bg-warning' : 'bg-error'
                          }`} 
                          style={{ width: `${student.biasScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4].map((step) => (
                        <div 
                          key={step}
                          className={`w-3 h-3 rounded-sm border ${
                            step <= student.modules ? 'bg-primary border-primary shadow-sm shadow-primary/20' : 'bg-bg border-border'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs font-bold text-text-muted">{student.modules}/4</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }: any) {
  return (
    <div className="bg-surface border border-border rounded-radius-card p-6 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-text-muted text-[10px] font-bold uppercase tracking-widest">{label}</h3>
        <div className="p-1.5 bg-bg rounded-lg">
          {React.cloneElement(icon, { size: 16 })}
        </div>
      </div>
      <div className="text-2xl font-display font-bold text-[#1A1D25]">{value}</div>
    </div>
  );
}

function SortButton({ children, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded transition-all ${
        active ? 'bg-surface text-primary shadow-sm border border-border/50' : 'text-text-muted hover:text-text'
      }`}
    >
      {children}
    </button>
  );
}

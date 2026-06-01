"use client";

import React from 'react';
import { X, Brain, AlertTriangle, CheckCircle2, MessageSquareText } from 'lucide-react';
import { BiasLabel } from '@/types';

interface CoachPanelProps {
  bias?: BiasLabel;
  message: string;
  explanation: string;
  psychologyNote?: string;
  isFallback?: boolean;
  onClose: () => void;
}

const CoachPanel = ({ bias, message, explanation, psychologyNote, isFallback, onClose }: CoachPanelProps) => {
  return (
    <div className="fixed inset-y-0 right-0 w-[360px] bg-[#F8FAFC] border-l border-border shadow-lg z-[60] flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-6 border-b border-border/10 flex justify-between items-center text-[#1A1D25]">
        <div className="flex items-center gap-2">
          <div className="bg-accent/10 p-2 rounded-lg">
            <Brain className="w-5 h-5 text-accent" />
          </div>
          <h2 className="font-display font-bold text-lg tracking-tight">AI Coach</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Bias Badge */}
        {bias ? (
          <div className="flex flex-col gap-3">
            <div className="inline-flex self-start items-center gap-2 px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-wider border border-accent/20">
              <AlertTriangle className="w-3 h-3" />
              {bias.replace('_', ' ')} Detected
            </div>
            <div className="text-[#1A1D25] text-xl font-display font-bold leading-tight">
              Wait a second. This looks like {bias.replace('_', ' ')}.
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="inline-flex self-start items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider border border-primary/20">
              <CheckCircle2 className="w-3 h-3" />
              Clean Execution
            </div>
            <div className="text-[#1A1D25] text-xl font-display font-bold leading-tight">
              Disciplined move. No major biases detected.
            </div>
          </div>
        )}

        {/* Coach Message */}
        <div className="relative p-5 bg-white rounded-radius-card border border-border/5 shadow-sm">
          <div className="absolute -left-2 top-6 w-4 h-4 bg-white rotate-45 border-l border-b border-border/5" />
          <p className="text-[#1A1D25] leading-relaxed">
            "{message}"
          </p>
        </div>

        {/* Psychology Note */}
        {psychologyNote && (
          <div className="p-4 bg-accent/5 rounded-radius-card border border-accent/10">
            <p className="text-sm text-accent font-medium italic leading-relaxed">
              {psychologyNote}
            </p>
          </div>
        )}

        {/* Explanation */}
        <div className="space-y-3">
          <h4 className="text-[10px] text-black/40 font-bold uppercase tracking-widest flex items-center gap-2">
            <MessageSquareText className="w-3 h-3" />
            Why the AI says this
          </h4>
          <p className="text-sm text-[#4A5568] leading-relaxed">
            {explanation}
          </p>
        </div>

        {isFallback && (
          <div className="p-4 bg-warning/10 rounded-radius-card border border-warning/20 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
            <div className="text-xs text-warning font-medium">
              <strong>Quick pattern check:</strong> Our AI coach is taking a breather. This is a heuristic-based assessment.
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border/10 bg-white">
        <div className="flex flex-col gap-3">
          <button className="w-full py-4 bg-[#1A1D25] text-white rounded-radius-button font-bold text-sm hover:bg-black transition-all">
            Got it, thanks
          </button>
          <button className="w-full py-4 text-black/60 font-bold text-sm hover:text-black transition-all">
            Disagree with this assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoachPanel;

"use client";

import React from 'react';
import { X, Brain, AlertTriangle, CheckCircle2, MessageSquareText, ThumbsDown } from 'lucide-react';
import { BiasLabel } from '@/types';

interface CoachPanelProps {
  bias?: BiasLabel;
  message: string;
  explanation: string;
  psychologyNote?: string;
  isFallback?: boolean;
  onClose: () => void;
}

const BIAS_META: Record<BiasLabel, { label: string; color: string }> = {
  FOMO:               { label: 'FOMO',               color: 'text-warning border-warning/30 bg-warning/10' },
  panic_sell:         { label: 'Panic Sell',          color: 'text-error border-error/30 bg-error/10' },
  loss_aversion:      { label: 'Loss Aversion',       color: 'text-error border-error/30 bg-error/10' },
  overconfidence:     { label: 'Overconfidence',      color: 'text-accent border-accent/30 bg-accent/10' },
  recency_bias:       { label: 'Recency Bias',        color: 'text-accent border-accent/30 bg-accent/10' },
  anchoring:          { label: 'Anchoring',           color: 'text-warning border-warning/30 bg-warning/10' },
  disposition_effect: { label: 'Disposition Effect',  color: 'text-warning border-warning/30 bg-warning/10' },
};

const CoachPanel = ({ bias, message, explanation, psychologyNote, isFallback, onClose }: CoachPanelProps) => {
  const meta = bias ? BIAS_META[bias] : null;

  return (
    <div className="fixed inset-y-0 right-0 w-[380px] bg-surface border-l border-border shadow-lg z-[60] flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-accent/10 p-2 rounded-lg">
            <Brain className="w-5 h-5 text-accent" />
          </div>
          <h2 className="font-display font-bold text-lg tracking-tight text-text">AI Coach</h2>
        </div>
        <button
          onClick={onClose}
          className="cursor-pointer p-2 hover:bg-bg rounded-full transition-colors duration-200"
          aria-label="Close coach panel"
        >
          <X className="w-5 h-5 text-text-muted" />
        </button>
      </div>

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        {/* Bias badge + headline */}
        {bias && meta ? (
          <div className="space-y-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${meta.color}`}>
              <AlertTriangle className="w-3 h-3" aria-hidden />
              {meta.label} Detected
            </div>
            <h3 className="text-xl font-display font-bold leading-tight text-text">
              Hold on — this looks like {meta.label.toLowerCase()}.
            </h3>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary/30 bg-primary/10 text-primary">
              <CheckCircle2 className="w-3 h-3" aria-hidden />
              Clean Execution
            </div>
            <h3 className="text-xl font-display font-bold leading-tight text-text">
              Disciplined move. No major biases detected.
            </h3>
          </div>
        )}

        {/* Coach message bubble */}
        <div className="relative p-5 bg-bg rounded-radius-card border border-border">
          <div className="absolute -left-2.5 top-6 w-4 h-4 bg-bg rotate-45 border-l border-b border-border" />
          <p className="text-text leading-relaxed italic">
            &ldquo;{message}&rdquo;
          </p>
        </div>

        {/* Psychology note */}
        {psychologyNote && (
          <div className="p-4 bg-accent/5 rounded-radius-card border border-accent/15">
            <p className="text-sm text-accent font-medium leading-relaxed">
              {psychologyNote}
            </p>
          </div>
        )}

        {/* Why the AI says this */}
        <div className="space-y-2">
          <h4 className="text-[10px] text-text-muted font-bold uppercase tracking-widest flex items-center gap-2">
            <MessageSquareText className="w-3 h-3" aria-hidden />
            Why the AI flagged this
          </h4>
          <p className="text-sm text-text-muted leading-relaxed">
            {explanation}
          </p>
        </div>

        {/* Fallback notice */}
        {isFallback && (
          <div className="p-4 bg-warning/10 rounded-radius-card border border-warning/20 flex gap-3">
            <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" aria-hidden />
            <p className="text-xs text-warning font-medium leading-relaxed">
              <strong>Pattern check:</strong> AI coach is using rule-based heuristics. Connect an LLM API for deeper analysis.
            </p>
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="p-6 border-t border-border space-y-2">
        <button
          onClick={onClose}
          className="cursor-pointer w-full py-4 bg-primary text-text-inverse rounded-radius-button font-bold text-sm hover:bg-primary-hover transition-colors duration-200"
        >
          Got it, thanks
        </button>
        <button
          onClick={onClose}
          className="cursor-pointer w-full py-3 text-text-muted font-medium text-sm hover:text-text transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ThumbsDown className="w-4 h-4" aria-hidden />
          Disagree with assessment
        </button>
      </div>
    </div>
  );
};

export default CoachPanel;

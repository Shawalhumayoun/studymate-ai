import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Lightbulb } from 'lucide-react';

interface LoadingStateProps {
  mode: 'summary' | 'quiz' | 'both';
}

const STUDY_TIPS = [
  "Active recall improves long-term memory retention by up to 150% compared to passive re-reading.",
  "Spaced repetition helps move key information from short-term to long-term memory.",
  "Teaching concepts to someone else (the Feynman Technique) quickly exposes gaps in understanding.",
  "Taking practice quizzes reduces test anxiety and strengthens neural pathways.",
  "Short 25-minute study sessions (Pomodoro technique) maintain peak concentration."
];

export const LoadingState: React.FC<LoadingStateProps> = ({ mode }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % STUDY_TIPS.length);
    }, 3500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return 92;
        return prev + Math.floor(Math.random() * 8) + 3;
      });
    }, 400);

    return () => {
      clearInterval(tipInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const getTitle = () => {
    if (mode === 'summary') return 'Synthesizing Your Study Guide...';
    if (mode === 'quiz') return 'Drafting 5 MCQ Exam Questions...';
    return 'Creating Complete Study Package...';
  };

  return (
    <div className="max-w-2xl mx-auto my-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center shadow-lg transition-colors duration-200 space-y-6">
      
      {/* Animated Centerpiece */}
      <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-indigo-500/20 dark:bg-indigo-500/30 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 animate-spin opacity-80 blur-xs" />
        <div className="relative w-16 h-16 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-inner border border-slate-100 dark:border-slate-800">
          {mode === 'quiz' ? (
            <Brain className="w-8 h-8 text-violet-600 dark:text-violet-400 animate-bounce" />
          ) : (
            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400 animate-pulse" />
          )}
        </div>
      </div>

      {/* Main Title & Progress Bar */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {getTitle()}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Gemini AI is analyzing your study notes to generate accurate, high-yield material.
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden mt-4">
          <div 
            className="bg-gradient-to-r from-indigo-600 to-violet-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Rotating Study Tip Box */}
      <div className="max-w-md mx-auto p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 text-left flex items-start space-x-3 transition-all">
        <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 block mb-0.5">
            Study Tip
          </span>
          <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed italic">
            "{STUDY_TIPS[currentTipIndex]}"
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { BookOpen, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 transition-colors py-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-widest flex items-center space-x-2">
          <span>&copy; StudyMate AI</span>
          <span>&bull;</span>
          <span>Powered by Gemini AI</span>
        </div>

        <div className="flex items-center space-x-4 text-[11px] font-medium">
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span>AI Engine Online</span>
          </span>
          <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">&bull;</span>
          <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">System Status: Optimal</span>
        </div>
      </div>
    </footer>
  );
};

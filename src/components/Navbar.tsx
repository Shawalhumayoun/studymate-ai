import React from 'react';
import { BookOpen, Sparkles, Sun, Moon, History, PenTool, HelpCircle } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  historyCount: number;
  hasSummary: boolean;
  hasQuiz: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  historyCount,
  hasSummary,
  hasQuiz,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('input')} 
          className="flex items-center space-x-3 cursor-pointer group"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                StudyMate
              </span>
              <span className="px-1.5 py-0.5 text-xs font-semibold rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                AI
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Turn Notes into Summaries & Quizzes
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <button
            id="nav-tab-notes"
            onClick={() => setActiveTab('input')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'input'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span className="hidden md:inline">Notes Input</span>
          </button>

          <button
            id="nav-tab-summary"
            disabled={!hasSummary}
            onClick={() => hasSummary && setActiveTab('summary')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'summary'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                : hasSummary
                ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
                : 'text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden md:inline">Summary</span>
            {hasSummary && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          <button
            id="nav-tab-quiz"
            disabled={!hasQuiz}
            onClick={() => hasQuiz && setActiveTab('quiz')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'quiz'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                : hasQuiz
                ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
                : 'text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-50'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden md:inline">Quiz</span>
            {hasQuiz && (
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            )}
          </button>

          <button
            id="nav-tab-history"
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span className="hidden md:inline">History</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                {historyCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            id="dark-mode-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-2"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};

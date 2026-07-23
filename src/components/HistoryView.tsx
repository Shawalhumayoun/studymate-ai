import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Sparkles, 
  Brain, 
  Search, 
  Clock, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryViewProps {
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem, view: 'summary' | 'quiz') => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
  onStartNewNotes: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectHistory,
  onDeleteItem,
  onClearAll,
  onStartNewNotes,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.notesSnippet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Saved Study History
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Access your previously generated study guides and practice quizzes saved locally.
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            id="clear-all-history-btn"
            onClick={onClearAll}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search Filter Bar */}
      {history.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search saved summaries or quizzes by title or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>
      )}

      {/* History Items Grid */}
      {history.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500 mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No Saved History Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Whenever you generate a summary or quiz, it will automatically be saved here so you can review it anytime.
            </p>
          </div>
          <button
            onClick={onStartNewNotes}
            className="inline-flex items-center space-x-2 py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md transition-colors"
          >
            <span>Create First Study Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500 text-xs">
          No history items matching "{searchTerm}".
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 p-1 rounded-lg transition-colors shrink-0"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400 dark:text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{new Date(item.createdAt).toLocaleDateString()} at {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-950/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  {item.notesSnippet}...
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                {item.summary && (
                  <button
                    onClick={() => onSelectHistory(item, 'summary')}
                    className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Summary</span>
                  </button>
                )}

                {item.quiz && (
                  <button
                    onClick={() => onSelectHistory(item, 'quiz')}
                    className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-violet-50 dark:bg-violet-950/60 hover:bg-violet-100 dark:hover:bg-violet-900/60 text-violet-700 dark:text-violet-300 text-xs font-semibold transition-colors"
                  >
                    <Brain className="w-3.5 h-3.5" />
                    <span>Quiz</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { NotesInput } from './components/NotesInput';
import { SummaryView } from './components/SummaryView';
import { QuizView } from './components/QuizView';
import { HistoryView } from './components/HistoryView';
import { LoadingState } from './components/LoadingState';
import { ErrorBanner } from './components/ErrorBanner';
import { Footer } from './components/Footer';
import { ActiveTab, SummaryResult, QuizResult, HistoryItem } from './types';

const HISTORY_STORAGE_KEY = 'studymate_ai_history';
const DARK_MODE_STORAGE_KEY = 'studymate_ai_darkmode';

export default function App() {
  const [notesText, setNotesText] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('input');
  
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [quiz, setQuiz] = useState<QuizResult | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMode, setLoadingMode] = useState<'summary' | 'quiz' | 'both'>('summary');
  const [error, setError] = useState<string | null>(null);

  // Dark mode state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(DARK_MODE_STORAGE_KEY);
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // History state
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Apply dark mode class to html document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(darkMode));
  }, [darkMode]);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }, [history]);

  // Helper to append or update history item
  const saveToHistory = (
    notes: string,
    newSummary?: SummaryResult | null,
    newQuiz?: QuizResult | null
  ) => {
    if (!newSummary && !newQuiz) return;

    const snippet = notes.slice(0, 120).trim();
    const title = newSummary?.title || newQuiz?.title || 'Study Guide';

    setHistory((prev) => {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        title,
        notesSnippet: snippet,
        fullNotes: notes,
        summary: newSummary || undefined,
        quiz: newQuiz || undefined,
        createdAt: Date.now(),
      };
      return [newItem, ...prev.slice(0, 24)]; // Keep up to 25 items
    });
  };

  // Generate Summary handler
  const handleGenerateSummary = async () => {
    if (!notesText.trim()) return;
    setError(null);
    setIsLoading(true);
    setLoadingMode('summary');

    try {
      const res = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesText }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate summary.');
      }

      setSummary(data);
      saveToHistory(notesText, data, quiz);
      setActiveTab('summary');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong while generating the summary.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Quiz handler
  const handleGenerateQuiz = async () => {
    if (!notesText.trim()) return;
    setError(null);
    setIsLoading(true);
    setLoadingMode('quiz');

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesText }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate quiz.');
      }

      setQuiz(data);
      saveToHistory(notesText, summary, data);
      setActiveTab('quiz');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong while generating the quiz.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Both handler
  const handleGenerateBoth = async () => {
    if (!notesText.trim()) return;
    setError(null);
    setIsLoading(true);
    setLoadingMode('both');

    try {
      const [sumRes, quizRes] = await Promise.all([
        fetch('/api/generate-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes: notesText }),
        }),
        fetch('/api/generate-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes: notesText }),
        }),
      ]);

      const sumData = await sumRes.json();
      const quizData = await quizRes.json();

      if (!sumRes.ok) throw new Error(sumData.error || 'Summary generation failed.');
      if (!quizRes.ok) throw new Error(quizData.error || 'Quiz generation failed.');

      setSummary(sumData);
      setQuiz(quizData);
      saveToHistory(notesText, sumData, quizData);
      setActiveTab('summary');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate summary and quiz.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem, view: 'summary' | 'quiz') => {
    setNotesText(item.fullNotes);
    if (item.summary) setSummary(item.summary);
    if (item.quiz) setQuiz(item.quiz);
    setActiveTab(view);
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all saved study history?')) {
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        historyCount={history.length}
        hasSummary={!!summary}
        hasQuiz={!!quiz}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {error && (
          <ErrorBanner
            message={error}
            onDismiss={() => setError(null)}
            onRetry={() => {
              if (loadingMode === 'summary') handleGenerateSummary();
              else if (loadingMode === 'quiz') handleGenerateQuiz();
              else handleGenerateBoth();
            }}
          />
        )}

        {isLoading ? (
          <LoadingState mode={loadingMode} />
        ) : (
          <>
            {activeTab === 'input' && (
              <NotesInput
                notesText={notesText}
                setNotesText={setNotesText}
                onGenerateSummary={handleGenerateSummary}
                onGenerateQuiz={handleGenerateQuiz}
                onGenerateBoth={handleGenerateBoth}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'summary' && summary && (
              <SummaryView
                summary={summary}
                onGoToQuiz={() => setActiveTab('quiz')}
                onBackToInput={() => setActiveTab('input')}
                hasQuiz={!!quiz}
                onGenerateQuiz={handleGenerateQuiz}
              />
            )}

            {activeTab === 'quiz' && quiz && (
              <QuizView
                quiz={quiz}
                onBackToInput={() => setActiveTab('input')}
                onGoToSummary={summary ? () => setActiveTab('summary') : undefined}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                history={history}
                onSelectHistory={handleSelectHistoryItem}
                onDeleteItem={handleDeleteHistoryItem}
                onClearAll={handleClearHistory}
                onStartNewNotes={() => setActiveTab('input')}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

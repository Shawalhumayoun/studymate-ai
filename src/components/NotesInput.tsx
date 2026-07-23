import React, { useRef } from 'react';
import { Sparkles, Brain, Upload, Trash2, FileText, Leaf, Factory, Cpu, ArrowRight } from 'lucide-react';
import { SAMPLE_NOTES, SampleNote } from '../data/sampleNotes';

interface NotesInputProps {
  notesText: string;
  setNotesText: (text: string) => void;
  onGenerateSummary: () => void;
  onGenerateQuiz: () => void;
  onGenerateBoth: () => void;
  isLoading: boolean;
}

export const NotesInput: React.FC<NotesInputProps> = ({
  notesText,
  setNotesText,
  onGenerateSummary,
  onGenerateQuiz,
  onGenerateBoth,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const wordCount = notesText.trim() ? notesText.trim().split(/\s+/).length : 0;
  const charCount = notesText.length;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setNotesText(content);
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const handleLoadSample = (sample: SampleNote) => {
    setNotesText(sample.content);
  };

  const getSampleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Leaf':
        return <Leaf className="w-4 h-4 text-emerald-500" />;
      case 'Factory':
        return <Factory className="w-4 h-4 text-amber-500" />;
      case 'Cpu':
        return <Cpu className="w-4 h-4 text-indigo-500" />;
      default:
        return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold mb-4 text-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>AI Powered Learning Companion</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Transform Your Study Notes into Master Summaries & Practice Quizzes
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Paste your lecture notes, textbook chapters, or study guides below. Gemini AI will instantly distill key takeaways and build a 5-question multiple choice test to boost active recall.
          </p>
        </div>
      </div>

      {/* Main Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-colors duration-200 space-y-5">
        
        {/* Sample Notes Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Try Sample Notes
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Select a topic to test instantly
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SAMPLE_NOTES.map((sample) => (
              <button
                key={sample.id}
                id={`sample-btn-${sample.id}`}
                onClick={() => handleLoadSample(sample)}
                className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/40 hover:border-indigo-300 dark:hover:border-indigo-700 text-left transition-all duration-150 group"
              >
                <div className="p-2 rounded-lg bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-105 transition-transform">
                  {getSampleIcon(sample.iconName)}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {sample.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {sample.category}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Header above Textarea */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label htmlFor="notes-textarea" className="text-sm font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
            <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Paste or Type Your Study Notes</span>
          </label>

          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.md,.text"
              className="hidden"
            />
            <button
              id="upload-file-btn"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload File (.txt, .md)</span>
            </button>

            {notesText && (
              <button
                id="clear-notes-btn"
                onClick={() => setNotesText('')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-medium transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            id="notes-textarea"
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            placeholder="Paste your lecture notes, textbook passages, article text, or exam revision material here..."
            rows={10}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950/60 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:bg-white dark:focus:bg-slate-900 transition-all resize-y font-normal placeholder:text-slate-400 dark:placeholder:text-slate-600"
          />
          
          <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mt-2 px-1">
            <span>Minimum 20 characters recommended</span>
            <div className="flex items-center space-x-3">
              <span><strong>{wordCount}</strong> words</span>
              <span>•</span>
              <span><strong>{charCount}</strong> characters</span>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            id="generate-summary-btn"
            disabled={isLoading || !notesText.trim()}
            onClick={onGenerateSummary}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-600 font-semibold text-sm shadow-lg shadow-indigo-500/10 disabled:shadow-none transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate Summary</span>
          </button>

          <button
            id="generate-quiz-btn"
            disabled={isLoading || !notesText.trim()}
            onClick={onGenerateQuiz}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-600 font-semibold text-sm border border-slate-700 disabled:border-transparent transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
          >
            <Brain className="w-4 h-4 text-indigo-400" />
            <span>Generate Quiz (5 MCQs)</span>
          </button>

          <button
            id="generate-both-btn"
            disabled={isLoading || !notesText.trim()}
            onClick={onGenerateBoth}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 font-semibold text-sm shadow-md transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
          >
            <span>Summary & Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="p-3.5 rounded-xl bg-indigo-500/5 dark:bg-indigo-950/20 border border-indigo-500/10 dark:border-indigo-800/30 flex items-center space-x-3">
        <div className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
        <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
          {notesText.trim()
            ? `Ready to analyze ${wordCount} words. Choose a processing option above.`
            : 'AI Engine ready. Paste study notes or choose a sample above to begin.'}
        </p>
      </div>
    </div>
  );
};

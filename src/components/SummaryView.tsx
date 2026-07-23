import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  Brain, 
  ArrowLeft, 
  Lightbulb, 
  Bookmark, 
  ListChecks,
  Share2
} from 'lucide-react';
import { SummaryResult } from '../types';

interface SummaryViewProps {
  summary: SummaryResult;
  onGoToQuiz: () => void;
  onBackToInput: () => void;
  hasQuiz: boolean;
  onGenerateQuiz?: () => void;
}

export const SummaryView: React.FC<SummaryViewProps> = ({
  summary,
  onGoToQuiz,
  onBackToInput,
  hasQuiz,
  onGenerateQuiz,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const contentToCopy = `# ${summary.title}\n\n## Key Takeaways\n${summary.keyTakeaways
      .map((k) => `- ${k}`)
      .join('\n')}\n\n## Summary\n${summary.summary}\n\n## Study Tips\n${summary.studyTips
      .map((t) => `- ${t}`)
      .join('\n')}`;

    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fileContent = `STUDYMATE AI - STUDY GUIDE
===========================
Title: ${summary.title}
Date: ${new Date().toLocaleDateString()}

KEY TAKEAWAYS:
--------------
${summary.keyTakeaways.map((k, i) => `${i + 1}. ${k}`).join('\n')}

SUMMARY:
--------
${summary.summary}

STUDY TIPS & MNEMONICS:
-----------------------
${summary.studyTips.map((t, i) => `${i + 1}. ${t}`).join('\n')}
`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${summary.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_summary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <button
          onClick={onBackToInput}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Notes</span>
        </button>

        <div className="flex items-center flex-wrap gap-2">
          <button
            id="copy-summary-btn"
            onClick={handleCopy}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            id="download-summary-btn"
            onClick={handleDownload}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .txt</span>
          </button>

          {hasQuiz ? (
            <button
              id="go-to-quiz-btn"
              onClick={onGoToQuiz}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-all"
            >
              <Brain className="w-3.5 h-3.5" />
              <span>Take Practice Quiz</span>
            </button>
          ) : (
            onGenerateQuiz && (
              <button
                id="generate-quiz-from-summary-btn"
                onClick={onGenerateQuiz}
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-all"
              >
                <Brain className="w-3.5 h-3.5" />
                <span>Generate 5 MCQs</span>
              </button>
            )
          )}
        </div>
      </div>

      {/* Title & Badge */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-indigo-900/50 relative overflow-hidden">
        <div className="flex items-center space-x-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>AI Generated Study Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
          {summary.title}
        </h1>
        <p className="text-xs text-indigo-200">
          Generated using Gemini 3.6 Flash • Optimized for fast comprehension and active recall
        </p>
      </div>

      {/* Key Takeaways Section */}
      {summary.keyTakeaways && summary.keyTakeaways.length > 0 && (
        <div className="bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 text-indigo-900 dark:text-indigo-200 font-bold text-base mb-4">
            <ListChecks className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2>Key Takeaways & Core Definitions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {summary.keyTakeaways.map((item, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 shadow-xs"
              >
                <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Markdown Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm transition-colors">
        <div className="prose dark:prose-invert max-w-none prose-slate prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-strong:text-indigo-600 dark:prose-strong:text-indigo-400">
          <Markdown>{summary.summary}</Markdown>
        </div>
      </div>

      {/* Study Tips & Mnemonics */}
      {summary.studyTips && summary.studyTips.length > 0 && (
        <div className="bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 text-amber-900 dark:text-amber-200 font-bold text-base mb-3">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h2>Actionable Study Tips & Memory Mnemonics</h2>
          </div>
          <ul className="space-y-2">
            {summary.studyTips.map((tip, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                <span className="text-amber-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

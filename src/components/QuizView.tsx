import React, { useState } from 'react';
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  Sparkles, 
  ArrowLeft,
  List,
  Check
} from 'lucide-react';
import { QuizResult } from '../types';

interface QuizViewProps {
  quiz: QuizResult;
  onBackToInput: () => void;
  onGoToSummary?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  quiz,
  onBackToInput,
  onGoToSummary,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showAnswerKeyMode, setShowAnswerKeyMode] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = quiz.questions;
  const currentQ = questions[currentQuestionIndex];
  const selectedOptionIndex = userAnswers[currentQuestionIndex];
  const isCurrentAnswered = selectedOptionIndex !== undefined;

  const handleSelectOption = (index: number) => {
    if (isCurrentAnswered && !isCompleted) return; // Prevent changing after answered unless resetting
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: index,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setIsCompleted(false);
    setShowAnswerKeyMode(false);
  };

  // Calculate score
  const answeredCount = Object.keys(userAnswers).length;
  let correctCount = 0;
  questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctAnswerIndex) {
      correctCount += 1;
    }
  });

  const percentage = Math.round((correctCount / questions.length) * 100);

  const getGradeInfo = () => {
    if (percentage === 100) return { title: 'Mastery Level!', text: 'Perfect score! You have completely mastered this material.', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200' };
    if (percentage >= 80) return { title: 'Great Knowledge!', text: 'Awesome job! You retain most of the key concepts.', color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200' };
    if (percentage >= 60) return { title: 'Good Effort!', text: 'You understand the basics, but review key takeaways to reinforce weak spots.', color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200' };
    return { title: 'Needs Review', text: 'Consider reviewing the summary guide again before retaking the test.', color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200' };
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Top Bar Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <button
          onClick={onBackToInput}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Notes</span>
        </button>

        <div className="flex items-center space-x-2">
          {onGoToSummary && (
            <button
              onClick={onGoToSummary}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>View Summary</span>
            </button>
          )}

          <button
            onClick={() => setShowAnswerKeyMode(!showAnswerKeyMode)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <List className="w-3.5 h-3.5" />
            <span>{showAnswerKeyMode ? 'Interactive Quiz' : 'Answer Key'}</span>
          </button>
        </div>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg border border-violet-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-violet-300 uppercase tracking-wider mb-2">
            <Brain className="w-4 h-4 text-violet-300" />
            <span>5 Multiple Choice Practice Test</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            {quiz.title || 'Practice Knowledge Quiz'}
          </h1>
        </div>

        {/* Score Badge */}
        <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/15 text-center shrink-0">
          <div className="text-xs text-violet-200 font-medium">Answered</div>
          <div className="text-lg font-bold text-white">
            {answeredCount} / {questions.length}
          </div>
        </div>
      </div>

      {/* Full Answer Key / All Questions Overview Mode */}
      {showAnswerKeyMode ? (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-violet-600" />
              <span>Full Question & Answer Reference Key</span>
            </h3>

            {questions.map((q, qIdx) => (
              <div key={q.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3">
                <div className="flex items-start space-x-2">
                  <span className="font-bold text-violet-600 dark:text-violet-400 text-sm">
                    Q{qIdx + 1}.
                  </span>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                    {q.question}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                  {q.options.map((opt, optIdx) => {
                    const isCorrect = optIdx === q.correctAnswerIndex;
                    return (
                      <div
                        key={optIdx}
                        className={`p-2.5 rounded-lg text-xs font-medium border flex items-center justify-between ${
                          isCorrect
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                        {isCorrect && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-1" />}
                      </div>
                    );
                  })}
                </div>

                <div className="pl-6 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                  <strong className="text-indigo-600 dark:text-indigo-400">Explanation: </strong>
                  {q.explanation}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : isCompleted ? (
        /* Quiz Completed Results Card */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center shadow-lg space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-500 text-white mx-auto flex items-center justify-center shadow-lg shadow-violet-500/20">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
              Quiz Completed
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {correctCount} / {questions.length} Correct ({percentage}%)
            </h2>
          </div>

          <div className={`p-4 rounded-xl border max-w-md mx-auto text-center ${getGradeInfo().color}`}>
            <h4 className="font-bold text-sm">{getGradeInfo().title}</h4>
            <p className="text-xs mt-1 leading-relaxed">{getGradeInfo().text}</p>
          </div>

          {/* Detailed Question Review */}
          <div className="text-left space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Detailed Review:</h3>
            <div className="space-y-3">
              {questions.map((q, idx) => {
                const userAns = userAnswers[idx];
                const isCorrect = userAns === q.correctAnswerIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                      isCorrect
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-slate-900 dark:text-white">
                        Question {idx + 1}: {q.question}
                      </span>
                      {isCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1 shrink-0">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correct</span>
                        </span>
                      ) : (
                        <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center space-x-1 shrink-0">
                          <XCircle className="w-4 h-4" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">
                      Your answer: <strong>{userAns !== undefined ? q.options[userAns] : 'Not Answered'}</strong>
                    </p>
                    {!isCorrect && (
                      <p className="text-emerald-700 dark:text-emerald-300 font-medium">
                        Correct answer: <strong>{q.options[q.correctAnswerIndex]}</strong>
                      </p>
                    )}
                    <p className="text-slate-500 italic mt-1">{q.explanation}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center space-x-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center space-x-2 py-3 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      ) : (
        /* Single Question Interactive Cards */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6 transition-colors">
          
          {/* Question Indicator & Step Dots */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>

            {/* Step Dots */}
            <div className="flex items-center space-x-1.5">
              {questions.map((_, idx) => {
                const isAns = userAnswers[idx] !== undefined;
                const isCurrent = idx === currentQuestionIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      isCurrent
                        ? 'bg-violet-600 w-6'
                        : isAns
                        ? 'bg-emerald-500'
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Question Prompt */}
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h2>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedOptionIndex === optIdx;
              const isCorrect = optIdx === currentQ.correctAnswerIndex;

              let optionStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-slate-800 dark:text-slate-200 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50/40 dark:hover:bg-violet-950/30';
              let badgeStyle = 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300';

              if (isCurrentAnswered) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-100 font-semibold ring-2 ring-emerald-500/20';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isSelected) {
                  optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100 font-semibold ring-2 ring-rose-500/20';
                  badgeStyle = 'bg-rose-600 text-white';
                } else {
                  optionStyle = 'border-slate-100 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/30 text-slate-400 dark:text-slate-600 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={isCurrentAnswered}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-150 ${optionStyle}`}
                >
                  <div className="flex items-center space-x-3 pr-2">
                    <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${badgeStyle}`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="text-sm leading-relaxed">{option}</span>
                  </div>

                  {isCurrentAnswered && (
                    <div className="shrink-0">
                      {isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      )}
                      {!isCorrect && isSelected && (
                        <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Answer Explanation Box */}
          {isCurrentAnswered && (
            <div className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1 animate-fadeIn ${
              selectedOptionIndex === currentQ.correctAnswerIndex
                ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200'
                : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="font-bold flex items-center space-x-1.5">
                {selectedOptionIndex === currentQ.correctAnswerIndex ? (
                  <span>Correct Answer!</span>
                ) : (
                  <span>Explanation:</span>
                )}
              </div>
              <p className="leading-relaxed font-normal opacity-90">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Question Controls Bottom Row */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={() => setIsCompleted(true)}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-all"
              >
                <span>View Final Results</span>
                <Award className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md shadow-violet-600/20 transition-all"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

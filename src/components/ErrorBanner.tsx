import React from 'react';
import { AlertTriangle, X, RefreshCw } from 'lucide-react';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
  onRetry?: () => void;
}

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message, onDismiss, onRetry }) => {
  return (
    <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 rounded-xl p-4 my-4 flex items-start justify-between shadow-sm transition-colors">
      <div className="flex items-start space-x-3">
        <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-semibold text-rose-900 dark:text-rose-200">
            Generation Error
          </h4>
          <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center space-x-1 mt-2 text-xs font-semibold text-rose-700 dark:text-rose-300 underline hover:text-rose-900 dark:hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onDismiss}
        className="text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-200 p-1 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface SummaryResult {
  title: string;
  summary: string;
  keyTakeaways: string[];
  studyTips: string[];
}

export interface QuizResult {
  title: string;
  questions: QuizQuestion[];
}

export interface HistoryItem {
  id: string;
  title: string;
  notesSnippet: string;
  fullNotes: string;
  summary?: SummaryResult;
  quiz?: QuizResult;
  createdAt: number;
}

export type ActiveTab = 'input' | 'summary' | 'quiz' | 'history';

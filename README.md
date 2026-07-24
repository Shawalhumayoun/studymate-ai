# StudyMate AI 🎓✨

StudyMate AI is a responsive web application that helps students study faster by turning raw lecture notes into concise, structured summaries and 5-question multiple choice practice quizzes.

Powered by Google's **Gemini AI** (`gemini-3.6-flash`), StudyMate AI extracts key takeaways, generates actionable study tips, and creates interactive practice tests with real-time feedback and detailed answer explanations.
## Live Demo
👉 https://studymate-ai-rayyan.vercel.ap
## 🌟 Key Features

- **Notes Input & Sample Notes**: Paste notes directly, upload `.txt` or `.md` files, or test with 1-click sample notes (Biology, History, Computer Science).
- **AI Summary Generator**: Formats summaries into structured markdown, highlights 5-7 core takeaways, and provides memory mnemonics.
- **5 MCQ Practice Quiz**: Generates an interactive 5-question test with instant right/wrong grading, correct answer highlights, and step-by-step explanations.
- **Answer Key Mode**: View all questions and complete explanations side-by-side for rapid review.
- **Saved History**: Automatically saves generated study guides and quizzes to local storage.
- **Dark & Light Mode**: Seamless dark and light theme toggle with system preference auto-detection.
- **Export & Share**: Copy markdown summaries or download `.txt` study guides in one click.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm**
- A **Gemini API Key** from [Google AI Studio](https://aistudio.google.com/)

---

### Installation & Setup

1. **Clone the repository** (or navigate to project directory):
   ```bash
   git clone <repository-url>
   cd studymate-ai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (or use `.env.example`):
   ```env
   GEMINI_API_KEY="your-gemini-api-key-here"
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide React icons, Motion
- **Backend Proxy**: Express.js server running in Node.js
- **AI Integration**: `@google/genai` TypeScript SDK (server-side proxy using model `gemini-3.6-flash` with structured JSON schema responses)
- **Local Persistence**: Browser `localStorage` for offline history and theme preferences

---

## 📦 Production Build

To bundle the application and backend server for production:

```bash
npm run build
npm start
```

This compiles the frontend assets into `dist/` and bundles `server.ts` into a self-contained CommonJS runtime `dist/server.cjs`.

---

## 📄 License

Apache-2.0 License. Built for students and lifelong learners worldwide!

import React, { useState, useEffect } from 'react';
import { TRIVIA_BANK } from '../../data/spaceData';
import { TriviaQuestion } from '../../types';
import confetti from 'canvas-confetti';
import {
  Award,
  Zap,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Trophy,
  BookOpen,
  Orbit,
  Flame,
  ShieldCheck,
  Compass,
} from 'lucide-react';

interface Props {
  onNavigateToArticle?: (articleId: string) => void;
  onNavigateToTool?: (toolId: string) => void;
}

export const CosmicTriviaArena: React.FC<Props> = ({
  onNavigateToArticle,
  onNavigateToTool,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('ubt_trivia_highscore') || localStorage.getItem('astropedia_trivia_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [feedbackQuote, setFeedbackQuote] = useState<{ quote: string; type: 'correct' | 'wrong' }>({
    quote: '',
    type: 'correct',
  });

  const encouragingCorrectQuotes = [
    'Outstanding scientific deduction! Your intellect shines like a pulsar.',
    'Galactic precision! Even Carl Sagan would applaud that answer.',
    'Cosmic genius! You have mastered this law of the universe.',
    'Brilliant! That principle is fundamental to modern astrophysics.',
    'Supernova accuracy! Your streak is burning brighter than a quasar.',
  ];

  const encouragingWrongQuotes = [
    'A fantastic learning opportunity! Even Einstein revised his cosmological constant.',
    'Close attempt! Failure is the very engine of the scientific method.',
    'Keep reaching for the stars! Newton spent years calculating this.',
    'Every great discovery starts with a puzzle. Check the explanation below to master it!',
    'No worries, explorer! Every experiment gives us valuable observational data.',
  ];

  const startQuiz = () => {
    let pool = [...TRIVIA_BANK];

    if (selectedCategory !== 'All') {
      pool = pool.filter(q => q.category === selectedCategory);
    }
    if (selectedDifficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === selectedDifficulty);
    }

    // Shuffle
    pool.sort(() => Math.random() - 0.5);
    const chosen = pool.slice(0, 8);
    setQuestions(chosen);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsFinished(false);
    setTimeLeft(20);
  };

  useEffect(() => {
    startQuiz();
  }, [selectedCategory, selectedDifficulty]);

  // Countdown timer
  useEffect(() => {
    if (isAnswered || isFinished || questions.length === 0) return;

    if (timeLeft <= 0) {
      handleAnswer(-1); // timed out
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered, isFinished, questions]);

  const handleAnswer = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const currentQ = questions[currentIndex];
    const isCorrect = optionIdx === currentQ.correctIndex;

    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setHighestStreak(h => Math.max(h, nextStreak));

      // Calculate score based on difficulty and time
      const diffMultiplier = currentQ.difficulty === 'hard' ? 1.5 : currentQ.difficulty === 'medium' ? 1.2 : 1.0;
      const streakMultiplier = 1 + (streak * 0.25);
      const points = Math.round((100 * diffMultiplier + timeLeft * 5) * streakMultiplier);

      const nextScore = score + points;
      setScore(nextScore);

      if (nextScore > highScore) {
        setHighScore(nextScore);
        try {
          localStorage.setItem('ubt_trivia_highscore', nextScore.toString());
        } catch {}
      }

      const randomQuote = encouragingCorrectQuotes[Math.floor(Math.random() * encouragingCorrectQuotes.length)];
      setFeedbackQuote({ quote: randomQuote, type: 'correct' });
    } else {
      setStreak(0);
      const randomQuote = encouragingWrongQuotes[Math.floor(Math.random() * encouragingWrongQuotes.length)];
      setFeedbackQuote({ quote: randomQuote, type: 'wrong' });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(20);
    } else {
      setIsFinished(true);
      confetti({ particleCount: 160, spread: 90, origin: { y: 0.6 } });
    }
  };

  const currentQ = questions[currentIndex];

  if (!currentQ && !isFinished) {
    return (
      <div className="p-8 text-center text-gray-400 bg-gray-950 rounded-2xl border border-gray-800">
        <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-2" />
        <p>Loading questions from the cosmic archive...</p>
      </div>
    );
  }

  // Final evaluation badge
  const maxPossibleScore = questions.length * 200;
  const scorePercent = maxPossibleScore > 0 ? (score / maxPossibleScore) * 100 : 0;

  return (
    <div className="w-full bg-gray-950 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Quiz Top Status Bar */}
      <div className="p-4 bg-gray-900/90 backdrop-blur-xl border-b border-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/60">
              ZEPEDIA Space &amp; Science Arena
            </span>
          </div>
          <h3 className="text-lg font-bold font-display text-white mt-1">Cosmic Trivia Challenge</h3>
        </div>

        {/* Score & Streak HUD */}
        <div className="flex items-center gap-2.5">
          <div className="bg-gray-950 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs">
            <span className="text-gray-500 block text-[10px] uppercase font-mono">Current Score</span>
            <span className="font-mono font-bold text-amber-300 text-sm">{score} pts</span>
          </div>

          <div className="bg-gray-950 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs">
            <span className="text-gray-500 block text-[10px] uppercase font-mono">Streak</span>
            <span className="font-mono font-bold text-emerald-400 text-sm flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              {streak}x
            </span>
          </div>

          <div className="bg-gray-950 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs hidden sm:block">
            <span className="text-gray-500 block text-[10px] uppercase font-mono">All-Time High</span>
            <span className="font-mono font-bold text-cyan-300 text-sm flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-cyan-400" />
              {highScore}
            </span>
          </div>
        </div>
      </div>

      {/* Category & Difficulty Selection Strips */}
      <div className="px-4 py-3 bg-gray-900/60 border-b border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Category Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-gray-500 mr-1 text-[10px] font-mono uppercase">Category:</span>
          {['All', 'Astronomy', 'Physics', 'Biology', 'Space Missions'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                  : 'bg-gray-800/80 border-gray-700/80 text-gray-400 hover:text-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-gray-500 mr-1 text-[10px] font-mono uppercase">Difficulty:</span>
          {[
            { id: 'all', label: 'Mixed' },
            { id: 'easy', label: '🟢 Cadet' },
            { id: 'medium', label: '🟡 Explorer' },
            { id: 'hard', label: '🔴 Commander' },
          ].map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedDifficulty(d.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                selectedDifficulty === d.id
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-200'
                  : 'bg-gray-800/80 border-gray-700 text-gray-400 hover:text-gray-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Question View */}
      {!isFinished ? (
        <div className="p-6 md:p-8 flex flex-col justify-between min-h-[440px] space-y-6">
          <div>
            {/* Progress Bar & Countdown Timer */}
            <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
              <span className="flex items-center gap-2">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-cyan-300 font-semibold">{currentQ.category}</span>
              </span>
              <span className={`font-bold font-mono text-sm ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-cyan-300'}`}>
                ⏱ {timeLeft}s remaining
              </span>
            </div>
            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Card */}
            <div className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 mb-6 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  {currentQ.category}
                </span>
                <span className={`uppercase font-semibold text-[10px] px-2 py-0.5 rounded ${
                  currentQ.difficulty === 'hard'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800/50'
                    : currentQ.difficulty === 'medium'
                    ? 'bg-amber-950 text-amber-300 border border-amber-800/50'
                    : 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                }`}>
                  {currentQ.difficulty} Tier
                </span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold font-display text-white leading-snug pt-1">
                {currentQ.question}
              </h4>
            </div>

            {/* 4 Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-gray-900 border-gray-800 text-gray-200 hover:border-gray-600 hover:bg-gray-850';

                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-950/90 border-emerald-400 text-emerald-200 shadow-xl shadow-emerald-950';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-rose-950/90 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-gray-900/40 border-gray-800 text-gray-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(idx)}
                    className={`p-4 rounded-xl border text-left font-medium text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span className="leading-snug">{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Encouraging Feedback & Explanation Card */}
          {isAnswered && (
            <div className={`p-5 rounded-2xl border space-y-3 animate-in fade-in duration-300 ${
              feedbackQuote.type === 'correct'
                ? 'bg-emerald-950/40 border-emerald-500/50'
                : 'bg-rose-950/30 border-rose-500/40'
            }`}>
              {/* Dynamic Encouraging Coach Quote */}
              <div className="flex items-center gap-2">
                <Sparkles className={`w-4 h-4 ${feedbackQuote.type === 'correct' ? 'text-emerald-400' : 'text-amber-400'}`} />
                <span className={`text-xs font-bold ${feedbackQuote.type === 'correct' ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {feedbackQuote.quote}
                </span>
              </div>

              {/* Scientific Breakdown */}
              <p className="text-xs text-gray-200 leading-relaxed">
                {currentQ.explanation}
              </p>

              {/* Action Buttons: Next Question & Deep Links */}
              <div className="pt-2 border-t border-gray-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {currentQ.relatedArticleId && onNavigateToArticle && (
                    <button
                      onClick={() => onNavigateToArticle(currentQ.relatedArticleId!)}
                      className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700 hover:border-cyan-400 text-[11px] font-medium text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Encyclopedia Article</span>
                    </button>
                  )}

                  {currentQ.relatedToolId && onNavigateToTool && (
                    <button
                      onClick={() => onNavigateToTool(currentQ.relatedToolId!)}
                      className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-700 hover:border-amber-400 text-[11px] font-medium text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Orbit className="w-3.5 h-3.5" />
                      <span>Launch Interactive Lab</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-950 transition-all cursor-pointer"
                >
                  <span>{currentIndex + 1 === questions.length ? 'View Debrief & Rating' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* End-of-Round Mission Debrief & Encouraging Feedback Card */
        <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-5 min-h-[460px]">
          <div className="w-20 h-20 rounded-3xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-2xl shadow-amber-950">
            <Trophy className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-1">
            <h4 className="text-3xl font-bold font-display text-white">Mission Debriefing Complete</h4>
            <p className="text-sm text-gray-300">
              Final Score: <strong className="text-amber-300 font-mono text-xl">{score}</strong> pts | Highest Streak: <strong className="text-emerald-400 font-mono">{highestStreak}x</strong>
            </p>
          </div>

          {/* Encouraging Feedback Evaluation Box */}
          <div className="max-w-lg p-5 rounded-2xl bg-gray-900/90 border border-gray-800 space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 font-mono uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>Commander Evaluation & Coaching:</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              {scorePercent >= 80
                ? "🌟 Outstanding Mastery! Your comprehension of astrophysical forces, quantum dynamics, and planetary exploration places you among the senior scientific minds of our station."
                : scorePercent >= 50
                ? "🚀 Solid Mission Execution! You have a firm grasp on core celestial mechanics. Reviewing the encyclopedia articles on the topics you missed will elevate you to orbital master."
                : "🔭 Remarkable Exploration Effort! Every giant leap in science begins with curiosity and hypothesis testing. Dive into the 3D solar system and articles to conquer the next run!"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={startQuiz}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-900/40"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Launch Another Round</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

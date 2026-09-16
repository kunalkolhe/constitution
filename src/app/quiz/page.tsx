'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Trophy, ShieldAlert, ArrowRight, Play, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getDeviceId } from '@/lib/deviceId';
import { useLanguage } from '@/context/LanguageContext';

// Precomputed once at module load so confetti positions stay stable across
// re-renders instead of calling Math.random() during render (impure).
const CONFETTI_LEFT_OFFSETS = Array.from({ length: 12 }, () => Math.random() * 100);

// Full question bank. A random ROUND_LENGTH-sized subset is drawn from this
// per playthrough (see pickRandomQuestions below) so replaying the quiz
// doesn't just repeat the same handful of questions every time.
const QUESTIONS = [
  {
    q: 'Which article deals with the Right to Equality?',
    options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'],
    ans: 0
  },
  {
    q: 'How many schedules are there in the Indian Constitution?',
    options: ['8', '10', '12', '22'],
    ans: 2
  },
  {
    q: 'Who is known as the Father of the Indian Constitution?',
    options: ['Jawaharlal Nehru', 'B.R. Ambedkar', 'Mahatma Gandhi', 'Sardar Patel'],
    ans: 1
  },
  {
    q: 'Which article is known as the "Heart and Soul" of the Constitution?',
    options: ['Article 14', 'Article 21', 'Article 32', 'Article 19'],
    ans: 2
  },
  {
    q: 'On which date did the Constitution of India come into effect?',
    options: ['15 August 1947', '26 November 1949', '26 January 1950', '2 October 1950'],
    ans: 2
  },
  {
    q: 'On which date was the Constitution adopted by the Constituent Assembly?',
    options: ['26 January 1950', '15 August 1947', '26 November 1949', '9 December 1946'],
    ans: 2
  },
  {
    q: 'Who was the Chairman of the Drafting Committee of the Constitution?',
    options: ['Jawaharlal Nehru', 'Dr. Rajendra Prasad', 'Dr. B.R. Ambedkar', 'Sardar Vallabhbhai Patel'],
    ans: 2
  },
  {
    q: 'Who was the first President of the Constituent Assembly?',
    options: ['Jawaharlal Nehru', 'Dr. Rajendra Prasad', 'C. Rajagopalachari', 'B.R. Ambedkar'],
    ans: 1
  },
  {
    q: 'How many Fundamental Rights are currently guaranteed by the Constitution?',
    options: ['5', '6', '7', '8'],
    ans: 1
  },
  {
    q: 'Which Part of the Constitution contains the Directive Principles of State Policy?',
    options: ['Part III', 'Part IV', 'Part IVA', 'Part V'],
    ans: 1
  },
  {
    q: 'Which article makes elementary education a Fundamental Right?',
    options: ['Article 21', 'Article 21A', 'Article 45', 'Article 51A'],
    ans: 1
  },
  {
    q: 'How many Fundamental Duties are listed in the Constitution?',
    options: ['9', '10', '11', '12'],
    ans: 2
  },
  {
    q: 'Which amendment added the Fundamental Duties to the Constitution?',
    options: ['42nd Amendment', '44th Amendment', '73rd Amendment', '86th Amendment'],
    ans: 0
  },
  {
    q: 'Which amendment is known as the "Mini Constitution"?',
    options: ['1st Amendment', '42nd Amendment', '44th Amendment', '101st Amendment'],
    ans: 1
  },
  {
    q: 'The words "Socialist" and "Secular" were added to the Preamble by which amendment?',
    options: ['1st Amendment', '42nd Amendment', '44th Amendment', '73rd Amendment'],
    ans: 1
  },
  {
    q: 'Which amendment introduced the Goods and Services Tax (GST)?',
    options: ['42nd Amendment', '86th Amendment', '101st Amendment', '106th Amendment'],
    ans: 2
  },
  {
    q: 'Which amendment granted constitutional status to Panchayati Raj institutions?',
    options: ['42nd Amendment', '44th Amendment', '73rd Amendment', '86th Amendment'],
    ans: 2
  },
  {
    q: 'Which writ is issued to release a person who has been unlawfully detained?',
    options: ['Mandamus', 'Habeas Corpus', 'Quo Warranto', 'Certiorari'],
    ans: 1
  },
  {
    q: 'Which writ commands a public official to perform a duty they have failed to perform?',
    options: ['Habeas Corpus', 'Mandamus', 'Prohibition', 'Certiorari'],
    ans: 1
  },
  {
    q: 'Who has the power to declare a National Emergency under Article 352?',
    options: ['The Prime Minister', 'The President', 'The Chief Justice of India', 'The Speaker of Lok Sabha'],
    ans: 1
  },
  {
    q: 'How many times has a National Emergency been declared in India?',
    options: ['1', '2', '3', '4'],
    ans: 2
  },
  {
    q: 'Which case established the "Basic Structure Doctrine" of the Constitution?',
    options: ['Maneka Gandhi case', 'Kesavananda Bharati case', 'Puttaswamy case', 'Golaknath case'],
    ans: 1
  },
  {
    q: 'In which landmark case did the Supreme Court declare the Right to Privacy a Fundamental Right?',
    options: ['Kesavananda Bharati', 'Maneka Gandhi', 'Puttaswamy', 'Navtej Singh Johar'],
    ans: 2
  },
  {
    q: 'Who is the head of the Indian judiciary?',
    options: ['The President', 'The Attorney General', 'The Chief Justice of India', 'The Law Minister'],
    ans: 2
  },
  {
    q: 'How many elected members does the Lok Sabha have?',
    options: ['250', '543', '545', '552'],
    ans: 1
  },
  {
    q: 'What is the maximum strength of the Rajya Sabha?',
    options: ['238', '245', '250', '252'],
    ans: 2
  },
  {
    q: 'What is the term of office of the Lok Sabha, unless dissolved earlier?',
    options: ['4 years', '5 years', '6 years', '7 years'],
    ans: 1
  },
  {
    q: 'Who formally appoints the Chief Justice of India?',
    options: ['The Prime Minister', 'The President', 'The Parliament', 'The Law Commission'],
    ans: 1
  },
  {
    q: 'Which article empowers the President to grant pardons?',
    options: ['Article 61', 'Article 72', 'Article 76', 'Article 111'],
    ans: 1
  },
  {
    q: 'Which article deals with the Right to Constitutional Remedies?',
    options: ['Article 19', 'Article 21', 'Article 32', 'Article 44'],
    ans: 2
  },
  {
    q: 'What is the minimum age to become a member of the Lok Sabha?',
    options: ['21 years', '25 years', '30 years', '35 years'],
    ans: 1
  },
  {
    q: 'What is the minimum age to become a member of the Rajya Sabha?',
    options: ['21 years', '25 years', '30 years', '35 years'],
    ans: 2
  },
  {
    q: 'What is the minimum age required to become the President of India?',
    options: ['25 years', '30 years', '35 years', '40 years'],
    ans: 2
  },
  {
    q: 'Which Part of the Constitution lists the Fundamental Rights?',
    options: ['Part II', 'Part III', 'Part IV', 'Part V'],
    ans: 1
  },
  {
    q: 'Which Schedule of the Constitution deals with the anti-defection law?',
    options: ['9th Schedule', '10th Schedule', '11th Schedule', '12th Schedule'],
    ans: 1
  },
  {
    q: 'Which Schedule deals with the powers of Panchayats (rural local governance)?',
    options: ['9th Schedule', '10th Schedule', '11th Schedule', '12th Schedule'],
    ans: 2
  },
  {
    q: 'Which Schedule deals with the powers of Municipalities (urban local governance)?',
    options: ['10th Schedule', '11th Schedule', '12th Schedule', '9th Schedule'],
    ans: 2
  },
  {
    q: 'Which article abolished untouchability?',
    options: ['Article 15', 'Article 17', 'Article 18', 'Article 21'],
    ans: 1
  },
  {
    q: 'Article 19 guarantees how many distinct freedoms?',
    options: ['4', '5', '6', '7'],
    ans: 2
  },
  {
    q: 'Which body conducts elections in India?',
    options: ['Supreme Court', 'Election Commission of India', 'Parliament', 'NITI Aayog'],
    ans: 1
  },
  {
    q: "Under which article was Jammu & Kashmir's special status abrogated in 2019?",
    options: ['Article 356', 'Article 370', 'Article 371', 'Article 372'],
    ans: 1
  },
  {
    q: 'Which amendment reserved one-third of seats in the Lok Sabha and State Assemblies for women?',
    options: ['101st Amendment', '103rd Amendment', '106th Amendment', '108th Amendment'],
    ans: 2
  },
  {
    q: 'What is the term of office of the President of India?',
    options: ['4 years', '5 years', '6 years', '7 years'],
    ans: 1
  },
  {
    q: 'Which of these is NOT one of the four ideals secured to citizens by the Preamble?',
    options: ['Justice', 'Liberty', 'Fraternity', 'Sovereignty'],
    ans: 3
  }
];

const ROUND_LENGTH = 10;

function pickRandomQuestions() {
  const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, ROUND_LENGTH);
}

export default function QuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameMode, setGameMode] = useState<'menu' | 'quiz'>('menu');
  
  const [timeLeft, setTimeLeft] = useState(30);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showXpFloat, setShowXpFloat] = useState(false);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  // Starts as a fixed, deterministic slice rather than a random pick: this
  // page is server-rendered, and Math.random() would produce a different
  // initial round on the server than on the client, failing hydration as
  // soon as it's rendered (this isn't currently visible here since the menu
  // screen hides it and "Start Quiz" immediately overwrites it below — but
  // relying on that is fragile, so it's made safe here too, the same way
  // as the Simulator's identical activeScenarios pattern).
  const [activeQuestions, setActiveQuestions] = useState(() => QUESTIONS.slice(0, ROUND_LENGTH));
  // All-time best XP/streak for this device, fetched from the (optional)
  // backend — see src/app/api/progress/route.ts. Stays null if no database
  // is configured or nothing's been saved yet; the menu simply doesn't show
  // this line in that case rather than showing a zero.
  const [allTimeBest, setAllTimeBest] = useState<{ bestXp: number; bestStreak: number } | null>(null);

  const router = useRouter();
  const { language } = useLanguage();

  // Fetch this device's saved best on mount. Best-effort: any failure (no
  // database configured, offline, etc.) is swallowed and just leaves the
  // menu without a "best" line, same as a first-time visitor.
  useEffect(() => {
    const deviceId = getDeviceId();
    if (!deviceId || typeof fetch === 'undefined') return;

    fetch(`/api/progress?deviceId=${encodeURIComponent(deviceId)}`)
      .then(res => res.json())
      .then(data => {
        if (data?.configured && data?.progress) {
          setAllTimeBest({ bestXp: data.progress.bestXp, bestStreak: data.progress.bestStreak });
        }
      })
      .catch(() => {});
  }, []);

  // Sync this round's result once the game ends. Fire-and-forget: the
  // localStorage write below remains the source of truth for the UI, this
  // is purely a best-effort backup that only does anything when a real
  // database is configured (see src/db/index.ts).
  useEffect(() => {
    if (!gameOver) return;
    const deviceId = getDeviceId();
    if (!deviceId || typeof fetch === 'undefined') return;

    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, xp, streak, language }),
    }).catch(() => {});
  }, [gameOver, xp, streak, language]);

  const handleNext = useCallback(() => {
    setSelectedAns(null);
    setTimeLeft(30);
    setCurrentQ(prev => {
      if (prev < activeQuestions.length - 1) {
        return prev + 1;
      }
      setGameOver(true);
      // Save XP to local storage logic here
      const savedProgress = localStorage.getItem('bs_progress') || '0';
      localStorage.setItem('bs_progress', String(parseInt(savedProgress) + 1));
      return prev;
    });
  }, [activeQuestions.length]);

  useEffect(() => {
    if (gameOver || selectedAns !== null || gameMode === 'menu') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQ, gameOver, selectedAns, gameMode, handleNext]);

  const handleAnswer = (idx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);

    const isCorrect = idx === activeQuestions[currentQ].ans;

    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => s + 1);
      setXp(x => x + 10 + (streak * 2));
      setShowConfetti(true);
      setShowXpFloat(true);
      setTimeout(() => { setShowConfetti(false); setShowXpFloat(false); }, 1000);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      handleNext();
    }, 1500);
  };

  const handleShare = useCallback(() => {
    const shareText = `I scored ${score}/${activeQuestions.length} on the BhartiyaSamvidhan Civics Quiz with a best streak of ${streak} and earned ${xp} XP! Test your own knowledge of the Indian Constitution.`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: 'BhartiyaSamvidhan Quiz', text: shareText, url: window.location.origin }).catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => alert('Result copied to clipboard!'));
    }
  }, [score, streak, xp, activeQuestions.length]);

  return (
    <main className="bg-[#FFF8F0] min-h-screen text-[#1A1A2E] flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 px-4 flex flex-col items-center justify-center max-w-4xl mx-auto w-full relative">
        
        {/* Floating Animations */}
        <AnimatePresence>
          {showConfetti && (
            <div key="confetti" className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-3 h-3 rounded-sm animate-[confetti-fall_800ms_forwards]"
                  style={{
                    left: `${CONFETTI_LEFT_OFFSETS[i]}%`,
                    top: '-5%',
                    backgroundColor: ['#FF6B00', '#138808', '#FFD700', '#FFFFFF'][i % 4]
                  }}
                />
              ))}
            </div>
          )}
          
          {showXpFloat && (
            <div key="xp-float" className="absolute top-1/4 left-1/2 -translate-x-1/2 z-50 animate-[xp-float_600ms_forwards]">
              <span className="font-[family-name:var(--font-display)] font-bold text-3xl text-[#FFD700] drop-shadow-md">
                +{10 + (streak * 2)} XP
              </span>
            </div>
          )}
        </AnimatePresence>

        {gameMode === 'menu' ? (
          <div className="w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-bold text-[#1A1A2E] leading-tight mb-4">
                Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E3A300] to-[#FF8B00]">Learning</span>
              </h1>
              <p className="text-[#1A1A2E]/60 text-lg max-w-xl mx-auto">
                Test your knowledge of the Constitution or step into real-world scenarios to see how your rights protect you.
              </p>
              {allTimeBest && (
                <p className="mt-4 text-[#E3A300] font-semibold text-sm uppercase tracking-widest">
                  🏆 All-Time Best: {allTimeBest.bestXp} XP · {allTimeBest.bestStreak} streak
                </p>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.button
                onClick={() => { setActiveQuestions(pickRandomQuestions()); setGameMode('quiz'); }}
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-gray-100 shadow-lg shadow-black/5 rounded-3xl p-8 text-left hover:border-[#E3A300]/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-[#FFD700]/15 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-[#E3A300]">
                  <Trophy size={32} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Civics Quiz</h3>
                <p className="text-[#1A1A2E]/60 mb-8">Test your factual knowledge of articles, amendments, and history to earn XP.</p>
                <div className="flex items-center gap-2 text-[#E3A300] font-bold">
                  Start Quiz <Play size={18} />
                </div>
              </motion.button>

              <motion.button
                onClick={() => router.push('/simulator')}
                whileHover={{ scale: 1.02 }}
                className="bg-white border border-gray-100 shadow-lg shadow-black/5 rounded-3xl p-8 text-left hover:border-[#DE350B]/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#DE350B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-[#DE350B]/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-[#DE350B]">
                  <ShieldAlert size={32} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Rights Simulator</h3>
                <p className="text-[#1A1A2E]/60 mb-8">Step into real-life situations and apply your fundamental rights to save the day.</p>
                <div className="flex items-center gap-2 text-[#DE350B] font-bold">
                  Play Simulator <ArrowRight size={18} />
                </div>
              </motion.button>
            </div>
          </div>
        ) : !gameOver ? (
          <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-xl shadow-black/5 rounded-3xl p-8 relative overflow-hidden">

            {/* Top Bar (Streak & XP) */}
            <div className="flex justify-between items-center mb-8">
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${streak >= 3 ? 'bg-[#FF6B00] animate-pulse-glow text-white' : 'bg-black/5 text-[#1A1A2E]'}`}>
                <Flame size={16} /> Streak {streak}
              </div>
              <div className="px-4 py-1.5 rounded-full bg-[#FFD700]/15 text-[#E3A300] text-sm font-bold flex items-center gap-2">
                <Star size={16} /> {xp} XP
              </div>
            </div>

            {/* Timer Bar */}
            <div className="w-full h-2 bg-black/5 rounded-full mb-8 overflow-hidden">
              <div
                className="h-full bg-[#FF6B00] origin-left transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="mb-2 text-[#E3A300] font-semibold text-sm tracking-widest uppercase">
              Question {currentQ + 1} of {activeQuestions.length}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-8 leading-tight">
              {activeQuestions[currentQ].q}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeQuestions[currentQ].options.map((opt, i) => {
                const isSelected = selectedAns === i;
                const isCorrect = i === activeQuestions[currentQ].ans;
                let bgClass = "bg-black/[0.03] hover:bg-black/5 border-black/10 text-[#1A1A2E]";

                if (selectedAns !== null) {
                  if (isCorrect) bgClass = "bg-[#138808] border-[#138808] text-white";
                  else if (isSelected) bgClass = "bg-[#DE350B] border-[#DE350B] text-white";
                  else bgClass = "bg-black/[0.02] border-black/5 opacity-50 text-[#1A1A2E]/50";
                }

                return (
                  <button
                    key={i}
                    disabled={selectedAns !== null}
                    onClick={() => handleAnswer(i)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-300 font-[family-name:var(--font-sans)] font-medium text-lg ${bgClass}`}
                  >
                    {opt}
                    {/* Color alone shouldn't be the only signal for correctness. */}
                    {selectedAns !== null && isCorrect && <span className="sr-only"> (Correct answer)</span>}
                    {selectedAns !== null && isSelected && !isCorrect && <span className="sr-only"> (Your answer, incorrect)</span>}
                  </button>
                )
              })}
            </div>
            
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-white border border-gray-100 text-[#1A1A2E] rounded-3xl p-8 text-center shadow-2xl shadow-black/5"
          >
            <div className="mb-6 flex justify-center text-[#E3A300]">
              <Trophy size={64} />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-[#1A1A2E]/60 mb-8 font-medium">You earned {xp} XP today.</p>

            <div className="flex justify-around mb-8 bg-[#FFF8F0] border border-black/5 rounded-2xl p-4">
              <div>
                <div className="text-3xl font-black text-[#FF6B00]">{score}/{activeQuestions.length}</div>
                <div className="text-xs font-bold text-[#1A1A2E]/40 uppercase tracking-widest">Score</div>
              </div>
              <div className="w-[1px] bg-black/10" />
              <div>
                <div className="text-3xl font-black text-[#E3A300]">{streak}</div>
                <div className="text-xs font-bold text-[#1A1A2E]/40 uppercase tracking-widest">Best Streak</div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 bg-[#0A0F5C] hover:bg-[#1A237E] text-white font-bold py-4 rounded-xl transition-colors"
            >
              <Share2 size={18} /> Share My Rank
            </button>
            <button 
              onClick={() => {
                setGameMode('menu'); setCurrentQ(0); setScore(0); setStreak(0); setXp(0); setGameOver(false); setTimeLeft(30); setSelectedAns(null);
              }}
              className="w-full mt-4 text-[#FF6B00] font-bold py-3 hover:bg-[#FF6B00]/10 rounded-xl transition-colors"
            >
              Back to Menu
            </button>
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}

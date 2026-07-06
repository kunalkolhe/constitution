'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Star, Trophy, ShieldAlert, ArrowRight, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
  }
];

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
  
  const router = useRouter();

  useEffect(() => {
    if (gameOver || selectedAns !== null || gameMode === 'menu') return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleNext(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQ, gameOver, selectedAns]);

  const handleAnswer = (idx: number) => {
    if (selectedAns !== null) return;
    setSelectedAns(idx);
    
    const isCorrect = idx === QUESTIONS[currentQ].ans;
    
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
      handleNext(isCorrect);
    }, 1500);
  };

  const handleNext = (wasCorrect: boolean) => {
    setSelectedAns(null);
    setTimeLeft(30);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setGameOver(true);
      // Save XP to local storage logic here
      const savedProgress = localStorage.getItem('bs_progress') || '0';
      localStorage.setItem('bs_progress', String(parseInt(savedProgress) + 1));
    }
  };

  return (
    <main className="bg-[#0A0F5C] min-h-screen text-white flex flex-col">
      <Navbar />
      
      <div className="flex-grow pt-32 pb-24 px-4 flex flex-col items-center justify-center max-w-4xl mx-auto w-full relative">
        
        {/* Floating Animations */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-3 h-3 rounded-sm animate-[confetti-fall_800ms_forwards]"
                  style={{ 
                    left: `${Math.random() * 100}%`, 
                    top: '-5%',
                    backgroundColor: ['#FF6B00', '#138808', '#FFD700', '#FFFFFF'][i % 4]
                  }}
                />
              ))}
            </div>
          )}
          
          {showXpFloat && (
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-50 animate-[xp-float_600ms_forwards]">
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
              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight mb-4">
                Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FF8B00]">Learning</span>
              </h1>
              <p className="text-white/60 text-lg max-w-xl mx-auto">
                Test your knowledge of the Constitution or step into real-world scenarios to see how your rights protect you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <motion.button
                onClick={() => setGameMode('quiz')}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 text-left hover:border-[#FFD700]/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-[#FFD700]/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-[#FFD700]">
                  <Trophy size={32} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Civics Quiz</h3>
                <p className="text-white/60 mb-8">Test your factual knowledge of articles, amendments, and history to earn XP.</p>
                <div className="flex items-center gap-2 text-[#FFD700] font-bold">
                  Start Quiz <Play size={18} />
                </div>
              </motion.button>

              <motion.button
                onClick={() => router.push('/simulator')}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 text-left hover:border-[#DE350B]/50 transition-colors group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#DE350B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="bg-[#DE350B]/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-[#DE350B]">
                  <ShieldAlert size={32} />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Rights Simulator</h3>
                <p className="text-white/60 mb-8">Step into real-life situations and apply your fundamental rights to save the day.</p>
                <div className="flex items-center gap-2 text-[#DE350B] font-bold">
                  Play Simulator <ArrowRight size={18} />
                </div>
              </motion.button>
            </div>
          </div>
        ) : !gameOver ? (
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 relative overflow-hidden">
            
            {/* Top Bar (Streak & XP) */}
            <div className="flex justify-between items-center mb-8">
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 ${streak >= 3 ? 'bg-[#FF6B00] animate-pulse-glow text-white' : 'bg-white/20 text-white'}`}>
                <Flame size={16} /> Streak {streak}
              </div>
              <div className="px-4 py-1.5 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-sm font-bold flex items-center gap-2">
                <Star size={16} /> {xp} XP
              </div>
            </div>

            {/* Timer Bar */}
            <div className="w-full h-2 bg-white/10 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-[#FF6B00] origin-left transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>

            {/* Question */}
            <div className="mb-2 text-[#FFD700] font-semibold text-sm tracking-widest uppercase">
              Question {currentQ + 1} of {QUESTIONS.length}
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold mb-8 leading-tight">
              {QUESTIONS[currentQ].q}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {QUESTIONS[currentQ].options.map((opt, i) => {
                const isSelected = selectedAns === i;
                const isCorrect = i === QUESTIONS[currentQ].ans;
                let bgClass = "bg-white/10 hover:bg-white/20 border-white/20";
                
                if (selectedAns !== null) {
                  if (isCorrect) bgClass = "bg-[#138808] border-[#138808]";
                  else if (isSelected) bgClass = "bg-[#DE350B] border-[#DE350B]";
                  else bgClass = "bg-white/5 border-white/5 opacity-50";
                }

                return (
                  <button
                    key={i}
                    disabled={selectedAns !== null}
                    onClick={() => handleAnswer(i)}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-300 font-[family-name:var(--font-sans)] font-medium text-lg ${bgClass}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
            
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-3xl p-8 text-center shadow-2xl"
          >
            <div className="mb-6 flex justify-center text-[#FFD700]">
              <Trophy size={64} />
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-white/60 mb-8 font-medium">You earned {xp} XP today.</p>
            
            <div className="flex justify-around mb-8 bg-black/20 border border-white/5 rounded-2xl p-4">
              <div>
                <div className="text-3xl font-black text-[#FF6B00]">{score}/{QUESTIONS.length}</div>
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Score</div>
              </div>
              <div className="w-[1px] bg-white/10" />
              <div>
                <div className="text-3xl font-black text-[#FFD700]">{streak}</div>
                <div className="text-xs font-bold text-white/40 uppercase tracking-widest">Best Streak</div>
              </div>
            </div>

            <button className="w-full bg-[#0A0F5C] hover:bg-[#1A237E] text-white font-bold py-4 rounded-xl transition-colors">
              Share My Rank
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

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { SCENARIOS } from '@/data/scenarios';

function pickRandomScenarios() {
  const shuffled = [...SCENARIOS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}

export default function SimulatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  // The initial value must be deterministic (same on server and client) or
  // React's hydration fails as soon as it's rendered — Math.random() picks a
  // different scenario set in each environment. So this starts as a fixed
  // slice (no blank flash, and identical on both sides), then an effect
  // reshuffles it to a genuinely random set right after mount, once we're
  // safely client-only.
  const [activeScenarios, setActiveScenarios] = useState<typeof SCENARIOS>(() => SCENARIOS.slice(0, 5));

  useEffect(() => {
    // Intentionally runs once on mount only — this is the client-only
    // reshuffle described above, not a response to any dependency changing.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveScenarios(pickRandomScenarios());
  }, []);

  const scenario = activeScenarios[currentStep];

  const handleSelect = (index: number) => {
    if (isAnswered || !scenario) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (scenario.options[index].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentStep < activeScenarios.length - 1) {
      setCurrentStep(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartSimulator = () => {
    setActiveScenarios(pickRandomScenarios());
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  // Prevent render before scenarios are loaded
  if (activeScenarios.length === 0) return null;

  return (
    <main className="bg-[#FFF8F0] min-h-screen text-[#1A1A2E] selection:bg-[#FF6B00] selection:text-white">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-4xl mx-auto min-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center p-4 rounded-2xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 mb-6 text-[#FF6B00]"
          >
            <ShieldAlert size={40} />
          </motion.div>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Know Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#DE350B]">Rights</span>
          </h1>
          <p className="text-[#1A1A2E]/60 font-[family-name:var(--font-sans)] text-lg max-w-2xl mx-auto">
            Step into real-world scenarios and discover how the Constitution protects you in daily life. 
            Can you identify the right that saves the day?
          </p>
        </div>

        {!isFinished ? (
          <div className="flex-1 flex flex-col">
            {/* Progress Bar */}
            <div className="w-full bg-black/5 rounded-full h-2.5 mb-8 overflow-hidden">
              <motion.div 
                className="bg-gradient-to-r from-[#FF6B00] to-[#DE350B] h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep) / activeScenarios.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Scenario Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-black/5"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-black/5 text-[#1A1A2E]/70 px-3 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                    Scenario {currentStep + 1} of {activeScenarios.length}
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-bold text-[#1A1A2E] mb-8 leading-tight">
                  {scenario.context}
                </h2>
                
                <div className="mb-6 flex items-center gap-2 text-[#FF6B00] font-bold">
                  <AlertTriangle size={20} />
                  <span>{scenario.question}</span>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {scenario.options.map((opt, idx) => {
                    let btnClass = "bg-black/[0.03] border-black/10 text-[#1A1A2E]/80 hover:bg-black/5 hover:border-black/20";
                    let Icon = null;

                    if (isAnswered) {
                      if (opt.isCorrect) {
                        btnClass = "bg-[#138808]/10 border-[#138808] text-[#1A1A2E]";
                        Icon = CheckCircle2;
                      } else if (idx === selectedOption) {
                        btnClass = "bg-red-500/10 border-red-500 text-[#1A1A2E]";
                        Icon = XCircle;
                      } else {
                        btnClass = "bg-black/[0.02] border-black/10 opacity-50 cursor-not-allowed text-[#1A1A2E]/60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${btnClass}`}
                      >
                        <span className="font-medium text-lg">
                          {opt.text}
                          {/* Color and the icon alone shouldn't be the only signal here. */}
                          {isAnswered && opt.isCorrect && <span className="sr-only"> (Correct answer)</span>}
                          {isAnswered && idx === selectedOption && !opt.isCorrect && <span className="sr-only"> (Your answer, incorrect)</span>}
                        </span>
                        {Icon && <Icon size={24} aria-hidden="true" className={opt.isCorrect ? "text-[#138808]" : "text-red-500"} />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation & Next Button */}
                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 rounded-xl bg-[#0A0F5C]/5 border border-[#0A0F5C]/30 mb-6">
                        <h4 className="font-bold text-[#FF6B00] mb-2 font-[family-name:var(--font-display)] text-xl">
                          {scenario.options[selectedOption!].isCorrect ? "Correct!" : "Actually..."}
                        </h4>
                        <p className="text-[#1A1A2E]/80 leading-relaxed">
                          {scenario.explanation}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleNext}
                          className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
                        >
                          {currentStep === activeScenarios.length - 1 ? 'See Results' : 'Next Scenario'}
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Results Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center text-center py-20"
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#FF6B00] to-[#DE350B] flex items-center justify-center mb-8 shadow-2xl shadow-[#FF6B00]/20">
              <ShieldAlert size={60} className="text-white" />
            </div>
            
            <h2 className="text-5xl font-bold font-[family-name:var(--font-display)] mb-4">
              Simulator Complete
            </h2>
            <p className="text-2xl text-[#1A1A2E]/80 mb-2">
              You scored <span className="text-[#FF6B00] font-black">{score}</span> out of {activeScenarios.length}
            </p>

            <p className="text-[#1A1A2E]/60 max-w-md mx-auto mb-12">
              {score === activeScenarios.length 
                ? "Incredible! You have a profound understanding of your constitutional rights. You are a highly aware citizen."
                : "Great effort! Understanding your rights is the first step to empowerment. Keep exploring the Constitution!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={restartSimulator}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-black/5 hover:bg-black/10 border border-black/10 text-[#1A1A2E] rounded-full font-bold transition-all"
              >
                <RotateCcw size={20} />
                Try Again
              </button>
              <Link
                href="/explore"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#DE350B] hover:opacity-90 text-white rounded-full font-bold transition-all shadow-lg shadow-[#FF6B00]/20"
              >
                Explore Directory
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}

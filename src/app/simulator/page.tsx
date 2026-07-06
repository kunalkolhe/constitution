'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, CheckCircle2, XCircle, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { SCENARIOS } from '@/data/scenarios';

export default function SimulatorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [activeScenarios, setActiveScenarios] = useState<typeof SCENARIOS>([]);

  // Select 5 random scenarios on mount
  useEffect(() => {
    pickRandomScenarios();
  }, []);

  const pickRandomScenarios = () => {
    const shuffled = [...SCENARIOS].sort(() => 0.5 - Math.random());
    setActiveScenarios(shuffled.slice(0, 5));
  };

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
    pickRandomScenarios();
    setCurrentStep(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  // Prevent render before scenarios are loaded
  if (activeScenarios.length === 0) return null;

  return (
    <main className="bg-[#05050A] min-h-screen text-white selection:bg-[#FF6B00] selection:text-white">
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
          <p className="text-white/60 font-[family-name:var(--font-sans)] text-lg max-w-2xl mx-auto">
            Step into real-world scenarios and discover how the Constitution protects you in daily life. 
            Can you identify the right that saves the day?
          </p>
        </div>

        {!isFinished ? (
          <div className="flex-1 flex flex-col">
            {/* Progress Bar */}
            <div className="w-full bg-white/5 rounded-full h-2.5 mb-8 overflow-hidden">
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
                className="bg-white/5 border border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-black/50"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-sm font-bold tracking-wider uppercase">
                    Scenario {currentStep + 1} of {activeScenarios.length}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-display)] font-bold text-white mb-8 leading-tight">
                  {scenario.context}
                </h2>
                
                <div className="mb-6 flex items-center gap-2 text-[#FF6B00] font-bold">
                  <AlertTriangle size={20} />
                  <span>{scenario.question}</span>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {scenario.options.map((opt, idx) => {
                    let btnClass = "bg-white/5 border-white/10 text-white/80 hover:bg-white/10 hover:border-white/20";
                    let Icon = null;
                    
                    if (isAnswered) {
                      if (opt.isCorrect) {
                        btnClass = "bg-[#138808]/20 border-[#138808] text-white";
                        Icon = CheckCircle2;
                      } else if (idx === selectedOption) {
                        btnClass = "bg-red-500/20 border-red-500 text-white";
                        Icon = XCircle;
                      } else {
                        btnClass = "bg-white/5 border-white/10 opacity-50 cursor-not-allowed";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelect(idx)}
                        disabled={isAnswered}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${btnClass}`}
                      >
                        <span className="font-medium text-lg">{opt.text}</span>
                        {Icon && <Icon size={24} className={opt.isCorrect ? "text-[#138808]" : "text-red-500"} />}
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
                      <div className="p-5 rounded-xl bg-[#0A0F5C]/30 border border-[#0A0F5C] mb-6">
                        <h4 className="font-bold text-[#FF6B00] mb-2 font-[family-name:var(--font-display)] text-xl">
                          {scenario.options[selectedOption!].isCorrect ? "Correct!" : "Actually..."}
                        </h4>
                        <p className="text-white/80 leading-relaxed">
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
            <p className="text-2xl text-white/80 mb-2">
              You scored <span className="text-[#FF6B00] font-black">{score}</span> out of {activeScenarios.length}
            </p>
            
            <p className="text-white/60 max-w-md mx-auto mb-12">
              {score === activeScenarios.length 
                ? "Incredible! You have a profound understanding of your constitutional rights. You are a highly aware citizen."
                : "Great effort! Understanding your rights is the first step to empowerment. Keep exploring the Constitution!"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={restartSimulator}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-bold transition-all"
              >
                <RotateCcw size={20} />
                Try Again
              </button>
              <Link
                href="/explore"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#DE350B] hover:opacity-90 rounded-full font-bold transition-all shadow-lg shadow-[#FF6B00]/20"
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

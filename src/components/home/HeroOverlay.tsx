'use client';

import React from 'react';
import { motion, useTransform, MotionValue } from 'framer-motion';
import { Rocket, Zap } from 'lucide-react';

interface HeroOverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function HeroOverlay({ scrollYProgress }: HeroOverlayProps) {
  // PHASE 1 (Forced to 0 to test if text is baked into user images)
  const p1Opacity = useTransform(scrollYProgress, [0, 1], [0, 0]);

  // PHASE 2
  const p2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.42, 0.50], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.25, 0.50], ['60px', '-60px']);

  // PHASE 3
  const p3Opacity = useTransform(scrollYProgress, [0.50, 0.60, 0.68, 0.75], [0, 1, 1, 0]);

  // PHASE 4
  const p4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1.00], [0, 1, 1, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      
      {/* PHASE 1: Main Title Overlay */}
      <motion.div 
        style={{ opacity: p1Opacity }} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full will-change-[opacity,transform] pointer-events-none"
      >
        <h1 className="font-[family-name:var(--font-devanagari)] font-bold tracking-normal text-[#FFF8F0] text-[clamp(4rem,12vw,10rem)] leading-tight select-none drop-shadow-[0_0_30px_rgba(0,0,0,0.9)]">
          भारतीय संविधान
        </h1>
      </motion.div>

      {/* PHASE 2: Welcome Intro */}
      <motion.div 
        style={{ opacity: p2Opacity, y: p2Y }} 
        className="absolute bottom-[10vh] left-[8vw] will-change-[opacity,transform] max-w-[80vw]"
      >
        <p className="font-[family-name:var(--font-sans)] text-[0.85rem] tracking-[0.25em] font-semibold text-[#FF6B00] mb-2 uppercase drop-shadow-lg">
          Bhartiya Savidhan
        </p>
        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(3rem,9vw,8rem)] leading-[1.1] tracking-[-0.03em] text-[#FFF8F0] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Samajho Apna Adhikar
        </h2>
        <p className="font-[family-name:var(--font-sans)] text-[1rem] text-[#FFF8F0]/70 font-normal drop-shadow-md">
          448 Articles · 12 Schedules · Your Rights
        </p>
      </motion.div>

      {/* PHASE 3: Mission Statement */}
      <motion.div 
        style={{ opacity: p3Opacity }} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full will-change-[opacity,transform]"
      >
        <h2 className="font-[family-name:var(--font-display)] font-bold text-[clamp(2.2rem,6vw,6rem)] leading-[1.2] tracking-[-0.03em] text-[#FFF8F0] text-center mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Learn the Constitution<br/>that protects you.
        </h2>
        <div className="w-[80px] h-[3px] bg-[#FF6B00] rounded-sm" />
      </motion.div>

      {/* PHASE 4: Main CTA */}
      <motion.div 
        style={{ opacity: p4Opacity }} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-4 will-change-[opacity,transform]"
      >
        <p className="font-[family-name:var(--font-sans)] text-[0.9rem] tracking-[0.2em] font-medium text-[#FF6B00] uppercase mb-4 text-center drop-shadow-lg">
          India's Most Fun Way to Learn Civics
        </p>
        <h2 className="font-[family-name:var(--font-display)] font-extrabold text-[clamp(2rem,5.5vw,5rem)] leading-[1.1] tracking-[-0.03em] text-[#FFF8F0] text-center mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Every Indian deserves to<br/>know their rights.
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto">
          <a href="/roadmap" className="bg-[#FF6B00] hover:bg-[#FF8C3A] text-white font-semibold rounded-full px-8 py-4 transition-colors shadow-lg shadow-[#FF6B00]/40 flex items-center justify-center gap-2">
            <Rocket size={18} /> Start Exploring
          </a>
          <a href="/quiz" className="border-2 border-white/30 hover:bg-white hover:text-black text-white backdrop-blur-md font-semibold rounded-full px-8 py-4 transition-colors flex items-center justify-center gap-2">
            <Zap size={18} /> Take a Quiz
          </a>
        </div>
        
        <p className="font-[family-name:var(--font-sans)] text-[0.9rem] text-white/50 tracking-[0.12em] mt-8 text-center uppercase drop-shadow-sm">
          448 Articles · 12 Schedules · 105 Amendments · 22 Languages
        </p>
      </motion.div>

    </div>
  );
}

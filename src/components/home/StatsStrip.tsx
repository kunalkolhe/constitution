'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

interface StatProps {
  end: number;
  label: string;
}

const StatCounter = ({ end, label }: StatProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const duration = 2000;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = (time - startTime) / duration;
      
      if (progress < 1) {
        setCount(Math.floor(end * easeOutQuart(progress)));
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,7vw,5.5rem)] font-extrabold text-[#FFD700] leading-none"
      >
        {count}
      </motion.div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-[family-name:var(--font-sans)] text-[1rem] font-medium text-[rgba(255,255,255,0.85)] mt-2"
      >
        {label}
      </motion.div>
    </div>
  );
};

export default function StatsStrip() {
  return (
    <section className="w-full bg-gradient-to-r from-[#0a0a0f] to-[#1a1a2e] py-16 px-4 relative z-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-[clamp(3rem,8vw,8rem)]">
        <StatCounter end={448} label="Articles" />
        <StatCounter end={12} label="Schedules" />
        <StatCounter end={105} label="Amendments" />
        <StatCounter end={22} label="Languages" />
      </div>
    </section>
  );
}

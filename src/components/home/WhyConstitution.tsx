'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Flag, Landmark, Scroll, Shield } from 'lucide-react';

const STORY_BEATS = [
  {
    year: '1947',
    headline: 'A Nation is Born — But Into Chaos',
    body: 'On August 15th, India gained freedom after 200 years of colonial rule. But it inherited a fragmented land — over 560 princely states, different religions, languages, and centuries of caste division. The British left, but the question remained: how would 340 million people — strangers to democracy — govern themselves?',
    color: '#FF6B00',
    symbol: <Flag size={40} className="text-[#FF6B00]" />,
  },
  {
    year: '1946–49',
    headline: 'The Great Debate',
    body: 'For 2 years, 11 months, and 17 days, 299 brilliant minds gathered in New Delhi. They debated — often fiercely — every word of the document that would define the nation. Dr. B.R. Ambedkar, the chief architect, said: "A Constitution is not merely a lawyers\' document, it is a vehicle of Life." They were writing a promise to every Indian.',
    color: '#0052CC',
    symbol: <Landmark size={40} className="text-[#0052CC]" />,
  },
  {
    year: '1950',
    headline: 'The Promise Written in Ink',
    body: 'On January 26th, 1950, the Constitution came into effect. It was the longest written constitution of any sovereign nation in the world. It promised every citizen — regardless of caste, creed, religion, or gender — equality, liberty, justice, and fraternity. These were not just words. They were a revolutionary act.',
    color: '#138808',
    symbol: <Scroll size={40} className="text-[#138808]" />,
  },
  {
    year: 'Today',
    headline: 'Why It Still Matters',
    body: 'The Constitution is not a relic in a museum. It is a living shield. Every time someone is treated unfairly, they can invoke it. Every time a government overreaches, the courts use it to push back. It is the reason you have the right to speak, vote, worship, and live with dignity. Without it, there is no India.',
    color: '#FFD700',
    symbol: <Shield size={40} className="text-[#FFD700]" />,
  }
];

function StoryCard({ beat, index }: { beat: typeof STORY_BEATS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-0"
    >
      {/* LEFT CONTENT */}
      {isLeft ? (
        <div className="md:pr-16 w-full text-center md:text-right min-w-0">
          <div 
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ backgroundColor: `${beat.color}20`, color: beat.color }}
          >
            {beat.year}
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-white leading-tight mb-4">
            {beat.headline}
          </h3>
          <p className="font-[family-name:var(--font-sans)] text-white/60 text-[1rem] leading-[1.8] max-w-lg mx-auto md:ml-auto md:mr-0 text-left md:text-right">
            {beat.body}
          </p>
        </div>
      ) : (
        <div className="hidden md:block min-w-0" />
      )}

      {/* CENTER NODE */}
      <div 
        className="z-10 flex-shrink-0 w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full flex items-center justify-center border border-white/10 text-5xl bg-[#05050A]"
        style={{ 
          background: `radial-gradient(circle at center, ${beat.color}20, #05050A 70%)`,
          boxShadow: `0 0 50px ${beat.color}15`
        }}
      >
        {beat.symbol}
      </div>

      {/* RIGHT CONTENT */}
      {!isLeft ? (
        <div className="md:pl-16 w-full text-center md:text-left min-w-0">
          <div 
            className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ backgroundColor: `${beat.color}20`, color: beat.color }}
          >
            {beat.year}
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.2rem)] font-bold text-white leading-tight mb-4">
            {beat.headline}
          </h3>
          <p className="font-[family-name:var(--font-sans)] text-white/60 text-[1rem] leading-[1.8] max-w-lg mx-auto md:mr-auto md:ml-0 text-left">
            {beat.body}
          </p>
        </div>
      ) : (
        <div className="hidden md:block min-w-0" />
      )}
    </motion.div>
  );
}

export default function WhyConstitution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section ref={containerRef} className="relative py-24 md:py-40 px-4 bg-[#05050A] overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full opacity-5 blur-[100px] pointer-events-none" 
        style={{ background: 'radial-gradient(circle, #FF6B00, transparent)' }} />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-5 blur-[100px] pointer-events-none" 
        style={{ background: 'radial-gradient(circle, #0052CC, transparent)' }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-[#FF6B00] font-bold uppercase tracking-[0.3em] text-sm mb-4">The Story</p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight tracking-tight">
            Why Does India Need<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#138808]">
              a Constitution?
            </span>
          </h2>
          <p className="mt-6 font-[family-name:var(--font-sans)] text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
            It is not just a legal document. It is a 75-year-old promise — written in the ashes of colonialism — to build a nation where every person has dignity.
          </p>
        </motion.div>

        {/* Story Timeline */}
        <div className="relative">
          {/* Animated vertical line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2">
            <motion.div 
              className="w-full bg-gradient-to-b from-[#FF6B00] via-[#0052CC] to-[#138808]"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="flex flex-col gap-20 md:gap-28">
            {STORY_BEATS.map((beat, i) => (
              <StoryCard key={i} beat={beat} index={i} />
            ))}
          </div>
        </div>

        {/* Quote Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center border-t border-white/5 pt-16"
        >
          <p className="font-[family-name:var(--font-display)] text-[clamp(1.2rem,3vw,2rem)] text-white/80 italic leading-relaxed max-w-3xl mx-auto">
            &ldquo;The Constitution is not a mere lawyers&apos; document, it is a vehicle of Life, and its spirit is always the spirit of Age.&rdquo;
          </p>
          <p className="mt-4 text-[#FF6B00] font-bold text-sm tracking-widest uppercase">
            — Dr. B.R. Ambedkar
          </p>
        </motion.div>
      </div>
    </section>
  );
}

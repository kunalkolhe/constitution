'use client';

import React, { useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { X } from 'lucide-react';

const PREAMBLE_TEXT = "WE, THE PEOPLE OF INDIA, having solemnly resolved to constitute India into a SOVEREIGN SOCIALIST SECULAR DEMOCRATIC REPUBLIC and to secure to all its citizens: JUSTICE, social, economic and political; LIBERTY of thought, expression, belief, faith and worship; EQUALITY of status and of opportunity; and to promote among them all FRATERNITY assuring the dignity of the individual and the unity and integrity of the Nation; IN OUR CONSTITUENT ASSEMBLY this twenty-sixth day of November, 1949, do HEREBY ADOPT, ENACT AND GIVE TO OURSELVES THIS CONSTITUTION.";

const KEY_TERMS: Record<string, { desc: string, hindi: string }> = {
  "SOVEREIGN": { desc: "India is an independent country. No external power can dictate to the government of India.", hindi: "संप्रभु (Samprabhu)" },
  "SOCIALIST": { desc: "Wealth should be shared equally by society. The government regulates ownership of land and industry to reduce socio-economic inequalities.", hindi: "समाजवादी (Samajwadi)" },
  "SECULAR": { desc: "Citizens have complete freedom to follow any religion. There is no official state religion.", hindi: "पंथनिरपेक्ष (Panthnirpeksh)" },
  "DEMOCRATIC": { desc: "A form of government where people enjoy equal political rights, elect their rulers and hold them accountable.", hindi: "लोकतंत्रात्मक (Loktantratmak)" },
  "REPUBLIC": { desc: "The head of the state is an elected person and not a hereditary monarch.", hindi: "गणराज्य (Ganrajya)" },
  "JUSTICE,": { desc: "Citizens cannot be discriminated against on the grounds of caste, religion, and gender. Social inequalities must be reduced.", hindi: "न्याय (Nyay)" },
  "LIBERTY": { desc: "There are no unreasonable restrictions on the citizens in what they think, how they wish to express their thoughts.", hindi: "स्वतंत्रता (Swatantrata)" },
  "EQUALITY": { desc: "All are equal before the law. The traditional social inequalities have to be ended.", hindi: "समता (Samata)" },
  "FRATERNITY": { desc: "All of us should behave as if we are members of the same family. No one should treat a fellow citizen as inferior.", hindi: "बंधुता (Bandhuta)" },
};

export default function PreamblePage() {
  const { scrollYProgress } = useScroll();
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  const words = PREAMBLE_TEXT.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <main className="relative min-h-screen bg-[#1E1E2A]">
      <Navbar />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[4px] bg-[#FF6B00] origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Parchment Background (LAYOUT D) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04]">
          <Image unoptimized 
            src="/images/The_Constitution_of_..._imresizer_1765630728674.jpg"
            alt="Preamble Watermark" 
            fill 
            style={{ objectFit: 'cover', objectPosition: 'center' }} 
          />
        </div>
      </div>

      <div className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto min-h-screen flex flex-col items-center relative z-10">
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,5rem)] font-bold text-[#F4F1EA] leading-none mb-4 drop-shadow-md">
            The Preamble
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-[#F4F1EA]/70 text-lg">
            The soul of the Indian Constitution
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center leading-[2] md:leading-[2.2] font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold text-[#F4F1EA]/90 drop-shadow-sm max-w-5xl p-8 md:p-16 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          {/* Subtle inner glow for the glass card */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
          {words.map((word, i) => {
            const cleanWord = word.replace(/[.,;]/g, '');
            const isKeyTerm = Object.keys(KEY_TERMS).some(t => t.includes(cleanWord) && cleanWord.length > 3 && cleanWord === cleanWord.toUpperCase());
            const termKey = Object.keys(KEY_TERMS).find(t => t.includes(cleanWord));

            return (
              <motion.span 
                key={i} 
                variants={wordVariants}
                className={`inline-block mr-[0.4em] ${isKeyTerm ? 'text-[#FF6B00] cursor-pointer hover:scale-105 transition-transform' : ''}`}
                onClick={() => isKeyTerm && termKey && setActiveTerm(termKey)}
              >
                {word}
              </motion.span>
            )
          })}
          </div>
        </motion.div>
      </div>

      {/* Side Drawer */}
      <AnimatePresence>
        {activeTerm && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTerm(null)}
              className="fixed inset-0 bg-[#1A1A2E]/20 backdrop-blur-sm z-[60]"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[90%] max-w-[400px] bg-white shadow-2xl z-[70] p-8 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[#0A0F5C]">
                  Term Explained
                </h3>
                <button onClick={() => setActiveTerm(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} className="text-[#1A1A2E]" />
                </button>
              </div>

              <div className="mb-6">
                <div className="text-sm font-semibold tracking-widest text-[#FF6B00] uppercase mb-2">Word</div>
                <h2 className="font-[family-name:var(--font-display)] text-4xl font-black text-[#1A1A2E]">
                  {activeTerm.replace(',', '')}
                </h2>
              </div>

              <div className="mb-8">
                <div className="text-sm font-semibold tracking-widest text-[#FF6B00] uppercase mb-2">Hindi Translation</div>
                <p className="font-[family-name:var(--font-devanagari)] text-2xl text-[#1A1A2E] font-medium">
                  {KEY_TERMS[activeTerm].hindi}
                </p>
              </div>

              <div>
                <div className="text-sm font-semibold tracking-widest text-[#FF6B00] uppercase mb-2">Meaning</div>
                <p className="font-[family-name:var(--font-sans)] text-lg text-[#1A1A2E]/80 leading-relaxed">
                  {KEY_TERMS[activeTerm].desc}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

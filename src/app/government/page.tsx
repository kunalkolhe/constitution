'use client';

import React, { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const BRANCHES = [
  {
    id: 'legislative',
    title: 'Legislative',
    color: '#FF6B00',
    desc: 'Makes the Laws',
    content: 'The Parliament of India consists of the President and two Houses: the Rajya Sabha (Council of States) and the Lok Sabha (House of the People). They debate and pass laws that govern the nation.',
    details: [
      { title: 'Lok Sabha', desc: 'Lower house, 543 elected members. Term: 5 years.' },
      { title: 'Rajya Sabha', desc: 'Upper house, up to 250 members. Permanent body, 1/3rd retire every 2 years.' },
      { title: 'Functions', desc: 'Passes bills, budgets, and holds the executive accountable.' }
    ]
  },
  {
    id: 'executive',
    title: 'Executive',
    color: '#0A0F5C',
    desc: 'Enforces the Laws',
    content: 'Headed by the President, but the real executive power lies with the Prime Minister and the Council of Ministers. They are responsible for running the government and enforcing the laws made by the legislature.',
    details: [
      { title: 'President', desc: 'Head of State, elected indirectly. Supreme Commander of Armed Forces.' },
      { title: 'Prime Minister', desc: 'Head of Government, leads the Council of Ministers.' },
      { title: 'Bureaucracy', desc: 'Civil servants (IAS, IPS, etc.) who implement policies.' }
    ]
  },
  {
    id: 'judicial',
    title: 'Judicial',
    color: '#138808',
    desc: 'Interprets the Laws',
    content: 'The Supreme Court of India is the highest judicial court. It acts as the guardian of the Constitution, settling disputes between states, and protecting the fundamental rights of citizens.',
    details: [
      { title: 'Supreme Court', desc: 'Apex court, headed by the Chief Justice of India (CJI).' },
      { title: 'High Courts', desc: 'Top courts at the State level.' },
      { title: 'Subordinate Courts', desc: 'District and local courts across the country.' }
    ]
  }
];

export default function GovernmentPage() {
  const [activeBranch, setActiveBranch] = useState<string | null>(null);

  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      {/* Parliament SVG Header */}
      <div className="w-full h-[300px] mt-16 bg-[#05050A] flex items-end justify-center overflow-hidden relative border-b border-white/5">
        <svg viewBox="0 0 800 300" className="w-full h-full max-w-5xl opacity-80" preserveAspectRatio="xMidYMax meet">
          <rect x="0" y="250" width="800" height="50" fill="#0A0F5C" opacity="0.5" />
          <path d="M 400 50 C 320 50, 280 150, 280 250 L 520 250 C 520 150, 480 50, 400 50 Z" fill="#FF6B00" opacity="0.8" />
          <rect x="150" y="180" width="130" height="70" fill="#0A0F5C" opacity="0.8" />
          <rect x="520" y="180" width="130" height="70" fill="#0A0F5C" opacity="0.8" />
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={'l'+i} x={160 + i * 20} y="150" width="8" height="100" fill="#05050A" opacity="0.8" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <rect key={'r'+i} x={530 + i * 20} y="150" width="8" height="100" fill="#05050A" opacity="0.8" />
          ))}
          <path d="M 398 10 L 402 10 L 402 50 L 398 50 Z" fill="white" />
          <rect x="402" y="15" width="40" height="10" fill="#FF6B00" />
          <rect x="402" y="25" width="40" height="10" fill="#FFF" />
          <rect x="402" y="35" width="40" height="10" fill="#138808" />
        </svg>
      </div>

      <div className="pt-16 pb-24 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-none mb-4">
          The Three Pillars
        </h1>
        <p className="font-[family-name:var(--font-sans)] text-white/60 text-lg mb-16 max-w-2xl mx-auto">
          India's government is divided into three branches. This separation of powers ensures that no single branch becomes too powerful.
        </p>

        <div className="relative mb-8">
          {/* Connecting Lines SVG (Desktop) */}
          <div className="hidden md:block absolute top-[50%] left-[16.6%] right-[16.6%] h-[2px] bg-white/10 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {BRANCHES.map(branch => {
              const isActive = activeBranch === branch.id;
              return (
                <div key={branch.id} className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveBranch(isActive ? null : branch.id)}
                    className={`w-full max-w-[280px] p-8 rounded-3xl border-2 transition-all duration-300 ${
                      isActive ? 'bg-white/10 shadow-lg shadow-black/20 scale-105 border-white/30 backdrop-blur-md' : 'bg-white/5 backdrop-blur-md border-transparent shadow-sm hover:border-white/20 hover:bg-white/10'
                    }`}
                    style={{ borderColor: isActive ? branch.color : undefined }}
                  >
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2" style={{ color: branch.color }}>
                      {branch.title}
                    </h3>
                    <p className="font-[family-name:var(--font-sans)] text-sm font-semibold uppercase tracking-widest text-white/50">
                      {branch.desc}
                    </p>
                  </motion.button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Expandable Content Panel */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            {activeBranch && (
              <motion.div
                key={activeBranch}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div 
                  className="bg-white/5 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-lg border border-white/10 border-t-0 text-left mx-auto max-w-4xl"
                  style={{ 
                    borderTop: `6px solid ${BRANCHES.find(b => b.id === activeBranch)?.color}` 
                  }}
                >
                  <h4 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4" style={{ color: BRANCHES.find(b => b.id === activeBranch)?.color }}>
                    {BRANCHES.find(b => b.id === activeBranch)?.title} Branch
                  </h4>
                  <p className="font-[family-name:var(--font-sans)] text-white/80 text-lg leading-relaxed mb-8">
                    {BRANCHES.find(b => b.id === activeBranch)?.content}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {BRANCHES.find(b => b.id === activeBranch)?.details?.map((detail, idx) => (
                      <div key={idx} className="bg-black/20 p-6 rounded-2xl border border-white/5">
                        <h5 className="font-bold text-white/90 mb-2">{detail.title}</h5>
                        <p className="text-sm text-white/60 leading-relaxed">{detail.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
      <Footer />
    </main>
  );
}

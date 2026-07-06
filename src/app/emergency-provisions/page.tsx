'use client';

import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion } from 'framer-motion';
import { AlertTriangle, Map, Banknote, ShieldAlert } from 'lucide-react';

const EMERGENCIES = [
  {
    type: 'National Emergency',
    article: 'Article 352',
    icon: <ShieldAlert size={48} />,
    color: '#DE350B',
    bg: '#DE350B10',
    grounds: 'War, external aggression, or armed rebellion.',
    impact: 'Fundamental Rights can be suspended. The central government becomes all-powerful, turning the federal structure into a unitary one.',
    history: 'Declared 3 times: 1962 (China war), 1971 (Pakistan war), and 1975 (Internal disturbance by Indira Gandhi).'
  },
  {
    type: "President's Rule (State Emergency)",
    article: 'Article 356',
    icon: <Map size={48} />,
    color: '#FF8B00',
    bg: '#FF8B0010',
    grounds: 'Failure of constitutional machinery in a State.',
    impact: 'The State government is dismissed, and the State is directly administered by the President through the Governor.',
    history: 'Declared over 100 times across various states since independence.'
  },
  {
    type: 'Financial Emergency',
    article: 'Article 360',
    icon: <Banknote size={48} />,
    color: '#00875A',
    bg: '#00875A10',
    grounds: 'Threat to the financial stability or credit of India.',
    impact: 'Salaries of government officials (including Supreme Court judges) can be reduced. State money bills are reserved for President\'s consideration.',
    history: 'Never declared so far in India\'s history.'
  }
];

export default function EmergencyProvisionsPage() {
  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#E3A300] font-bold tracking-widest uppercase text-sm mb-4 block flex items-center justify-center gap-2">
            <AlertTriangle size={16} /> Part XVIII • Articles 352–360
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white leading-none mb-6">
            Emergency Provisions
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-white/60 text-lg max-w-3xl mx-auto">
            Extraordinary powers granted to the President to deal with abnormal situations, safeguarding the sovereignty, security, and stability of the country.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EMERGENCIES.map((em, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg shadow-black/20 border border-white/10 hover:border-white/30 transition-colors flex flex-col group"
            >
              <div 
                className="h-32 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: em.color }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`pattern-${idx}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 0 20 L 20 0 Z" stroke="white" strokeWidth="2" fill="none" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#pattern-${idx})`} />
                  </svg>
                </div>
                <div className="text-white z-10 scale-125 drop-shadow-md">
                  {em.icon}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 self-start"
                  style={{ backgroundColor: em.bg, color: em.color }}
                >
                  {em.article}
                </span>
                
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white/90 mb-6 group-hover:text-white transition-colors">
                  {em.type}
                </h2>
                
                <div className="space-y-6 flex-grow">
                  <div>
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Grounds for Declaration</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{em.grounds}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Impact</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{em.impact}</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10">
                  <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Historical Context</h3>
                  <p className="text-sm font-medium italic text-white/60">{em.history}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
}

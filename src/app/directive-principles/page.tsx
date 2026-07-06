'use client';

import React, { useState } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, BookOpen, ChevronRight } from 'lucide-react';

const PRINCIPLES = [
  {
    id: 'socialist',
    icon: <Users size={32} className="text-[#DE350B]" />,
    color: '#DE350B',
    title: 'Socialist Principles',
    desc: 'Aim to bridge the gap between rich and poor.',
    articles: [
      { art: 'Article 38', text: 'Promote the welfare of the people by securing a social order permeated by justice.' },
      { art: 'Article 39', text: 'Equal pay for equal work for men and women.' },
      { art: 'Article 41', text: 'Right to work, to education and to public assistance in cases of unemployment, old age, sickness and disablement.' }
    ]
  },
  {
    id: 'gandhian',
    icon: <Heart size={32} className="text-[#138808]" />,
    color: '#138808',
    title: 'Gandhian Principles',
    desc: 'Based on the ideology of Mahatma Gandhi used during the national movement.',
    articles: [
      { art: 'Article 40', text: 'Organize village panchayats and endow them with necessary powers.' },
      { art: 'Article 43', text: 'Promote cottage industries on an individual or co-operative basis in rural areas.' },
      { art: 'Article 47', text: 'Prohibit the consumption of intoxicating drinks and drugs which are injurious to health.' }
    ]
  },
  {
    id: 'liberal',
    icon: <BookOpen size={32} className="text-[#0A0F5C]" />,
    color: '#0A0F5C',
    title: 'Liberal-Intellectual',
    desc: 'Represent the ideology of liberalism.',
    articles: [
      { art: 'Article 44', text: 'Secure for the citizens a Uniform Civil Code throughout the territory of India.' },
      { art: 'Article 45', text: 'Provide early childhood care and education for all children until they complete the age of six years.' },
      { art: 'Article 50', text: 'Separate the judiciary from the executive in the public services of the State.' }
    ]
  }
];

export default function DirectivePrinciplesPage() {
  const [activeTab, setActiveTab] = useState(PRINCIPLES[0].id);

  const activePrinciple = PRINCIPLES.find(p => p.id === activeTab);

  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#FFD700] font-bold tracking-widest uppercase text-sm mb-4 block">Part IV • Articles 36–51</span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-white leading-none mb-6">
            Directive Principles of State Policy
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-white/60 text-lg max-w-3xl mx-auto">
            These are the moral compass for the government. While Fundamental Rights protect citizens from the State, Directive Principles guide the State in making policies to create a just society. They are non-justiciable (cannot be enforced by courts) but are fundamental in the governance of the country.
          </p>
        </div>

        {/* Custom Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
          {PRINCIPLES.map(p => {
            const isActive = activeTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveTab(p.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${
                  isActive ? 'bg-white/10 shadow-lg shadow-black/20 scale-105 border-white/30' : 'bg-transparent border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
                style={{ borderColor: isActive ? p.color : undefined }}
              >
                <div className={`p-2 rounded-xl ${isActive ? 'bg-opacity-20' : 'bg-white/5'}`} style={{ backgroundColor: isActive ? `${p.color}20` : undefined }}>
                  {React.cloneElement(p.icon as React.ReactElement<any>, { className: isActive ? '' : 'text-white/40' })}
                </div>
                <div className="text-left">
                  <h3 className={`font-bold ${isActive ? 'text-white' : 'text-white/50'}`}>{p.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg shadow-black/20 border border-white/10 min-h-[400px]">
          <AnimatePresence mode="wait">
            {activePrinciple && (
              <motion.div
                key={activePrinciple.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5" style={{ backgroundColor: `${activePrinciple.color}20` }}>
                    {activePrinciple.icon}
                  </div>
                  <div>
                    <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-white/90">{activePrinciple.title}</h2>
                    <p className="text-white/60">{activePrinciple.desc}</p>
                  </div>
                </div>

                <div className="space-y-4 mt-8">
                  {activePrinciple.articles.map((art, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <span 
                        className="flex-shrink-0 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap bg-white/10"
                        style={{ color: activePrinciple.color, borderColor: `${activePrinciple.color}30`, borderWidth: 1 }}
                      >
                        {art.art}
                      </span>
                      <p className="text-white/80 leading-relaxed pt-1">
                        {art.text}
                      </p>
                    </motion.div>
                  ))}
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

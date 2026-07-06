'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const TERMS = [
  { id: 1, term: 'Habeas Corpus', category: 'Writs', hindi: 'बंदी प्रत्यक्षीकरण', desc: 'A writ requiring a person under arrest to be brought before a judge or into court, to secure the person\'s release unless lawful grounds are shown for their detention.' },
  { id: 2, term: 'Mandamus', category: 'Writs', hindi: 'परमादेश', desc: 'A judicial writ issued as a command to an inferior court or ordering a person to perform a public or statutory duty.' },
  { id: 3, term: 'Quo Warranto', category: 'Writs', hindi: 'अधिकार पृच्छा', desc: 'A writ or legal action requiring a person to show by what warrant an office or franchise is held, claimed, or exercised.' },
  { id: 4, term: 'Preamble', category: 'Basic Structure', hindi: 'प्रस्तावना', desc: 'The introductory statement in the Constitution which states the reasons and guiding values of the Constitution.' },
  { id: 5, term: 'Secular', category: 'Basic Structure', hindi: 'पंथनिरपेक्ष', desc: 'The state has no official religion. All citizens have complete freedom to follow any religion.' },
  { id: 6, term: 'Bicameralism', category: 'Parliament', hindi: 'द्विसदनीय', desc: 'A legislative body having two branches or chambers (e.g., Lok Sabha and Rajya Sabha).' },
  { id: 7, term: 'Ordinance', category: 'Executive', hindi: 'अध्यादेश', desc: 'Laws promulgated by the President of India when the Parliament is not in session. They have the same force as an Act of Parliament.' },
];

const CATEGORIES = ['All', 'Writs', 'Basic Structure', 'Parliament', 'Executive'];
const PLACEHOLDERS = ['Search "Habeas Corpus"...', 'Search "Preamble"...', 'Search "Secular"...', 'Search "Mandamus"...'];

export default function GlossaryPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIdx(prev => (prev + 1) % PLACEHOLDERS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredTerms = TERMS.filter(t => {
    const matchCategory = filter === 'All' || t.category === filter;
    const matchSearch = t.term.toLowerCase().includes(search.toLowerCase()) || 
                        t.hindi.includes(search) || 
                        t.desc.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="bg-[#05050A] min-h-screen">
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-none mb-4">
            Constitution Glossary
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-white/60 text-lg mb-8">
            Legal terms, explained in plain language.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-8">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#FF6B00]">
              <Search size={20} />
            </div>
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={PLACEHOLDERS[placeholderIdx]}
              className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-full py-4 pl-12 pr-6 shadow-lg shadow-black/20 outline-none text-white font-[family-name:var(--font-sans)] transition-all placeholder:text-white/30"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                  filter === cat 
                    ? 'bg-white text-black' 
                    : 'bg-transparent text-white/60 border border-white/20 hover:border-white/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map(term => {
            const isExpanded = expandedId === term.id;
            return (
              <motion.div 
                key={term.id}
                layout
                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg shadow-black/20 overflow-hidden"
              >
                <button 
                  className="w-full p-6 text-left flex justify-between items-center bg-transparent hover:bg-white/5 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : term.id)}
                >
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white/90">
                      {term.term}
                    </h3>
                    <p className="font-[family-name:var(--font-devanagari)] text-[#FF6B00] font-medium">
                      {term.hindi}
                    </p>
                  </div>
                  <div className="text-white/50">
                    {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/10">
                        <span className="inline-block mb-3 text-xs font-bold text-white/60 uppercase tracking-widest bg-white/10 px-2 py-1 rounded">
                          {term.category}
                        </span>
                        <p className="font-[family-name:var(--font-sans)] text-white/80 leading-relaxed">
                          {term.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {filteredTerms.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-12 text-white/50">
              No terms found matching your search.
            </div>
          )}
        </div>

      </div>
      <Footer />
    </main>
  );
}

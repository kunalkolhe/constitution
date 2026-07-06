'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import { TERRITORIES, Territory } from '@/data/states';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Scale, Calendar, Shield, X, Map as MapIcon, Landmark } from 'lucide-react';
import India from '@react-map/india';

export default function StatesPage() {
  const [selected, setSelected] = useState<Territory | null>(null);
  const [mapSize, setMapSize] = useState(600);

  // Dynamic Map Sizing
  useEffect(() => {
    const handleResize = () => {
      // Fit within container, max 800px on desktop, smaller on mobile
      setMapSize(Math.min(window.innerWidth - 32, window.innerHeight * 0.7, 800));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selected]);

  const handleStateSelect = (stateCode: string | null) => {
    if (!stateCode) return;
    const territory = TERRITORIES.find(t => t.id === stateCode || t.name === stateCode || t.id.toLowerCase() === stateCode.toLowerCase());
    
    if (territory) {
      setSelected(territory);
    }
  };

  return (
    <main className="bg-[#05050A] min-h-screen text-white overflow-hidden relative">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FF6B00]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00B8D9]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 pt-32 pb-8 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen">
        
        <div className="text-center mb-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <MapIcon size={14} className="text-[#FF6B00]" />
            <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Interactive Map</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold mb-4"
          >
            The Union of States
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/40 text-sm max-w-lg mx-auto"
          >
            Hover over any state to see its name. Click on a state to reveal its constitutional jurisdiction and special provisions.
          </motion.p>
        </div>

        {/* Map Container */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full flex items-center justify-center cursor-pointer"
        >
          <India 
            type="select-single" 
            size={mapSize} 
            mapColor="#ffffff10" 
            strokeColor="#ffffff40"
            strokeWidth={1.2}
            hoverColor="#FF6B00"
            selectColor="#138808"
            hints={true}
            hintTextColor="#ffffff"
            hintBackgroundColor="#000000ee"
            hintPadding="12px 20px"
            hintBorderRadius={8}
            onSelect={handleStateSelect}
          />
        </motion.div>

      </div>

      {/* Cinematic Slide-In Panel */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
            />
            
            {/* Centered Modal */}
            <div className="fixed inset-0 z-[110] pointer-events-none flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden pointer-events-auto max-h-[90vh]"
              >
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-br from-[#FF6B00]/20 to-transparent pointer-events-none z-0" />
                
                {/* Modal Header */}
                <div className="relative z-10 p-6 md:p-8 border-b border-white/10">
                  <button 
                    onClick={() => setSelected(null)}
                    className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors backdrop-blur-md"
                  >
                    <X size={20} />
                  </button>

                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border ${
                    selected.type === 'State' 
                      ? 'bg-[#138808]/20 border-[#138808]/50 text-[#138808]' 
                      : 'bg-[#DE350B]/20 border-[#DE350B]/50 text-[#DE350B]'
                  }`}>
                    {selected.type}
                  </span>
                  
                  <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-black mb-2 leading-tight">
                    {selected.name}
                  </h2>
                  
                  <p className="text-sm text-white/70 leading-relaxed font-[family-name:var(--font-sans)] pr-8">
                    {selected.description}
                  </p>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8 space-y-4 relative z-10 bg-black/40">
                  
                  {/* Information Cards - Grid Layout */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin size={14} className="text-[#FFD700]" />
                        <h3 className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Capital</h3>
                      </div>
                      <p className="text-sm font-bold pl-5">{selected.capital}</p>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors col-span-2 md:col-span-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={14} className="text-[#00B8D9]" />
                        <h3 className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Formation</h3>
                      </div>
                      <p className="text-sm font-bold pl-5">{selected.formationYear}</p>
                    </div>

                    {selected.population && (
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#138808]"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                          <h3 className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Population</h3>
                        </div>
                        <p className="text-sm font-bold pl-5">{selected.population}</p>
                      </div>
                    )}

                    {selected.area && (
                      <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF6B00]"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                          <h3 className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Area</h3>
                        </div>
                        <p className="text-sm font-bold pl-5">{selected.area}</p>
                      </div>
                    )}

                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 hover:border-white/20 transition-colors col-span-2 md:col-span-4 flex items-center gap-4">
                      <Scale size={18} className="text-[#5243AA] flex-shrink-0" />
                      <div>
                        <h3 className="text-white/40 text-[9px] font-bold uppercase tracking-widest">High Court Jurisdiction</h3>
                        <p className="text-sm font-bold">{selected.highCourt}</p>
                      </div>
                    </div>
                  </div>

                  {/* Constitutional Representation (Compact Row) */}
                  <div className="bg-white/5 rounded-2xl border border-white/10 p-4">
                    <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Landmark size={14} className="text-[#FFD700]" />
                      Constitutional Representation
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="bg-black/40 rounded-xl p-2 border border-white/5">
                        <div className="text-[9px] text-white/40 uppercase font-bold mb-1">Lok Sabha</div>
                        <div className="font-black text-lg text-[#00B8D9]">{selected.lokSabhaSeats}</div>
                      </div>
                      <div className="bg-black/40 rounded-xl p-2 border border-white/5">
                        <div className="text-[9px] text-white/40 uppercase font-bold mb-1">Rajya Sabha</div>
                        <div className="font-black text-lg text-[#00B8D9]">{selected.rajyaSabhaSeats}</div>
                      </div>
                      <div className="bg-black/40 rounded-xl p-2 border border-white/5">
                        <div className="text-[9px] text-white/40 uppercase font-bold mb-1">Assembly</div>
                        <div className="font-black text-lg">{selected.assemblySeats}</div>
                      </div>
                      <div className="bg-black/40 rounded-xl p-2 border border-white/5 flex flex-col justify-center">
                        <div className="text-[9px] text-white/40 uppercase font-bold mb-1">Type</div>
                        <div className="font-bold text-[10px] uppercase leading-tight text-[#FFD700]">{selected.legislatureType}</div>
                      </div>
                    </div>
                  </div>

                  {/* Special Provision Highlight */}
                  {selected.specialArticle && (
                    <div className="p-5 bg-gradient-to-br from-[#FF6B00]/10 to-[#DE350B]/5 rounded-2xl border border-[#FF6B00]/20 mt-4 relative overflow-hidden group">
                      <Shield size={80} className="absolute -right-6 -bottom-6 text-[#FF6B00]/10 transform group-hover:scale-110 transition-transform duration-700" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield size={18} className="text-[#FF6B00]" />
                          <h3 className="text-[#FF6B00] text-[10px] font-bold uppercase tracking-widest">Constitutional Provision</h3>
                        </div>
                        <p className="text-2xl font-black text-white mb-1">{selected.specialArticle}</p>
                        <p className="text-xs text-white/80 leading-relaxed">
                          This region operates under special provisions detailed within this article.
                        </p>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

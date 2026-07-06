'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  'English', 'हिंदी', 'मराठी', 'বাংলা', 'தமிழ்', 'తెలుగు', 
  'ਪੰਜਾਬੀ', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം'
];

export default function LanguageStrip() {
  const { language, setLanguage } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-transparent px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Label */}
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,4rem)] font-bold text-white tracking-[-0.03em] mb-12 flex items-center justify-center gap-4">
          Read in Your Language <Globe className="text-[#FF6B00]" size={48} />
        </h2>
        

        <div className="flex overflow-x-auto pb-6 hide-scrollbar gap-4 justify-start w-full px-2 snap-x">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-lg transition-all duration-300 font-[family-name:var(--font-devanagari)] border ${
                language === lang 
                  ? 'bg-[#FF6B00] border-[#FF6B00] text-white font-semibold shadow-[0_0_15px_rgba(255,107,0,0.4)] transform scale-105' 
                  : 'bg-white/5 border-white/10 text-white/80 hover:border-white/30 hover:text-white hover:bg-white/10'
              }`}
            >
              {lang}
              {language === lang && <span className="ml-2">✓</span>}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

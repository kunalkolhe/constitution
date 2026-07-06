'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle, Camera, Video } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Preamble', path: '/preamble' },
  { name: 'Fundamental Rights', path: '/fundamental-rights' },
  { name: 'Government', path: '/government' },
  { name: 'Quiz', path: '/quiz' },
  { name: 'Timeline', path: '/timeline' },
  { name: 'Glossary', path: '/glossary' },
  { name: 'Roadmap', path: '/roadmap' },
  { name: 'Articles', path: '/articles' },
  { name: 'Amendments', path: '/amendments' },
];

const LANGUAGES = [
  'English', 'हिंदी', 'मराठी', 'বাংলা', 'தமிழ்', 'తెలుగు', 
  'ਪੰਜਾਬੀ', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം'
];

export default function Footer() {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-[#111118] to-black border-t border-white/5 text-white pt-12 pb-6 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[150px] bg-[#FF6B00]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-8 justify-between relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="w-full md:w-[35%] flex flex-col items-start">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-[32px] h-[32px] relative animate-spin-slow">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-white">
                <circle cx="50" cy="50" r="48" fill="none" strokeWidth="3" />
                <circle cx="50" cy="50" r="10" fill="none" strokeWidth="1.5" />
                {Array.from({ length: 24 }).map((_, i) => (
                  <line 
                    key={i}
                    x1="50" y1="50"
                    x2={(50 + 40 * Math.cos((i * 15 * Math.PI) / 180)).toFixed(4)}
                    y2={(50 + 40 * Math.sin((i * 15 * Math.PI) / 180)).toFixed(4)}
                    strokeWidth="1.5"
                  />
                ))}
              </svg>
            </div>
            <span className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold">
              BhartiyaSavidhan
            </span>
          </div>
          <p className="text-[rgba(255,255,255,0.6)] text-[0.8rem] mb-4">
            Samajho Apna Adhikar 🇮🇳
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#FF6B00] transition-colors"><MessageCircle size={18} /></a>
            <a href="#" className="hover:text-[#FF6B00] transition-colors"><Camera size={18} /></a>
            <a href="#" className="hover:text-[#FF6B00] transition-colors"><Video size={18} /></a>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="w-full md:w-[30%]">
          <h3 className="font-semibold text-base mb-3 text-[rgba(255,255,255,0.9)]">Quick Links</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {QUICK_LINKS.map(link => (
              <Link 
                key={link.name} 
                href={link.path}
                className="text-[0.8rem] text-[rgba(255,255,255,0.5)] hover:text-[#FF6B00] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-[35%]">
          <h3 className="font-semibold text-base mb-3 text-[rgba(255,255,255,0.9)]">Learn In Your Language</h3>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                  language === lang 
                    ? 'bg-[#FF6B00] border-[#FF6B00] text-white shadow-[0_0_10px_rgba(255,107,0,0.4)]' 
                    : 'text-[rgba(255,255,255,0.6)] border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="max-w-7xl mx-auto mt-10 pt-4 border-t border-[rgba(255,255,255,0.05)] text-center relative z-10">
        <p className="text-[0.7rem] text-[rgba(255,255,255,0.3)] tracking-widest uppercase">
          © 2026 BhartiyaSavidhan · Made with ❤️ for every Indian citizen · India First 🇮🇳
        </p>
      </div>
    </footer>
  );
}

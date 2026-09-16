'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import MagneticButton from '@/components/shared/MagneticButton';

const QUICK_LINKS = [
  { key: 'home', path: '/' },
  { key: 'preamble', path: '/preamble' },
  { key: 'fundamentalRights', path: '/fundamental-rights' },
  { key: 'government', path: '/government' },
  { key: 'quiz', path: '/quiz' },
  { key: 'timeline', path: '/timeline' },
  { key: 'glossary', path: '/glossary' },
  { key: 'explore', path: '/explore' },
  { key: 'articles', path: '/articles' },
  { key: 'amendments', path: '/amendments' },
  { key: 'statesUts', path: '/states' },
  { key: 'rightsSimulator', path: '/simulator' },
  { key: 'resources', path: '/resources' },
];

const LANGUAGES = [
  'English', 'हिंदी', 'मराठी', 'বাংলা', 'தமிழ்', 'తెలుగు', 
  'ਪੰਜਾਬੀ', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം'
];

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer translate="no" className="bg-gradient-to-b from-[#111118] to-black border-t border-white/5 text-white pt-12 pb-6 px-4 md:px-8 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[150px] bg-[#FF6B00]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-8 justify-between relative z-10">
        
        {/* LEFT COLUMN */}
        <div className="w-full md:w-[35%] flex flex-col items-start">
          <div className="flex items-center gap-3">
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
              BhartiyaSamvidhan
            </span>
          </div>
        </div>

        {/* CENTER COLUMN */}
        <div className="w-full md:w-[30%]">
          <h3 className="font-semibold text-base mb-3 text-[rgba(255,255,255,0.9)]">{t('quickLinks')}</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {QUICK_LINKS.map(link => (
              <Link
                key={link.key}
                href={link.path}
                className="text-[0.8rem] text-[rgba(255,255,255,0.5)] hover:text-[#FF6B00] transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-[35%]">
          <h3 className="font-semibold text-base mb-3 text-[rgba(255,255,255,0.9)]">{t('learnInYourLanguage')}</h3>
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

      {/* SCROLLING SECTION STRIP — a slow, looping marquee of every quick
          link, purely decorative (the real, accessible links already live
          in the column above), so it's hidden from the accessibility tree
          rather than read aloud as a duplicate, jumbled nav. */}
      <div
        aria-hidden="true"
        className="max-w-7xl mx-auto mt-10 border-y border-white/5 py-3 overflow-hidden relative z-10"
      >
        <div className="footer-marquee flex w-max gap-10">
          {[...QUICK_LINKS, ...QUICK_LINKS].map((link, i) => (
            <span
              key={i}
              className="flex items-center gap-10 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/25 whitespace-nowrap"
            >
              {t(link.key)}
              <span className="text-[#FF6B00]/50">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* BOTTOM STRIP */}
      <div className="max-w-7xl mx-auto mt-6 flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-4 relative z-10">
        <p className="text-[0.7rem] text-[rgba(255,255,255,0.3)] tracking-widest uppercase text-center md:text-left">
          {t('footerCopyright')}
        </p>
        <MagneticButton className="shrink-0">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={t('backToTop')}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-[#FF6B00] hover:border-[#FF6B00]/40 hover:bg-white/5 transition-colors"
          >
            <ArrowUp size={16} />
          </button>
        </MagneticButton>
      </div>
    </footer>
  );
}

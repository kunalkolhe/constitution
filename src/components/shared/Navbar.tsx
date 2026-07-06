'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Preamble', path: '/preamble' },
  { name: 'Rights', path: '/fundamental-rights' },
  { name: 'Quiz', path: '/quiz' },
  { name: 'Timeline', path: '/timeline' },
  { name: 'Explore', path: '/explore' },
];

const LANGUAGES = [
  'English', 'हिंदी', 'मराठी', 'বাংলা', 'தமிழ்', 'తెలుగు', 
  'ਪੰਜਾਬੀ', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം'
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        layout
        initial={{ height: 64 }}
        animate={{ 
          height: scrolled ? 56 : 64,
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.5)' : 'none'
        }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 md:px-8"
      >
        {/* LEFT */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-[28px] h-[28px] relative animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full stroke-current text-[#FF6B00]">
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
          <span className="font-[family-name:var(--font-display)] font-bold text-lg text-white/90 tracking-tight">
            BhartiyaSavidhan
          </span>
        </Link>

        {/* CENTER */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`relative font-[family-name:var(--font-sans)] text-[0.9rem] font-medium transition-colors py-2 ${
                  isActive 
                    ? 'text-[#FF6B00]' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#FF6B00] rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Selector Desktop */}
          <div className="relative">
            <button 
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-white/30 text-white/90 px-3 py-1.5 rounded-full transition-colors text-sm font-medium"
            >
              <Globe size={16} className="text-[#FF6B00]" />
              {language}
              <ChevronDown size={14} className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-[#111118] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] py-2 max-h-[300px] overflow-y-auto"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { setLanguage(lang); setLangDropdownOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        language === lang 
                          ? 'bg-[#FF6B00]/10 text-[#FF6B00] font-semibold' 
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden p-2 text-white/90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu fixed top-0 left-0 w-full bg-black/95 z-40 md:hidden pt-[80px] px-4"
          >
            <div className="flex flex-col gap-6 text-2xl font-[family-name:var(--font-display)] font-bold">
              {NAV_LINKS.map((link) => (
                <Link 
                  key={link.path} 
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${pathname === link.path ? 'text-[#FF6B00]' : 'text-white'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-white/50 mb-4 uppercase tracking-wider">Select Language</p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${language === lang ? 'bg-[#FF6B00] border-[#FF6B00] text-white' : 'bg-white/5 border-white/10 text-white/80'}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

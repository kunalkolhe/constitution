'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { key: 'home', path: '/' },
  { key: 'preamble', path: '/preamble' },
  { key: 'rights', path: '/fundamental-rights' },
  { key: 'quiz', path: '/quiz' },
  { key: 'timeline', path: '/timeline' },
  { key: 'explore', path: '/explore' },
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
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Floating pill navbar. The outer element owns the fixed positioning
          and horizontal centering via a plain (unanimated) CSS transform;
          the inner motion.nav owns its own animated transform (entrance +
          scroll scale). Framer Motion takes full control of `transform` on
          whatever element `animate` is applied to, so combining the
          -translate-x-1/2 centering with animate={{ y, scale }} on the same
          element silently drops the centering — this split avoids that.
          The inner nav is `inline-flex` with `w-auto` so its width always
          shrink-to-fits its content unambiguously. Critically, there is no
          `max-w-*` cap on desktop any more: a `max-width` smaller than the
          content's actual natural width (logo + 6 links + button + gaps)
          forces the box narrower than its children regardless of the
          `width` keyword used, and since there's no `overflow:hidden`, the
          last flex item (the language button) simply overflows past the
          box's right edge instead of being clipped or wrapped — which is
          what was happening across every earlier width-keyword attempt,
          since `max-w-4xl` was left in place through all of them. */}
      <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: scrolled ? 0.98 : 1,
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.55)'
              : '0 4px 24px rgba(0,0,0,0.35)'
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          translate="no"
          className="box-border w-[calc(100vw-2rem)] sm:w-auto sm:max-w-[95vw] bg-[#08201F]/75 backdrop-blur-2xl border border-white/10 rounded-full inline-flex items-center justify-between gap-4 md:gap-10 pl-5 pr-6 md:pl-7 md:pr-8 py-3"
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="font-[family-name:var(--font-serif)] font-semibold text-[0.7rem] sm:text-xs md:text-sm text-[#F5F3EC] uppercase tracking-[0.22em] whitespace-nowrap">
              BhartiyaSamvidhan<span className="text-[#4DE8E0]">.</span>
            </span>
          </Link>

          {/* CENTER LINKS (Desktop) */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.key}
                  href={link.path}
                  className={`font-[family-name:var(--font-sans)] text-[0.7rem] uppercase tracking-[0.15em] font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-white'
                      : 'text-white/45 hover:text-white/80'
                  }`}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Language Button (Desktop) */}
          <div className="hidden md:flex items-center shrink-0">
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label={t('changeLanguage')}
                aria-expanded={langDropdownOpen}
                translate="no"
                className="flex items-center gap-1.5 bg-[#4DE8E0] hover:bg-[#6FF0E9] text-[#04201E] px-4 py-2 rounded-full transition-colors text-[0.7rem] font-bold uppercase tracking-wide"
              >
                {language}
                <ChevronDown size={13} strokeWidth={3} className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-3 w-48 bg-[#08201F]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] py-2 max-h-[300px] overflow-y-auto"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setLangDropdownOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          language === lang
                            ? 'bg-[#4DE8E0]/10 text-[#4DE8E0] font-semibold'
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
            className="md:hidden p-1 text-white/90"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t('toggleMenu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </motion.nav>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu fixed top-0 left-0 w-full bg-[#04120F]/98 backdrop-blur-2xl z-40 md:hidden pt-[100px] px-6"
            translate="no"
          >
            <div className="flex flex-col gap-6 font-[family-name:var(--font-sans)] text-lg uppercase tracking-[0.15em] font-semibold">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`${pathname === link.path ? 'text-[#4DE8E0]' : 'text-white/80'}`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-xs text-white/40 mb-4 uppercase tracking-[0.15em]">{t('selectLanguage')}</p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-colors ${language === lang ? 'bg-[#4DE8E0] text-[#04201E]' : 'bg-white/5 border border-white/10 text-white/70'}`}
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

'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { translate } from '@/translations';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  // Real, hand-written translations for UI chrome (currently Navbar/Footer),
  // independent of the Google Translate mechanism below which still covers
  // page body content. See src/translations/index.ts for what's covered.
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>('English');

  useEffect(() => {
    // Deliberately deferred to an effect: reading localStorage during render
    // would return a different value on the server than on the client and
    // cause a hydration mismatch, so the saved language is applied post-mount.
    const saved = localStorage.getItem('bs_lang');
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('bs_lang', lang);

    // Map our display names to Google Translate codes
    const languageCodes: Record<string, string> = {
      'English': 'en',
      'हिंदी': 'hi',
      'मराठी': 'mr',
      'বাংলা': 'bn',
      'தமிழ்': 'ta',
      'తెలుగు': 'te',
      'ਪੰਜਾਬੀ': 'pa',
      'ગુજરાતી': 'gu',
      'ಕನ್ನಡ': 'kn',
      'മലയാളം': 'ml'
    };

    const langCode = languageCodes[lang] || 'en';
    
    // Trigger Google Translate dropdown change
    setTimeout(() => {
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (combo) {
        combo.value = langCode;
        combo.dispatchEvent(new Event('change'));
      }
    }, 100);
  };

  const t = useCallback((key: string) => translate(language, key), [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

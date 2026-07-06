'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>('English');

  useEffect(() => {
    const saved = localStorage.getItem('bs_lang');
    if (saved) {
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
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

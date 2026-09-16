// Real, hand-written translations — as opposed to the Google Translate DOM
// hack LanguageContext also drives for page body content. This dictionary
// currently only covers the Navbar and Footer chrome (the text visible on
// every single page, so it's the highest-value place to start), keyed by
// the same display-name strings LanguageContext already uses for `language`
// (e.g. 'हिंदी', not a locale code like 'hi').
//
// Only English and Hindi are filled in for now. Every other language falls
// back to the English strings via `t()` below rather than showing broken or
// missing text — extending this dictionary with another language's entries
// is enough to light it up for that language, no other code changes needed.
export const translations: Record<string, Record<string, string>> = {
  English: {
    home: 'Home',
    preamble: 'Preamble',
    rights: 'Rights',
    quiz: 'Quiz',
    timeline: 'Timeline',
    explore: 'Explore',
    fundamentalRights: 'Fundamental Rights',
    government: 'Government',
    glossary: 'Glossary',
    articles: 'Articles',
    amendments: 'Amendments',
    statesUts: 'States & UTs',
    rightsSimulator: 'Rights Simulator',
    resources: 'Resources',
    tagline: 'Samajho Apna Adhikar',
    quickLinks: 'Quick Links',
    learnInYourLanguage: 'Learn In Your Language',
    footerCopyright: '© 2026 BhartiyaSamvidhan · Made with ❤️ for every Indian citizen · India First 🇮🇳',
    toggleMenu: 'Toggle menu',
    changeLanguage: 'Change language',
    selectLanguage: 'Select Language',
  },
  'हिंदी': {
    home: 'मुखपृष्ठ',
    preamble: 'प्रस्तावना',
    rights: 'अधिकार',
    quiz: 'प्रश्नोत्तरी',
    timeline: 'समयरेखा',
    explore: 'अन्वेषण',
    fundamentalRights: 'मौलिक अधिकार',
    government: 'सरकार',
    glossary: 'शब्दकोश',
    articles: 'अनुच्छेद',
    amendments: 'संशोधन',
    statesUts: 'राज्य और केंद्र शासित प्रदेश',
    rightsSimulator: 'अधिकार सिम्युलेटर',
    resources: 'संसाधन',
    tagline: 'समझो अपना अधिकार',
    quickLinks: 'त्वरित लिंक',
    learnInYourLanguage: 'अपनी भाषा में सीखें',
    footerCopyright: '© 2026 भारतीय संविधान · हर भारतीय नागरिक के लिए ❤️ से बनाया गया · इंडिया फर्स्ट 🇮🇳',
    toggleMenu: 'मेनू खोलें',
    changeLanguage: 'भाषा बदलें',
    selectLanguage: 'भाषा चुनें',
  },
};

/**
 * Looks up `key` in the dictionary for `language`, falling back to English
 * (and finally to the raw key itself) if that language or key isn't
 * translated yet.
 */
export function translate(language: string, key: string): string {
  return translations[language]?.[key] ?? translations.English[key] ?? key;
}


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import enTranslations from '../locales/en';
import svTranslations from '../locales/sv';

// Define language types
type LanguageCode = 'en' | 'sv';
type Translations = typeof enTranslations;

// Define context types
interface LanguageContextType {
  language: LanguageCode;
  translations: Translations;
  changeLanguage: (language: LanguageCode) => void;
  t: (key: keyof Translations) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'sv',
  translations: svTranslations,
  changeLanguage: () => {},
  t: () => '',
});

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

// Language Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Initialize language from localStorage or default to Swedish
  const [language, setLanguage] = useState<LanguageCode>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as LanguageCode) || 'sv';
  });

  // Get translations based on language
  const translations = language === 'en' ? enTranslations : svTranslations;

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Change language function
  const changeLanguage = (newLanguage: LanguageCode) => {
    setLanguage(newLanguage);
  };

  // Translation function
  const t = (key: keyof Translations) => translations[key] || key;

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};


import React, { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../locales/en';
import svTranslations from '../locales/sv';

// Create context with default values
const LanguageContext = createContext({
  language: 'sv',
  translations: svTranslations,
  changeLanguage: () => {},
  t: () => '',
});

// Custom hook for using the language context
export const useLanguage = () => useContext(LanguageContext);

// Language Provider component
export const LanguageProvider = ({ children }) => {
  // Initialize language from localStorage or default to Swedish
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'sv';
  });

  // Get translations based on language
  const translations = language === 'en' ? enTranslations : svTranslations;

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Change language function
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  // Translation function
  const t = (key) => translations[key] || key;

  return (
    <LanguageContext.Provider value={{ language, translations, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

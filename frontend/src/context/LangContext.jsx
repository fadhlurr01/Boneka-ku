import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DICT } from './i18nDict';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('bonekaku-lang') || 'id';
    } catch {
      return 'id';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('lang', lang);
      localStorage.setItem('bonekaku-lang', lang);
    } catch (e) {
      console.error(e);
    }
  }, [lang]);

  const t = useCallback((text) => {
    if (lang === 'id') return text;
    if (!text) return '';
    return DICT[text] || text;
  }, [lang]);

  const toggleLang = () => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'));
  };

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

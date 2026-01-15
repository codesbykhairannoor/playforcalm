"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import id from '../dictionaries/id.json';
import en from '../dictionaries/en.json';

// Setup Dictionary
const dictionaries = { id, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default bahasa: 'id' (Indonesia)
  const [language, setLanguage] = useState('id');
  const [dict, setDict] = useState(dictionaries.id);

  // Fungsi ganti bahasa
  const toggleLanguage = () => {
    const newLang = language === 'id' ? 'en' : 'id';
    setLanguage(newLang);
    setDict(dictionaries[newLang]);
    // Simpan ke localStorage biar pas refresh gak balik ke awal
    localStorage.setItem('playforcalm-lang', newLang);
  };

  // Cek localStorage pas pertama kali load
  useEffect(() => {
    const savedLang = localStorage.getItem('playforcalm-lang');
    if (savedLang && dictionaries[savedLang]) {
      setLanguage(savedLang);
      setDict(dictionaries[savedLang]);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, dict, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom Hook biar gampang dipanggil
export function useLanguage() {
  return useContext(LanguageContext);
}
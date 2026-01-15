"use client";
import { createContext, useContext, useState, useEffect } from "react";
import en from "@/dictionaries/en.json";
import id from "@/dictionaries/id.json";
import zh from "@/dictionaries/zh.json";
import es from "@/dictionaries/es.json";
import de from "@/dictionaries/de.json";
import ms from "@/dictionaries/ms.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("id");

  useEffect(() => {
    const savedLang = localStorage.getItem("app-lang");
    if (savedLang) setLang(savedLang);
  }, []);

  // FUNGSI INI HARUS BERNAMA changeLanguage
  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("app-lang", newLang);
  };

  const dictionaries = { id, en, zh, es, de, ms };
  const dict = dictionaries[lang] || en;

  return (
    <LanguageContext.Provider value={{ dict, changeLanguage, lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
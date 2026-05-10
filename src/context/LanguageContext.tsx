"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { pt } from "@/locales/pt";
import { en } from "@/locales/en";
import { Translations } from "@/locales/types";

type Language = "pt" | "en";

interface LanguageContextType {
  language: Language;
  t: Translations;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt"); // Default PT

  const t = language === "pt" ? pt : en;

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

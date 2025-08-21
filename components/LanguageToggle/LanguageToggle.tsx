"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/lib/context/LanguageContext";
import css from "./LanguageToggle.module.css";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "uk", name: "Українська", flag: "🇺🇦" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
] as const;

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === language);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={css.languageToggle} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={css.toggleButton}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className={css.flag}>{currentLanguage?.flag}</span>
        <span className={css.languageCode}>
          {currentLanguage?.code.toUpperCase()}
        </span>
        <svg
          className={`${css.arrow} ${isOpen ? css.arrowUp : ""}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>

      {isOpen && (
        <div className={css.dropdown} role="listbox">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code as Language)}
              className={`${css.languageOption} ${
                language === lang.code ? css.active : ""
              }`}
              role="option"
              aria-selected={language === lang.code}
            >
              <span className={css.flag}>{lang.flag}</span>
              <span className={css.languageName}>{lang.name}</span>
              {language === lang.code && (
                <svg
                  className={css.checkmark}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

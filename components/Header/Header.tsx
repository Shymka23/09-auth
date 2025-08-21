"use client";

import { useState } from "react";
import css from "./Header.module.css";
import Link from "next/link";
import TagsMenu from "@/components/TagsMenu/TagsMenu";
import { AuthNavigation } from "@/components/AuthNavigation/AuthNavigation";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle/LanguageToggle";
import { useLanguage } from "@/lib/context/LanguageContext";

const Header = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={css.header}>
      <div className={css.headerLeft}>
        <Link href="/" aria-label="Home">
          NoteHub
        </Link>
      </div>

      <div className={css.headerRight}>
        {/* Mobile menu toggle */}
        <button
          className={`${css.mobileMenuToggle} ${isMenuOpen ? css.open : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav aria-label="Main Navigation">
          <ul className={`${css.navigation} ${isMenuOpen ? css.open : ""}`}>
            <li>
              <Link href="/" onClick={closeMenu}>
                {t("nav.home")}
              </Link>
            </li>
            <li>
              <Link href="/notes" onClick={closeMenu}>
                {t("nav.notes")}
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={closeMenu}>
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <TagsMenu />
            </li>
            <li className={css.themeToggleWrapper}>
              <ThemeToggle />
            </li>
            <li className={css.languageToggleWrapper}>
              <LanguageToggle />
            </li>
            <AuthNavigation />
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div className={css.overlay} onClick={closeMenu} aria-hidden="true" />
      )}
    </header>
  );
};

export default Header;

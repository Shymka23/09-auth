"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
// Видаляємо getAllTags як не обов'язкову до специфікації функцію
import { useAuthStore } from "@/lib/store/authStore";
import { useLanguage } from "@/lib/context/LanguageContext";
import css from "./TagsMenu.module.css";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [tags] = useState<string[]>(["All", "Todo", "Personal", "Meeting", "Work", "Shopping"]);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const currentTag = params.slug?.[0] || "";
  const { isAuthenticated } = useAuthStore();
  const { t } = useLanguage();

  const getTagTranslation = (tag: string) => {
    switch (tag) {
      case "All":
        return t("notes.allNotes");
      case "Todo":
        return t("tags.todo");
      case "Personal":
        return t("tags.personal");
      case "Meeting":
        return t("tags.meeting");
      case "Work":
        return t("tags.work");
      case "Shopping":
        return t("tags.shopping");
      default:
        return tag;
    }
  };

  useEffect(() => {
    setLoading(false);
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={css.menuContainer} ref={menuRef}>
      <button className={css.menuButton} onClick={() => setIsOpen(!isOpen)}>
        Notes {isOpen ? "▴" : "▾"}
      </button>
      {isOpen && !loading && isAuthenticated && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={`${css.menuLink} ${currentTag === tag ? css.active : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {getTagTranslation(tag)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {isOpen && !isAuthenticated && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/sign-in"
              className={css.menuLink}
              onClick={() => setIsOpen(false)}
            >
              Please sign in to view notes
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

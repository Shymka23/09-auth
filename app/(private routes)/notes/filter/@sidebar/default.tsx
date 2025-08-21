"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import css from "./sidebar.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function Default() {
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

  return (
    <aside className={css.sidebar}>
      <nav className={css.nav}>
        <h3 className={css.title}>Filter by Tag</h3>
        <ul className={css.list}>
          {tags.map((tag) => (
            <li key={tag} className={css.item}>
              <Link
                href={tag === "All" ? "/notes/filter" : `/notes/filter/${tag}`}
                className={css.link}
              >
                {getTagTranslation(tag)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

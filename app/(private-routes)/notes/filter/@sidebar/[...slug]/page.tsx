"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAllTags } from "@/lib/api";
import { useAuthStore } from "@/lib/store/authStore";
import { useLanguage } from "@/lib/context/LanguageContext";
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  const params = useParams();
  const currentTag = params.slug?.[0] || "All";
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
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
    const fetchTags = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const fetchedTags = await getAllTags();
        setTags(fetchedTags as string[]);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [isAuthenticated]);

  if (loading) {
    return <div>Loading tags...</div>;
  }

  return (
    <nav className={css.sidebarNav}>
      <h2 className={css.sidebarTitle}>Filter by Tag</h2>
      <ul className={css.menuList}>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={`${css.menuLink} ${
                currentTag === tag ? css.active : ""
              }`}
            >
              {getTagTranslation(tag)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

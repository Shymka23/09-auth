"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAllTags } from "@/lib/api";
import css from "./TagsMenu.module.css";

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const currentTag = params.slug?.[0] || "";
  const tags = getAllTags();

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
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={`${css.menuLink} ${currentTag === tag ? css.active : ""}`}
                onClick={() => setIsOpen(false)}
              >
                {tag === "All" ? "All notes" : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

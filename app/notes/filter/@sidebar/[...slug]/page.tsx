"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getAllTags } from "@/lib/api";
import css from "./SidebarNotes.module.css";

export default function SidebarNotes() {
  const params = useParams();
  const currentTag = params.slug?.[0] || "All";
  const tags = getAllTags();

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
              {tag === "All" ? "All notes" : tag}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

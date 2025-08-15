import Link from "next/link";
import css from "./sidebar.module.css";

const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function Default() {
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
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

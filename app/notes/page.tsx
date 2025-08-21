"use client";

import Link from "next/link";
import css from "./Notes.module.css";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function NotesPage() {
  const { t } = useLanguage();
  return (
    <main>
      <div className={css.container}>
        <section className={css.hero}>
          <h1 className={css.title}>{t("notes.title")}</h1>
          <p className={css.subtitle}>{t("notes.subtitle")}</p>
        </section>

        <section className={css.features}>
          <h2 className={css.sectionTitle}>{t("notes.featuresTitle")}</h2>
          <div className={css.featuresGrid}>
            <div className={css.feature}>
              <div className={css.featureIcon}>✏️</div>
              <h3>{t("notes.creationEditing")}</h3>
              <p>{t("notes.creationEditingDesc")}</p>
            </div>
            <div className={css.feature}>
              <div className={css.featureIcon}>🏷️</div>
              <h3>{t("notes.categorization")}</h3>
              <p>{t("notes.categorizationDesc")}</p>
            </div>
            <div className={css.feature}>
              <div className={css.featureIcon}>🔍</div>
              <h3>{t("notes.searchFiltering")}</h3>
              <p>{t("notes.searchFilteringDesc")}</p>
            </div>
            <div className={css.feature}>
              <div className={css.featureIcon}>📱</div>
              <h3>{t("notes.responsiveDesign")}</h3>
              <p>{t("notes.responsiveDesignDesc")}</p>
            </div>
          </div>
        </section>

        <section className={css.cta}>
          <h2 className={css.sectionTitle}>{t("notes.readyToStart")}</h2>
          <p className={css.ctaText}>{t("notes.ctaText")}</p>
          <div className={css.ctaButtons}>
            <Link href="/sign-in" className={css.primaryButton}>
              {t("notes.signIn")}
            </Link>
            <Link href="/sign-up" className={css.secondaryButton}>
              {t("notes.signUp")}
            </Link>
          </div>
        </section>

        <section className={css.examples}>
          <h2 className={css.sectionTitle}>{t("notes.examplesTitle")}</h2>
          <div className={css.examplesGrid}>
            <div className={css.example}>
              <h3>📋 {t("notes.todoLists")}</h3>
              <p>{t("notes.todoListsDesc")}</p>
            </div>
            <div className={css.example}>
              <h3>💼 {t("notes.workNotes")}</h3>
              <p>{t("notes.workNotesDesc")}</p>
            </div>
            <div className={css.example}>
              <h3>👥 {t("notes.meetings")}</h3>
              <p>{t("notes.meetingsDesc")}</p>
            </div>
            <div className={css.example}>
              <h3>🛒 {t("notes.shopping")}</h3>
              <p>{t("notes.shoppingDesc")}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

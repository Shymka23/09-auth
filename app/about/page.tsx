"use client";

import css from "./About.module.css";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>{t("about.title")}</h1>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>{t("about.whatIs")}</h2>
          <p className={css.description}>{t("about.whatIsDesc")}</p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>{t("about.keyFeatures")}</h2>
          <div className={css.features}>
            <div className={css.feature}>
              <h3>📝 {t("about.noteCreation")}</h3>
              <p>{t("about.noteCreationDesc")}</p>
            </div>
            <div className={css.feature}>
              <h3>🏷️ {t("features.tagOrganization")}</h3>
              <p>{t("features.tagOrganizationDesc")}</p>
            </div>
            <div className={css.feature}>
              <h3>🔍 {t("about.searchFiltering")}</h3>
              <p>{t("about.searchFilteringDesc")}</p>
            </div>
            <div className={css.feature}>
              <h3>👤 {t("about.personalProfile")}</h3>
              <p>{t("about.personalProfileDesc")}</p>
            </div>
          </div>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>{t("about.technologies")}</h2>
          <p className={css.description}>{t("about.technologiesDesc")}</p>
          <ul className={css.techList}>
            <li>Next.js 14 with App Router</li>
            <li>TypeScript for type safety</li>
            <li>TanStack Query for state management</li>
            <li>Zustand for global state</li>
            <li>CSS Modules for styling</li>
          </ul>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>{t("about.security")}</h2>
          <p className={css.description}>{t("about.securityDesc")}</p>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>{t("about.developer")}</h2>
          <p className={css.description}>{t("about.developerDesc")}</p>
        </section>
      </div>
    </main>
  );
}

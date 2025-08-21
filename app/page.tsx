"use client";

import Link from "next/link";
import css from "./Home.module.css";
import { useLanguage } from "@/lib/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  return (
    <main>
      <div className={css.container}>
        <section className={css.hero}>
          <h1 className={css.title}>{t("hero.title")}</h1>
          <p className={css.subtitle}>{t("hero.subtitle")}</p>
          <div className={css.ctaButtons}>
            <Link href="/notes" className={css.primaryButton}>
              {t("hero.getStarted")}
            </Link>
            <Link href="/about" className={css.secondaryButton}>
              {t("hero.learnMore")}
            </Link>
          </div>
        </section>

        <section className={css.features}>
          <h2 className={css.sectionTitle}>{t("features.title")}</h2>
          <div className={css.featuresGrid}>
            <div className={css.feature}>
              <div className={css.featureIcon}>📝</div>
              <h3>{t("features.easyToUse")}</h3>
              <p>{t("features.easyToUseDesc")}</p>
            </div>
            <div className={css.feature}>
              <div className={css.featureIcon}>🏷️</div>
              <h3>{t("features.tagOrganization")}</h3>
              <p>{t("features.tagOrganizationDesc")}</p>
            </div>
            <div className={css.feature}>
              <div className={css.featureIcon}>🔍</div>
              <h3>{t("features.quickSearch")}</h3>
              <p>{t("features.quickSearchDesc")}</p>
            </div>
            <div className={css.feature}>
              <div className={css.featureIcon}>🔒</div>
              <h3>{t("features.dataSecurity")}</h3>
              <p>{t("features.dataSecurityDesc")}</p>
            </div>
          </div>
        </section>

        <section className={css.stats}>
          <h2 className={css.sectionTitle}>{t("stats.title")}</h2>
          <div className={css.statsGrid}>
            <div className={css.stat}>
              <div className={css.statNumber}>100%</div>
              <div className={css.statLabel}>{t("stats.security")}</div>
            </div>
            <div className={css.stat}>
              <div className={css.statNumber}>24/7</div>
              <div className={css.statLabel}>{t("stats.availability")}</div>
            </div>
            <div className={css.stat}>
              <div className={css.statNumber}>5</div>
              <div className={css.statLabel}>{t("stats.categories")}</div>
            </div>
            <div className={css.stat}>
              <div className={css.statNumber}>∞</div>
              <div className={css.statLabel}>{t("stats.notes")}</div>
            </div>
          </div>
        </section>

        <section className={css.getStarted}>
          <h2 className={css.sectionTitle}>{t("cta.title")}</h2>
          <p className={css.getStartedText}>{t("cta.description")}</p>
          <Link href="/notes" className={css.primaryButton}>
            {t("cta.createNote")}
          </Link>
        </section>
      </div>
    </main>
  );
}

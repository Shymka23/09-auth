"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useLanguage } from "@/lib/context/LanguageContext";
import css from "./SignIn.module.css";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const user = await loginUser({ email, password });
      setUser(user);
      router.push("/profile");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>{t("auth.signIn")}</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">{t("auth.email")}</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={css.input}
            placeholder={t("auth.emailPlaceholder")}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">{t("auth.password")}</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={css.input}
            placeholder={t("auth.passwordPlaceholder")}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            {isLoading ? t("auth.loggingIn") : t("auth.logIn")}
          </button>
        </div>

        <div className={css.links}>
          <p className={css.linkText}>
            {t("auth.noAccount")}{" "}
            <Link href="/sign-up" className={css.link}>
              {t("auth.signUp")}
            </Link>
          </p>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

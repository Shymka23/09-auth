"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logoutUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useState } from "react";
import css from "./AuthNavigation.module.css";

export const AuthNavigation = () => {
  const { user, isAuthenticated, clearUser } = useAuthStore();
  const { t } = useLanguage();
  const router = useRouter();
  const [isClearing, setIsClearing] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      clearUser();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleClearAvatar = async () => {
    setIsClearing(true);
    try {
      const response = await fetch("/api/clear-avatar", {
        method: "POST",
      });
      if (response.ok) {
        // Перезавантажуємо сторінку для оновлення даних
        window.location.reload();
      }
    } catch (error) {
      console.error("Error clearing avatar:", error);
    } finally {
      setIsClearing(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            {t("nav.profile")}
          </Link>
        </li>
        <li className={css.navigationItem}>
          <p className={css.userEmail}>{user.email}</p>
          <div className={css.userActions}>
            {/* Кнопка очищення аватара (тільки якщо є аватар з placeholder) */}
            {user.avatar && user.avatar.includes("via.placeholder.com") && (
              <button
                className={css.clearAvatarButton}
                onClick={handleClearAvatar}
                disabled={isClearing}
                title="Clear broken avatar"
              >
                {isClearing ? "..." : "🔧"}
              </button>
            )}
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          {t("auth.signIn")}
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          {t("auth.signUp")}
        </Link>
      </li>
    </>
  );
};

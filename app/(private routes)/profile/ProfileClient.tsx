"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/context/LanguageContext";
import { User } from "@/types/user";
import { useState, useEffect } from "react";
import css from "./Profile.module.css";

interface ProfileClientProps {
  user: User;
}

export function ProfileClient({ user }: ProfileClientProps) {
  const { t } = useLanguage();
  const [isClearing, setIsClearing] = useState(false);

  // Перевіряємо localStorage для аватара
  useEffect(() => {
    const localAvatar = localStorage.getItem("user_avatar");
    if (!user.avatar && localAvatar) {
      // Avatar found in localStorage
    }
  }, [user.avatar]);

  // Автоматично очищаємо старий placeholder URL при завантаженні
  useEffect(() => {
    // Перевіряємо cookie прямо в браузері
    const cookies = document.cookie;
    const avatarMatch = cookies.match(/avatar=([^;]*)/);
    const avatarValue = avatarMatch ? decodeURIComponent(avatarMatch[1]) : null;

    // Якщо є старий placeholder cookie, очищаємо його
    if (avatarValue && avatarValue.includes("via.placeholder.com")) {
      handleClearAvatar();
    } else if (user.avatar && user.avatar.includes("via.placeholder.com")) {
      handleClearAvatar();
    }
  }, [user.avatar]);

  const handleClearAvatar = async () => {
    setIsClearing(true);
    try {
      // Очищаємо cookie через API
      const response = await fetch("/api/clear-avatar", {
        method: "POST",
      });

      // Очищаємо localStorage
      localStorage.removeItem("user_avatar");

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

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>{t("profile.title")}</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            {t("profile.editProfile")}
          </Link>
        </div>

        <div className={css.profileContent}>
          <div className={css.avatarSection}>
            <div className={css.avatarWrapper}>
              {(() => {
                // Логіка вибору типу відображення аватара
                const localAvatar = localStorage.getItem("user_avatar");
                const avatarToUse = user.avatar || localAvatar;
                const hasAvatar = avatarToUse && avatarToUse.trim() !== "";

                if (hasAvatar) {
                  // Якщо є аватар (з сервера або localStorage), відображаємо його
                  return (
                    <Image
                      src={avatarToUse}
                      alt="User Avatar"
                      width={120}
                      height={120}
                      className={css.avatar}
                      onError={(e) => {
                        console.error("Avatar image load error");
                        const target = e.target as HTMLImageElement;
                        target.src = "/default-avatar.svg";
                      }}
                    />
                  );
                } else {
                  // Для всіх інших випадків використовуємо default avatar
                  return (
                    <Image
                      src="/default-avatar.svg"
                      alt="User Avatar"
                      width={120}
                      height={120}
                      className={css.avatar}
                      priority
                    />
                  );
                }
              })()}
            </div>
            <h2 className={css.username}>{user.username}</h2>

            {/* Кнопка очищення аватара */}
            <div className={css.avatarActions}>
              <button
                onClick={handleClearAvatar}
                disabled={isClearing}
                className={css.clearAvatarButton}
                title="Clear avatar"
              >
                {isClearing ? "Clearing..." : "Clear Avatar"}
              </button>
            </div>
          </div>

          <div className={css.profileInfo}>
            <div className={css.infoSection}>
              <h3>{t("profile.contactInfo")}</h3>
              <div className={css.infoItem}>
                <span className={css.label}>Email:</span>
                <span className={css.value}>{user.email}</span>
              </div>
            </div>

            <div className={css.infoSection}>
              <h3>{t("profile.accountInfo")}</h3>
              <div className={css.infoItem}>
                <span className={css.label}>{t("profile.registrationDate")}</span>
                <span className={css.value}>—</span>
              </div>
              <div className={css.infoItem}>
                <span className={css.label}>{t("profile.lastUpdated")}</span>
                <span className={css.value}>—</span>
              </div>
            </div>
          </div>
        </div>

        <div className={css.actions}>
          <Link href="/notes" className={css.actionButton}>
            {t("profile.myNotes")}
          </Link>
          <Link href="/notes/action/create" className={css.actionButton}>
            {t("profile.createNote")}
          </Link>
        </div>
      </div>
    </main>
  );
}

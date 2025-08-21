"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/context/LanguageContext";
import css from "./AvatarUpload.module.css";

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarChange: (file: File | null) => void;
  onAvatarUrlChange: (url: string | null) => void;
}

export function AvatarUpload({
  currentAvatar,
  onAvatarChange,
  onAvatarUrlChange,
}: AvatarUploadProps) {
  const { t } = useLanguage();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Максимально оптимізована функція для компресії зображення
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const img = new window.Image();

      img.onload = () => {
        // Дуже маленький розмір для мінімального cookie
        const size = 64;
        canvas.width = size;
        canvas.height = size;

        // Малюємо зображення з мінімальним розміром
        ctx.drawImage(img, 0, 0, size, size);

        // Конвертуємо в JPEG з дуже низькою якістю
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          "image/jpeg",
          0.1 // Дуже низька якість 10% для мінімального розміру
        );
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) {
      onAvatarChange(null);
      setPreviewUrl(null);
      return;
    }

    // Базова валідація файлу
    if (!file.type.startsWith("image/")) {
      setError("Будь ласка, виберіть зображення");
      return;
    }

    try {
      // Компресуємо зображення
      const compressedFile = await compressImage(file);

      // Створюємо превью
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
        onAvatarChange(compressedFile);
      };
      reader.readAsDataURL(compressedFile);
    } catch {
      setError("Помилка обробки зображення");
    }
  };

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Спочатку створюємо превью для миттєвого відображення
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);

      // Симулюємо прогрес завантаження
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Помилка завантаження";

        // Спеціальна обробка для різних помилок
        if (response.status === 413) {
          throw new Error("Файл занадто великий. Спробуйте менше зображення.");
        } else if (response.status === 400) {
          throw new Error("Неправильний формат файлу. Виберіть зображення.");
        } else {
          throw new Error(errorMessage);
        }
      }

      const data = await response.json();

      // Якщо зображення зберігається в localStorage
      if (data.storage === "localStorage") {
        localStorage.setItem("user_avatar", data.url);
      }

      onAvatarUrlChange(data.url);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Помилка завантаження");
      onAvatarUrlChange(null);
      setPreviewUrl(null);
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onAvatarChange(null);
    onAvatarUrlChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const displayImage = previewUrl || currentAvatar;

  return (
    <div className={css.container}>
      <div className={css.avatarSection}>
        <div className={css.avatarWrapper}>
          {displayImage ? (
            <Image
              src={displayImage}
              alt="Avatar"
              width={120}
              height={120}
              className={css.avatar}
              priority
              onError={() => {
                // Fallback до дефолтного аватара
                setPreviewUrl(null);
                onAvatarUrlChange(null);
              }}
            />
          ) : (
            <div className={css.placeholder}>
              <span className={css.placeholderText}>
                {t("avatarUpload.noImage")}
              </span>
            </div>
          )}
        </div>

        <div className={css.controls}>
          <label className={css.uploadButton}>
            <span>{t("avatarUpload.chooseFile")}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className={css.fileInput}
            />
          </label>

          {previewUrl && (
            <>
              {isLoading && (
                <div className={css.progressBar}>
                  <div
                    className={css.progressFill}
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  const file = fileInputRef.current?.files?.[0];
                  if (file) handleUpload(file);
                }}
                disabled={isLoading}
                className={css.uploadButton}
              >
                {isLoading
                  ? `${t("avatarUpload.uploading")} ${uploadProgress}%`
                  : t("avatarUpload.upload")}
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className={css.removeButton}
              >
                {t("avatarUpload.remove")}
              </button>
            </>
          )}
        </div>
      </div>

      {error && <div className={css.error}>{error}</div>}

      <div className={css.info}>
        <p>{t("avatarUpload.supportedFormats")}</p>
        <p>{t("avatarUpload.maxSize")}</p>
      </div>
    </div>
  );
}

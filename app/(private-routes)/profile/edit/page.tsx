"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getCurrentUser, updateUser } from "@/lib/api/clientApi";
import { AvatarUpload } from "@/components/AvatarUpload";
import css from "./EditProfile.module.css";

export default function EditProfilePage() {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setUsername(currentUser.username || "");
        setAvatarUrl(currentUser.avatar || null);
      } catch {
        router.push("/sign-in");
      }
    };

    if (!user) {
      fetchUser();
    } else {
      setUsername(user.username || "");
      setAvatarUrl(user.avatar || null);
    }
  }, [user, setUser, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Оновлюємо користувача (аватар вже збережений в cookie через AvatarUpload)
      const updatedUser = await updateUser({ username });

      // Оновлюємо глобальний стан з новим аватаром, якщо він є
      const finalUser = avatarUrl
        ? { ...updatedUser, avatar: avatarUrl }
        : updatedUser;

      setUser(finalUser);
      router.push("/profile");
    } catch {
      setError("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <AvatarUpload
          currentAvatar={avatarUrl || undefined}
          onAvatarChange={() => {}} // Файл обробляється всередині AvatarUpload
          onAvatarUrlChange={setAvatarUrl}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={css.input}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>

          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}

import { cookies } from "next/headers";
import { User } from "@/types/user";
import axios from "axios";

// Створюємо axios інстанс для серверних запитів
const serverApi = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

export const checkServerSession = async () => {
  // Get current cookies
  const cookieStore = await cookies();
  const res = await serverApi.get("/auth/session", {
    headers: {
      // Pass cookies to the request
      Cookie: cookieStore.toString(),
    },
  });
  // Return full response so middleware has access to new cookies
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  // Використовуємо локальний Route Handler замість прямого запиту до зовнішнього API
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/users/me`,
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.status}`);
  }

  return response.json();
};

export const updateServerUser = async (userData: {
  username?: string;
  avatar?: string;
}): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await serverApi.patch("/users/me", userData, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

// Серверна функція для отримання нотаток
export const getServerNotes = async (search = "", page = 1, tag = "") => {
  const cookieStore = await cookies();
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (page) params.append("page", page.toString());
  if (tag && tag !== "All") params.append("tag", tag);
  params.append("perPage", "12");

  try {
    // Визначаємо базовий URL для різних середовищ
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "https://09-auth-mu.vercel.app"
        : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/notes?${params.toString()}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      // Додаємо таймаут для production
      ...(process.env.NODE_ENV === "production" && {
        next: { revalidate: 0 },
      }),
    });

    if (!response.ok) {
      console.warn(`Notes fetch failed with status: ${response.status}`);
      return { notes: [], totalPages: 0 };
    }

    return response.json();
  } catch (error) {
    // Якщо користувач не авторизований або інша помилка, повертаємо порожні дані
    console.warn("Server notes fetch error:", error);
    return { notes: [], totalPages: 0 };
  }
};

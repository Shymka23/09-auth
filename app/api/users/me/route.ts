import { NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { logErrorResponse } from "../../_utils/utils";
import { isAxiosError } from "axios";

export const dynamic = "force-dynamic";

// Збільшуємо ліміт розміру запиту для цього ендпоінту
export const maxDuration = 30; // 30 секунд

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get("/users/me", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    // Отримуємо аватар з cookie, якщо він існує (перевіряємо обидва можливі назви)
    const userAvatar =
      cookieStore.get("user_avatar")?.value || cookieStore.get("avatar")?.value;

    // Автоматично очищаємо старі placeholder URL
    if (userAvatar && userAvatar.includes("via.placeholder.com")) {
      cookieStore.delete("user_avatar");
    }

    // Мерджимо дані користувача з аватаром (тільки якщо це не старий URL)
    const userData =
      userAvatar && !userAvatar.includes("via.placeholder.com")
        ? { ...res.data, avatar: userAvatar }
        : res.data;

    return NextResponse.json(userData, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const cookieStore = await cookies();
    const body = await request.json();

    // Отримуємо аватар з cookie (перевіряємо обидва можливі назви)
    const userAvatar =
      cookieStore.get("user_avatar")?.value || cookieStore.get("avatar")?.value;

    // Автоматично очищаємо старі placeholder URL
    if (userAvatar && userAvatar.includes("via.placeholder.com")) {
      cookieStore.delete("user_avatar");
    }

    // Відправляємо тільки дозволені поля до зовнішнього API
    const { username, email } = body;
    const apiData: Record<string, string> = {};

    if (username !== undefined) apiData.username = username;
    if (email !== undefined) apiData.email = email;

    const res = await api.patch("/users/me", apiData, {
      headers: {
        Cookie: cookieStore.toString(),
        "Content-Type": "application/json",
      },
    });

    // Повертаємо дані з локальним аватаром (тільки якщо це не старий URL)
    const responseData =
      userAvatar && !userAvatar.includes("via.placeholder.com")
        ? { ...res.data, avatar: userAvatar }
        : res.data;

    return NextResponse.json(responseData, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

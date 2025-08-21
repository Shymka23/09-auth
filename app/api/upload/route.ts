import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Спрощена валідація файлу
function validateFile(file: File): { isValid: boolean; error?: string } {
  // Перевіряємо тільки тип файлу
  if (!file.type.startsWith("image/")) {
    return { isValid: false, error: "Тільки зображення дозволені" };
  }

  return { isValid: true };
}

// Генерація унікального імені файлу
function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = originalName.split(".").pop() || "jpg";
  return `${timestamp}-${randomString}.${extension}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "Файл не був наданий" },
        { status: 400 }
      );
    }

    // Валідуємо файл
    const validation = validateFile(file);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // Додаткова перевірка для дуже великих файлів
    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      return NextResponse.json(
        { error: "Файл занадто великий. Максимум 5MB." },
        { status: 413 }
      );
    }

    // Генеруємо унікальне ім'я файлу
    const fileName = generateFileName(file.name);

    // Конвертуємо файл в base64 для локального зберігання
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mimeType = "image/jpeg"; // Завжди використовуємо JPEG для кращої компресії
    const imageUrl = `data:${mimeType};base64,${base64}`;

    // Якщо зображення менше 3500 символів, зберігаємо в cookie
    if (imageUrl.length <= 3500) {
      const response = NextResponse.json({
        success: true,
        url: imageUrl,
        fileName: fileName,
        size: file.size,
        type: file.type,
        urlLength: imageUrl.length,
        storage: "cookie",
      });

      // Встановлюємо cookie з URL аватара
      response.cookies.set("user_avatar", imageUrl, {
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365, // 1 рік
      });

      return response;
    } else {
      // Якщо зображення велике, повертаємо без cookie (для localStorage)
      return NextResponse.json({
        success: true,
        url: imageUrl,
        fileName: fileName,
        size: file.size,
        type: file.type,
        urlLength: imageUrl.length,
        storage: "localStorage",
        message: "Зображення збережено локально (занадто велике для cookie)",
      });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Помилка при завантаженні файлу" },
      { status: 500 }
    );
  }
}

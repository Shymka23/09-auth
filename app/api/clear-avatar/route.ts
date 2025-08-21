import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Видаляємо обидва можливі cookie з аватаром
    cookieStore.delete("user_avatar");
    cookieStore.delete("avatar");

    return NextResponse.json({
      success: true,
      message: "Avatar cookie cleared successfully",
    });
  } catch (error) {
    console.error("Error clearing avatar cookie:", error);
    return NextResponse.json(
      { error: "Failed to clear avatar cookie" },
      { status: 500 }
    );
  }
}

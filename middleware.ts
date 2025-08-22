import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkServerSession } from "@/lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isAuth = authRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken && refreshToken) {
    try {
      await checkServerSession();
    } catch {}
  }

  const hasAccess = Boolean((await cookies()).get("accessToken")?.value);

  if (isPrivate && !hasAccess) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuth && hasAccess) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};

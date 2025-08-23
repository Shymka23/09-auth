import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { checkSessionEdge } from "@/lib/edge/checkSession";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isAuth = authRoutes.some((route) => pathname.startsWith(route));

  const response = NextResponse.next();

  if (!accessToken && refreshToken) {
    try {
      const sessionResponse = await checkSessionEdge(
        request.headers.get("cookie")
      );

      if (sessionResponse.ok) {
        // If session refresh was successful, get new cookies from the response
        const setCookieHeader = sessionResponse.headers.get("set-cookie");
        if (setCookieHeader) {
          response.headers.set("set-cookie", setCookieHeader);
        }
      }
    } catch {}
  }

  const hasAccess = Boolean((await cookies()).get("accessToken")?.value);

  if (isPrivate && !hasAccess) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuth && hasAccess) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};

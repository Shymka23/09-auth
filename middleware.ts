import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";

const privateRoutes = ["/profile", "/notes/filter", "/notes/action"];
const publicRoutes = ["/sign-in", "/sign-up", "/", "/notes", "/about"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Спеціальна обробка для API upload
  if (pathname === "/api/upload") {
    // Збільшуємо ліміт розміру запиту для upload
    const response = NextResponse.next();
    response.headers.set("max-http-buffer-size", "10mb");
    return response;
  }

  // Get tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // If no access token
  if (!accessToken) {
    if (refreshToken) {
      // Try to refresh the session using refreshToken
      try {
        const response = await fetch(
          `${request.nextUrl.origin}/api/auth/session`,
          {
            method: "GET",
            headers: {
              Cookie: request.headers.get("cookie") || "",
            },
          }
        );

        if (response.ok) {
          const setCookieHeader = response.headers.get("set-cookie");
          if (setCookieHeader) {
            // Parse and set new cookies
            const cookieArray = Array.isArray(setCookieHeader)
              ? setCookieHeader
              : [setCookieHeader];
            const responseHeaders = new Headers();

            for (const cookieStr of cookieArray) {
              const parsed = parse(cookieStr);
              if (parsed.accessToken) {
                // If we got a new access token, allow access
                if (isPrivateRoute) {
                  return NextResponse.next({
                    headers: {
                      "Set-Cookie": cookieStr,
                    },
                  });
                }
                if (isPublicRoute) {
                  return NextResponse.redirect(
                    new URL("/profile", request.url),
                    {
                      headers: {
                        "Set-Cookie": cookieStr,
                      },
                    }
                  );
                }
              }
            }
          }
        }
      } catch (error) {
        // В production логуємо менше деталей
        if (process.env.NODE_ENV === "development") {
          console.error("Session refresh failed:", error);
        }
      }
    }

    // If refresh failed or no refresh token, redirect to sign-in for private routes
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // For public routes, allow access
    if (isPublicRoute) {
      return NextResponse.next();
    }
  }

  // If access token exists
  if (accessToken) {
    // Redirect authenticated users from auth routes to profile
    if (isPublicRoute) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }

    // Allow access to private routes
    if (isPrivateRoute) {
      return NextResponse.next();
    }
  }

  // For home page ("/"), allow access without authentication
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Default: allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/profile/:path*", 
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
    "/api/upload",
    "/test",
  ],
};

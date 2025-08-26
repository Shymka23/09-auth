import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { checkSessionEdge } from "@/lib/edge/checkSession";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        // Якщо accessToken відсутній, але є refreshToken — потрібно перевірити сесію навіть для публічного маршруту,
        // адже сесія може залишатися активною, і тоді потрібно заборонити доступ до публічного маршруту.
        const sessionResponse = await checkSessionEdge(
          request.headers.get("cookie")
        );
        const setCookie = sessionResponse.headers.get("set-cookie");

        if (setCookie && sessionResponse.ok) {
          const cookieArray = Array.isArray(setCookie)
            ? setCookie
            : [setCookie];
          const response = NextResponse.next();

          for (const cookieStr of cookieArray) {
            const parsed = parse(cookieStr);
            const options = {
              expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
              path: parsed.Path,
              maxAge: Number(parsed["Max-Age"]),
            };
            if (parsed.accessToken)
              response.cookies.set("accessToken", parsed.accessToken, options);
            if (parsed.refreshToken)
              response.cookies.set(
                "refreshToken",
                parsed.refreshToken,
                options
              );
          }

          // Якщо сесія все ще активна:
          // для публічного маршруту — виконуємо редірект на головну.
          if (isPublicRoute) {
            return NextResponse.redirect(new URL("/", request.url));
          }
          // для приватного маршруту — дозволяємо доступ
          if (isPrivateRoute) {
            return response;
          }
        }
      } catch {}
    }
    // Якщо refreshToken або сесії немає:
    // публічний маршрут — дозволяємо доступ
    if (isPublicRoute) {
      return NextResponse.next();
    }

    // приватний маршрут — редірект на сторінку входу
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  // Якщо accessToken існує:
  // публічний маршрут — виконуємо редірект на головну
  if (isPublicRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // приватний маршрут — дозволяємо доступ
  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};

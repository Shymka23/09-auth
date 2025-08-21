"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession } from "@/lib/api/clientApi";
import { Loader } from "@/components/Loader/Loader";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, setUser, clearUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const isPrivateRoute =
    pathname?.startsWith("/profile") ||
    (pathname?.startsWith("/notes") &&
      !pathname?.startsWith("/notes/action/create") &&
      pathname !== "/notes" &&
      !pathname?.startsWith("/notes/filter"));
  const isAuthRoute =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const sessionUser = await checkSession();

        if (sessionUser) {
          setUser(sessionUser);
        } else {
          clearUser();

          // Redirect to sign-in if trying to access private route
          if (isPrivateRoute) {
            router.push("/sign-in");
            return;
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
        clearUser();

        if (isPrivateRoute) {
          router.push("/sign-in");
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUser, clearUser, router, isPrivateRoute]);

  useEffect(() => {
    // Redirect authenticated users away from auth routes
    if (!isLoading && isAuthenticated && isAuthRoute) {
      router.push("/profile");
    }
  }, [isLoading, isAuthenticated, isAuthRoute, router]);

  if (isLoading) {
    return <Loader />;
  }

  // Don't render private route content if not authenticated
  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

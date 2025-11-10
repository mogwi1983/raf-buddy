'use client';

import { useEffect, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { Spinner } from "@/components/ui/Spinner";

type AuthGuardProps = {
  children: ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, initializing } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!initializing && !user) {
      // Preserve the destination so we can return post-authentication.
      const params = new URLSearchParams({ redirectTo: pathname });
      router.replace(`/login?${params.toString()}`);
    }
  }, [initializing, pathname, router, user]);

  if (initializing) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Spinner label="Checking access…" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Spinner label="Redirecting to sign in…" />
      </div>
    );
  }

  return <>{children}</>;
};


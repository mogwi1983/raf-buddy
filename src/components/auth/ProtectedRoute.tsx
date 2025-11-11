"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col items-center gap-3 rounded-xl bg-white px-10 py-14 shadow-sm">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[--color-primary-200] border-t-[--color-primary-600]" />
          <p className="text-sm font-medium text-slate-600">
            Authenticating your session…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}


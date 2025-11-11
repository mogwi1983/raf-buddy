"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

const navItems = [
  { label: "Analyze", href: "/" },
  { label: "History", href: "/history" },
  { label: "Dashboard", href: "/dashboard" },
];

export function AppHeader() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.push("/login");
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="border-b border-[--color-border] bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[--color-primary-600] text-sm font-semibold text-white">
              RB
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-slate-900">
                RAF Buddy
              </span>
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Clinical Documentation Intelligence
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition ${
                    isActive
                      ? "bg-[--color-primary-50] text-[--color-primary-700]"
                      : "hover:text-[--color-primary-700]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden flex-col text-right text-xs font-medium leading-tight text-slate-600 sm:flex">
              <span className="truncate text-sm font-semibold text-slate-800">
                {user.email}
              </span>
              <span>Provider Workspace</span>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full border border-[--color-border] px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[--color-primary-200] hover:text-[--color-primary-700]"
              disabled={isSigningOut}
            >
              {isSigningOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-[--color-primary-700]"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-[--color-primary-600] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[--color-primary-100] transition hover:bg-[--color-primary-700]"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}


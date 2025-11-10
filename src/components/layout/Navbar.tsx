'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

const navLinks = [
  { href: "/analysis", label: "Analysis" },
  { href: "/history", label: "History", disabled: true },
];

const Logo = () => (
  <Link
    href="/"
    className="flex items-center gap-2 text-lg font-semibold tracking-tight text-sky-900"
  >
    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-base font-bold text-sky-700">
      CDI
    </span>
    <span>CareAlign Intelligence</span>
  </Link>
);

export const Navbar = () => {
  const { user, signOut, initializing } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const redirectToAuth = useMemo(() => {
    if (!pathname || pathname.startsWith("/login") || pathname.startsWith("/signup")) {
      return "/login";
    }
    const params = new URLSearchParams({ redirectTo: pathname });
    return `/login?${params.toString()}`;
  }, [pathname]);

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
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <span key={link.href}>
                {link.disabled ? (
                  <span className="text-sm font-medium text-slate-400">
                    {link.label}
                    <span className="ml-1 text-xs uppercase tracking-wide text-slate-300">
                      Soon
                    </span>
                  </span>
                ) : (
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-sky-700"
                        : "text-slate-500 hover:text-sky-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {initializing ? (
            <div className="h-8 w-24 animate-pulse rounded-full bg-slate-100" />
          ) : user ? (
            <>
              <div className="hidden flex-col text-right text-xs font-semibold sm:flex">
                <span className="text-slate-700">
                  {user.displayName ?? user.email ?? "Clinician"}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  Provider
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSigningOut ? "Signing out…" : "Sign out"}
              </button>
            </>
          ) : (
            <>
              <Link
                href={redirectToAuth}
                className="hidden text-sm font-semibold text-slate-600 transition hover:text-sky-700 sm:inline"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
              >
                Create account
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};


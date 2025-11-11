"use client";

export function SplashScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[--color-surface]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[--color-primary-200] border-t-[--color-primary-600]" />
      <p className="text-sm font-medium text-slate-600">Loading your workspace…</p>
    </div>
  );
}


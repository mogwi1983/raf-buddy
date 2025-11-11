"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

type AuthMode = "login" | "signup";

type FormState = {
  email: string;
  password: string;
};

const initialState: FormState = {
  email: "",
  password: "",
};

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLogin = mode === "login";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (isLogin) {
        await signIn(formState);
      } else {
        await signUp(formState);
      }

      router.replace("/");
    } catch (error) {
      console.error(error);
      const defaultMessage = isLogin
        ? "We couldn't verify those credentials. Please try again."
        : "We couldn't create your account. Please try again.";
      setErrorMessage(defaultMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="card flex flex-col gap-6 p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-slate-900">
            {isLogin ? "Sign in to RAF Buddy" : "Create your RAF Buddy account"}
          </h1>
          <p className="text-sm text-slate-600">
            {isLogin
              ? "Access your documentation intelligence workspace."
              : "Get started refining clinical documentation for risk adjustment."}
          </p>
        </header>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Email address
            <input
              type="email"
              required
              autoComplete="email"
              value={formState.email}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, email: event.target.value }))
              }
              className="rounded-lg border border-[--color-border] bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[--color-primary-400] focus:ring-2 focus:ring-[--color-primary-200]"
              placeholder="name@clinic.com"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              required
              minLength={8}
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={formState.password}
              onChange={(event) =>
                setFormState((prev) => ({ ...prev, password: event.target.value }))
              }
              className="rounded-lg border border-[--color-border] bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[--color-primary-400] focus:ring-2 focus:ring-[--color-primary-200]"
              placeholder="At least 8 characters"
            />
          </label>

          {errorMessage ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-2 flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white transition ${
              isSubmitting
                ? "bg-slate-300"
                : "bg-[--color-primary-600] hover:bg-[--color-primary-700]"
            }`}
          >
            {isSubmitting ? "Working…" : isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="text-center text-sm text-slate-600">
          {isLogin ? (
            <>
              Need an account?{" "}
              <button
                type="button"
                className="font-semibold text-[--color-primary-600] hover:text-[--color-primary-700]"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already registered?{" "}
              <button
                type="button"
                className="font-semibold text-[--color-primary-600] hover:text-[--color-primary-700]"
                onClick={() => router.push("/login")}
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


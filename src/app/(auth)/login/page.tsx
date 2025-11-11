import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16">
      <AuthForm mode="login" />
    </div>
  );
}


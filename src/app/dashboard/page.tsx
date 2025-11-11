import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="card flex flex-col gap-3 p-8 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">
          Key metrics, trends, and RAF impact insights will live here soon.
        </p>
      </div>
    </ProtectedRoute>
  );
}


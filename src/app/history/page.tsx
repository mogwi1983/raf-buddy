import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <div className="card flex flex-col gap-3 p-8 text-center">
        <h1 className="text-xl font-semibold text-slate-900">Note History</h1>
        <p className="text-sm text-slate-600">
          Your past analyses will appear here. We&apos;re building this view next.
        </p>
      </div>
    </ProtectedRoute>
  );
}


'use client';

type SpinnerProps = {
  label?: string;
  className?: string;
};

export const Spinner = ({ label, className }: SpinnerProps) => {
  const containerClass = [
    "flex flex-col items-center gap-3 text-sky-900",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClass}>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
      {label ? (
        <span className="text-sm font-medium text-slate-600">{label}</span>
      ) : null}
    </div>
  );
};



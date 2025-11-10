'use client';

import { useMemo, useState } from "react";
import { AnalysisSuggestion, RAFImpactLevel } from "@/types/analysis";
import { Spinner } from "@/components/ui/Spinner";

const impactStyles: Record<RAFImpactLevel, string> = {
  high: "border-emerald-200 bg-emerald-50 text-emerald-900",
  medium: "border-amber-200 bg-amber-50 text-amber-900",
  low: "border-slate-200 bg-slate-50 text-slate-700",
};

const placeholderSuggestions: AnalysisSuggestion[] = [
  {
    condition: "Type 2 diabetes mellitus with diabetic retinopathy",
    icd10: "E11.319",
    rationale:
      "Ophthalmology note documents nonproliferative retinopathy with active management. Capture ensures risk adjustment accuracy.",
    rafImpact: "high",
    specificityHint: "Link retinal findings and current treatment plan.",
  },
  {
    condition: "Chronic systolic (HFrEF) heart failure",
    icd10: "I50.22",
    rationale:
      "Cardiology plan references decreased EF (35%) and guideline-directed therapy. Specify systolic to reflect disease burden.",
    rafImpact: "high",
    specificityHint: "Document EF measurement and NYHA class when available.",
  },
  {
    condition: "COPD with acute lower respiratory infection",
    icd10: "J44.0",
    rationale:
      "Respiratory section notes wheezing, increased inhaler use, and antibiotic therapy for bronchitis—document acute component.",
    rafImpact: "medium",
    specificityHint: "Clarify oxygen status and exacerbation severity.",
  },
];

const CopyButton = ({
  onCopy,
  isCopied,
}: {
  onCopy: () => Promise<void>;
  isCopied: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={onCopy}
      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:text-sky-700"
    >
      {isCopied ? "Copied" : "Copy"}
    </button>
  );
};

export default function AnalysisPage() {
  const [note, setNote] = useState("");
  const [results, setResults] = useState<AnalysisSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const noteWordCount = useMemo(() => {
    if (!note.trim()) return 0;
    return note.trim().split(/\s+/).length;
  }, [note]);

  const handleAnalyze = async () => {
    if (!note.trim()) {
      setError("Paste a clinical note to analyze.");
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setCopiedIndex(null);

    // Placeholder for API call to the secure AI endpoint.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setResults(placeholderSuggestions);
    setIsAnalyzing(false);
  };

  const handleCopy = async (suggestion: AnalysisSuggestion, index: number) => {
    try {
      const payload = `${suggestion.condition} (${suggestion.icd10}) — ${suggestion.rationale}`;
      await navigator.clipboard.writeText(payload);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2500);
    } catch {
      setError("Unable to copy to clipboard. Please copy manually.");
    }
  };

  return (
    <section className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
          Clinical Documentation Intelligence
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          Paste the visit note. Receive targeted HCC documentation guidance.
        </h1>
        <p className="max-w-3xl text-sm text-slate-600 md:text-base">
          We analyze chronic conditions, treatment plans, and clinical context to
          surface diagnoses that need greater specificity for accurate RAF scoring.
          Review the AI rationale, confirm it matches the encounter, and update
          documentation accordingly.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Clinical note input
            </h2>
            <span className="text-xs font-medium text-slate-400">
              {noteWordCount} words
            </span>
          </div>
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Paste the provider note, assessment & plan, or encounter summary here..."
            className="min-h-[320px] w-full resize-y rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800 shadow-inner outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
          {error ? (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-medium text-rose-700">
              {error}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-slate-400">
              Average analysis time: <span className="font-semibold">~3 sec</span>
            </p>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isAnalyzing ? "Analyzing…" : "Analyze documentation"}
            </button>
          </div>
        </div>

        <aside className="flex min-h-[320px] flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Prioritized recommendations
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
              RAF focus
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Draft recommendations only. Confirm diagnoses through clinical judgment
            and documentation standards before updating the chart.
          </p>

          {isAnalyzing ? (
            <div className="flex flex-1 items-center justify-center py-8">
              <Spinner label="Reviewing note for HCC opportunities…" />
            </div>
          ) : results.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-400">
              <span className="font-semibold text-slate-500">
                No analysis yet
              </span>
              <p>
                Paste a clinical note and choose “Analyze documentation” to surface
                RAF-impacting opportunities.
              </p>
            </div>
          ) : (
            <ul className="flex flex-1 flex-col gap-4">
              {results.map((suggestion, index) => (
                <li
                  key={`${suggestion.icd10}-${index}`}
                  className={`rounded-xl border px-4 py-3 ${impactStyles[suggestion.rafImpact]}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">{suggestion.condition}</p>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
                        ICD-10 {suggestion.icd10}
                      </p>
                    </div>
                    <CopyButton
                      onCopy={() => handleCopy(suggestion, index)}
                      isCopied={copiedIndex === index}
                    />
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{suggestion.rationale}</p>
                  {suggestion.specificityHint ? (
                    <p className="mt-3 rounded-lg bg-white/70 p-3 text-xs text-slate-600">
                      <span className="font-semibold text-sky-700">Specificity:</span>{" "}
                      {suggestion.specificityHint}
                    </p>
                  ) : null}
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    RAF impact:{" "}
                    <span className="text-slate-700">{suggestion.rafImpact}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </section>
  );
}


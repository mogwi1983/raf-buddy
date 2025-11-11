"use client";

import { useCallback, useMemo, useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import type { DocumentationSuggestion } from "@/types/suggestion";

type AnalyzeState = "idle" | "loading" | "complete";

const demoSuggestions: DocumentationSuggestion[] = [
  {
    id: "1",
    condition: "Type 2 Diabetes with peripheral neuropathy",
    recommendedCode: "E11.42",
    clinicalRationale:
      "Progress notes mention neuropathic symptoms and gabapentin use. Document the diabetes complication for complete HCC capture.",
    rafImpact: "high",
  },
  {
    id: "2",
    condition: "Chronic systolic heart failure",
    recommendedCode: "I50.22",
    clinicalRationale:
      "Medication list includes carvedilol and bumetanide with reduced EF noted. Specify systolic chronicity for accurate risk adjustment.",
    rafImpact: "medium",
  },
  {
    id: "3",
    condition: "Chronic obstructive pulmonary disease with acute exacerbation",
    recommendedCode: "J44.1",
    clinicalRationale:
      "Encounter details describe increased wheeze, prednisone burst, and nebulizer therapy. Capture acute flare and oxygen dependency status.",
    rafImpact: "medium",
  },
];

const rafBadgeStyles: Record<
  DocumentationSuggestion["rafImpact"],
  string
> = {
  high: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-slate-100 text-slate-700 border-slate-200",
};

export function NoteAnalysisPage() {
  const [noteText, setNoteText] = useState("");
  const [analysisState, setAnalysisState] = useState<AnalyzeState>("idle");
  const [suggestions, setSuggestions] = useState<DocumentationSuggestion[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isAnalyzeDisabled = noteText.trim().length < 50 || analysisState === "loading";

  const handleAnalyze = useCallback(async () => {
    setAnalysisState("loading");
    setErrorMessage(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuggestions(demoSuggestions);
      setAnalysisState("complete");
    } catch (error) {
      console.error(error);
      setErrorMessage("We were unable to analyze this note. Please try again.");
      setAnalysisState("idle");
    }
  }, []);

  const handleCopy = useCallback(async (suggestion: DocumentationSuggestion) => {
    const text = `${suggestion.condition} (${suggestion.recommendedCode})`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(suggestion.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.error(error);
      setErrorMessage("Copy failed. You can still select and copy manually.");
    }
  }, []);

  const suggestionHeadline = useMemo(() => {
    if (analysisState === "idle") {
      return "Suggested documentation opportunities will appear here.";
    }

    if (analysisState === "loading") {
      return "Reviewing note for HCC specificity and RAF impact…";
    }

    if (suggestions.length === 0) {
      return "No additional documentation opportunities detected.";
    }

    return `Identified ${suggestions.length} documentation opportunities.`;
  }, [analysisState, suggestions.length]);

  return (
    <ProtectedRoute>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <section className="card flex flex-col gap-6 p-6">
          <header className="space-y-2">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-slate-900">
                Clinical Note Analyzer
              </h1>
              <span className="rounded-full border border-[--color-border] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Phase 1 MVP
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Paste the visit note below. RAF Buddy reviews for chronic condition specificity,
              missing HCCs, and RAF impact considerations.
            </p>
          </header>

          <div className="flex flex-1 flex-col gap-3">
            <label htmlFor="note-input" className="text-sm font-semibold text-slate-700">
              Encounter note
            </label>
            <textarea
              id="note-input"
              value={noteText}
              onChange={(event) => setNoteText(event.target.value)}
              placeholder="Include assessment & plan, medications, vitals, and history details…"
              className="min-h-[320px] flex-1 resize-y rounded-xl border border-[--color-border] bg-white px-4 py-3 text-sm leading-relaxed text-slate-800 shadow-inner shadow-slate-100 outline-none transition focus:border-[--color-primary-400] focus:ring-2 focus:ring-[--color-primary-200]"
            />
          </div>

          {errorMessage ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          ) : null}

          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              AI responses adhere to clinical documentation best practices. Confirm findings before
              signing the note.
            </p>
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzeDisabled}
              className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition ${
                isAnalyzeDisabled
                  ? "cursor-not-allowed bg-slate-300"
                  : "bg-[--color-primary-600] hover:bg-[--color-primary-700]"
              }`}
            >
              {analysisState === "loading" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Analyzing…
                </>
              ) : (
                "Analyze note"
              )}
            </button>
          </div>
        </section>

        <section className="card flex flex-col gap-4 p-6">
          <header className="space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">Suggested refinements</h2>
            <p className="text-sm text-slate-600">{suggestionHeadline}</p>
          </header>

          <div className="flex flex-col gap-4">
            {analysisState === "loading" ? (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="animate-pulse rounded-xl border border-[--color-border] bg-white/60 p-4"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-1/2 rounded bg-slate-200" />
                      <div className="h-3 w-3/4 rounded bg-slate-200" />
                      <div className="h-3 w-1/3 rounded bg-slate-200" />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {analysisState === "complete" && suggestions.length === 0 ? (
              <div className="rounded-xl border border-[--color-border] bg-white px-5 py-6 text-sm text-slate-600">
                Great work! This note already documents chronic conditions with high specificity.
              </div>
            ) : null}

            {suggestions.length > 0 && (
              <ul className="flex flex-col gap-4">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="rounded-xl border border-[--color-border] bg-white p-5 shadow-sm transition hover:border-[--color-primary-200]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-slate-900">
                          {suggestion.condition}
                        </h3>
                        <p className="text-sm text-slate-600">
                          Clinical rationale: {suggestion.clinicalRationale}
                        </p>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${rafBadgeStyles[suggestion.rafImpact]}`}
                      >
                        {suggestion.rafImpact} RAF impact
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold uppercase text-slate-500">
                          Recommended ICD-10
                        </span>
                        <p className="text-sm font-semibold text-slate-900">
                          {suggestion.recommendedCode}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopy(suggestion)}
                        className="rounded-full border border-[--color-border] px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-[--color-primary-200] hover:text-[--color-primary-700]"
                      >
                        {copiedId === suggestion.id ? "Copied!" : "Copy suggestion"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </ProtectedRoute>
  );
}


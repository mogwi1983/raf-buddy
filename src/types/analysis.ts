export type RAFImpactLevel = "high" | "medium" | "low";

export type AnalysisSuggestion = {
  condition: string;
  icd10: string;
  rationale: string;
  rafImpact: RAFImpactLevel;
  specificityHint?: string;
};


export type RafImpactLevel = "high" | "medium" | "low";

export interface DocumentationSuggestion {
  id: string;
  condition: string;
  recommendedCode: string;
  clinicalRationale: string;
  rafImpact: RafImpactLevel;
}


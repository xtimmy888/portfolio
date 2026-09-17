export type Credential = {
  title: string;
  issuer: string;
  date?: string;
  description?: string;
  type: "award" | "certification" | "achievement";
  href?: string;
  /** Marks an example card to replace with your own content. */
  placeholder?: boolean;
};

/**
 * Achievements, awards, and certifications.
 * The first entries are real (from research & competition work). Replace the
 * placeholder card(s) with your own certs (AWS, Google, Coursera, etc.).
 */
export const certifications: Credential[] = [
  {
    title: "RK45 ODE Solver — ML Step-Rejection Research Paper (Draft)",
    issuer: "MUN — Mathematics & Statistics",
    date: "2026",
    type: "achievement",
    description:
      "Authored a structured research-paper draft on predicting rejected adaptive ODE-solver steps with XGBoost (0.916 PR-AUC).",
  },
  {
    title: "Rotman Portfolio Management Competition 2025–2026",
    issuer: "Rotman School of Management",
    date: "2025–2026",
    type: "achievement",
    description:
      "Built the team's quantitative research and portfolio backtesting system for the national competition.",
  },
  {
    title: "Add your certifications here",
    issuer: "e.g. AWS, Google Cloud, Coursera, DataCamp",
    type: "certification",
    placeholder: true,
    description:
      "Edit data/certifications.ts to list certifications, awards, hackathon results, or honors.",
  },
];

export type Experience = {
  role: string;
  org: string;
  orgNote?: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Developer",
    org: "MUN Quant Society — Data & Infrastructure Team",
    orgNote: "Student Society",
    location: "St. John's, NL",
    start: "Sep 2025",
    end: "Present",
    current: true,
    summary:
      "Build and maintain the data & infrastructure tooling powering the society's quantitative research.",
    highlights: [
      "Built and maintained MQS Data & Infrastructure tooling — sentiment pipelines for news/social ingestion, NLP scoring, storage, and downstream analytics using web APIs, pandas, and text-cleaning.",
      "Generated per-ticker daily sentiment scores and structured financial/market datasets for faster analysis, visualization, and strategy testing.",
      "Implemented and validated a Python backtesting engine (pandas, NumPy) covering signal generation, portfolio weights, risk controls, transaction costs, and performance reporting across multiple equity tickers.",
      "Improved reliability and reproducibility with GitHub Actions, Docker, and SQL/PostgreSQL time-series storage — making strategies plug-and-play and cutting setup time from 1–2 hours to under 1 hour.",
    ],
    tech: [
      "Python",
      "pandas",
      "NumPy",
      "NLP",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Git",
    ],
  },
  {
    role: "Computational Chemistry Research Assistant",
    org: "Memorial University of Newfoundland",
    orgNote: "Department of Chemistry",
    location: "St. John's, NL",
    start: "Jan 2026",
    end: "Present",
    current: true,
    summary:
      "Run all-atom molecular dynamics simulations on HPC to study protein structural stability.",
    highlights: [
      "Built and ran an all-atom GROMACS molecular dynamics workflow for ubiquitin (PDB 1UBQ) on the Narval HPC cluster with a CHARMM36/TIP3P protein–water–ion system.",
      "Completed the full simulation pipeline: system preparation, energy minimization, NVT/NPT equilibration, production MD, Slurm-based HPC jobs, and checkpoint recovery.",
      "Processed trajectory outputs with Python (NumPy, pandas, Matplotlib/Seaborn) and GROMACS tools, analyzing RMSD, RMSF, and H-bond stability across 251 simulation frames.",
    ],
    tech: [
      "GROMACS",
      "Python",
      "NumPy",
      "pandas",
      "Matplotlib",
      "Seaborn",
      "Slurm",
      "Narval HPC",
      "Linux",
    ],
  },
  {
    role: "Scientific Computing Research Assistant",
    org: "Memorial University of Newfoundland",
    orgNote: "Department of Mathematics & Statistics",
    location: "St. John's, NL",
    start: "Jan 2026",
    end: "May 2026",
    summary:
      "Built an adaptive ODE solver and an ML model to predict rejected solver steps.",
    highlights: [
      "Built and validated a Python/Fortran adaptive RK45 / Dormand–Prince 5(4) ODE solver, generating 1,115,989 adaptive step attempts across 7,810 runs over scalar and coupled systems (exponential decay, logistic growth, SHO, Van der Pol, Lorenz).",
      "Engineered a leakage-free ML dataset from solver telemetry using run-level train/validation/test splits and pre-step features (step size, tolerance, state norm, slope norm, ODE parameters, problem type) to predict rejected steps without post-step error information.",
      "Trained and evaluated Logistic Regression and XGBoost reject-prediction models — the tuned XGBoost reached 0.916 PR-AUC, 90.7% precision, 73.1% recall, and 0.810 F1 — and compiled the methods and findings into a structured research-paper draft.",
    ],
    tech: [
      "Python",
      "Fortran",
      "scikit-learn",
      "XGBoost",
      "NumPy",
      "pandas",
      "Matplotlib",
    ],
  },
];

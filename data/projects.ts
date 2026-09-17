export type ProjectMetric = {
  label: string;
  /** Numeric strings (e.g. "0.916", "251") animate; others render as-is. */
  value: string;
  prefix?: string;
  suffix?: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  type: "github" | "demo" | "paper" | "external";
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  period: string;
  featured: boolean;
  /** Short text for cards. */
  summary: string;
  problem: string;
  approach: string[];
  results: string[];
  stack: string[];
  metrics?: ProjectMetric[];
  links?: ProjectLink[];
};

import { profile } from "@/data/profile";

const githubProfile = profile.socials.github;

export const projects: Project[] = [
  {
    slug: "quant-backtesting-engine",
    title: "Quant Backtesting Engine",
    tagline:
      "A reproducible Python engine for simulating and scoring trading strategies.",
    category: "Quantitative Finance",
    period: "Sep 2025 – Present",
    featured: true,
    summary:
      "Modular backtesting engine that makes new trading strategies plug-and-play, with realistic costs, risk controls, and consistent reporting.",
    problem:
      "Strategy ideas at the Quant Society were hard to compare — ad-hoc scripts, inconsistent metrics, and slow setup made results unreliable and tough to reproduce.",
    approach: [
      "Implemented a modular engine (pandas, NumPy) separating signal generation, position sizing, and P&L so new strategies plug in through shared data pipelines.",
      "Modeled realistic transaction costs and risk constraints — position & cash limits, volatility targets, and exposure checks.",
      "Produced comparable metrics (returns, volatility, Sharpe, max drawdown, turnover) with Matplotlib visualizations and SQL/PostgreSQL storage.",
      "Containerized with Docker and automated checks with GitHub Actions for reproducible runs across the team.",
    ],
    results: [
      "Cut new-strategy setup time from 1–2 hours to under 1 hour.",
      "Standardized strategy evaluation so results are directly comparable and reproducible.",
    ],
    stack: [
      "Python",
      "pandas",
      "NumPy",
      "PostgreSQL",
      "Docker",
      "GitHub Actions",
      "Matplotlib",
    ],
    metrics: [
      { label: "Setup time", value: "60", suffix: " min", prefix: "<" },
      { label: "Tracked metrics", value: "5", suffix: "+" },
    ],
    links: [{ label: "GitHub", href: githubProfile, type: "github" }],
  },
  {
    slug: "adaptive-ode-ml",
    title: "Adaptive ODE Solver + ML Step Prediction",
    tagline:
      "Predicting rejected adaptive steps in an RK45 ODE solver with XGBoost.",
    category: "Scientific Computing / ML",
    period: "Jan 2026 – May 2026",
    featured: true,
    summary:
      "Built an adaptive ODE solver, mined its telemetry into a leakage-free ML dataset, and trained models to predict rejected steps before taking them.",
    problem:
      "Adaptive ODE solvers waste computation on rejected steps. Could a model predict — from information available before a step — whether that step will be rejected?",
    approach: [
      "Built and validated a Python/Fortran adaptive RK45 / Dormand–Prince 5(4) solver across scalar and coupled systems (exponential decay, logistic growth, SHO, Van der Pol, Lorenz).",
      "Generated solver telemetry: 1,115,989 adaptive step attempts across 7,810 runs.",
      "Engineered a leakage-free dataset with run-level train/val/test splits and pre-step features (step size, tolerance, state norm, slope norm, ODE parameters, problem type).",
      "Trained and tuned Logistic Regression and XGBoost reject-prediction models.",
    ],
    results: [
      "Tuned XGBoost reached 0.916 PR-AUC, 90.7% precision, 73.1% recall, and 0.810 F1 on rejected-step prediction.",
      "Compiled methods, results, and solver-policy findings into a structured research-paper draft.",
    ],
    stack: [
      "Python",
      "Fortran",
      "scikit-learn",
      "XGBoost",
      "NumPy",
      "pandas",
      "Matplotlib",
    ],
    metrics: [
      { label: "PR-AUC", value: "0.916" },
      { label: "Step attempts", value: "1.12", suffix: "M" },
      { label: "F1 score", value: "0.810" },
    ],
  },
  {
    slug: "gromacs-molecular-dynamics",
    title: "GROMACS Molecular Dynamics — Ubiquitin",
    tagline: "All-atom MD simulation of ubiquitin (1UBQ) on an HPC cluster.",
    category: "Computational Chemistry / HPC",
    period: "Jan 2026 – Present",
    featured: true,
    summary:
      "A full molecular-dynamics workflow studying the structural stability of ubiquitin, run end-to-end on the Narval HPC cluster.",
    problem:
      "Characterize the structural stability of ubiquitin through an all-atom molecular dynamics simulation and reproducible trajectory analysis.",
    approach: [
      "Set up a CHARMM36/TIP3P protein–water–ion system for ubiquitin (PDB 1UBQ).",
      "Ran the full pipeline on the Narval HPC cluster: preparation, energy minimization, NVT/NPT equilibration, production MD via Slurm, with checkpoint recovery.",
      "Analyzed trajectories with Python (NumPy, pandas, Matplotlib/Seaborn) and GROMACS tools.",
    ],
    results: [
      "Quantified RMSD, RMSF, and H-bond stability trends across 251 simulation frames.",
      "Produced a reproducible MD workflow reusable for further computational-chemistry research.",
    ],
    stack: [
      "GROMACS",
      "Python",
      "NumPy",
      "pandas",
      "Matplotlib",
      "Seaborn",
      "Slurm",
      "Linux",
    ],
    metrics: [
      { label: "Trajectory frames", value: "251" },
      { label: "Protein (PDB)", value: "1UBQ" },
    ],
  },
  {
    slug: "sentiment-nlp-pipeline",
    title: "Market Sentiment NLP Pipeline",
    tagline:
      "Turns finance news & social posts into per-ticker daily sentiment scores.",
    category: "NLP / Data Engineering",
    period: "Sep 2025 – Nov 2025",
    featured: true,
    summary:
      "An NLP pipeline that converts unstructured finance news and social posts into a structured daily sentiment signal for quant models.",
    problem:
      "Quant models needed a clean, structured sentiment signal derived from noisy, unstructured news and social-media text.",
    approach: [
      "Built a Python NLP pipeline ingesting finance news/social posts via web APIs, with pandas and text-cleaning steps.",
      "Converted text into per-ticker daily sentiment scores aligned to market data.",
      "Logged sentiment alongside price in SQL / time-series storage (version-controlled with Git) for fast joins, visualization, and backtests across many tickers.",
    ],
    results: [
      "Delivered a reusable daily sentiment feed consumed by downstream quant models.",
      "Enabled multi-ticker backtests that join sentiment with price history.",
    ],
    stack: ["Python", "pandas", "NLP", "Web APIs", "SQL", "Git"],
    metrics: [
      { label: "Refresh cadence", value: "Daily" },
      { label: "Signal", value: "Per-ticker" },
    ],
  },
  {
    slug: "rpmc-quant-portfolio",
    title: "RPMC Quant Portfolio System",
    tagline:
      "Research & backtesting system for the Rotman Portfolio Management Competition.",
    category: "Quantitative Finance",
    period: "Nov 2025 – Present",
    featured: false,
    summary:
      "End-to-end research and portfolio-construction pipeline that tests signals and auto-generates risk and attribution reports for competition decisions.",
    problem:
      "The Rotman Portfolio Management Competition needed a repeatable way to research signals and construct a risk-aware portfolio under clear constraints.",
    approach: [
      "Designed a research & backtesting pipeline in Python (pandas, NumPy, yfinance/Stooq) to test stock/ETF signals — momentum, mean reversion, and factor screens.",
      "Built portfolio risk/positioning logic (position & cash limits, volatility targets, exposure checks) using vectorbt/Backtrader, scikit-learn, and PyPortfolioOpt.",
      "Auto-generated equity-curve, rolling-Sharpe, and attribution reports with Matplotlib/Plotly and SQL.",
    ],
    results: [
      "Enabled consistent signal comparison via Sharpe, max drawdown, and turnover.",
      "Automated reporting to support faster, evidence-based competition decisions.",
    ],
    stack: [
      "Python",
      "pandas",
      "NumPy",
      "vectorbt",
      "PyPortfolioOpt",
      "Plotly",
      "SQL",
    ],
    metrics: [
      { label: "Signal families", value: "3" },
      { label: "Reports", value: "Automated" },
    ],
    links: [{ label: "GitHub", href: githubProfile, type: "github" }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

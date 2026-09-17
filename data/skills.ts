export type SkillCategory = {
  name: string;
  /** lucide-react icon name, resolved in the Skills component. */
  icon: "Code2" | "Brain" | "Wrench";
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    name: "Languages",
    icon: "Code2",
    skills: [
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "C",
      "Fortran",
      "SQL",
      "HTML",
      "CSS",
    ],
  },
  {
    name: "Data & ML",
    icon: "Brain",
    skills: [
      "pandas",
      "NumPy",
      "scikit-learn",
      "XGBoost",
      "Matplotlib",
      "Seaborn",
      "Plotly",
      "NLP / Sentiment",
      "GROMACS",
    ],
  },
  {
    name: "Tools & Platforms",
    icon: "Wrench",
    skills: [
      "Git & GitHub",
      "Docker",
      "PostgreSQL",
      "GitHub Actions",
      "Slurm",
      "Narval HPC",
      "Linux",
      "Jupyter",
      "Node.js",
      "React",
    ],
  },
];

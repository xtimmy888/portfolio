/**
 * Single source of truth for personal info shown across the site.
 * Edit values here to update the whole portfolio.
 */
export const profile = {
  name: "Tahmid Zalal",
  nickname: "Tim",
  fullName: "Tahmid Zalal (Tim)",
  title: "CS + Physics Graduate",
  /** Rotated through in the hero. */
  roles: [
    "Quantitative Developer",
    "Machine Learning Engineer",
    "Scientific Computing",
    "Full-Stack Developer",
  ],
  location: "St. John's, NL, Canada",
  email: "tahmidmahin89@gmail.com",
  phone: "(709) 330-8336",
  resumePath: "/Tahmid_Zalal_Resume.pdf",
  githubUsername: "xtimmy888",
  tagline:
    "I build quantitative systems, machine-learning models, and scientific-computing workflows.",
  summary:
    "Computer Science and Physics graduate with experience in scientific computing, machine learning, and data analytics. I build computational workflows, predictive models, and data pipelines — turning research questions and messy datasets into reliable, reproducible software.",
  socials: {
    github: "https://github.com/xtimmy888",
    linkedin: "https://www.linkedin.com/in/tahmidzalal",
    email: "mailto:tahmidmahin89@gmail.com",
  },
} as const;

export type Profile = typeof profile;

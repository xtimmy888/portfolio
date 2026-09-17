import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Quantitative finance, machine learning, and scientific-computing projects by Tahmid Zalal.",
};

export default function ProjectsPage() {
  return (
    <Section className="pt-28">
      <SectionHeading
        eyebrow="Projects"
        title="All projects"
        description="A deeper look at the systems I've built across quant research, computational science, and ML. Click any card for the full case study."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

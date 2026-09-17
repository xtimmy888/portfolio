import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { featuredProjects } from "@/data/projects";

export function ProjectsPreview() {
  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        description="Real systems from research and quantitative work — each with a full case study."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex justify-center">
        <Button href="/projects" variant="outline" size="lg">
          View all projects
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Reveal>
    </Section>
  );
}

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

/** Compact project card linking to its case-study page. */
export function ProjectCard({ project }: { project: Project }) {
  const shownStack = project.stack.slice(0, 4);
  const extra = project.stack.length - shownStack.length;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--accent)_45%,var(--border))] hover:shadow-[0_12px_40px_-12px_color-mix(in_oklab,var(--accent)_35%,transparent)]"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="font-mono text-xs font-medium text-accent">
          {project.category}
        </span>
        <span className="text-xs text-muted">{project.period}</span>
      </div>

      <h3 className="flex items-start justify-between gap-2 text-lg font-semibold tracking-tight">
        <span>{project.title}</span>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
      </h3>

      <p className="mt-2 flex-1 text-sm text-muted">{project.summary}</p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {shownStack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
        {extra > 0 && <Badge>+{extra}</Badge>}
      </div>
    </Link>
  );
}

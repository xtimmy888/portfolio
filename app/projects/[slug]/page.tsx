import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CosmicPage } from "@/components/cosmic-page";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  FileText,
} from "lucide-react";
import {
  getProject,
  getProjectSlugs,
  projects,
  type ProjectLink,
} from "@/data/projects";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { buttonClasses } from "@/components/ui/button";
import { StatCounter } from "@/components/stat-counter";
import { GithubIcon } from "@/components/icons";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.tagline,
  };
}

function LinkIcon({ type }: { type: ProjectLink["type"] }) {
  if (type === "github") return <GithubIcon className="h-4 w-4" />;
  if (type === "demo") return <ExternalLink className="h-4 w-4" />;
  if (type === "paper") return <FileText className="h-4 w-4" />;
  return <ArrowUpRight className="h-4 w-4" />;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <CosmicPage>
      <Section>
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        All projects
      </Link>

      {/* Header */}
      <Reveal className="mt-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          <span className="font-mono text-accent">{project.category}</span>
          <span className="text-muted">·</span>
          <span className="text-muted">{project.period}</span>
        </div>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.tagline}</p>

        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses({ variant: "outline", size: "md" })}
              >
                <LinkIcon type={link.type} />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </Reveal>

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <Reveal className="mt-12">
          <div className="grid gap-6 rounded-2xl border border-border bg-card p-8 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <StatCounter
                key={metric.label}
                value={metric.value}
                prefix={metric.prefix}
                suffix={metric.suffix}
                label={metric.label}
              />
            ))}
          </div>
        </Reveal>
      )}

      {/* Body */}
      <div className="mt-14 grid gap-12 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <Reveal>
            <h2 className="text-xl font-semibold">The problem</h2>
            <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
          </Reveal>

          <Reveal>
            <h2 className="text-xl font-semibold">Approach</h2>
            <ol className="mt-4 space-y-4">
              {project.approach.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed text-muted">{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal>
            <h2 className="text-xl font-semibold">Results</h2>
            <ul className="mt-4 space-y-3">
              {project.results.map((result, i) => (
                <li key={i} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <p className="leading-relaxed text-muted">{result}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Sidebar */}
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <p className="font-mono text-sm text-accent">Tech stack</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Next project */}
      <div className="mt-16 border-t border-border pt-8">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex flex-wrap items-center justify-between gap-2"
        >
          <span>
            <span className="text-sm text-muted">Next project</span>
            <span className="block text-lg font-semibold transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </span>
          <ArrowRight className="h-5 w-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      </div>
      </Section>
    </CosmicPage>
  );
}

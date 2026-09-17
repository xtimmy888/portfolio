import { GraduationCap, MapPin, CalendarDays } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { GithubStats } from "@/components/github-stats";

const FOCUS_AREAS = [
  "Quantitative Finance",
  "Machine Learning",
  "Scientific Computing / HPC",
  "Data Engineering",
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        eyebrow="About"
        title="Turning research questions into reliable software"
      />

      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal className="lg:col-span-3">
          <div className="space-y-4 text-base leading-relaxed text-muted">
            <p>{profile.summary}</p>
            <p>
              I&apos;m most at home where rigorous problem-solving meets
              practical engineering — building backtesting engines and ML
              pipelines for quantitative research, running molecular-dynamics
              simulations on HPC clusters, and shipping reproducible workflows
              with Docker, PostgreSQL, and CI.
            </p>
          </div>

          <div className="mt-8">
            <p className="mb-3 font-mono text-sm text-accent">Focus areas</p>
            <div className="flex flex-wrap gap-2">
              {FOCUS_AREAS.map((area) => (
                <Badge key={area} className="text-foreground">
                  {area}
                </Badge>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="space-y-5 lg:col-span-2" delay={0.1}>
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-accent">
                <GraduationCap className="h-5 w-5" />
              </span>
              <p className="font-mono text-sm text-accent">Education</p>
            </div>

            <h3 className="mt-4 text-lg font-semibold">{education.school}</h3>
            <p className="mt-1 text-sm text-muted">{education.degree}</p>

            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-accent" />
                Graduated {education.graduation}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-accent" />
                {education.location}
              </span>
            </div>

            <div className="mt-5 border-t border-border pt-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">
                Relevant coursework
              </p>
              <div className="flex flex-wrap gap-1.5">
                {education.coursework.map((course) => (
                  <Badge key={course}>{course}</Badge>
                ))}
              </div>
            </div>
          </div>

          <GithubStats />
        </Reveal>
      </div>
    </Section>
  );
}

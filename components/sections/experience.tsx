import { MapPin } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Research & development roles"
        description="Hands-on work across quantitative finance, computational chemistry, and scientific computing."
      />

      <ol className="relative">
        {/* timeline spine */}
        <div
          aria-hidden
          className="absolute bottom-3 left-[15px] top-3 w-px bg-gradient-to-b from-accent/60 via-border to-transparent"
        />

        {experience.map((job, i) => (
          <li key={`${job.org}-${job.role}`} className="relative pb-12 pl-12 last:pb-0">
            <span className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-card">
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            </span>

            <Reveal delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div>
                    <h3 className="text-lg font-semibold">{job.role}</h3>
                    <p className="mt-0.5 text-sm text-accent">
                      {job.org}
                      {job.orgNote && (
                        <span className="text-muted"> · {job.orgNote}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {job.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] px-2.5 py-1 text-xs font-medium text-accent">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Current
                      </span>
                    )}
                    <span className="font-mono text-xs text-muted">
                      {job.start} – {job.end}
                    </span>
                  </div>
                </div>

                <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5" />
                  {job.location}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {job.highlights.map((point, j) => (
                    <li key={j} className="flex gap-3 text-sm text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.tech.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

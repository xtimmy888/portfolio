import { Award, Sparkles, Plus, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { certifications, type Credential } from "@/data/certifications";

const TYPE_ICON: Record<Credential["type"], LucideIcon> = {
  achievement: Sparkles,
  award: Award,
  certification: Award,
};

export function Certifications() {
  return (
    <Section id="certifications">
      <SectionHeading
        eyebrow="Achievements"
        title="Certifications & Awards"
        description="Research output, competitions, and credentials."
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cred, i) => {
          const Icon = cred.placeholder ? Plus : TYPE_ICON[cred.type];
          return (
            <Reveal key={cred.title} delay={i * 0.06}>
              <div
                className={
                  cred.placeholder
                    ? "h-full rounded-2xl border border-dashed border-border bg-transparent p-6 opacity-80"
                    : "h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-[color-mix(in_oklab,var(--accent)_40%,var(--border))]"
                }
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  {cred.date && (
                    <span className="font-mono text-xs text-muted">
                      {cred.date}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-semibold leading-snug">{cred.title}</h3>
                <p className="mt-1 text-sm text-accent">{cred.issuer}</p>
                {cred.description && (
                  <p className="mt-3 text-sm text-muted">{cred.description}</p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

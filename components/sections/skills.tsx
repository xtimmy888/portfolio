import { Code2, Brain, Wrench, type LucideIcon } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { skills } from "@/data/skills";

const ICONS: Record<string, LucideIcon> = {
  Code2,
  Brain,
  Wrench,
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="Tools I build with"
        description="A working toolkit across languages, data/ML, and the platforms that keep projects reproducible."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {skills.map((category, i) => {
          const Icon = ICONS[category.icon] ?? Code2;
          return (
            <Reveal key={category.name} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-semibold">{category.name}</h3>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-border bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] px-2.5 py-1.5 text-sm text-foreground/90 transition-colors hover:border-accent hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

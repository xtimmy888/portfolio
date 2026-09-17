import { Mail, MapPin, FileText } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/data/profile";

const SOCIALS = [
  { label: "GitHub", href: profile.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedinIcon },
];

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        description="Open to new-grad roles and interesting projects in quant, ML, and scientific computing. Drop me a message — I read everything."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            <a
              href={profile.socials.email}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-accent">
                <Mail className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-muted">Email</span>
                <span className="font-medium">{profile.email}</span>
              </span>
            </a>

            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-muted">Location</span>
                <span className="font-medium">{profile.location}</span>
              </span>
            </div>

            <a
              href={profile.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[color-mix(in_oklab,var(--accent)_14%,transparent)] text-accent">
                <FileText className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs text-muted">Résumé</span>
                <span className="font-medium">Download PDF</span>
              </span>
            </a>

            <div className="flex gap-3 pt-1">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-accent hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

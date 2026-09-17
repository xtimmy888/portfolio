"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { StatCounter } from "@/components/stat-counter";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const SOCIALS = [
  { label: "GitHub", href: profile.socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: LinkedinIcon },
  { label: "Email", href: profile.socials.email, Icon: Mail },
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.1, delayChildren: 0.1 },
    },
  };
  const item = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      {/* accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent), transparent)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted">
              <MapPin className="h-3.5 w-3.5 text-accent" />
              {profile.location}
              <span className="mx-1 h-1 w-1 rounded-full bg-muted" />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-5xl font-bold tracking-tight sm:text-7xl"
          >
            Tahmid <span className="text-gradient">Zalal</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-4 flex h-8 items-center font-mono text-lg text-muted sm:text-xl"
          >
            <span className="mr-2 text-accent">&gt;</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="text-foreground"
              >
                {profile.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          >
            Computer Science &amp; Physics graduate building quantitative
            systems, machine-learning models, and scientific-computing
            workflows — turning research questions and messy data into reliable,
            reproducible software.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button href="/#projects" size="lg">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/#contact" variant="outline" size="lg">
              Get in touch
            </Button>
            <div className="ml-1 flex items-center gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-accent hover:text-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8"
          >
            <StatCounter value="3" label="Research & dev roles" />
            <StatCounter value="5" label="Projects shipped" />
            <StatCounter value="1.1" suffix="M+" label="ODE steps simulated" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

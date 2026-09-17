"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonClasses } from "@/components/ui/button";

const LINKS = [
  { label: "About", href: "/#about", id: "about" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Projects", href: "/#projects", id: "projects" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Blog", href: "/blog", id: null },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

const SECTION_IDS = LINKS.filter((l) => l.id).map((l) => l.id as string);

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Glass background once the user scrolls past the top.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in the viewport (home page only).
  useEffect(() => {
    if (pathname !== "/") return;
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (link: (typeof LINKS)[number]) => {
    if (link.label === "Blog") return pathname.startsWith("/blog");
    if (link.label === "Projects")
      return (
        pathname.startsWith("/projects") ||
        (pathname === "/" && active === "projects")
      );
    return pathname === "/" && active === link.id;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-sm" : "border-b border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="Home"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-background">
            TZ
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {profile.name}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(link)
                    ? "text-accent"
                    : "text-muted hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonClasses({ variant: "outline", size: "sm" }), "hidden sm:inline-flex")}
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:text-foreground md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="glass overflow-hidden border-t border-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive(link)
                        ? "bg-[color-mix(in_oklab,var(--accent)_12%,transparent)] text-accent"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={profile.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonClasses({ variant: "outline", size: "sm" }), "w-full")}
                >
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

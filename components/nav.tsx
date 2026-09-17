"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const shadow = "[text-shadow:0_1px_16px_rgba(0,0,0,0.85)]";

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname.startsWith(href);

  // Fly through the galaxy into the chosen section, then open it.
  const dive = (href: string) => {
    setOpen(false);
    if (pathname === "/") {
      window.dispatchEvent(
        new CustomEvent("galaxy-dive", { detail: { route: href } }),
      );
    } else {
      try {
        sessionStorage.setItem("galaxyEnter", `dive:${href.replace("/", "")}`);
      } catch {
        /* ignore */
      }
      router.push("/");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Home (galaxy)">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-accent to-accent-2 font-mono text-sm font-bold text-[#04050d]">
            TZ
          </span>
          <span className={cn("text-sm font-semibold tracking-tight text-white", shadow)}>
            {profile.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => dive(link.href)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  shadow,
                  isActive(link.href)
                    ? "text-accent"
                    : "text-white/80 hover:text-white",
                )}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/10 bg-[#04050d]/90 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => dive(link.href)}
                    className={cn(
                      "block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                      isActive(link.href)
                        ? "text-accent"
                        : "text-white/80 hover:text-white",
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

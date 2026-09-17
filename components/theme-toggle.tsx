"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/** Light/dark switch. Renders a stable placeholder until mounted to avoid
 *  hydration mismatch (server doesn't know the resolved theme). */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} mode` : "Toggle theme"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-foreground"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-[18px] w-[18px]" />
        ) : (
          <Moon className="h-[18px] w-[18px]" />
        )
      ) : (
        <span className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}

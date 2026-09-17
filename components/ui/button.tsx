import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-background hover:brightness-110 glow",
  outline:
    "border border-border bg-transparent hover:border-accent hover:text-accent",
  ghost:
    "bg-transparent hover:bg-[color-mix(in_oklab,var(--foreground)_8%,transparent)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses(opts?: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const { variant = "primary", size = "md", className } = opts ?? {};
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
};

export function Button({
  variant,
  size,
  className,
  href,
  external,
  children,
  ...rest
}: ButtonProps) {
  const classes = buttonClasses({ variant, size, className });

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={rest["aria-label"]}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={rest["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Small pill used for tech tags and labels. */
export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-[color-mix(in_oklab,var(--foreground)_4%,transparent)] px-3 py-1 text-xs font-medium text-muted transition-colors",
        className,
      )}
      {...props}
    />
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/** Returns to the galaxy home in the selector state (page 2), not the intro. */
export function BackToGalaxy() {
  const router = useRouter();
  const go = () => {
    try {
      sessionStorage.setItem("galaxyEnter", "select");
    } catch {
      /* ignore */
    }
    router.push("/");
  };
  return (
    <button
      onClick={go}
      className="inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
    >
      <ArrowLeft className="h-4 w-4" />
      back to the galaxy
    </button>
  );
}

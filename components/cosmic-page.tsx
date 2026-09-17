import type { ReactNode } from "react";
import { Starfield } from "@/components/starfield";
import { Footer } from "@/components/footer";
import { BackToGalaxy } from "@/components/back-to-galaxy";

/** Shared shell for all content pages: cosmic backdrop, nav offset, footer. */
export function CosmicPage({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* nebula glow (dark mode only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-20 hidden dark:block"
        style={{
          background:
            "radial-gradient(1000px 600px at 82% -12%, rgba(76,201,240,0.10), transparent 60%), radial-gradient(900px 700px at 4% 112%, rgba(139,123,255,0.12), transparent 60%)",
        }}
      />
      <Starfield />

      <div className="mx-auto max-w-6xl px-6 pt-24">
        <BackToGalaxy />
      </div>

      <div className="relative z-10">{children}</div>
      <Footer />
    </div>
  );
}

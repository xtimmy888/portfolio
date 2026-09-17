import type { Metadata } from "next";
import { CosmicPage } from "@/components/cosmic-page";
import { About } from "@/components/sections/about";
import { Certifications } from "@/components/sections/certifications";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Tahmid Zalal (Tim) — a Computer Science & Physics graduate working in quant, ML, and scientific computing.",
};

export default function AboutPage() {
  return (
    <CosmicPage>
      <About />
      <Certifications />
    </CosmicPage>
  );
}

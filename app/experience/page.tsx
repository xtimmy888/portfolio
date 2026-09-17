import type { Metadata } from "next";
import { CosmicPage } from "@/components/cosmic-page";
import { Experience } from "@/components/sections/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Research and development roles across quantitative finance, computational chemistry, and scientific computing.",
};

export default function ExperiencePage() {
  return (
    <CosmicPage>
      <Experience />
    </CosmicPage>
  );
}

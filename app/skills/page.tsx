import type { Metadata } from "next";
import { CosmicPage } from "@/components/cosmic-page";
import { Skills } from "@/components/sections/skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Languages, data/ML tooling, and the platforms Tahmid Zalal builds with.",
};

export default function SkillsPage() {
  return (
    <CosmicPage>
      <Skills />
    </CosmicPage>
  );
}

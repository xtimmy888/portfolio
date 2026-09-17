import type { Metadata } from "next";
import { CosmicPage } from "@/components/cosmic-page";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tahmid Zalal (Tim).",
};

export default function ContactPage() {
  return (
    <CosmicPage>
      <Contact />
    </CosmicPage>
  );
}

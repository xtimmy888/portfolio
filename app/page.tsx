import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <ProjectsPreview />
      <Skills />
      <Certifications />
      <Contact />
    </>
  );
}

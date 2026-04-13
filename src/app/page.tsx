import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { KunaiImageCursor } from "@/components/KunaiImageCursor";
import { ItachiLoader } from "@/components/ItachiLoader";
import { SectionTransition } from "@/components/SectionTransition";

export default function Home() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <ItachiLoader />
      <KunaiImageCursor />
      <Navbar />
      <Hero />
      <SectionTransition />
      <About />
      <SectionTransition />
      <Skills />
      <SectionTransition />
      <Projects />
      <SectionTransition />
      <Experience />
      <SectionTransition />
      <Contact />
      <Footer />
    </main>
  );
}

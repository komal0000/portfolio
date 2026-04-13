import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { KunaiImageCursor } from "@/components/KunaiImageCursor";
import { ItachiLoaderRefined } from "@/components/ItachiLoaderRefined";
import { ThreeTomoeTransition } from "@/components/ThreeTomoeTransition";

export default function Home() {
  return (
    <main className="bg-bg-primary min-h-screen">
      <ItachiLoaderRefined />
      <KunaiImageCursor />
      <Navbar />
      <Hero />
      <ThreeTomoeTransition />
      <About />
      <ThreeTomoeTransition />
      <Skills />
      <ThreeTomoeTransition />
      <Projects />
      <ThreeTomoeTransition />
      <Experience />
      <ThreeTomoeTransition />
      <Contact />
      <Footer />
    </main>
  );
}

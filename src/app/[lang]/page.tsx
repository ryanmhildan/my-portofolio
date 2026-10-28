import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LiquidSurfaces } from "@/components/LiquidSurfaces";
import { About, Contact, Experience } from "@/components/Sections";
import { Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Header />
      <LiquidSurfaces />
      <main id="isi" className="pb-20 sm:pb-0">
        <Hero />
        <Work />
        <Experience />
        <About />
        <Contact />
      </main>
    </>
  );
}

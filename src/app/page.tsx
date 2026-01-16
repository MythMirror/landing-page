import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Mission } from "@/components/sections/Mission";
import { Origin } from "@/components/sections/Origins";
import { Team } from "@/components/sections/Team";
import { Roadmap } from "@/components/sections/Roadmap";
import { Contact } from "@/components/sections/Contact";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid";
import { ConstellationInteraction } from "@/components/3d/ConstellationInteraction";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative selection:bg-primary/30">
      {/* Fundo Base*/}
      <BackgroundGrid className="z-0 fixed inset-0" />

      {/* Partículas */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <ConstellationInteraction />
      </div>

      {/* Conteúdo do Site */}
      <div className="relative z-10 flex flex-col w-full">
        <Header />
        <Hero />
        <Ecosystem />
        <Mission />
        <Origin />
        <Team />
        <Roadmap />
        <Contact />
      </div>
    </main>
  );
}

"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid";
import { Hero } from "@/components/sections/Hero";

// Constellation: fundo global, carregado de forma não-bloqueante
const ConstellationInteraction = dynamic(
  () =>
    import("@/components/3d/ConstellationInteraction").then(
      (m) => m.ConstellationInteraction,
    ),
  { ssr: false },
);

// Seções: carregadas após o loader sumir (lazy)
const Ecosystem = dynamic(() =>
  import("@/components/sections/Ecosystem").then((m) => m.Ecosystem),
);
const Mission = dynamic(() =>
  import("@/components/sections/Mission").then((m) => m.Mission),
);
const Origin = dynamic(() =>
  import("@/components/sections/Origins").then((m) => m.Origin),
);
const Team = dynamic(() =>
  import("@/components/sections/Team").then((m) => m.Team),
);
const Roadmap = dynamic(() =>
  import("@/components/sections/Roadmap").then((m) => m.Roadmap),
);
const Contact = dynamic(() =>
  import("@/components/sections/Contact").then((m) => m.Contact),
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Camada base — grid CSS, sem JS */}
      <BackgroundGrid className="fixed inset-0 z-0 pointer-events-none" />

      {/* Estrelas 3D — fundo global, baixa prioridade */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <Suspense fallback={null}>
          <ConstellationInteraction />
        </Suspense>
      </div>

      {/* Conteúdo */}
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

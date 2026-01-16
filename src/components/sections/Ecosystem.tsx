"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, type Variants } from "framer-motion";
import {
  BookOpen,
  Coins,
  Music,
  Scale,
  HeartPulse,
  ScrollText,
  Fingerprint,
} from "lucide-react";
import { AppCard } from "@/components/ui/AppCard";
import { MythCore3D } from "../3d/MythCore";

export function Ecosystem() {
  const { t } = useLanguage();

  const containerVars: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 60,
      },
    },
  };

  return (
    <section
      id="ecosystem"
      className="relative py-16 md:py-32 overflow-hidden w-full"
    >
      {/* Glow Central no Fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center max-w-2xl mb-12 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary"
          >
            {t.ecosystem.section_badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4"
          >
            {t.ecosystem.title}
          </motion.h2>
          <p className="text-muted-foreground text-lg">
            {t.ecosystem.description}
          </p>
        </div>

        {/* Layout Orbital */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center"
        >
          {/* Pilar 1 */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            <div className="text-center lg:text-right mb-2">
              <span className="text-xs font-semibold uppercase text-blue-500 tracking-widest">
                {t.ecosystem.pillars.learn}
              </span>
            </div>

            <motion.div variants={itemVars}>
              <AppCard
                name={t.ecosystem.apps.athens.name}
                tagline={t.ecosystem.apps.athens.tagline}
                description={t.ecosystem.apps.athens.description}
                icon={BookOpen}
                color="#3b82f6"
                className="lg:translate-x-4 border-l-4 border-l-blue-500/50"
              />
            </motion.div>

            <motion.div variants={itemVars}>
              <AppCard
                name={t.ecosystem.apps.midas.name}
                tagline={t.ecosystem.apps.midas.tagline}
                description={t.ecosystem.apps.midas.description}
                icon={Coins}
                color="#eab308"
                className="lg:mr-8 border-l-4 border-l-yellow-500/50"
              />
            </motion.div>

            <motion.div variants={itemVars}>
              <AppCard
                name={t.ecosystem.apps.clio.name}
                tagline={t.ecosystem.apps.clio.tagline}
                description={t.ecosystem.apps.clio.description}
                icon={ScrollText}
                color="#a855f7"
                className="lg:translate-x-4 border-l-4 border-l-purple-500/50"
              />
            </motion.div>
          </div>

          {/* Centro */}
          <motion.div
            variants={itemVars}
            className="order-1 lg:order-2 flex flex-col items-center justify-center relative py-6 lg:py-0"
          >
            {/* Linhas de Conexão */}
            <div className="absolute inset-0 pointer-events-none hidden md:block lg:block">
              <svg className="w-full h-full" viewBox="0 0 400 600" fill="none">
                <path
                  d="M0 100 C 100 100, 100 300, 200 300"
                  stroke="url(#gradLeft)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-30"
                />
                <path
                  d="M0 300 C 50 300, 100 300, 200 300"
                  stroke="url(#gradLeft)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-30"
                />
                <path
                  d="M0 500 C 100 500, 100 300, 200 300"
                  stroke="url(#gradLeft)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-30"
                />
                <path
                  d="M400 150 C 300 150, 300 300, 200 300"
                  stroke="url(#gradRight)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-30"
                />
                <path
                  d="M400 300 C 350 300, 300 300, 200 300"
                  stroke="url(#gradRight)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-30"
                />
                <path
                  d="M400 450 C 300 450, 300 300, 200 300"
                  stroke="url(#gradRight)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-30"
                />
                <defs>
                  <linearGradient
                    id="gradLeft"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0.5"
                    />
                  </linearGradient>
                  <linearGradient
                    id="gradRight"
                    x1="100%"
                    y1="0%"
                    x2="0%"
                    y2="0%"
                  >
                    <stop
                      offset="0%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0.5"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Núcleo 3D */}
            <div className="absolute inset-0 z-0">
              <MythCore3D />
            </div>

            {/* Texto Flutuando SOBRE o 3D */}
            <div className="relative z-10 mt-6 md:mt-32 p-4 rounded-xl bg-background/80 backdrop-blur-md border border-white/10 text-center shadow-2xl">
              <Fingerprint className="w-8 h-8 text-primary mx-auto mb-2 opacity-80" />
              <h3 className="text-2xl font-bold text-foreground drop-shadow-lg">
                {t.ecosystem.center_card.title}
              </h3>
              <p className="text-xs text-primary uppercase tracking-widest font-bold drop-shadow-md">
                {t.ecosystem.center_card.subtitle}
              </p>

              {/* Texto Dinâmico */}
              <div className="mt-4 text-xs text-muted-foreground font-medium max-w-[200px] flex flex-col gap-1">
                <span>{t.ecosystem.center_card.features.gamification}</span>
                <span className="w-full h-[1px] bg-border/50" />
                <span>{t.ecosystem.center_card.features.security}</span>
                <span className="w-full h-[1px] bg-border/50" />
                <span>{t.ecosystem.center_card.features.progress}</span>
              </div>
            </div>
          </motion.div>

          {/* Pilares 2 e 3 */}
          <div className="flex flex-col gap-6 order-3">
            <div className="text-center lg:text-left mb-2 flex justify-between px-4">
              <span className="text-xs font-semibold uppercase text-green-500 tracking-widest">
                {t.ecosystem.pillars.act}
              </span>
              <span className="text-xs font-semibold uppercase text-pink-500 tracking-widest">
                {t.ecosystem.pillars.connect}
              </span>
            </div>

            <motion.div variants={itemVars}>
              <AppCard
                name={t.ecosystem.apps.asclepius.name}
                tagline={t.ecosystem.apps.asclepius.tagline}
                description={t.ecosystem.apps.asclepius.description}
                icon={HeartPulse}
                color="#22c55e"
                className="lg:-translate-x-4 border-r-4 border-r-green-500/50 text-right items-end"
              />
            </motion.div>

            <motion.div variants={itemVars}>
              <AppCard
                name={t.ecosystem.apps.themis.name}
                tagline={t.ecosystem.apps.themis.tagline}
                description={t.ecosystem.apps.themis.description}
                icon={Scale}
                color="#ef4444"
                className="lg:ml-8 border-r-4 border-r-red-500/50 text-right items-end"
              />
            </motion.div>

            <motion.div variants={itemVars}>
              <AppCard
                name={t.ecosystem.apps.orpheus.name}
                tagline={t.ecosystem.apps.orpheus.tagline}
                description={t.ecosystem.apps.orpheus.description}
                icon={Music}
                color="#d946ef"
                className="lg:-translate-x-4 border-r-4 border-r-pink-500/50 text-right items-end"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

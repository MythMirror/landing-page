"use client";

import dynamic from "next/dynamic";
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

const MythCore3D = dynamic(
  () => import("../3d/MythCore").then((m) => m.MythCore3D),
  { ssr: false },
);

// Outside component — stable references, no re-allocation per render
const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};
const itemVars: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 65, damping: 16 },
  },
};

export function Ecosystem() {
  const { t } = useLanguage();

  return (
    <section
      id="ecosystem"
      className="relative py-24 md:py-32 overflow-hidden w-full"
    >
      {/* Central glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,color-mix(in srgb,var(--color-primary) 9%,transparent),transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mb-14 md:mb-20"
        >
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">
            {t.ecosystem.section_badge}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            {t.ecosystem.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.ecosystem.description}
          </p>
        </motion.div>

        {/* Orbital grid */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-center"
        >
          {/* Left pillar */}
          <div className="flex flex-col gap-5 order-2 lg:order-1">
            <div className="text-center lg:text-right mb-1">
              <span className="text-xs font-semibold uppercase text-blue-500 tracking-widest">
                {t.ecosystem.pillars.learn}
              </span>
            </div>
            {[
              {
                app: t.ecosystem.apps.athens,
                icon: BookOpen,
                color: "#3b82f6",
                cls: "lg:translate-x-4 border-l-4 border-l-blue-500/50",
              },
              {
                app: t.ecosystem.apps.midas,
                icon: Coins,
                color: "#eab308",
                cls: "lg:mr-8 border-l-4 border-l-yellow-500/50",
              },
              {
                app: t.ecosystem.apps.clio,
                icon: ScrollText,
                color: "#a855f7",
                cls: "lg:translate-x-4 border-l-4 border-l-purple-500/50",
              },
            ].map(({ app, icon, color, cls }) => (
              <motion.div key={app.name} variants={itemVars}>
                <AppCard
                  name={app.name}
                  tagline={app.tagline}
                  description={app.description}
                  icon={icon}
                  color={color}
                  className={cls}
                />
              </motion.div>
            ))}
          </div>

          {/* Center */}
          <motion.div
            variants={itemVars}
            className="order-1 lg:order-2 flex flex-col items-center justify-center relative py-6 lg:py-0"
          >
            {/* SVG connectors */}
            <div className="absolute inset-0 pointer-events-none hidden lg:block">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 600"
                fill="none"
                aria-hidden="true"
              >
                {[100, 300, 500].map((y, i) => (
                  <path
                    key={`l${i}`}
                    d={`M0 ${y} C100 ${y},100 300,200 300`}
                    stroke="url(#gL)"
                    strokeWidth="1"
                    strokeDasharray="5 4"
                    opacity="0.22"
                  />
                ))}
                {[150, 300, 450].map((y, i) => (
                  <path
                    key={`r${i}`}
                    d={`M400 ${y} C300 ${y},300 300,200 300`}
                    stroke="url(#gR)"
                    strokeWidth="1"
                    strokeDasharray="5 4"
                    opacity="0.22"
                  />
                ))}
                <defs>
                  <linearGradient id="gL" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop
                      offset="0%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0.55"
                    />
                  </linearGradient>
                  <linearGradient id="gR" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop
                      offset="0%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0"
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--color-primary)"
                      stopOpacity="0.55"
                    />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute inset-0 z-0">
              <MythCore3D />
            </div>
            <div
              className="relative z-10 mt-6 md:mt-36 p-5 rounded-2xl text-center shadow-2xl"
              style={{
                background:
                  "color-mix(in srgb,var(--background) 85%,transparent)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <Fingerprint className="w-8 h-8 text-primary mx-auto mb-2 opacity-75" />
              <h3 className="text-xl font-bold text-foreground">
                {t.ecosystem.center_card.title}
              </h3>
              <p className="text-xs text-primary uppercase tracking-widest font-bold mt-0.5">
                {t.ecosystem.center_card.subtitle}
              </p>
              <div className="mt-4 text-xs text-muted-foreground font-medium max-w-[200px] flex flex-col gap-1.5">
                {[
                  t.ecosystem.center_card.features.gamification,
                  t.ecosystem.center_card.features.security,
                  t.ecosystem.center_card.features.progress,
                ].map((f, i, arr) => (
                  <span
                    key={f}
                    className={
                      i < arr.length - 1
                        ? "pb-1.5 border-b border-border/40"
                        : ""
                    }
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right pillar */}
          <div className="flex flex-col gap-5 order-3">
            <div className="text-center lg:text-left mb-1 flex justify-between px-2">
              <span className="text-xs font-semibold uppercase text-green-500 tracking-widest">
                {t.ecosystem.pillars.act}
              </span>
              <span className="text-xs font-semibold uppercase text-pink-500 tracking-widest">
                {t.ecosystem.pillars.connect}
              </span>
            </div>
            {[
              {
                app: t.ecosystem.apps.asclepius,
                icon: HeartPulse,
                color: "#22c55e",
                cls: "lg:-translate-x-4 border-r-4 border-r-green-500/50 text-right items-end",
              },
              {
                app: t.ecosystem.apps.themis,
                icon: Scale,
                color: "#ef4444",
                cls: "lg:ml-8 border-r-4 border-r-red-500/50 text-right items-end",
              },
              {
                app: t.ecosystem.apps.orpheus,
                icon: Music,
                color: "#d946ef",
                cls: "lg:-translate-x-4 border-r-4 border-r-pink-500/50 text-right items-end",
              },
            ].map(({ app, icon, color, cls }) => (
              <motion.div key={app.name} variants={itemVars}>
                <AppCard
                  name={app.name}
                  tagline={app.tagline}
                  description={app.description}
                  icon={icon}
                  color={color}
                  className={cls}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

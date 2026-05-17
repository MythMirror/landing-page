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

const containerVars: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};
const itemVars: Variants = {
  hidden: { opacity: 0, scale: 0.93, y: 12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 65, damping: 16 },
  },
};

export function Ecosystem() {
  const { t } = useLanguage();

  const leftApps = [
    {
      app: t.ecosystem.apps.athens,
      icon: BookOpen,
      color: "#3b82f6",
      cls: "lg:translate-x-3 border-l-[3px] border-l-blue-500/50",
    },
    {
      app: t.ecosystem.apps.midas,
      icon: Coins,
      color: "#eab308",
      cls: "lg:mr-6 border-l-[3px] border-l-yellow-500/50",
    },
    {
      app: t.ecosystem.apps.clio,
      icon: ScrollText,
      color: "#a855f7",
      cls: "lg:translate-x-3 border-l-[3px] border-l-purple-500/50",
    },
  ];
  const rightApps = [
    {
      app: t.ecosystem.apps.asclepius,
      icon: HeartPulse,
      color: "#22c55e",
      cls: "lg:-translate-x-3 border-r-[3px] border-r-green-500/50 text-right items-end",
    },
    {
      app: t.ecosystem.apps.themis,
      icon: Scale,
      color: "#ef4444",
      cls: "lg:ml-6 border-r-[3px] border-r-red-500/50 text-right items-end",
    },
    {
      app: t.ecosystem.apps.orpheus,
      icon: Music,
      color: "#d946ef",
      cls: "lg:-translate-x-3 border-r-[3px] border-r-pink-500/50 text-right items-end",
    },
  ];

  return (
    <section
      id="ecosystem"
      className="relative py-20 sm:py-28 md:py-36 overflow-hidden w-full"
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(60vw,700px)] h-[min(60vw,700px)] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,color-mix(in srgb,var(--color-primary) 8%,transparent),transparent 65%)",
          filter: "blur(80px)",
        }}
      />

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mb-12 sm:mb-16 md:mb-20"
        >
          <span className="mb-3 inline-block text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-primary">
            {t.ecosystem.section_badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter text-foreground mb-3 sm:mb-4">
            {t.ecosystem.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            {t.ecosystem.description}
          </p>
        </motion.div>

        {/* ── Mobile: single column stack ── lg: 3-col orbital ── */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="w-full max-w-6xl 2xl:max-w-7xl"
        >
          {/* Mobile layout */}
          <div className="lg:hidden flex flex-col gap-4">
            {/* Pillar labels */}
            <div className="flex justify-between px-1 mb-1">
              <span className="text-[10px] font-bold uppercase text-blue-500 tracking-widest">
                {t.ecosystem.pillars.learn}
              </span>
              <span className="text-[10px] font-bold uppercase text-green-500 tracking-widest">
                {t.ecosystem.pillars.act}
              </span>
            </div>

            {/* Apps in 2-col grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[...leftApps, ...rightApps].map(({ app, icon, color }) => (
                <motion.div key={app.name} variants={itemVars}>
                  <AppCard
                    name={app.name}
                    tagline={app.tagline}
                    description={app.description}
                    icon={icon}
                    color={color}
                  />
                </motion.div>
              ))}
            </div>

            {/* MythCore card — full width on mobile */}
            <motion.div
              variants={itemVars}
              className="mt-2 p-5 sm:p-6 rounded-2xl text-center"
              style={{
                background:
                  "color-mix(in srgb,var(--background) 80%,transparent)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(167,139,250,0.15)",
              }}
            >
              <Fingerprint className="w-7 h-7 text-primary mx-auto mb-2 opacity-75" />
              <h3 className="text-lg font-bold text-foreground">
                {t.ecosystem.center_card.title}
              </h3>
              <p className="text-[10px] text-primary uppercase tracking-widest font-bold mt-0.5">
                {t.ecosystem.center_card.subtitle}
              </p>
              <div className="mt-3 text-xs text-muted-foreground font-medium flex flex-col gap-1.5 max-w-[220px] mx-auto">
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
            </motion.div>
          </div>

          {/* Desktop layout — 3-col orbital */}
          <div className="hidden lg:grid grid-cols-3 gap-8 xl:gap-12 items-center">
            {/* Left pillar */}
            <div className="flex flex-col gap-4 xl:gap-5">
              <div className="text-right mb-1">
                <span className="text-[10px] font-semibold uppercase text-blue-500 tracking-widest">
                  {t.ecosystem.pillars.learn}
                </span>
              </div>
              {leftApps.map(({ app, icon, color, cls }) => (
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
              className="flex flex-col items-center justify-center relative py-0"
            >
              {/* SVG connectors */}
              <div className="absolute inset-0 pointer-events-none">
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
                      opacity="0.2"
                    />
                  ))}
                  {[150, 300, 450].map((y, i) => (
                    <path
                      key={`r${i}`}
                      d={`M400 ${y} C300 ${y},300 300,200 300`}
                      stroke="url(#gR)"
                      strokeWidth="1"
                      strokeDasharray="5 4"
                      opacity="0.2"
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
                        stopOpacity="0.5"
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
                        stopOpacity="0.5"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="absolute inset-0 z-0">
                <MythCore3D />
              </div>
              <div
                className="relative z-10 mt-36 xl:mt-40 p-5 rounded-2xl text-center shadow-2xl"
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
                <p className="text-[10px] text-primary uppercase tracking-widest font-bold mt-0.5">
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
            <div className="flex flex-col gap-4 xl:gap-5">
              <div className="flex justify-between px-1 mb-1">
                <span className="text-[10px] font-semibold uppercase text-green-500 tracking-widest">
                  {t.ecosystem.pillars.act}
                </span>
                <span className="text-[10px] font-semibold uppercase text-pink-500 tracking-widest">
                  {t.ecosystem.pillars.connect}
                </span>
              </div>
              {rightApps.map(({ app, icon, color, cls }) => (
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}

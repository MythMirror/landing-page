"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  BrainCircuit,
  Dna,
  HeartHandshake,
  Lightbulb,
  LucideIcon,
} from "lucide-react";

const MissionDNA = dynamic(
  () => import("../3d/MissionDNA").then((m) => m.MissionDNA),
  { ssr: false },
);

function StatCard({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,rgba(167,139,250,0.08),rgba(232,121,249,0.05))",
        border: "1px solid rgba(167,139,250,0.14)",
        boxShadow: "0 4px 24px -8px rgba(91,33,182,0.15)",
      }}
    >
      <div
        className="absolute top-0 left-[20%] right-[20%] h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(167,139,250,0.4),transparent)",
        }}
      />
      <span
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold tabular-nums"
        style={{
          backgroundImage:
            "linear-gradient(135deg,var(--color-primary),#e879f9,#67e8f9)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </span>
      <span className="mt-2 text-xs sm:text-sm text-center text-muted-foreground font-medium leading-snug">
        {label}
      </span>
    </motion.div>
  );
}

function ValueRow({
  icon: Icon,
  title,
  desc,
  delay,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-transparent hover:border-primary/12 hover:bg-primary/4 transition-all duration-300"
    >
      <div className="p-2 sm:p-2.5 rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary/18 transition-colors">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <div>
        <h4 className="text-sm sm:text-base font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export function Mission() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y = useSpring(rawY, { stiffness: 50, damping: 18 });

  return (
    <section
      id="mission"
      ref={ref}
      className="relative py-20 sm:py-28 md:py-36 lg:py-44 overflow-hidden min-h-[80vh] flex items-center"
    >
      <MissionDNA />

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 xl:gap-28 items-center">
          {/* Left — text */}
          <motion.div style={{ y }} className="flex flex-col gap-6 sm:gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/25 bg-primary/8 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest mb-4 sm:mb-5"
              >
                <Dna className="h-3 w-3 sm:h-3.5 sm:w-3.5 animate-pulse" />
                {t.mission.badge}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="font-bold tracking-tighter text-foreground mb-5 leading-none"
                style={{ fontSize: "clamp(2rem,5vw,4rem)" }}
              >
                {t.mission.title}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="relative pl-5 sm:pl-6"
              >
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(180deg,var(--color-primary),#e879f9)",
                  }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                />
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t.mission.description}
                </p>
              </motion.div>
            </div>

            <div className="flex flex-col gap-0.5 sm:gap-1">
              <ValueRow
                icon={Lightbulb}
                title={t.mission.values.innovation.title}
                desc={t.mission.values.innovation.desc}
                delay={0.2}
              />
              <ValueRow
                icon={BrainCircuit}
                title={t.mission.values.impact.title}
                desc={t.mission.values.impact.desc}
                delay={0.35}
              />
              <ValueRow
                icon={HeartHandshake}
                title={t.mission.values.connection.title}
                desc={t.mission.values.connection.desc}
                delay={0.5}
              />
            </div>
          </motion.div>

          {/* Right — stats */}
          <div className="relative">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 pointer-events-none rounded-full"
              style={{
                background:
                  "radial-gradient(circle,rgba(232,121,249,0.1),transparent 65%)",
                filter: "blur(40px)",
              }}
            />

            {/* Mobile: horizontal scroll row / sm+: 2-col staggered */}
            <div className="relative z-10 grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
              <div className="sm:translate-y-6 md:translate-y-8">
                <StatCard
                  value={t.mission.stats.education.value}
                  label={t.mission.stats.education.label}
                  delay={0.1}
                />
              </div>
              <div>
                <StatCard
                  value={t.mission.stats.debt.value}
                  label={t.mission.stats.debt.label}
                  delay={0.25}
                />
              </div>
              <div className="col-span-2 sm:col-span-2 w-full max-w-[240px] mx-auto sm:translate-y-6 md:translate-y-8">
                <StatCard
                  value={t.mission.stats.mental.value}
                  label={t.mission.stats.mental.label}
                  delay={0.4}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

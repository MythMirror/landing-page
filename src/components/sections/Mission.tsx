"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
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

// Componente de Card de Estatística
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
    >
      <span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-b from-primary to-accent bg-clip-text text-transparent">
        {value}
      </span>
      <span className="mt-2 text-sm text-center text-muted-foreground font-medium">
        {label}
      </span>
    </motion.div>
  );
}

// Componente de Valor
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
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
    >
      <div className="p-3 rounded-lg bg-primary/10 text-primary">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className="text-lg font-bold text-foreground mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}

export function Mission() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="mission"
      ref={containerRef}
      className="relative py-32 overflow-hidden min-h-screen flex items-center"
    >
      {/* Background 3D */}
      <MissionDNA />

      {/* Conteúdo */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Narrativa */}
          <motion.div style={{ y }} className="flex flex-col gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className={cn(
                  "inline-flex items-center gap-2",
                  "px-3 py-1 rounded-full",
                  "border border-primary/30 bg-primary/10",
                  "text-xs font-bold text-primary uppercase tracking-widest",
                  "mb-4",
                )}
              >
                <Dna className="h-3.5 w-3.5 animate-pulse" />
                {t.mission.badge}
              </motion.span>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-6">
                {t.mission.title}
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/50 pl-6">
                {t.mission.description}
              </p>
            </div>

            <div className="flex flex-col gap-2 mt-4">
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
                delay={0.4}
              />
              <ValueRow
                icon={HeartHandshake}
                title={t.mission.values.connection.title}
                desc={t.mission.values.connection.desc}
                delay={0.6}
              />
            </div>
          </motion.div>

          {/* Estatísticas */}
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
              <div className="sm:translate-y-12">
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
                  delay={0.3}
                />
              </div>
              <div className="sm:translate-y-12 sm:col-span-2 sm:w-2/3 sm:mx-auto">
                <StatCard
                  value={t.mission.stats.mental.value}
                  label={t.mission.stats.mental.label}
                  delay={0.5}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

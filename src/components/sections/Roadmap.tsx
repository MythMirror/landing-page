"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { CalendarDays, Rocket } from "lucide-react";
import { WarpTunnel } from "../3d/WarpTunnel";

// Componente do Card de Milestone
interface MilestoneProps {
  phase: string;
  title: string;
  desc: string;
  index: number;
  isLast?: boolean;
}

function MilestoneCard({ phase, title, desc, index, isLast }: MilestoneProps) {
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "relative flex items-center justify-between w-full mb-24 last:mb-0",
        isEven ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Card de Conteúdo */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ margin: "-20% 0px -20% 0px" }}
        transition={{ duration: 0.6, type: "spring" }}
        className={cn(
          "w-5/12 p-6 rounded-2xl border backdrop-blur-xl shadow-lg transition-colors group",
          "bg-white/80 border-slate-200 dark:bg-white/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/10",
          isLast
            ? "border-primary/50 bg-primary/5 shadow-[0_0_30px_-5px_var(--color-primary)]"
            : ""
        )}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-primary/80 mb-2 block">
          {phase}
        </span>
        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </motion.div>

      {/* Nó Central */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{
            scale: 1.2,
          }}
          viewport={{ margin: "-50% 0px -50% 0px" }}
          transition={{ duration: 0.4 }}
          className={cn(
            "w-6 h-6 rounded-full border-4 z-20 shadow-md",
            "border-white bg-slate-800 dark:border-slate-950 dark:bg-slate-200",
            isLast
              ? "animate-pulse shadow-[0_0_20px_var(--color-primary)] bg-primary border-primary"
              : ""
          )}
        >
          {isLast && (
            <Rocket className="w-3 h-3 text-white absolute -top-8 left-1/2 -translate-x-1/2" />
          )}
        </motion.div>
      </div>

      {/* Espaço para Alinhamento */}
      <div className="w-5/12" />
    </div>
  );
}

export function Roadmap() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Controle da Barra de Progresso Central
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const steps = [
    t.roadmap.steps.q1,
    t.roadmap.steps.q2,
    t.roadmap.steps.q3,
    t.roadmap.steps.q4,
    t.roadmap.steps.future,
  ];

  return (
    <section
      id="roadmap"
      ref={containerRef}
      className="relative border-t-1 border-border/70 py-32 overflow-hidden min-h-[150vh]"
    >
      {/* Background Warp*/}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
        <WarpTunnel />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-accent/50 bg-accent/10 text-xs font-bold text-accent uppercase tracking-widest backdrop-blur-md"
          >
            <CalendarDays className="w-4 h-4" />
            {t.roadmap.badge}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground drop-shadow-sm mb-6"
          >
            {t.roadmap.title}
          </motion.h2>

          <p className="text-lg text-muted-foreground">
            {t.roadmap.description}
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative max-w-5xl mx-auto">
          {/* A Linha Central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/10 -translate-x-1/2 rounded-full" />

          {/* A Linha de Luz (Progresso Ativo) */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-primary via-accent to-cyan-400 -translate-x-1/2 rounded-full shadow-[0_0_20px_var(--color-primary)] z-10"
          />

          {/* Os Steps */}
          <div className="relative z-20 pt-10 pb-32">
            {steps.map((step, index) => (
              <MilestoneCard
                key={index}
                index={index}
                phase={step.phase}
                title={step.title}
                desc={step.desc}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

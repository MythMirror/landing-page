"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { CalendarDays, Rocket } from "lucide-react";
import { WarpTunnel } from "../3d/WarpTunnel";

// Interface
interface MilestoneProps {
  phase: string;
  title: string;
  desc: string;
  index: number;
  isLast?: boolean;
}

function MilestoneCard({ phase, title, desc, index, isLast }: MilestoneProps) {
  // isEven só importa no Desktop (md). No mobile, todos alinham à direita.
  const isEven = index % 2 === 0;

  return (
    <div
      className={cn(
        "relative flex w-full mb-12 md:mb-24 last:mb-0",
        // MOBILE: Sempre flex-row (linha na esquerda, conteúdo na direita)
        // DESKTOP: Alterna reverso/normal
        "justify-start md:justify-between",
        isEven ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      {/* CARD DE CONTEÚDO 
         Mobile: w-full (com padding left para não bater na linha)
         Desktop: w-5/12 (41%)
      */}
      <motion.div
        initial={{ opacity: 0, x: 0, y: 50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.6, type: "spring" }}
        className={cn(
          "relative ml-12 md:ml-0 w-full md:w-5/12 p-5 md:p-6 rounded-2xl border backdrop-blur-xl shadow-lg transition-colors group",
          "bg-white/80 border-slate-200 dark:bg-white/5 dark:border-white/10 hover:bg-white dark:hover:bg-white/10",
          isLast
            ? "border-primary/50 bg-primary/5 shadow-[0_0_30px_-5px_var(--color-primary)]"
            : "",
        )}
      >
        {/* Badge da Fase - Fonte reduzida no mobile */}
        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-primary/80 mb-2 block">
          {phase}
        </span>

        {/* Título - Ajustado para não quebrar: text-lg no mobile -> text-2xl no desktop */}
        <h3 className="text-lg md:text-2xl font-bold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>

        {/* Descrição - Fonte menor e melhor espaçamento */}
        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </motion.div>

      {/* NÓ CENTRAL (BOLINHA)
         Mobile: Fixo na esquerda (left-4)
         Desktop: Fixo no centro (left-1/2)
      */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center h-full top-0">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1.2 }}
          viewport={{ margin: "-50% 0px -50% 0px" }}
          transition={{ duration: 0.4 }}
          className={cn(
            "w-4 h-4 md:w-6 md:h-6 rounded-full border-[3px] md:border-4 z-20 shadow-md",
            "border-white bg-slate-800 dark:border-slate-950 dark:bg-slate-200",
            isLast
              ? "animate-pulse shadow-[0_0_20px_var(--color-primary)] bg-primary border-primary"
              : "",
          )}
        >
          {isLast && (
            <Rocket className="w-3 h-3 text-white absolute -top-6 md:-top-8 left-1/2 -translate-x-1/2" />
          )}
        </motion.div>
      </div>

      {/* ESPAÇADOR (Só existe no Desktop para empurrar o layout)
       */}
      <div className="hidden md:block w-5/12" />
    </div>
  );
}

export function Roadmap() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

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
      className="relative border-t border-border/70 py-20 md:py-32 overflow-hidden min-h-[120vh]"
    >
      {/* Background Warp */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10" />
        <WarpTunnel />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        {/* Header da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
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
            className="text-3xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/80 to-muted-foreground drop-shadow-sm mb-4 md:mb-6"
          >
            {t.roadmap.title}
          </motion.h2>

          <p className="text-base md:text-lg text-muted-foreground px-4">
            {t.roadmap.description}
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative max-w-5xl mx-auto">
          {/* A Linha Central (Cinza) 
              Mobile: left-4 (canto esquerdo)
              Desktop: left-1/2 (centro)
          */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/10 -translate-x-1/2 rounded-full transition-all duration-500" />

          {/* A Linha de Luz (Progresso Ativo) */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-primary via-accent to-cyan-400 -translate-x-1/2 rounded-full shadow-[0_0_20px_var(--color-primary)] z-10"
          />

          {/* Os Steps */}
          <div className="relative z-20 pt-4 md:pt-10 pb-32">
            {steps.map((step, index) => (
              <MilestoneCard
                key={`milestone-${index}`}
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

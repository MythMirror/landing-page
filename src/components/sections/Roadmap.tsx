"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { CalendarDays, Rocket, CheckCircle2, Clock } from "lucide-react";
import { WarpTunnel } from "../3d/WarpTunnel";

interface MilestoneProps {
  phase: string;
  title: string;
  desc: string;
  index: number;
  isLast?: boolean;
}

const PHASE_STYLES = [
  {
    icon: CheckCircle2,
    line: "#22c55e",
    glow: "rgba(34,197,94,0.28)",
    dot: "#22c55e",
  },
  {
    icon: CheckCircle2,
    line: "#22c55e",
    glow: "rgba(34,197,94,0.28)",
    dot: "#22c55e",
  },
  {
    icon: Clock,
    line: "#f59e0b",
    glow: "rgba(245,158,11,0.28)",
    dot: "#f59e0b",
  },
  {
    icon: Clock,
    line: "#a78bfa",
    glow: "rgba(167,139,250,0.28)",
    dot: "#a78bfa",
  },
  {
    icon: Rocket,
    line: "#e879f9",
    glow: "rgba(232,121,249,0.45)",
    dot: "#e879f9",
  },
];

const cardVars: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, type: "spring", stiffness: 60, damping: 18 },
  },
};

function MilestoneCard({ phase, title, desc, index, isLast }: MilestoneProps) {
  const isEven = index % 2 === 0;
  const style = PHASE_STYLES[index] ?? PHASE_STYLES[3];
  const PhaseIcon = style.icon;

  return (
    <div
      className={cn(
        "relative flex w-full mb-10 sm:mb-16 md:mb-24 last:mb-0",
        "justify-start md:justify-between",
        isEven ? "md:flex-row-reverse" : "md:flex-row",
      )}
    >
      {/* Card */}
      <motion.div
        variants={cardVars}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
        className="group relative ml-10 sm:ml-12 md:ml-0 w-full md:w-[46%] rounded-xl sm:rounded-2xl overflow-hidden transition-[transform] duration-300 hover:-translate-y-1"
        style={{
          background: isLast
            ? "linear-gradient(135deg,rgba(232,121,249,0.09),rgba(167,139,250,0.07))"
            : "linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))",
          border: `1px solid ${isLast ? "rgba(232,121,249,0.28)" : "rgba(255,255,255,0.08)"}`,
          backdropFilter: "blur(14px)",
          boxShadow: isLast
            ? `0 0 40px -10px ${style.glow}`
            : "0 4px 20px -6px rgba(0,0,0,0.15)",
          padding: "clamp(1rem,2.5vw,1.5rem)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl"
          style={{
            background: `linear-gradient(90deg,transparent,${style.line}70,transparent)`,
          }}
        />

        <div className="flex items-center gap-1.5 mb-2 sm:mb-3">
          <PhaseIcon
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
            style={{ color: style.line }}
          />
          <span
            className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest"
            style={{ color: style.line }}
          >
            {phase}
          </span>
        </div>
        <h3
          className="font-bold text-foreground mb-1.5 sm:mb-2 group-hover:text-primary transition-colors duration-200 leading-tight"
          style={{ fontSize: "clamp(0.95rem,2.2vw,1.35rem)" }}
        >
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {desc}
        </p>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%,${style.glow},transparent 65%)`,
          }}
        />
      </motion.div>

      {/* Timeline node */}
      <div className="absolute left-3.5 sm:left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center h-full top-0 z-20 pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-45% 0px -45% 0px" }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full"
          style={{
            background: style.dot,
            border: `2px solid color-mix(in srgb,${style.dot} 28%,var(--background))`,
            boxShadow: `0 0 14px -2px ${style.glow},0 0 0 3px color-mix(in srgb,${style.dot} 10%,transparent)`,
          }}
        >
          {isLast && (
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-35"
              style={{ background: style.dot }}
            />
          )}
        </motion.div>
      </div>

      <div className="hidden md:block w-[46%]" />
    </div>
  );
}

export function Roadmap() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 26,
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
      ref={ref}
      className="relative border-t border-border/40 py-16 sm:py-24 md:py-32 overflow-hidden min-h-[100vh]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10 pointer-events-none" />
        <WarpTunnel />
      </div>

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-24"
        >
          <span
            className="inline-flex items-center gap-2 mb-4 sm:mb-5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-accent uppercase tracking-widest"
            style={{
              background: "rgba(124,58,237,0.1)",
              border: "1px solid rgba(124,58,237,0.28)",
            }}
          >
            <CalendarDays className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            {t.roadmap.badge}
          </span>

          <h2
            className="font-black tracking-tighter mb-4 leading-none"
            style={{
              fontSize: "clamp(1.85rem,6vw,5rem)",
              backgroundImage:
                "linear-gradient(135deg,var(--color-foreground),rgba(167,139,250,0.75),var(--color-muted-foreground))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t.roadmap.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            {t.roadmap.description}
          </p>

          {/* Status legend */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 flex-wrap">
            {[
              { color: "#22c55e", label: "Concluído" },
              { color: "#f59e0b", label: "Em andamento" },
              { color: "#e879f9", label: "Próximo" },
            ].map(({ color, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-[10px] sm:text-xs text-muted-foreground"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: color, boxShadow: `0 0 5px ${color}` }}
                />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl 2xl:max-w-6xl mx-auto">
          {/* Track */}
          <div
            className="absolute left-3.5 sm:left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full"
            style={{ background: "rgba(167,139,250,0.1)" }}
          />
          {/* Progress */}
          <motion.div
            style={{
              scaleY,
              transformOrigin: "top",
              background:
                "linear-gradient(180deg,#22c55e 0%,#f59e0b 40%,#a78bfa 70%,#e879f9 100%)",
              boxShadow: "0 0 10px rgba(167,139,250,0.5)",
            }}
            className="absolute left-3.5 sm:left-4 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full z-10"
          />

          <div className="relative z-20 pt-3 sm:pt-4 md:pt-8 pb-20 sm:pb-28">
            {steps.map((step, i) => (
              <MilestoneCard
                key={i}
                index={i}
                phase={step.phase}
                title={step.title}
                desc={step.desc}
                isLast={i === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

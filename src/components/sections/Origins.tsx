"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Zap, Link2, MonitorSmartphone, Flame, LucideIcon } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { OriginsPortal } from "../3d/OriginsPortal";

// Variantes para garantir estado inicial limpo e "invisível"
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95, // Leve scale down para dar um "pop" ao aparecer
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.2, // Stagger manual baseado no index
      type: "spring",
      bounce: 0.3,
      damping: 20, // Suaviza o spring para não oscilar demais
    },
  }),
};

const Card = ({
  title,
  desc,
  icon: Icon,
  index,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
  index: number;
}) => {
  return (
    <motion.div
      // Usando variantes para controle absoluto do estado
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      custom={index} // Passa o index para o cálculo do delay
      viewport={{ once: true, amount: 0.3, margin: "0px 0px -50px 0px" }}
      // REMOVIDO: "transition-all duration-500". Isso causava o conflito.
      // Mantivemos apenas as transições de hover específicas.
      className="relative group p-8 rounded-3xl border border-white/10 bg-background/40 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      {/* Background Hover Effect - Controlado via CSS puro para performance */}
      <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Gradient Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

export function Origin() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      id="origin"
      className="relative border-y border-border/70 py-32 md:py-48 overflow-hidden min-h-[110vh] flex items-center justify-center"
    >
      {/* Background 3D */}
      <div className="absolute inset-0 z-0 opacity-80">
        <OriginsPortal />
      </div>

      {/* Divisores de Transição */}
      <SectionDivider position="top" />
      <SectionDivider position="bottom" />

      <div className="container px-4 md:px-6 relative z-10">
        {/* Cabeçalho */}
        <motion.div
          style={{ y: yText }}
          className="text-center max-w-3xl mx-auto mb-24 md:mb-32"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-accent/50 bg-accent/10 text-xs font-bold text-primary uppercase tracking-widest backdrop-blur-md"
          >
            <Flame className="w-4 h-4 fill-primary/20" />
            {t.origins.badge}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground"
          >
            {t.origins.title}
          </motion.h2>
        </motion.div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            index={0}
            icon={Zap}
            title={t.origins.cards.chaos.title}
            desc={t.origins.cards.chaos.desc}
          />

          {/* O card do meio deslocado verticalmente para dar dinamismo */}
          <div className="md:-translate-y-16">
            <Card
              index={1}
              icon={Link2}
              title={t.origins.cards.bridge.title}
              desc={t.origins.cards.bridge.desc}
            />
          </div>

          <Card
            index={2}
            icon={MonitorSmartphone}
            title={t.origins.cards.mirror.title}
            desc={t.origins.cards.mirror.desc}
          />
        </div>
      </div>
    </section>
  );
}

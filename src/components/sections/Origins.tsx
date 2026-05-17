"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import { Zap, Link2, MonitorSmartphone, Flame, LucideIcon } from "lucide-react";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { OriginsPortal } from "../3d/OriginsPortal";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.15,
      type: "spring",
      stiffness: 65,
      damping: 18,
    },
  }),
};

function Card({
  title,
  desc,
  icon: Icon,
  index,
}: {
  title: string;
  desc: string;
  icon: LucideIcon;
  index: number;
}) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -40px 0px" }}
      // Migramos os estilos para Tailwind.
      // Mobile recebe um fundo mais sólido e blur forte. Telas maiores (sm:) voltam ao seu design original translúcido.
      className="group relative rounded-2xl sm:rounded-3xl overflow-hidden
                 border border-white/20 sm:border-white/10
                 shadow-[0_4px_32px_-8px_rgba(0,0,0,0.2)]
                 backdrop-blur-2xl sm:backdrop-blur-[16px]
                 bg-background/80 sm:bg-transparent
                 bg-gradient-to-br from-white/10 to-white/5 sm:from-white/[0.055] sm:to-white/[0.018]"
      style={{
        // Mantemos apenas o padding inline, já que usa um clamp() customizado
        padding: "clamp(1.25rem,3.5vw,2rem)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/12 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(167,139,250,0.3),transparent)",
        }}
      />

      <div className="relative z-10">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/18 transition-all duration-300">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-200 leading-tight">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}

export function Origin() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yText = useSpring(rawY, { stiffness: 50, damping: 16 });

  return (
    <section
      ref={ref}
      id="origin"
      className="relative border-y border-border/50 py-20 sm:py-28 md:py-36 lg:py-48 overflow-hidden min-h-[80vh] flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0 opacity-75">
        <OriginsPortal />
      </div>
      <SectionDivider position="top" />
      <SectionDivider position="bottom" />

      <div className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          style={{ y: yText }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 lg:mb-28"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2 mb-5 sm:mb-6 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-accent/45 bg-accent/8 text-[10px] sm:text-xs font-bold text-primary uppercase tracking-widest backdrop-blur-md"
          >
            <Flame className="w-3 h-3 sm:w-4 sm:h-4 fill-primary/20" />
            {t.origins.badge}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground"
            style={{ fontSize: "clamp(1.9rem,6vw,4.5rem)" }}
          >
            {t.origins.title}
          </motion.h2>
        </motion.div>

        {/* Cards grid — 1 col mobile, 3 col md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          <Card
            index={0}
            icon={Zap}
            title={t.origins.cards.chaos.title}
            desc={t.origins.cards.chaos.desc}
          />
          {/* Middle card offset on md+ */}
          <div className="md:-translate-y-10 lg:-translate-y-14">
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

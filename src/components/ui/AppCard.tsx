"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface AppCardProps {
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  color: string; 
  className?: string;
}

export function AppCard({
  name,
  tagline,
  description,
  icon: Icon,
  color,
  className,
}: AppCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-8 transition-all hover:bg-white/10",
        className
      )}
      whileHover={{ y: -5 }}
    >
      {/* Spotlight Effect Específico com a cor do App */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              ${color}20,
              transparent 80%
            )
          `,
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10">
        <div
          className="mb-4 inline-flex rounded-xl p-3 ring-1 ring-white/10 backdrop-blur-md"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="h-6 w-6" style={{ color: color }} />
        </div>

        <h3 className="mb-1 text-2xl font-bold tracking-tight text-foreground">
          {name}
        </h3>
        <span className="mb-4 inline-block text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
          {tagline}
        </span>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      {/* Botão sutil de "Ver mais" */}
      {/* <div
        className="relative z-10 mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: color }}
      >
        Explorar
        <ArrowUpRight className="h-4 w-4" />
      </div> */}

      {/* Decoração de fundo (Noise) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </motion.div>
  );
}

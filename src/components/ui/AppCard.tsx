"use client";

import { useCallback } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { LucideIcon, ArrowUpRight } from "lucide-react";
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

  const onMove = useCallback(
    ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    },
    [mouseX, mouseY],
  );

  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px,${color}16,transparent 70%)`;

  return (
    <motion.div
      onMouseMove={onMove}
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl p-5 cursor-default",
        "border border-white/8 bg-white/4 dark:bg-white/3",
        "hover:border-white/14 transition-colors duration-300",
        className,
      )}
      style={{ boxShadow: "0 2px 16px -4px rgba(0,0,0,0.12)" }}
    >
      {/* Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350"
        style={{ background: spotlight }}
      />
      {/* Top edge on hover */}
      <div
        className="absolute top-0 left-5 right-5 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg,transparent,${color}70,transparent)`,
        }}
      />

      <div className="relative z-10">
        <div
          className="mb-4 inline-flex rounded-xl p-2.5 transition-all duration-300 group-hover:scale-110"
          style={{
            background: `${color}16`,
            border: `1px solid ${color}28`,
            boxShadow: `0 0 14px -4px ${color}35`,
          }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <h3 className="mb-0.5 text-lg font-bold tracking-tight text-foreground group-hover:text-white transition-colors duration-200">
          {name}
        </h3>
        <span
          className="mb-3 inline-block text-[10px] font-bold uppercase tracking-widest"
          style={{ color: `${color}cc` }}
        >
          {tagline}
        </span>
        <p className="text-xs leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors">
          {description}
        </p>
        {/* <div
          className="mt-4 flex items-center gap-1 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1 group-hover:translate-x-0"
          style={{ color }}
        >
          <span>Explorar</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </div> */}
      </div>
    </motion.div>
  );
}

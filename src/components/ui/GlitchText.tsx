"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  variant?: "primary" | "destructive"; // Cor do glitch (azul/roxo ou vermelho)
}

export function GlitchText({
  text,
  className,
  variant = "primary",
}: GlitchTextProps) {
  // Cores baseadas na variante
  const glowColor = variant === "primary" ? "var(--color-primary)" : "#ef4444"; // Vermelho se destructive

  const glitchAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      // Efeito de "tremor" sutil
      x: [0, -2, 2, -1, 0],
      transition: {
        duration: 0.5,
        x: {
          repeat: Infinity,
          duration: 0.2,
          repeatType: "mirror",
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className={cn("relative inline-block group", className)}>
      {/* Texto Principal */}
      <motion.h1
        variants={glitchAnimation}
        initial="hidden"
        animate="visible"
        className="relative z-10 font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-muted-foreground"
      >
        {text}
      </motion.h1>

      {/* Camada de "Sombra" Neon (Glow) */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="absolute inset-0 z-0 blur-lg select-none pointer-events-none"
        style={{ textShadow: `0 0 20px ${glowColor}` }}
        aria-hidden="true"
      >
        {text}
      </motion.span>

      {/* Camada de Glitch (Scanline effect no hover ou automático) */}
      <span
        className="absolute top-0 left-0 w-full h-full bg-transparent opacity-50 pointer-events-none mix-blend-overlay group-hover:animate-glitch-scanline"
        style={{
          backgroundImage: `repeating-linear-gradient(transparent 0px, transparent 2px, ${glowColor}10 3px, transparent 4px)`,
        }}
      />
    </div>
  );
}

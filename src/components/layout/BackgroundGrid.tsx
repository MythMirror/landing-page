"use client";

import { cn } from "@/lib/utils";

interface BackgroundGridProps {
  className?: string;
}

export function BackgroundGrid({ className }: BackgroundGridProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0 pointer-events-none overflow-hidden",
        className
      )}
    >
      {/* Grid Layer 
        - Light Mode: Linhas cinza muito sutis (#00000008)
        - Dark Mode: Linhas brancas/azuladas sutis (rgba(255,255,255,0.05))
      */}
      <div className="absolute inset-0 z-0 opacity-[0.4] dark:opacity-[0.3]">
        <div
          className="absolute inset-0 h-[200%] w-full animate-grid-drift"
          style={{
            backgroundImage: `
              linear-gradient(to right, var(--color-border) 1px, transparent 1px),
              linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Radial Gradient Overlay para profundidade (Vignette) */}
      <div className="absolute inset-0 bg-background/20 dark:bg-background/60 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Noise Texture para tirar o aspecto "chapado" */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
}

"use client";
import { cn } from "@/lib/utils";

export function BackgroundGrid({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Animated grid — contain:strict keeps it isolated */}
      <div className="absolute inset-0" style={{ contain: "strict" }}>
        <div
          className="absolute inset-0 h-[200%] w-full animate-grid-drift opacity-25 dark:opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(to right,var(--color-border) 1px,transparent 1px),linear-gradient(to bottom,var(--color-border) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-background/30 dark:bg-background/50 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_30%,black_100%)]" />

      {/* Aurora blobs — CSS only, no JS */}
      <div
        className="absolute -top-[15%] -left-[5%] w-[65vw] h-[65vw] rounded-full opacity-20 dark:opacity-12"
        style={{
          background:
            "radial-gradient(circle,color-mix(in srgb,var(--color-primary) 55%,transparent) 0%,transparent 68%)",
          filter: "blur(90px)",
          animation: "aurora-shift 20s ease infinite alternate",
        }}
      />
      <div
        className="absolute -bottom-[10%] -right-[5%] w-[55vw] h-[55vw] rounded-full opacity-15 dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle,color-mix(in srgb,#e879f9 50%,transparent) 0%,transparent 68%)",
          filter: "blur(100px)",
          animation: "aurora-shift 26s ease infinite alternate-reverse",
        }}
      />
    </div>
  );
}

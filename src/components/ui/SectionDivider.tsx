"use client";

import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  position?: "top" | "bottom" | "both";
}

export function SectionDivider({
  className,
  position = "bottom",
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        "absolute left-0 w-full h-32 md:h-48 z-20 pointer-events-none",
        position === "top" &&
          "top-0 bg-gradient-to-b from-background to-transparent",
        position === "bottom" &&
          "bottom-0 bg-gradient-to-t from-background to-transparent",
        position === "both" &&
          "inset-y-0 h-full bg-gradient-to-b from-background via-transparent to-background",
        className,
      )}
    />
  );
}

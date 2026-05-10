"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export function NeonInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        className={cn(
          "peer w-full px-4 py-3 rounded-t-lg transition-all duration-300 outline-none",
          "text-foreground placeholder:text-muted-foreground/50",
          "bg-background/30 border-b-2 border-foreground/10",
          "focus:bg-background/60 focus:border-transparent focus:backdrop-blur-sm",
          className,
        )}
      />

      {/* LINHA NEON */}
      <div
        className={cn(
          "absolute bottom-0 left-0 h-[2px] w-full bg-primary",
          "transform scale-x-0 origin-left transition-transform duration-300 ease-out",
          "peer-focus:scale-x-100",
          "peer-focus:shadow-[0_0_15px_2px_var(--color-primary)]",
        )}
      />
    </div>
  );
}

export function NeonTextarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="relative w-full">
      <textarea
        {...props}
        className={cn(
          "peer w-full px-4 py-3 rounded-t-lg transition-all duration-300 outline-none resize-none",
          "text-foreground placeholder:text-muted-foreground/50",
          "bg-background/30 border-b-2 border-foreground/10",
          "focus:bg-background/60 focus:border-transparent focus:backdrop-blur-sm",
          className,
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 left-0 h-[2px] w-full bg-primary",
          "transform scale-x-0 origin-left transition-transform duration-300 ease-out",
          "peer-focus:scale-x-100",
          "peer-focus:shadow-[0_0_15px_2px_var(--color-primary)]",
        )}
      />
    </div>
  );
}

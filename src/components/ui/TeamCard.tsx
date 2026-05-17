"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadarChart } from "./RadarChart";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  stats: number[];
  labels: string[];
  imageSrc: string;
}

export function TeamCard({
  name,
  role,
  bio,
  stats,
  labels,
  imageSrc,
}: TeamCardProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const { theme } = useTheme();

  /* ---------------------------
   * Mount & Touch Detection
   * -------------------------- */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setIsTouch(
      typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0),
    );
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  /* ---------------------------
   * Accent Color
   * -------------------------- */
  const accentColor = name.includes("Victor")
    ? isDark
      ? "#7c3aed"
      : "#8b5cf6"
    : isDark
      ? "#22d3ee"
      : "#06b6d4";

  /* ---------------------------
   * Handlers
   * -------------------------- */
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <motion.div
      onMouseEnter={!isTouch ? open : undefined}
      onMouseLeave={!isTouch ? close : undefined}
      onClick={isTouch ? open : undefined}
      className={cn(
        "relative w-full max-w-sm h-[400px] sm:h-[440px] md:h-[450px] rounded-3xl overflow-hidden",
        "transition-all duration-500 group border shadow-xl",
        "bg-white border-slate-200 dark:bg-zinc-900 dark:border-white/10",
        "touch-manipulation",
      )}
    >
      {/* ========================
       * Background Image
       * ======================= */}
      <div className="absolute inset-0 z-0 bg-gray-100 dark:bg-zinc-800 pointer-events-none">
        <Image
          src={imageSrc}
          alt={name}
          fill
          priority={false}
          className="object-cover scale-90 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t transition-opacity duration-500",
            isDark
              ? "from-black/90 via-black/30 to-transparent opacity-80"
              : "from-white/90 via-white/50 to-transparent opacity-90",
          )}
        />
      </div>

      {/* ========================
       * Base Content
       * ======================= */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-10 pointer-events-none">
        <span
          className="inline-block px-2 py-1 mb-2 text-xs font-bold uppercase rounded border backdrop-blur-md shadow-sm"
          style={{
            borderColor: isDark ? `${accentColor}80` : accentColor,
            color: isDark ? accentColor : "white",
            backgroundColor: isDark ? `${accentColor}15` : accentColor,
          }}
        >
          {role}
        </span>

        <h3 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white drop-shadow-md">
          {name}
        </h3>

        <AnimatePresence>
          {!isOpen && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-sm font-medium line-clamp-3 text-slate-700 dark:text-slate-300"
            >
              {bio}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* ========================
       * Overlay (Details)
       * ======================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/80"
            onClick={isTouch ? close : undefined}
          >
            {/* Close Button (Mobile) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-30 md:hidden"
              aria-label="Fechar detalhes"
            >
              <X size={20} />
            </button>

            {/* Radar Chart */}
            <div
              className="w-full h-64 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <RadarChart stats={stats} labels={labels} color={accentColor} />
            </div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-sm text-slate-200 font-medium mt-4 max-w-[260px] italic leading-relaxed"
            >
              &quot;{bio}&quot;
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

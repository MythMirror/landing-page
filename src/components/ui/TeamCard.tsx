"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RadarChart } from "./RadarChart";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { theme } = useTheme();

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  // Cores
  const accentColor =
    name.includes("Victor") || name.includes("Natan")
      ? isDark
        ? "#7c3aed"
        : "#8b5cf6"
      : isDark
      ? "#22d3ee"
      : "#06b6d4";

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative w-full max-w-sm h-[450px] rounded-3xl overflow-hidden transition-all duration-500 group border shadow-xl",
        "bg-white border-slate-200 dark:bg-zinc-900 dark:border-white/10"
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-gray-100 dark:bg-zinc-800">
        <Image
          src={imageSrc}
          alt={name}
          fill
          className="object-cover scale-90 transition-all duration-700 rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t transition-opacity duration-500",
            isDark
              ? "from-black/90 via-black/20 to-transparent opacity-80"
              : "from-white/90 via-white/40 to-transparent opacity-90"
          )}
        />
      </div>

      {/* Conteúdo Base */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-10 transition-all duration-500 group-hover:translate-y-4">
        <span
          className="inline-block px-2 py-1 mb-2 text-xs font-bold uppercase rounded border backdrop-blur-md shadow-sm"
          style={{
            borderColor: isDark ? `${accentColor}80` : accentColor,
            color: isDark ? accentColor : "white",
            backgroundColor: isDark ? `${accentColor}10` : accentColor,
          }}
        >
          {role}
        </span>

        <h3 className="text-3xl font-bold mb-1 text-slate-900 dark:text-white drop-shadow-md group-hover:text-white">
          {name}
        </h3>

        <AnimatePresence>
          {!isHovered && (
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

      {/* Hover Overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/80"
          >
            <div className="w-full h-64">
              <RadarChart stats={stats} color={accentColor} labels={labels} />
            </div>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center text-sm text-slate-200 font-medium mt-2 max-w-[250px] italic leading-relaxed"
            >
              &quot;{bio}&quot;
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

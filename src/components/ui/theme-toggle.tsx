"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-background/50 hover:bg-accent/10 hover:border-accent/50 transition-all backdrop-blur-sm shadow-sm cursor-pointer"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {isDark ? (
          /* Moonrise */
          <motion.div
            key="moon"
            initial={{ y: 20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: -45 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute"
          >
            <Moon className="h-5 w-5 text-cyan-400 fill-cyan-400/20 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </motion.div>
        ) : (
          /* Sunrise */
          <motion.div
            key="sun"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 45 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute"
          >
            <Sun className="h-5 w-5 text-amber-500 fill-amber-500/20 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brilho de fundo sutil */}
      <div
        className={`absolute inset-0 opacity-20 blur-md ${
          isDark ? "bg-cyan-500" : "bg-amber-500"
        }`}
      />
    </button>
  );
}

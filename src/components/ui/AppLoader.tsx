"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLoading } from "@/context/LoadingContext";

// Loader completamente independente de WebGL/useProgress.
// Simula progresso com timer e dispara setIsLoaded quando conclui.
export default function AppLoader() {
  const { setIsLoaded } = useLoading();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Fase 1: 0→80% rápido (500ms)
    // Fase 2: 80→100% aguarda o DOM estar pronto (mais 400ms)
    let p = 0;
    const tick = setInterval(() => {
      p += p < 80 ? 4 : 1.5;
      const capped = Math.min(p, 99);
      setProgress(capped);
      if (capped >= 99) clearInterval(tick);
    }, 25);

    // Aguarda fonts + layout estabilizarem
    const done = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setIsLoaded(true);
      }, 500);
    }, 1200);

    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [setIsLoaded]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "var(--background)" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, color-mix(in srgb, var(--color-primary) 8%, transparent), transparent)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Logo mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-12 h-12"
            >
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    "color-mix(in srgb, var(--color-primary) 20%, transparent)",
                  animation: "pulse-glow 2.5s ease-in-out infinite",
                }}
              />
              <img
                src="/logoWhite.svg"
                alt="MythMirror"
                className="relative z-10 w-full h-full object-contain hidden dark:block"
              />
              <img
                src="/logoBlack.svg"
                alt="MythMirror"
                className="relative z-10 w-full h-full object-contain dark:hidden"
              />
            </motion.div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-medium"
            >
              Initializing Reality
            </motion.p>

            {/* Progress track */}
            <div
              className="w-48 h-[2px] rounded-full overflow-hidden"
              style={{ background: "var(--color-border)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                  width: `${progress}%`,
                  transition: "width 0.2s ease-out",
                }}
              />
            </div>

            {/* Percentage */}
            <span
              className="text-[9px] font-mono tabular-nums tracking-widest"
              style={{
                color:
                  "color-mix(in srgb, var(--color-muted-foreground) 40%, transparent)",
              }}
            >
              {String(Math.round(progress)).padStart(3, "0")}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

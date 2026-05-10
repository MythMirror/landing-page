"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid";
import { GlitchText } from "@/components/ui/GlitchText";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import { cn } from "@/lib/utils";

// Estilo do botão de erro (vermelho/laranja)
const errorButtonStyles = cn(
  "group relative px-6 py-3 bg-destructive text-white font-bold rounded-xl overflow-hidden shadow-[0_0_20px_-5px_var(--color-destructive)] hover:scale-105 hover:shadow-[0_0_30px_-5px_var(--color-destructive)] transition-all duration-300 inline-flex items-center gap-2",
);
// Estilo do botão secundário
const secondaryButtonStyles = cn(
  "px-6 py-3 bg-accent/10 border border-accent/30 text-accent font-bold rounded-xl hover:bg-accent/20 transition-all duration-300 inline-flex items-center gap-2",
);

// error.tsx recebe props especiais do Next.js
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Opcional: Logar o erro em um serviço como Sentry aqui
    console.error("Critical System Failure:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      <BackgroundGrid className="z-0 opacity-30" />

      {/* Fundo Avermelhado para indicar erro */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-destructive/20 via-background to-background pointer-events-none" />

      <div className="container px-4 md:px-6 relative z-10 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl p-10 rounded-[3rem] border border-destructive/30 bg-background/80 backdrop-blur-2xl shadow-2xl shadow-destructive/20 text-center relative overflow-hidden"
        >
          {/* Ícone de Alerta */}
          <div className="mb-8 inline-flex p-6 rounded-full bg-destructive/10 text-destructive border border-destructive/30 animate-pulse">
            <AlertTriangle className="w-16 h-16" />
          </div>

          {/* Título com Glitch Vermelho */}
          <div className="mb-4">
            <GlitchText
              text="SYSTEM FAILURE"
              className="text-4xl md:text-6xl"
              variant="destructive"
            />
          </div>
          <p className="font-mono text-sm text-destructive/70 mb-6">
            Error Code: {error.digest || "UNKNOWN_ANOMALY"}
          </p>

          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            Uma anomalia crítica foi detectada nos protocolos da MythMirror.
            Nossos engenheiros já foram notificados da brecha.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Botão Tentar Novamente (Função reset do Next.js) */}
            <button onClick={() => reset()} className={errorButtonStyles}>
              <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
              <span>Tentar Reconexão</span>
            </button>

            {/* Botão Voltar */}
            <Link href="/" className={secondaryButtonStyles}>
              <Home className="w-5 h-5" />
              <span>Voltar à Segurança</span>
            </Link>
          </div>

          {/* Decoração de canto "Tech" Vermelha */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-destructive/10 blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
}

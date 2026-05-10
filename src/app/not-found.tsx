"use client";

import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, WifiOff } from "lucide-react";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid"; // Reutilizando seu grid

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-background overflow-hidden selection:bg-red-500/30">
      {/* Fundo Minimalista */}
      <div className="absolute inset-0 z-0 opacity-20">
        <BackgroundGrid />
      </div>

      {/* Spot de Luz Vermelha (Erro) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container px-4 flex flex-col items-center text-center">
        {/* Ícone Animado */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 rounded-full bg-background/50 border border-white/5 backdrop-blur-md shadow-2xl relative group"
        >
          <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:bg-red-500/30 transition-all duration-500" />
          <WifiOff className="w-12 h-12 text-foreground/80 relative z-10" />
        </motion.div>

        {/* Título com Efeito Glitch (CSS puro ou simples) */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mb-6"
        >
          {t.system.not_found.title}
        </motion.h1>

        {/* Descrição */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-lg mb-10 leading-relaxed"
        >
          {t.system.not_found.description}
        </motion.p>

        {/* Botão de Retorno */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm tracking-wide uppercase">
              {t.system.not_found.button}
            </span>

            {/* Linha brilhante no hover */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Decoração de Código no Rodapé */}
      <div className="absolute bottom-8 left-0 w-full text-center">
        <p className="text-[10px] text-muted-foreground/20 font-mono">
          ERROR_CODE: 0x404_VOID // MYTH_PROTOCOL_FAILURE
        </p>
      </div>
    </div>
  );
}

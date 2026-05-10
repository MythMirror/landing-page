"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, FileText, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "privacy" | "terms" | null;
  data: {
    title: string;
    updated: string;
    content: { heading: string; text: string }[];
  } | null;
}

export function LegalModal({ isOpen, onClose, type, data }: LegalModalProps) {
  const { t } = useLanguage();
  const contentRef = useRef<HTMLDivElement>(null);

  // Fechar com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Gerenciamento de Scroll
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Aplica trava e compensação
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }
  }, [isOpen]);

  // Função para limpar o estilo do body
  const unlockScroll = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.style.paddingRight = "";
  };

  if (!data && !isOpen) return null;

  return (
    <AnimatePresence onExitComplete={unlockScroll}>
      {isOpen && data && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-background/60 backdrop-blur-md cursor-pointer"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 1,
            }}
            className={cn(
              "relative w-full max-w-2xl max-h-[85vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden",
              "bg-background/90 border-white/20 dark:border-white/10 backdrop-blur-xl ring-1 ring-white/10",
            )}
            onWheel={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Efeito Glow Topo */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 shrink-0 select-none">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  {type === "privacy" ? (
                    <ShieldCheck className="w-5 h-5" />
                  ) : (
                    <FileText className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    {data.title}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {t.legal.modal.updated_label} {data.updated}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-red-500/10 hover:text-red-500 text-muted-foreground transition-colors cursor-pointer focus:outline-none"
                aria-label={t.legal.modal.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar overscroll-contain"
            >
              {data.content.map((section, idx) => (
                <div key={idx} className="group">
                  <h3 className="text-base font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {section.heading}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-white/10 text-justify">
                    {section.text}
                  </p>
                </div>
              ))}

              <div className="pt-8 border-t border-white/10 text-center">
                <p className="text-xs text-muted-foreground italic">
                  {t.legal.modal.footer_quote}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/10 bg-white/5 flex justify-end gap-3 shrink-0">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                {t.legal.modal.close}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg shadow-[0_0_15px_-5px_var(--color-primary)] hover:shadow-[0_0_20px_-3px_var(--color-primary)] hover:bg-primary/90 transition-all cursor-pointer"
              >
                {t.legal.modal.understood}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

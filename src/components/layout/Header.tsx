"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

// ATUALIZAÇÃO: Lista completa de seções na ordem correta
const navLinks = [
  { key: "home", href: "#hero" },
  { key: "ecosystem", href: "#ecosystem" },
  { key: "mission", href: "#mission" }, // Novo
  { key: "origin", href: "#origin" }, // Novo
  { key: "team", href: "#team" },
  { key: "roadmap", href: "#roadmap" },
  { key: "contact", href: "#contact" },
] as const;

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Detectar scroll para mudar estilo do header
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Função de Scroll Suave Manual
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false); // Fecha menu mobile se aberto

    const element = document.querySelector(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300",
          isScrolled ? "py-4" : "py-6"
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between w-full max-w-7xl px-6 py-3 mx-4 rounded-2xl border transition-all duration-300",
            isScrolled
              ? "bg-background/80 border-border/40 shadow-lg backdrop-blur-xl"
              : "bg-transparent border-transparent"
          )}
        >
          {/* 1. Logo */}
          <a
            href="#hero"
            onClick={(e) => handleScrollTo(e, "#hero")}
            className="flex items-center gap-2 group cursor-pointer z-50 select-none"
          >
            {/* Logo MythMirror com Aura */}
            <div className="relative h-8 w-8 flex items-center justify-center">
              {/* Aura energética (hover) */}
              <div
                className={cn(
                  "absolute inset-0 rounded bg-primary/50 blur-sm",
                  "opacity-0 group-hover:opacity-75 group-hover:animate-ping",
                  "transition-opacity duration-300"
                )}
              />

              {/* Logo Preta — Light Mode */}
              <img
                src="/logoBlack.svg"
                alt="MythMirror Logo"
                className={cn(
                  "absolute inset-0 h-full w-full object-contain relative z-10",
                  "dark:hidden",
                  "transition-transform duration-700 ease-in-out group-hover:rotate-180"
                )}
              />

              {/* Logo Branca — Dark Mode */}
              <img
                src="/logoWhite.svg"
                alt="MythMirror Logo"
                className={cn(
                  "absolute inset-0 h-full w-full object-contain relative z-10",
                  "hidden dark:block",
                  "transition-transform duration-700 ease-in-out group-hover:rotate-180"
                )}
              />
            </div>

            <span className="font-bold text-xl tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              MythMirror
            </span>
          </a>

          {/* 2. Desktop Nav (Central Pill) */}
          {/* MUDANÇA: 'hidden lg:flex' em vez de 'md:flex' para acomodar mais links */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 px-2 py-1.5 rounded-full bg-background/50 border border-white/5 backdrop-blur-md shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-full transition-all cursor-pointer whitespace-nowrap"
              >
                {/* Nota: Certifique-se de adicionar 'mission' e 'origin' 
                   no seu arquivo de tradução (src/locales), senão isso quebrará.
                   Fallback seguro adicionado: || link.key 
                */}
                {t.nav[link.key as keyof typeof t.nav] || link.key}
              </a>
            ))}
          </nav>

          {/* 3. Actions (Right) */}
          <div className="flex items-center gap-3 z-50">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full border border-border bg-background/50 hover:bg-accent/10 transition-colors cursor-pointer"
            >
              <Globe className="h-3 w-3" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Cinematic Theme Toggle */}
            <div className="cursor-pointer">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button (Visível em Mobile e Tablet agora) */}
            <button
              className="lg:hidden p-2 text-foreground cursor-pointer hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            // overflow-y-auto garante scroll se a tela for pequena na vertical
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden pt-28 px-6 flex flex-col gap-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.key}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="text-2xl font-bold text-foreground/80 hover:text-primary transition-colors border-b border-white/5 pb-4 cursor-pointer"
                >
                  {t.nav[link.key as keyof typeof t.nav] || link.key}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Language Switcher */}
            <div className="flex items-center justify-between mt-auto mb-8 p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="text-muted-foreground">Idioma / Language</span>
              <button
                onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary font-bold cursor-pointer"
              >
                <Globe className="h-4 w-4" />
                {language === "pt" ? "Português" : "English"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

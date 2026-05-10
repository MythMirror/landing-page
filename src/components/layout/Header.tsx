"use client";

import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { Menu, X, Globe } from "lucide-react";

const NAV = [
  { key: "home", href: "#hero" },
  { key: "ecosystem", href: "#ecosystem" },
  { key: "mission", href: "#mission" },
  { key: "origin", href: "#origin" },
  { key: "team", href: "#team" },
  { key: "roadmap", href: "#roadmap" },
  { key: "contact", href: "#contact" },
] as const;

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();

  // ✅ All hooks at top-level unconditionally
  const progressScaleX = useTransform(scrollY, [0, 4000], [0, 1]);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (v > 60 !== scrolled) setScrolled(v > 60);
  });

  // Active section tracking
  useEffect(() => {
    const sections = NAV.map((n) =>
      document.querySelector<HTMLElement>(n.href),
    ).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        }),
      { rootMargin: "-38% 0px -55% 0px" },
    );
    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      setMenuOpen(false);
      document
        .querySelector(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [],
  );

  const toggleLang = useCallback(
    () => setLanguage(language === "pt" ? "en" : "pt"),
    [language, setLanguage],
  );

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex justify-center transition-[padding] duration-300",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between w-full max-w-7xl px-5 py-2.5 mx-4 rounded-2xl border transition-all duration-300",
            scrolled
              ? "border-border/50 backdrop-blur-2xl shadow-xl"
              : "bg-white/2 border-white/5 backdrop-blur-sm",
          )}
          style={
            scrolled
              ? {
                  background:
                    "color-mix(in srgb, var(--background) 88%, transparent)",
                  boxShadow:
                    "0 0 0 1px rgba(167,139,250,0.1), 0 8px 32px -8px rgba(0,0,0,0.3)",
                }
              : undefined
          }
        >
          {/* Scroll progress bar — always rendered, opacity transitions */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] rounded-b-2xl pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg,transparent,var(--color-primary),transparent)",
              width: "100%",
              scaleX: progressScaleX,
              transformOrigin: "left",
              opacity: scrolled ? 0.8 : 0,
            }}
          />

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => scrollTo(e, "#hero")}
            className="flex items-center gap-2.5 group cursor-pointer z-50 select-none"
          >
            <div className="relative h-7 w-7">
              <div className="absolute inset-0 rounded-lg bg-primary/25 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src="/logoBlack.svg"
                alt="MythMirror"
                loading="eager"
                decoding="sync"
                className="absolute inset-0 h-full w-full object-contain z-10 dark:hidden group-hover:scale-110 group-hover:rotate-[6deg] transition-transform duration-400"
              />
              <img
                src="/logoWhite.svg"
                alt="MythMirror"
                loading="eager"
                decoding="sync"
                className="absolute inset-0 h-full w-full object-contain z-10 hidden dark:block group-hover:scale-110 group-hover:rotate-[6deg] transition-transform duration-400"
              />
            </div>
            <span className="font-bold text-lg tracking-tighter">
              MythMirror
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2"
            role="navigation"
            aria-label="Main navigation"
          >
            <div
              className="flex items-center px-1.5 py-1.5 rounded-full border border-white/8 backdrop-blur-lg"
              style={{ background: "rgba(167,139,250,0.05)" }}
            >
              {NAV.map(({ key, href }) => {
                const active = activeSection === href.slice(1);
                return (
                  <a
                    key={key}
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    className={cn(
                      "relative px-3.5 py-1.5 text-sm font-medium rounded-full cursor-pointer whitespace-nowrap transition-colors duration-200",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {active && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "rgba(167,139,250,0.12)",
                          border: "1px solid rgba(167,139,250,0.2)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 280,
                          damping: 28,
                        }}
                      />
                    )}
                    <span className="relative z-10">
                      {t.nav[key as keyof typeof t.nav] || key}
                    </span>
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 z-50">
            <button
              onClick={toggleLang}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-border/50 bg-background/40 hover:bg-primary/8 hover:border-primary/30 transition-all duration-200 cursor-pointer"
            >
              <Globe className="h-3 w-3" />
              {language.toUpperCase()}
            </button>
            <ThemeToggle />
            <button
              className="lg:hidden p-2 cursor-pointer hover:bg-primary/10 rounded-full transition-colors"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="m"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 lg:hidden"
              style={{
                background: "rgba(2,0,15,0.7)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 left-0 right-0 z-40 lg:hidden pt-24 pb-8 px-6 flex flex-col gap-4 border-b border-border/20 shadow-2xl max-h-screen overflow-y-auto"
              style={{
                background: "rgba(2,0,15,0.96)",
                backdropFilter: "blur(24px)",
              }}
            >
              <nav className="flex flex-col">
                {NAV.map(({ key, href }, i) => (
                  <motion.a
                    key={key}
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="py-4 text-xl font-bold text-foreground/70 hover:text-primary transition-colors border-b border-white/5 last:border-0 cursor-pointer"
                  >
                    {t.nav[key as keyof typeof t.nav] || key}
                  </motion.a>
                ))}
              </nav>
              <div
                className="mt-2 flex items-center justify-between p-4 rounded-2xl border border-border/20"
                style={{ background: "rgba(167,139,250,0.05)" }}
              >
                <span className="text-sm text-muted-foreground">
                  Idioma / Language
                </span>
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/12 text-primary text-sm font-bold cursor-pointer hover:bg-primary/20 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {language === "pt" ? "Português" : "English"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

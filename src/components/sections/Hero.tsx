"use client";

import React, { useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";
import {
  m,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/useMobile";

const HeroBackground = dynamic(
  () => import("../3d/HeroBackground").then((m) => m.HeroBackground),
  { ssr: false, loading: () => <div className="absolute inset-0" /> },
);

const SPRING = { stiffness: 100, damping: 22, restDelta: 0.001 };

function FloatingDots() {
  const dots = [
    { s: 3, t: "18%", l: "11%", d: "0s", dur: "5.5s" },
    { s: 2, t: "74%", l: "8%", d: "1.3s", dur: "7s" },
    { s: 4, t: "33%", l: "88%", d: "0.6s", dur: "6s" },
    { s: 2, t: "82%", l: "84%", d: "2.1s", dur: "5.5s" },
    { s: 3, t: "52%", l: "4%", d: "3s", dur: "8s" },
  ];
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {dots.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full hidden sm:block"
          style={{
            width: p.s,
            height: p.s,
            top: p.t,
            left: p.l,
            background: "var(--color-primary)",
            opacity: 0.35,
            boxShadow: `0 0 ${p.s * 4}px ${p.s}px color-mix(in srgb,var(--color-primary) 28%,transparent)`,
            animation: `float ${p.dur} ease-in-out ${p.d} infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const xPct = useMotionValue(0.5);
  const yPct = useMotionValue(0.5);

  const rawRX = useTransform(yPct, [0, 1], [3, -3]);
  const rawRY = useTransform(xPct, [0, 1], [-3, 3]);
  const rotateX = useSpring(rawRX, SPRING);
  const rotateY = useSpring(rawRY, SPRING);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isMobile) return;
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
      xPct.set((e.clientX - left) / width);
      yPct.set((e.clientY - top) / height);
    },
    [isMobile, mouseX, mouseY, xPct, yPct],
  );

  const handleMouseLeave = useCallback(() => {
    xPct.set(0.5);
    yPct.set(0.5);
  }, [xPct, yPct]);
  const scrollTo = useCallback((e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const spotlightBg = useMotionTemplate`
    radial-gradient(480px circle at ${mouseX}px ${mouseY}px,rgba(167,139,250,0.1),transparent 70%)
  `;

  const words = t.hero.title.split(" ");

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden py-20 sm:py-24"
    >
      <HeroBackground />
      <FloatingDots />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%,transparent 20%,var(--background) 88%)",
        }}
      />

      <m.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          perspective: 1100,
        }}
        className="w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center"
      >
        {/* Card */}
        <div
          className="group relative rounded-2xl sm:rounded-3xl w-full max-w-5xl 2xl:max-w-6xl"
          style={{
            background:
              "linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))",
            border: "1px solid rgba(167,139,250,0.14)",
            backdropFilter: "blur(18px)",
            boxShadow:
              "0 0 0 1px rgba(167,139,250,0.06),0 24px 64px -12px rgba(91,33,182,0.2),inset 0 1px 0 rgba(255,255,255,0.06)",
            padding: "clamp(1.5rem,5vw,4rem)",
          }}
        >
          <m.div
            className="pointer-events-none absolute -inset-px rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: spotlightBg }}
          />
          <div
            className="absolute top-0 left-[15%] right-[15%] h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(167,139,250,0.3),transparent)",
            }}
          />

          <div className="relative flex flex-col items-center gap-5 sm:gap-7">
            {/* Badge */}
            <m.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-[11px] sm:text-xs font-semibold"
              style={{
                background:
                  "linear-gradient(135deg,rgba(167,139,250,0.14),rgba(232,121,249,0.09))",
                border: "1px solid rgba(167,139,250,0.28)",
                boxShadow: "0 0 16px -6px rgba(167,139,250,0.35)",
              }}
            >
              <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary fill-primary/30 animate-pulse" />
              <span className="bg-gradient-to-r from-primary to-purple-300 bg-clip-text text-transparent font-bold">
                {t.hero.badge}
              </span>
            </m.div>

            {/* Heading */}
            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.65,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="max-w-4xl 2xl:max-w-5xl font-extrabold tracking-tight leading-[1.05]"
              style={{ fontSize: "clamp(2.2rem,7vw,6rem)" }}
            >
              <span className="block text-foreground">{words[0]}</span>
              <span
                className="block animate-gradient"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,var(--color-primary),#e879f9,#67e8f9,var(--color-primary))",
                  backgroundSize: "300% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {words.slice(1).join(" ")}
              </span>
            </m.h1>

            {/* Subtitle */}
            <m.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.6 }}
              className="max-w-xl 2xl:max-w-2xl text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {t.hero.subtitle}
            </m.p>

            {/* CTA */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5 }}
            >
              <a
                href="#ecosystem"
                onClick={(e) => scrollTo(e, "#ecosystem")}
                className="group relative overflow-hidden rounded-xl px-6 sm:px-8 py-3.5 sm:py-4 font-bold text-white inline-flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] text-sm sm:text-base"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-primary),#7c3aed,#a855f7)",
                  boxShadow:
                    "0 0 32px -8px var(--color-primary),0 6px 20px -6px rgba(91,33,182,0.32)",
                }}
              >
                {t.hero.cta_primary}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-[-12deg] group-hover:animate-shimmer" />
              </a>
            </m.div>

            {/* Stats — hidden on very small screens */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="hidden xs:flex items-center gap-6 sm:gap-10 pt-1"
            >
              {[
                { v: "6+", l: "Apps" },
                { v: "1", l: "Ecossistema" },
                { v: "∞", l: "Possibilidades" },
              ].map(({ v, l }) => (
                <div key={l} className="flex flex-col items-center gap-0.5">
                  <span className="text-lg sm:text-xl md:text-2xl font-black text-gradient">
                    {v}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground/55 font-semibold">
                    {l}
                  </span>
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </m.div>

      {/* Scroll cue */}
      <m.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/35 hover:text-primary/55 transition-colors cursor-pointer bg-transparent border-0"
        onClick={(e) => scrollTo(e, "#ecosystem")}
        aria-label="Rolar para o conteúdo"
      >
        <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] font-semibold hidden sm:block">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </m.button>
    </section>
  );
}

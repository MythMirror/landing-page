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
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background/20" />,
  },
);

const SPRING = { stiffness: 100, damping: 22, restDelta: 0.001 };

// Decorative floating dots — pure CSS, zero JS cost
function FloatingDots() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {[
        { s: 3, t: "18%", l: "11%", d: "0s", dur: "5.5s" },
        { s: 2, t: "74%", l: "8%", d: "1.3s", dur: "7s" },
        { s: 4, t: "33%", l: "88%", d: "0.6s", dur: "6s" },
        { s: 2, t: "82%", l: "84%", d: "2.1s", dur: "5.5s" },
        { s: 3, t: "52%", l: "4%", d: "3s", dur: "8s" },
      ].map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.s,
            height: p.s,
            top: p.t,
            left: p.l,
            background: "var(--color-primary)",
            opacity: 0.35,
            boxShadow: `0 0 ${p.s * 4}px ${p.s}px color-mix(in srgb,var(--color-primary) 30%,transparent)`,
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
  const ref = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const xPct = useMotionValue(0.5);
  const yPct = useMotionValue(0.5);

  // ✅ All hooks unconditional — isMobile only affects the value, not whether the hook runs
  const rawRX = useTransform(yPct, [0, 1], [3.5, -3.5]);
  const rawRY = useTransform(xPct, [0, 1], [-3.5, 3.5]);
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
    radial-gradient(520px circle at ${mouseX}px ${mouseY}px, rgba(167,139,250,0.1), transparent 70%)
  `;

  const words = t.hero.title.split(" ");

  return (
    <section
      ref={ref}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-24"
    >
      <HeroBackground />
      <FloatingDots />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 25%, var(--background) 92%)",
        }}
      />

      {/* Tilt container — rotateX/Y only affect perspective when not mobile */}
      <m.div
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          perspective: 1100,
        }}
        className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center"
      >
        {/* Card */}
        <div
          className="group relative rounded-3xl max-w-5xl w-full"
          style={{
            background:
              "linear-gradient(135deg,rgba(255,255,255,0.055) 0%,rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(167,139,250,0.14)",
            backdropFilter: "blur(18px)",
            boxShadow:
              "0 0 0 1px rgba(167,139,250,0.07),0 28px 72px -14px rgba(91,33,182,0.22),inset 0 1px 0 rgba(255,255,255,0.06)",
            padding: "clamp(1.8rem,5.5vw,3.8rem)",
          }}
        >
          {/* Spotlight */}
          <m.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: spotlightBg }}
          />
          {/* Top shimmer */}
          <div
            className="absolute top-0 left-[12%] right-[12%] h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(167,139,250,0.35),transparent)",
            }}
          />

          <div className="relative flex flex-col items-center gap-7">
            {/* Badge */}
            <m.div
              initial={{ opacity: 0, y: -12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{
                background:
                  "linear-gradient(135deg,rgba(167,139,250,0.14),rgba(232,121,249,0.09))",
                border: "1px solid rgba(167,139,250,0.28)",
                boxShadow: "0 0 18px -6px rgba(167,139,250,0.35)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary fill-primary/30 animate-pulse" />
              <span className="bg-gradient-to-r from-primary to-purple-300 bg-clip-text text-transparent font-bold">
                {t.hero.badge}
              </span>
            </m.div>

            {/* Heading */}
            <m.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.12,
                duration: 0.65,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="max-w-4xl font-extrabold tracking-tight leading-none"
              style={{ fontSize: "clamp(2.6rem,7.5vw,5.8rem)" }}
            >
              <span className="block text-foreground drop-shadow-sm">
                {words[0]}
              </span>
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26, duration: 0.6 }}
              className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed"
            >
              {t.hero.subtitle}
            </m.p>

            {/* CTA */}
            <m.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <a
                href="#ecosystem"
                onClick={(e) => scrollTo(e, "#ecosystem")}
                className="group relative overflow-hidden rounded-xl px-8 py-4 font-bold text-white inline-flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background:
                    "linear-gradient(135deg,var(--color-primary) 0%,#7c3aed 50%,#a855f7 100%)",
                  boxShadow:
                    "0 0 36px -8px var(--color-primary),0 6px 24px -8px rgba(91,33,182,0.35)",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.hero.cta_primary}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/18 to-transparent skew-x-[-12deg] group-hover:animate-shimmer" />
              </a>
            </m.div>

            {/* Stats */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.55 }}
              className="flex items-center gap-8 pt-1"
            >
              {[
                { v: "6+", l: t.hero.stats.apps },
                { v: "1", l: t.hero.stats.ecosystem },
                { v: "∞", l: t.hero.stats.possibilities },
              ].map(({ v, l }) => (
                <div key={l} className="flex flex-col items-center gap-0.5">
                  <span className="text-xl md:text-2xl font-black text-gradient">
                    {v}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground/55 font-semibold">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/35 hover:text-primary/55 transition-colors cursor-pointer bg-transparent border-0"
        onClick={(e) => scrollTo(e, "#ecosystem")}
        aria-label="Scroll para o conteúdo"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] font-semibold">
          Scroll
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </m.button>
    </section>
  );
}

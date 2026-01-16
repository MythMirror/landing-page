"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  motion,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useTransform,
} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroBackground } from "../3d/HeroBackground";

export function Hero() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);

  // Mouse Spotlight & Tilt Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width;
    const yPct = (clientY - top) / height;
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
    x.set(xPct);
    y.set(yPct);
  }

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [5, -5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-5, 5]), {
    stiffness: 150,
    damping: 20,
  });

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
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
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        x.set(0.5);
        y.set(0.5);
      }}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background 3D*/}
      <HeroBackground />

      <motion.div
        style={{ rotateX, rotateY }}
        className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center perspective-container backdrop-blur-[2px]"
      >
        <div className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12 shadow-2xl backdrop-blur-md dark:bg-black/20">
          {/* Spotlight Gradient Mask */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  var(--color-glass-border),
                  transparent 80%
                )
              `,
            }}
          />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary shadow-lg shadow-primary/20 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 fill-primary animate-pulse" />
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {t.hero.badge}
              </span>
            </motion.div>

            <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
              <span className="block text-foreground drop-shadow-sm">
                {t.hero.title.split(" ")[0]}
              </span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                {t.hero.title.split(" ").slice(1).join(" ")}
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-col w-full sm:w-auto sm:flex-row">
              <a
                href="#ecosystem"
                onClick={(e) => handleScrollTo(e, "#ecosystem")}
                className="group relative overflow-hidden rounded-xl bg-primary px-8 py-4 font-bold text-primary-foreground shadow-[0_0_40px_-10px_var(--color-primary)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_var(--color-primary)] cursor-pointer inline-flex items-center justify-center"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t.hero.cta_primary}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

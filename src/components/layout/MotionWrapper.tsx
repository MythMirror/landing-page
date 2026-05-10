"use client";

import { LazyMotion, domAnimation } from "framer-motion";

export function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    // Removemos 'strict' e passamos 'domAnimation' diretamente.
    // Isso garante que o Framer Motion tenha o que precisa imediatamente ao carregar.
    <LazyMotion features={domAnimation}>{children}</LazyMotion>
  );
}

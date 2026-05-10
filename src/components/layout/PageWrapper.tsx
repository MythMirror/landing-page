"use client";

import dynamic from "next/dynamic";
import { useLoading } from "@/context/LoadingContext";
import { ReactNode } from "react";

// Loader sem dependência de useProgress — usa timer próprio
const AppLoader = dynamic(() => import("@/components/ui/AppLoader"), {
  ssr: false,
});

export function PageWrapper({ children }: { children: ReactNode }) {
  const { isLoaded } = useLoading();

  return (
    <>
      <AppLoader />
      <div
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.8s ease-out",
          pointerEvents: isLoaded ? "auto" : "none",
          minHeight: isLoaded ? undefined : "100vh",
          overflow: isLoaded ? undefined : "hidden",
        }}
      >
        {children}
      </div>
    </>
  );
}

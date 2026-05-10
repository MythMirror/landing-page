"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/useMobile";

function StarField({ color, count }: { color: string; count: number }) {
  const ref = useRef<THREE.Points>(null);
  const t = useRef(0);

  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 50;
      a[i * 3 + 1] = (Math.random() - 0.5) * 30;
      a[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return a;
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const dt = Math.min(delta, 0.05);
    t.current += dt;
    ref.current.rotation.z += dt * 0.015;
    ref.current.rotation.x = Math.sin(t.current * 0.07) * 0.035;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.06}
        sizeAttenuation
        depthWrite={false}
        opacity={0.38}
        toneMapped={false}
      />
    </Points>
  );
}

export function ConstellationInteraction() {
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();
  const color = resolvedTheme === "dark" ? "#a78bfa" : "#6d28d9";
  const count = isMobile ? 80 : 200;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={1}
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "low-power",
          stencil: false,
          depth: false,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) =>
            e.preventDefault(),
          );
        }}
      >
        <StarField color={color} count={count} />
      </Canvas>
    </div>
  );
}

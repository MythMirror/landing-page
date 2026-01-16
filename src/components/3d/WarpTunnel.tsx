"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes"; // Importante para adaptação

function StarField({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 10;
      const z = (Math.random() - 0.5) * 40;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;

    const positions = ref.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < 2000; i++) {
      positions[i * 3 + 2] += 0.05;
      if (positions[i * 3 + 2] > 10) {
        positions[i * 3 + 2] = -30;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.z += 0.001;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color} // Cor dinâmica
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export function WarpTunnel() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // CORES DINÂMICAS
  // Dark: Fundo Preto Absoluto / Estrelas Roxas
  // Light: Fundo Cinza Muito Claro / Estrelas Slate Escuro (dados viajando)
  const bgColor = isDark ? "#000000" : "#f8fafc";
  const starColor = isDark ? "#8b5cf6" : "#475569";

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none mix-blend-normal opacity-100">
      <Canvas dpr={[1, 2]}>
        <color attach="background" args={[bgColor]} />
        <StarField color={starColor} />
        {/* Fog para suavizar o fundo do túnel */}
        <fog attach="fog" args={[bgColor, 5, 20]} />
      </Canvas>
    </div>
  );
}

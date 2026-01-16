"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function NetworkParticles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);
  const count = 150; // Quantidade de pontos

  // Gerar posições aleatórias
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    // Rotação lenta da rede inteira
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export function ContactNetwork() {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#7c3aed" : "#6d28d9";

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <NetworkParticles color={color} />
      </Canvas>
    </div>
  );
}

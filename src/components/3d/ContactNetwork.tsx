"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Define a contagem como constante fora do componente
const PARTICLE_COUNT = 150;

function NetworkParticles({ color }: { color: string }) {
  const ref = useRef<THREE.Points>(null);

  // Otimização: Criação do array apenas uma vez na montagem
  const positions = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20; // X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // Y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    // Mantendo a rotação original
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
  });

  return (
    <Points
      ref={ref}
      positions={positions}
      stride={3}
      frustumCulled={false} // Evita que partículas sumam ao girar a câmera
    >
      <PointMaterial
        transparent
        color={color}
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false} // Essencial para performance em partículas transparentes
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
      <Canvas
        // OTIMIZAÇÃO:
        // 1. Limita a densidade de pixels para economizar bateria/GPU
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 60 }}
        // 2. Configurações do WebGL para máxima performance
        gl={{
          alpha: true,
          antialias: false, // Desliga suavização de bordas (não visível em partículas)
          powerPreference: "high-performance",
          stencil: false, // Remove buffer de stencil (não usado)
          depth: false, // Remove buffer de profundidade (já que depthWrite é false)
        }}
      >
        <NetworkParticles color={color} />
      </Canvas>
    </div>
  );
}

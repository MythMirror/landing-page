"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

const STAR_COUNT = 300;

function StarField({ color }: { color: string }) {
  const { viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null);

  // Posições das Estrelas
  const particles = useMemo(() => {
    const temp = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      // Espalhar pela largura/altura da viewport
      const x = (Math.random() - 0.5) * viewport.width * 2;
      const y = (Math.random() - 0.5) * viewport.height * 2;
      const z = (Math.random() - 0.5) * 5;
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  }, [viewport]);

  // Loop de Animação
  useFrame((state) => {
    if (!pointsRef.current) return;

    // Apenas rotação suave do universo
    pointsRef.current.rotation.z += 0.0003;
    pointsRef.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
  });

  return (
    <Points
      ref={pointsRef}
      positions={particles}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color={color}
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

export function ConstellationInteraction() {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#22d3ee" : "#6d28d9";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: false }}
      >
        <StarField color={color} />
      </Canvas>
    </div>
  );
}

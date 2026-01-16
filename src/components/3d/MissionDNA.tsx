"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function DNAStrand({ color, offset = 0 }: { color: string; offset?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Gerar pontos em formato de hélice
  const particles = useMemo(() => {
    const temp = [];
    const count = 100; // Número de "bases" do DNA

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 8; // 4 voltas completas

      // Posição na hélice
      const x = Math.cos(angle + offset) * 1.5;
      const z = Math.sin(angle + offset) * 1.5;
      const y = (t - 0.5) * 12; // Altura alongada

      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [offset]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    // Rotação contínua lenta
    pointsRef.current.rotation.y += 0.005;
    // Movimento vertical suave (flutuação)
    pointsRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
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
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        toneMapped={false}
      />
    </Points>
  );
}

function ConnectingLines({
  colorPrimary,
  colorSecondary,
}: {
  colorPrimary: string;
  colorSecondary: string;
}) {
  // Linhas horizontais conectando as duas fitas (as "pontes" do DNA)
  const groupRef = useRef<THREE.Group>(null);

  const bridges = useMemo(() => {
    return new Array(40).fill(0).map((_, i) => {
      const t = i / 40;
      const y = (t - 0.5) * 12;
      return y;
    });
  }, []);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.005;
  });

  return (
    <group ref={groupRef}>
      {bridges.map((y, i) => (
        <mesh
          key={i}
          position={[0, y, 0]}
          rotation={[0, (i / 40) * Math.PI * 8, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.02, 0.02, 3, 4]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? colorPrimary : colorSecondary}
            transparent
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export function MissionDNA() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const primary = isDark ? "#7c3aed" : "#6d28d9";
  const secondary = isDark ? "#22d3ee" : "#8b5cf6";

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />

        <ambientLight intensity={0.5} />

        <group rotation={[0, 0, Math.PI / 6]}>
          {" "}
          {/* Leve inclinação para estilo */}
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            {/* Fita 1 */}
            <DNAStrand color={primary} offset={0} />
            {/* Fita 2 (Defasada em PI) */}
            <DNAStrand color={secondary} offset={Math.PI} />
            {/* Conexões */}
            <ConnectingLines
              colorPrimary={primary}
              colorSecondary={secondary}
            />
          </Float>
        </group>

        {/* Fog para profundidade */}
        <fog attach="fog" args={[isDark ? "#020617" : "#f8fafc", 5, 15]} />
      </Canvas>
    </div>
  );
}

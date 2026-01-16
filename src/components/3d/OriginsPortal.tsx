"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  MeshTransmissionMaterial,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function PortalRing({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Rotação hipnótica complexa
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.5;
    meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.5;
    meshRef.current.rotation.z = t * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      {/* Torus Knot: Forma complexa e entrelaçada */}
      <torusKnotGeometry args={[1.8, 0.5, 128, 32]} />
      <MeshTransmissionMaterial
        backside={false}
        samples={4}
        thickness={2}
        chromaticAberration={0.4} // Aberração cromática alta para efeito "glitch/future"
        anisotropy={0.5}
        distortion={0.8} // Distorção alta
        distortionScale={0.5}
        temporalDistortion={0.2}
        roughness={0.1}
        color={color}
        emissive={color}
        emissiveIntensity={0.2}
        transmission={1}
        ior={1.2}
      />
    </mesh>
  );
}

function FloatingDebris({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2}>
          <mesh
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 5,
            ]}
          >
            <octahedronGeometry args={[Math.random() * 0.3]} />
            <meshBasicMaterial
              color={color}
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function OriginsPortal() {
  const { theme } = useTheme();
  const color = theme === "dark" ? "#22d3ee" : "#8b5cf6"; // Cyan no Dark, Roxo no Light

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color={color} />
        <pointLight position={[-10, -10, -10]} intensity={2} color="white" />

        {/* O Portal */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <PortalRing color={color} />
        </Float>

        {/* Detritos flutuantes (Caos) */}
        <FloatingDebris color={color} />

        {/* Fundo estrelado sutil */}
        <Stars
          radius={50}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}

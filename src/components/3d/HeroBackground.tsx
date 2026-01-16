"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Environment,
  MeshTransmissionMaterial,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

// Glass Shard
interface GlassShardProps {
  position: [number, number, number];
  scale: number;
  rotationSpeed?: number;
  colorAccent: string;
}

function GlassShard({
  position,
  scale,
  rotationSpeed = 0.2,
  colorAccent,
}: GlassShardProps) {
  const ref = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  useFrame((_, delta) => {
    if (!ref.current) return;

    // Delta Time Clamp
    const dt = Math.min(delta, 0.1);

    // Passive Rotation
    ref.current.rotation.x += dt * rotationSpeed * 0.1;
    ref.current.rotation.z += dt * rotationSpeed * 0.05;

    // Mouse Target Rotation (Low Sensitivity)
    const targetRotationY = (mouse.x * viewport.width) / 80;
    const targetRotationX = (mouse.y * viewport.height) / 80;

    // Smooth Inertia (Lerp)
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      targetRotationY,
      0.01
    );
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      targetRotationX,
      0.01
    );
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={1}
      floatingRange={[-0.1, 0.1]}
    >
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />

        <MeshTransmissionMaterial
          samples={4}
          thickness={0.5}
          chromaticAberration={0.05}
          anisotropy={0.1}
          roughness={0.1}
          toneMapped
          transmission={1}
          ior={1.5}
          color={colorAccent}
          emissive={colorAccent}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

// Main Scene
export function HeroBackground() {
  /* Prevents SSR / Client Theme Mismatch */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { theme } = useTheme();

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  // Accent Lights
  const primaryLight = isDark ? "#7c3aed" : "#d8b4fe";
  const secondaryLight = isDark ? "#22d3ee" : "#a5f3fc";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        eventSource={
          typeof document !== "undefined" ? document.body : undefined
        }
        className="pointer-events-none"
      >
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />

        {/* Global Lighting */}
        <ambientLight intensity={isDark ? 0.2 : 0.6} />

        <pointLight
          position={[-10, 10, 5]}
          intensity={isDark ? 3 : 1}
          color={primaryLight}
          distance={30}
          decay={2}
        />

        <pointLight
          position={[10, -10, 5]}
          intensity={isDark ? 3 : 1}
          color={secondaryLight}
          distance={30}
          decay={2}
        />

        <spotLight
          position={[0, 10, 0]}
          intensity={0.5}
          angle={0.5}
          penumbra={1}
        />

        {/* Environment */}
        <Environment
          preset="city"
          background={false}
        />

        {/* Floating Shards */}
        <group>
          <GlassShard
            position={[-5, 2, 2]}
            scale={2.5}
            rotationSpeed={0.1}
            colorAccent={primaryLight}
          />
          <GlassShard
            position={[6, -3, 0]}
            scale={2}
            rotationSpeed={0.15}
            colorAccent={secondaryLight}
          />
          <GlassShard
            position={[-3, -4, -5]}
            scale={1}
            rotationSpeed={0.3}
            colorAccent={primaryLight}
          />
          <GlassShard
            position={[4, 5, -8]}
            scale={1.2}
            rotationSpeed={0.25}
            colorAccent={secondaryLight}
          />
          <GlassShard
            position={[0, -2, -4]}
            scale={0.8}
            rotationSpeed={0.4}
            colorAccent={primaryLight}
          />
        </group>

        {/* Atmospheric Fog */}
        <fog attach="fog" args={[isDark ? "#020617" : "#f8fafc", 10, 35]} />
      </Canvas>
    </div>
  );
}

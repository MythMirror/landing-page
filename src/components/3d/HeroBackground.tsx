"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/useMobile";

const shardGeo = new THREE.OctahedronGeometry(1, 0);

function Shard({
  position,
  scale,
  color,
  isMobile,
  rx,
  rz,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  isMobile: boolean;
  rx: number;
  rz: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    const dt = Math.min(delta, 0.05);
    ref.current.rotation.x += dt * rx;
    ref.current.rotation.z += dt * rz;
  });
  return (
    <Float
      speed={isMobile ? 0.7 : 1.2}
      rotationIntensity={0.1}
      floatIntensity={isMobile ? 0.2 : 0.45}
    >
      <mesh ref={ref} position={position} scale={scale} geometry={shardGeo}>
        {isMobile ? (
          <meshStandardMaterial
            color={color}
            opacity={0.28}
            transparent
            roughness={0.4}
          />
        ) : (
          <meshPhysicalMaterial
            color={color}
            transmission={0.88}
            thickness={0.9}
            roughness={0.3}
            ior={1.4}
            toneMapped={false}
            opacity={0.48}
            transparent
          />
        )}
      </mesh>
    </Float>
  );
}

export function HeroBackground() {
  const isMobile = useIsMobile();
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const c = useMemo(
    () => ({
      p: dark ? "#8b5cf6" : "#c4b5fd",
      s: dark ? "#38bdf8" : "#7dd3fc",
      t: dark ? "#a78bfa" : "#ddd6fe",
    }),
    [dark],
  );

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 15], fov: 50 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          stencil: false,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) =>
            e.preventDefault(),
          );
        }}
      >
        <AdaptiveDpr pixelated />
        <ambientLight intensity={dark ? 0.4 : 0.7} />
        <pointLight
          position={[-10, 10, 5]}
          intensity={isMobile ? 3 : 2}
          color={c.p}
          distance={40}
          decay={2}
        />
        <pointLight
          position={[10, -10, 5]}
          intensity={isMobile ? 3 : 2}
          color={c.s}
          distance={40}
          decay={2}
        />
        {!isMobile && (
          <pointLight
            position={[0, 5, -10]}
            intensity={1}
            color={c.t}
            distance={25}
            decay={2}
          />
        )}
        <Shard
          position={[-5.5, 2.5, 1]}
          scale={isMobile ? 1.7 : 2.5}
          color={c.p}
          isMobile={isMobile}
          rx={0.04}
          rz={0.02}
        />
        <Shard
          position={[5.5, -2.5, 0]}
          scale={isMobile ? 1.4 : 2.0}
          color={c.s}
          isMobile={isMobile}
          rx={0.02}
          rz={0.05}
        />
        {!isMobile && (
          <>
            <Shard
              position={[-2, -4.5, -6]}
              scale={1.0}
              color={c.t}
              isMobile={false}
              rx={0.03}
              rz={0.015}
            />
            <Shard
              position={[3.5, 5, -9]}
              scale={1.1}
              color={c.s}
              isMobile={false}
              rx={0.015}
              rz={0.04}
            />
          </>
        )}
      </Canvas>
    </div>
  );
}

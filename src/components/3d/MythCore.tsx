"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

// ==========================================
// 1. ANÉIS ATÔMICOS (Electron Shells)
// ==========================================
interface AtomRingProps {
  radius: number;
  color: string;
  speed: number;
  rotationOffset: [number, number, number];
}

function AtomRing({ radius, color, speed, rotationOffset }: AtomRingProps) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = rotationOffset[0] + t * speed * 0.5;
    ref.current.rotation.y = rotationOffset[1] + t * speed * 0.3;
    ref.current.rotation.z = rotationOffset[2];
  });

  return (
    <group ref={ref}>
      <mesh>
        <torusGeometry args={[radius, 0.03, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>

      {/* Elétron */}
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

// ==========================================
// 2. SISTEMA DE PARTÍCULAS (Energy Burst)
// ==========================================
function ParticleBurst({
  count = 80,
  color,
}: {
  count?: number;
  color: string;
}) {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const speed = 0.5 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      temp.push({
        velocity: new THREE.Vector3(x, y, z).normalize().multiplyScalar(speed),
        currentPos: new THREE.Vector3(0, 0, 0),
        offset: Math.random() * 10,
      });
    }
    return temp;
  }, [count]);

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const time = (t + particle.offset) % 3;
      particle.currentPos.copy(particle.velocity).multiplyScalar(time);

      dummy.position.copy(particle.currentPos);

      const scale = time < 2.5 ? Math.sin(time * 2) * 0.15 : 0;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.2, 8, 8]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

// ==========================================
// 3. NÚCLEO DISTORCIDO (Liquify Core)
// ==========================================
function CoreSphere({ primary, accent }: { primary: string; accent: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <icosahedronGeometry args={[1, 20]} />
      <MeshDistortMaterial
        color={primary}
        distort={0.45}
        speed={2.5}
        roughness={0}
        metalness={0.9}
        emissive={accent}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

// ==========================================
// 4. CÂMERA RESPONSIVA (Mobile / Desktop)
// ==========================================
function ResponsiveCamera() {
  const { viewport } = useThree();
  const zPos = viewport.width < 5 ? 20 : 15;
  return <PerspectiveCamera makeDefault position={[0, 0, zPos]} />;
}

// ==========================================
// 5. COMPONENTE PRINCIPAL
// ==========================================
export function MythCore3D() {
  const { theme } = useTheme();

  const primaryColor = theme === "dark" ? "#7c3aed" : "#6d28d9";
  const accentColor = theme === "dark" ? "#22d3ee" : "#8b5cf6";

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] flex items-center justify-center relative select-none pointer-events-none">
      <Canvas dpr={[1, 2]} className="absolute inset-0">
        <ResponsiveCamera />

        {/* Iluminação */}
        <ambientLight intensity={0.8} />
        <pointLight
          position={[10, 10, 10]}
          intensity={1.5}
          color={primaryColor}
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={1}
          color={accentColor}
        />

        {/* Grupo Flutuante */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <CoreSphere primary={primaryColor} accent={accentColor} />

          <ParticleBurst count={60} color={accentColor} />

          <AtomRing
            radius={3.2}
            color={accentColor}
            speed={0.5}
            rotationOffset={[1.5, 0, 0]}
          />
          <AtomRing
            radius={3.5}
            color={primaryColor}
            speed={0.4}
            rotationOffset={[0, 2, 0.5]}
          />
          <AtomRing
            radius={3.8}
            color={accentColor}
            speed={0.6}
            rotationOffset={[0.5, -2, -0.5]}
          />
        </Float>
      </Canvas>
    </div>
  );
}

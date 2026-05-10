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
// 1. ANÉIS ATÔMICOS (Otimizados)
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
    // Z é estático no loop, então não calculamos
  });

  return (
    <group ref={ref} rotation={[0, 0, rotationOffset[2]]}>
      <mesh>
        {/* OTIMIZAÇÃO: Redução de 100 segmentos para 40. 
            Redução de 16 radiais para 5 (cria um anel estilo "diamante" fino, mais estiloso e leve) */}
        <torusGeometry args={[radius, 0.02, 5, 40]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>

      {/* Elétron */}
      <mesh position={[radius, 0, 0]}>
        {/* OTIMIZAÇÃO: Sphere -> Icosahedron (Menos polígonos) */}
        <icosahedronGeometry args={[0.08, 0]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

// ==========================================
// 2. SISTEMA DE PARTÍCULAS (Otimizado)
// ==========================================
function ParticleBurst({
  count = 60,
  color,
}: {
  count?: number;
  color: string;
}) {
  // A lógica de cálculo permanece a mesma, pois é leve para CPU (apenas 60 iterações)
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

    // Loop otimizado: Usando for loop clássico é mais rápido que forEach em alguns engines,
    // mas aqui o ganho é marginal. O importante é o objeto dummy reutilizado.
    for (let i = 0; i < count; i++) {
      const particle = particles[i];
      const time = (t + particle.offset) % 3;

      // Mutação direta do vetor para evitar Garbage Collection
      particle.currentPos.x = particle.velocity.x * time;
      particle.currentPos.y = particle.velocity.y * time;
      particle.currentPos.z = particle.velocity.z * time;

      dummy.position.set(
        particle.currentPos.x,
        particle.currentPos.y,
        particle.currentPos.z,
      );

      const scale = time < 2.5 ? Math.sin(time * 2) * 0.15 : 0;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* OTIMIZAÇÃO: SphereGeometry (High Poly) -> OctahedronGeometry (Ultra Low Poly)
          Para pontos minúsculos, um octaedro parece uma esfera. */}
      <octahedronGeometry args={[0.2, 0]} />
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
// 3. NÚCLEO DISTORCIDO (A Grande Otimização)
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
      {/* OTIMIZAÇÃO CRÍTICA:
         args={[1, 20]} cria ~4000 faces.
         args={[1, 5]} cria ~250 faces.
         O MeshDistortMaterial suaviza isso visualmente, então a perda é mínima,
         mas a performance dispara.
      */}
      <icosahedronGeometry args={[1, 5]} />
      <MeshDistortMaterial
        color={primary}
        distort={0.4}
        speed={2}
        roughness={0.2} // Pouco reflexo = cálculo de luz mais barato
        metalness={0.8}
        emissive={accent}
        emissiveIntensity={0.5}
        opacity={0.65}
        transparent
      />
    </mesh>
  );
}

// ==========================================
// 4. CÂMERA (Sem alterações, já está leve)
// ==========================================
function ResponsiveCamera() {
  const { viewport } = useThree();
  // UseMemo para evitar recálculo desnecessário
  const zPos = useMemo(() => (viewport.width < 5 ? 20 : 15), [viewport.width]);
  return <PerspectiveCamera makeDefault position={[0, 0, zPos]} />;
}

// ==========================================
// 5. MAIN COMPONENT
// ==========================================
export function MythCore3D() {
  const { theme } = useTheme();
  const primaryColor = theme === "dark" ? "#7c3aed" : "#6d28d9";
  const accentColor = theme === "dark" ? "#22d3ee" : "#8b5cf6";

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-[450px] flex items-center justify-center relative select-none pointer-events-none">
      <Canvas
        // Limitando DPR para economizar bateria e GPU em celulares
        dpr={[1, 1.5]}
        // Otimizações de renderização WebGL
        gl={{
          antialias: true, // Mantive True pois linhas finas ficam feias sem AA
          powerPreference: "high-performance",
          alpha: true,
        }}
        className="absolute inset-0"
      >
        <ResponsiveCamera />

        <ambientLight intensity={0.8} />
        {/* Luzes pontuais são caras. Se puder viver sem sombras dinâmicas, elas são ok. */}
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

        <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
          <CoreSphere primary={primaryColor} accent={accentColor} />
          <ParticleBurst count={50} color={accentColor} />

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

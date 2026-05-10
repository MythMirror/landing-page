"use client";

import { useRef, useMemo, useEffect } from "react";
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

  // Otimização: Criação estática dos pontos
  const particles = useMemo(() => {
    const temp = [];
    const count = 100;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 8;

      const x = Math.cos(angle + offset) * 1.5;
      const z = Math.sin(angle + offset) * 1.5;
      const y = (t - 0.5) * 12;

      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [offset]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.005;
    // Otimização: Math.sin direto na propriedade evita alocação de memória extra
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

// O GRANDE GANHO DE PERFORMANCE ESTÁ AQUI
function ConnectingLines({
  colorPrimary,
  colorSecondary,
}: {
  colorPrimary: string;
  colorSecondary: string;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 40;

  // Objetos temporários para cálculo de matriz (não geram lixo no render loop)
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color1 = useMemo(() => new THREE.Color(colorPrimary), [colorPrimary]);
  const color2 = useMemo(
    () => new THREE.Color(colorSecondary),
    [colorSecondary],
  );

  useEffect(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = (t - 0.5) * 12;

      // Define posição e rotação
      dummy.position.set(0, y, 0);
      dummy.rotation.set(0, (i / 40) * Math.PI * 8, Math.PI / 2);
      dummy.updateMatrix();

      // Aplica a matriz na instância i
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Aplica a cor alternada na instância i
      meshRef.current.setColorAt(i, i % 2 === 0 ? color1 : color2);
    }

    // Avisa o Three.js que as matrizes e cores foram atualizadas
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor)
      meshRef.current.instanceColor.needsUpdate = true;
  }, [dummy, color1, color2]);

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {/* 4 segmentos radiais cria um prisma retangular, muito mais leve que um cilindro redondo */}
      <cylinderGeometry args={[0.02, 0.02, 3, 4]} />
      <meshBasicMaterial
        transparent
        opacity={0.2}
        toneMapped={false}
        // VertexColors permite que cada instância tenha sua própria cor
        vertexColors
      />
    </instancedMesh>
  );
}

export function MissionDNA() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const primary = isDark ? "#7c3aed" : "#6d28d9";
  const secondary = isDark ? "#22d3ee" : "#8b5cf6";

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-60 mix-blend-screen">
      <Canvas
        dpr={[1, 1.5]} // Mantém o padrão de performance
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          depth: false, // Desliga depth buffer já que tudo é transparente/fundo
        }}
        camera={{ position: [0, 0, 8], fov: 45 }} // Câmera movida para prop para evitar re-render
      >
        <ambientLight intensity={0.5} />

        <group rotation={[0, 0, Math.PI / 6]}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <DNAStrand color={primary} offset={0} />
            <DNAStrand color={secondary} offset={Math.PI} />
            {/* <ConnectingLines
              colorPrimary={primary}
              colorSecondary={secondary}
            /> */}
          </Float>
        </group>

        <fog attach="fog" args={[isDark ? "#020617" : "#f8fafc", 5, 15]} />
      </Canvas>
    </div>
  );
}

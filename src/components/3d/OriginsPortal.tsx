"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { useIsMobile } from "@/hooks/useMobile";

function PortalRing({ color, isMobile }: { color: string; isMobile: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.5;
    meshRef.current.rotation.y = Math.cos(t * 0.3) * 0.5;
    meshRef.current.rotation.z = t * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      {/* Menos polígonos no mobile */}
      <torusKnotGeometry
        args={[1.8, 0.5, isMobile ? 64 : 90, isMobile ? 8 : 18]}
      />

      {isMobile ? (
        // Mobile: Material simples com wireframe leve
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      ) : (
        // Desktop: A refração pesada
        <MeshTransmissionMaterial
          resolution={512}
          samples={1} // Mínimo de samples
          backside={true}
          thickness={3}
          chromaticAberration={0.5}
          anisotropy={0}
          distortion={0.6}
          distortionScale={0.5}
          temporalDistortion={0.2}
          roughness={0.1}
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
          transmission={0.95}
          ior={1.2}
          opacity={0.3}
          transparent
        />
      )}
    </mesh>
  );
}

// OTIMIZAÇÃO: InstancedMesh em vez de múltiplos componentes <Float>
function FloatingDebris({ color }: { color: string }) {
  const count = 20; // Aumentei um pouco a contagem já que agora é leve
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Gera dados estáticos (posição inicial, velocidade de rotação, velocidade de flutuação)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 6,
        ),
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        floatSpeed: 0.5 + Math.random(),
        floatOffset: Math.random() * 10, // Para desincronizar o movimento
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      // Simula o efeito <Float> matematicamente
      const floatY =
        Math.sin(t * particle.floatSpeed + particle.floatOffset) * 0.5;

      dummy.position.set(
        particle.pos.x,
        particle.pos.y + floatY,
        particle.pos.z,
      );

      dummy.rotation.x += particle.rotationSpeed;
      dummy.rotation.y += particle.rotationSpeed;

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <octahedronGeometry args={[0.2]} />{" "}
      {/* Tamanho fixo, escala controlada se necessário */}
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.3}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

export function OriginsPortal() {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const color = theme === "dark" ? "#22d3ee" : "#8b5cf6";

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} color={color} />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <PortalRing color={color} isMobile={isMobile} />
        </Float>

        {/* Reduz dramaticamente as estrelas no mobile */}
        <Stars
          radius={50}
          depth={50}
          count={isMobile ? 200 : 800}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
}

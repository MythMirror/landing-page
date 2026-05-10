"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

/* =========================
   SHADER MATERIAL
========================= */

const StarTunnelMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(),
  },
  /* vertex */
  `
    uniform float uTime;
    attribute float aSize;
    varying float vAlpha;

    void main() {
      vec3 pos = position;

      pos.z = mod(position.z + uTime * 20.0 + 30.0, 40.0) - 30.0;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = aSize * (30.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;

      float dist = pos.z;
      vAlpha = smoothstep(-30.0, -20.0, dist)
             * (1.0 - smoothstep(0.0, 10.0, dist));
    }
  `,
  /* fragment */
  `
    uniform vec3 uColor;
    varying float vAlpha;

    void main() {
      vec2 coord = gl_PointCoord - vec2(0.5);
      if (length(coord) > 0.5) discard;

      gl_FragColor = vec4(uColor, vAlpha);
    }
  `,
);

extend({ StarTunnelMaterial });

/* =========================
   R3F MODULE AUGMENTATION
========================= */

declare module "@react-three/fiber" {
  interface ThreeElements {
    starTunnelMaterial: any;
  }
}

/* =========================
   STAR FIELD
========================= */

function StarField({ color }: { color: string }) {
  const materialRef = useRef<any>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sizes] = useMemo(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    const size = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 8;
      const z = (Math.random() - 0.5) * 40;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = z;

      size[i] = Math.random() * 2 + 0.5;
    }

    return [pos, size];
  }, []);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta * 0.5;
      materialRef.current.uColor.set(color);
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      </bufferGeometry>

      <starTunnelMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* =========================
   WARP TUNNEL
========================= */

export function WarpTunnel() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const bgColor = isDark ? "#000000" : "#f8fafc";
  const starColor = isDark ? "#8b5cf6" : "#475569";

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
        }}
      >
        <color attach="background" args={[bgColor]} />
        <StarField color={starColor} />
        <fog attach="fog" args={[bgColor, 5, 25]} />
      </Canvas>
    </div>
  );
}

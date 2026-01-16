"use client";

import { motion } from "framer-motion";

interface RadarChartProps {
  stats: number[];
  color: string;
  labels: string[];
}

export function RadarChart({ stats, color, labels }: RadarChartProps) {
  const size = 200;
  const center = size / 2;
  const radius = size / 2 - 40;
  const angleSlice = (Math.PI * 2) / 5;

  const getPoint = (value: number, index: number) => {
    const angle = index * angleSlice - Math.PI / 2;
    const r = (value / 100) * radius;
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
  };

  const points = stats.map((val, i) => getPoint(val, i)).join(" ");
  const backgroundPoints = stats.map((_, i) => getPoint(100, i)).join(" ");

  return (
    <div className="relative flex items-center justify-center w-full h-full select-none">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Fundo (Grade) */}
        <polygon
          points={backgroundPoints}
          fill="transparent"
          className="stroke-white/20 stroke-[1px]"
        />

        {/* Linhas Radiais */}
        {stats.map((_, i) => {
          const point = getPoint(100, i).split(",");
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point[0]}
              y2={point[1]}
              className="stroke-white/20 stroke-[1px]"
            />
          );
        })}

        {/* Gráfico de Stats */}
        <motion.polygon
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          points={points}
          fill={color}
          fillOpacity={0.5}
          stroke={color}
          strokeWidth={2}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />

        {/* Labels */}
        {labels.map((label, i) => {
          const angle = i * angleSlice - Math.PI / 2;
          const r = radius + 25;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);

          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              alignmentBaseline="middle"
              className="text-[10px] uppercase font-bold tracking-widest fill-white/90 drop-shadow-md"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

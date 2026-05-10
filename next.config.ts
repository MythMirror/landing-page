/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ativa o modo estrito do React para encontrar bugs
  reactStrictMode: true,

  // Configurações do Compilador
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Otimização de Imagens
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Otimizações Experimentais (Tree Shaking forçado)
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "@react-three/drei",
      "@react-three/fiber",
      "three",
    ],
  },
};

export default nextConfig;

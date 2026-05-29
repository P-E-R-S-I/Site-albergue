import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite carregar imagens externas em desenvolvimento
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://pub-43a158751ca142c3a51b1b0baa14b50b.r2.dev/**")],
  },
};

export default nextConfig;

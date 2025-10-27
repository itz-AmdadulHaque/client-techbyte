import type { NextConfig } from "next";

const serverUrl = process.env.NEXT_PUBLIC_IMAGE_SERVER!;
const { hostname } = new URL(serverUrl);

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname,
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default config;

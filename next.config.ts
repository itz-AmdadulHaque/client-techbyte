// import type { NextConfig } from "next";

// const serverUrl = process.env.NEXT_PUBLIC_IMAGE_SERVER!;
// const { hostname } = new URL(serverUrl);

// const config: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname,
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default config;


import type { NextConfig } from "next";

const serverUrl = process.env.NEXT_PUBLIC_IMAGE_SERVER!;
const { hostname } = new URL(serverUrl);

if (!serverUrl) {
  console.warn('NEXT_PUBLIC_IMAGE_SERVER environment variable is not set');
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.techvibeglobal.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Optional: Add these for better error handling
    domains: ['files.techvibeglobal.com'],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
import type { NextConfig } from 'next'
 
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-43a158751ca142c3a51b1b0baa14b50b.r2.dev',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
}
 
export default config
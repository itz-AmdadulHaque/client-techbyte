import type { NextConfig } from 'next'
 
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'domain-url.com',
        port: '',
        pathname: '/',
        search: '',
      },
    ],
  },
}
 
export default config
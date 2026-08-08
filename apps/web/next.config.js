/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure rewrites for API calls to backend container
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.INTERNAL_API_URL || 'http://api:8000'}/:path*`,
      },
    ]
  },
  // Allow external access from LAN
  env: {
    HOSTNAME: '0.0.0.0',
  },
  // Dev server blocks cross-origin requests to /_next resources by default;
  // allow the loopback aliases so http://127.0.0.1:3000 works like localhost.
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  // Next.js 16 features
  experimental: {
    // Enable optimizations for better performance
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot'],
    // Increase proxy timeout for large file uploads (5 minutes)
    proxyTimeout: 300000,
  },
}

module.exports = nextConfig
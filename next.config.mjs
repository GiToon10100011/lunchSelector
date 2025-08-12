/** @type {import('next').NextConfig} */
const isElectronBuild = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Electron 빌드시에만 static export 사용
  ...(isElectronBuild && {
    output: 'export',
    trailingSlash: true,
    distDir: 'out',
  }),
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   domains: [`ae01.alicdn.com`,'picsum.photos','upload.wikimedia.org'],
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ae01.alicdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig

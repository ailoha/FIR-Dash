/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  /* },
  experimental: {
    serverActions: true,
    serverComponents: true,
    serverComponentsWithClient: true,
    serverComponentsExternalPackages: ['@tremor/react']
  */
  }
};

module.exports = nextConfig;

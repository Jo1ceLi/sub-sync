/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "profile.line-scdn.net",
      },
    ],
  },
};

export default nextConfig;

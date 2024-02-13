/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "profile.line-scdn.net",
      },
    ],
  },
};

export default nextConfig;

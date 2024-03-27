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
      {
        hostname: "lh3.googleusercontent.com",
      },
      {
        hostname: "drive.google.com",
      },
      {
        hostname: "scdn.line-apps.com",
      },
    ],
  },
};

export default nextConfig;

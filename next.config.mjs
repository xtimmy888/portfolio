/** @type {import('next').NextConfig} */
const nextConfig = {
  // Off so the imperative WebGL galaxy mounts once (Strict Mode double-invokes
  // effects in dev, which re-initializes the canvas and breaks one-shot reads).
  reactStrictMode: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;

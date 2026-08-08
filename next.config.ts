import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for small production Docker images (copies .next/standalone)
  output: "standalone",
};

export default nextConfig;

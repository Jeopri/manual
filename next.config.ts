import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the root to this project. Without it, Turbopack picks the highest
    // lockfile it finds — C:\Users\Administrator\package-lock.json — and then
    // watches the whole user folder, which makes dev compiles hang.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

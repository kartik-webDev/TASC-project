import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV === "production"
        ? "https://tasc-project-1.vercel.app"
        : "http://localhost:3000",
  },
};

export default nextConfig;

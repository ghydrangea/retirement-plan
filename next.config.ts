import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/retirement-plan" : undefined,
  allowedDevOrigins: ["localhost", "127.0.0.1", "172.17.96.1"],
};

export default nextConfig;

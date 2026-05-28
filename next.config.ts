import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows other devices on the local network (phones, tablets) to access the
  // dev server. Set ALLOWED_DEV_ORIGINS in .env.local — never commit IPs here.
  // Example .env.local entry:  ALLOWED_DEV_ORIGINS=192.168.1.42
  allowedDevOrigins: process.env.ALLOWED_DEV_ORIGINS
    ? process.env.ALLOWED_DEV_ORIGINS.split(',').map((s) => s.trim())
    : [],
};

export default nextConfig;

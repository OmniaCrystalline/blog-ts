/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
                            default-src 'self';
                            script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
                            style-src 'self' 'unsafe-inline' https:;
                            img-src 'self' data: blob: https:;
                            font-src 'self' https:;
                            connect-src 'self' https:;
                            frame-src 'self' https:;
                        `
              .replace(/\s+/g, " ")
              .trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "convertifyz.msvglobaltech.in",
          },
        ],
        destination: "https://convertifyz.msvglobaltech.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

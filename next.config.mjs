/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "farseit.com",
        pathname: "/Upload/ProductImage/**",
      },
    ],
  },
};

export default nextConfig;

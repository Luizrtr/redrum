/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    HOST: process.env.HOST,
    MONGODB: process.env.MONGODB,
  }
};

export default nextConfig;

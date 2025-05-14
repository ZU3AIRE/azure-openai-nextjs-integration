/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT: process.env.NEXT_PUBLIC_AZURE_OPENAI_ENDPOINT,
    NEXT_PUBLIC_AZURE_OPENAI_API_KEY: process.env.NEXT_PUBLIC_AZURE_OPENAI_API_KEY,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /*Configuraciones adicionales de variables de entorno*/
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;

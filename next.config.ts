import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Налаштування для кращої обробки змінних середовища
  env: {
    NEXT_PUBLIC_NOTEHUB_TOKEN: process.env.NEXT_PUBLIC_NOTEHUB_TOKEN,
  },

  // Оптимізація для Vercel
  experimental: {
    // Дозволяє використовувати динамічні імпорти
    esmExternals: true,
  },

  // Налаштування для обробки помилок при збірці
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;

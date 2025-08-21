import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Оптимізація зображень
  images: {
    // Дозволені зовнішні домени для зображень
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ac.goit.global",
        port: "",
        pathname: "/fullstack/react/**",
      },
      {
        protocol: "https",
        hostname: "aliiev-lomach.com",
        port: "",
        pathname: "/**",
      },
    ],
    // Формати зображень для різних браузерів
    formats: ["image/webp", "image/avif"],
    // Мінімальний розмір для lazy loading
    minimumCacheTTL: 60,
    // Налаштування для кращої продуктивності
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Оптимізація для Vercel
  experimental: {
    // Дозволяє використовувати динамічні імпорти
    esmExternals: true,
    // Тимчасово відключаємо optimizeCss через prerender помилки
    // optimizeCss: true,
    // Краща оптимізація пакетів (тимчасово відключено)
    // optimizePackageImports: ['react-icons'],
  },

  // Оптимізація CSS та JS
  compiler: {
    // Видаляє console.log в production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Зовнішні пакети для серверних компонентів (виправлено)
  serverExternalPackages: [],

  // Налаштування для обробки помилок при збірці
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Покращення продуктивності
  poweredByHeader: false,
  compress: true,
  
  // Webpack оптимізації
  webpack: (config, { dev, isServer }) => {
    // Оптимізація для production
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups.styles = {
        name: 'styles',
        test: /\.(css|scss)$/,
        chunks: 'all',
        enforce: true,
      };
    }
    return config;
  },

  // CORS налаштування
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://09-auth-mu.vercel.app",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, Cookie",
          },
          { key: "Access-Control-Allow-Credentials", value: "true" },
        ],
      },
      // Security headers
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              process.env.NODE_ENV === "development"
                ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
                : "script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; connect-src 'self' https://notehub-api.goit.study;",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      // Оптимізовані cache headers для статичних ресурсів
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/css/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Content-Type",
            value: "text/css; charset=utf-8",
          },
        ],
      },
      // Кешування для важких сторінок
      {
        source: "/notes/filter/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, must-revalidate",
          },
        ],
      },
      {
        source: "/notes/:id",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=600, must-revalidate",
          },
        ],
      },
      {
        source: "/profile",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=1800, must-revalidate",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

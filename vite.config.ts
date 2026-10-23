import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/apple-touch-icon.png", "icons/app-icon-192.png"],
      manifest: {
        id: "/home",
        name: "Starbucks Philippines",
        short_name: "Starbucks PH",
        description: "Browse Starbucks Philippines menu, merchandise, Rewards, promotions, and stores.",
        start_url: "/home",
        scope: "/",
        display: "standalone",
        display_override: ["standalone", "minimal-ui"],
        orientation: "any",
        theme_color: "#006241",
        background_color: "#faf9f5",
        categories: ["food", "lifestyle", "shopping"],
        icons: [
          {
            src: "/icons/app-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/app-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/app-icon-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        shortcuts: [
          { name: "Browse the Menu", short_name: "Menu", url: "/menu", icons: [{ src: "/icons/app-icon-192.png", sizes: "192x192" }] },
          { name: "Starbucks Rewards", short_name: "Rewards", url: "/rewards", icons: [{ src: "/icons/app-icon-192.png", sizes: "192x192" }] },
          { name: "Find a Store", short_name: "Stores", url: "/stores", icons: [{ src: "/icons/app-icon-192.png", sizes: "192x192" }] },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,otf}"],
        globIgnores: [
          "**/assets/menu/**",
          "**/assets/merchandise/**",
          "**/assets/rewards/**",
        ],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        navigateFallback: "/index.html",
        runtimeCaching: [
          {
            urlPattern: /\/assets\/(menu|merchandise|rewards)\//,
            handler: "CacheFirst",
            options: {
              cacheName: "starbucks-catalog-images-v1",
              expiration: {
                maxEntries: 430,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/assets\/about\/.*\.(jpe?g|png|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "starbucks-about-images-v1",
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/assets\/order\/.*\.(jpe?g|png|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "starbucks-order-images-v1",
              expiration: { maxEntries: 8, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/assets\/social-impact\/.*\.(jpe?g|png|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "starbucks-social-impact-images-v1",
              expiration: { maxEntries: 16, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /\/assets\/(hero|cozy-cup|fall-bites|moon-cake)\.jpg$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "starbucks-campaign-images-v1",
              expiration: { maxEntries: 12, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
});

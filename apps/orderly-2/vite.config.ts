// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import viteReact from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ command, mode }) => {
  const ENV = loadEnv(mode, process.cwd(), "");

  return {
    define: { BUILD_TIME: new Date() },
    plugins: [
      viteReact(),
      VitePWA({
        devOptions: {
          enabled: true,
          /* other options */
        },
        registerType: "autoUpdate",
        // workbox: {
        //   runtimeCaching: [
        //     {
        //       urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif|css|js|html)$/,
        //       handler: "StaleWhileRevalidate",
        //       options: {
        //         cacheName: "assets-cache",
        //         expiration: {
        //           maxEntries: 50,
        //           maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        //         },
        //       },
        //     },
        //   ],
        // },
        manifest: {
          short_name: ENV.VITE_APP_NAME,
          name: ENV.VITE_APP_NAME,
          icons: [
            {
              src: "assets/manifest-icon-192.maskable.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "assets/manifest-icon-192.maskable.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable",
            },
            {
              src: "assets/manifest-icon-512.maskable.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "assets/manifest-icon-512.maskable.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
          start_url: ".",
          display: "standalone",
          theme_color: "#ffffff",
          background_color: "#ffffff",
        },
      }),
      createHtmlPlugin({
        inject: {
          data: {
            title: ENV.VITE_APP_NAME,
            inject_metas: `<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f7f7f7" /> <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0d0d0d" /> <meta name="apple-mobile-web-app-title" media="-" content=${ENV.VITE_APP_NAME} />`,
          },
        },
      }),
    ],
    build: {
      minify: "terser",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react"],
            "react-dom": ["react-dom"],
            "react-router": ["react-router"],
            "react-router-dom": ["react-router-dom"],
            "@supabase/supabase-js": ["@supabase/supabase-js"],
            zustand: ["zustand"],
            "@ionic/react": ["@ionic/react"],
          },
        },
      },
    },
  };
});

// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import viteReact from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

export default defineConfig(({ command, mode }) => {
  const ENV = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      viteReact(),
      VitePWA({
        devOptions: {
          enabled: true,
          /* other options */
        },
        registerType: "autoUpdate",
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
  };
});

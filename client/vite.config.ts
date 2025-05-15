import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const isReplit = process.env.REPL_ID !== undefined;

export default defineConfig(async () => {
  const plugins = [react()];

  if (isReplit) {
    const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal");
    plugins.push(runtimeErrorOverlay.default());

    const cartographerModule = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographerModule.cartographer());
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname,  "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    server: {
      port: 4000,
      proxy: {
        "/api": process.env.VITE_SERVER_PATH, // Proxies API calls to backend
      },
      historyApiFallback:true
    },
    build: {
      outDir: path.resolve(import.meta.dirname, "../dist/public"),
      emptyOutDir: true,
    },
  };
});

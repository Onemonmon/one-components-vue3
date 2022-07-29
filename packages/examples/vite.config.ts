import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import md from "./plugins/md-to-component";

const resolvePath = (path: string) => resolve(__dirname, path);

export default defineConfig({
  resolve: {
    alias: {
      "@": resolvePath("src"),
    },
  },
  plugins: [md(), vue({ include: [/\.vue$/, /\.md$/] })],
  build: {
    outDir: "docs",
    rollupOptions: {},
  },
  base: "/one-components-vue3-docs",
});

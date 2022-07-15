import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import md from "./plugins/md-to-component";

const resolvePath = (path: string) => resolve(__dirname, path);
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolvePath("src"),
      "@components": resolvePath("packages"),
    },
  },
  plugins: [
    md(),
    vue({ include: [/\.vue$/, /\.md$/] }),
    dts({ include: "packages" }),
  ],
  build: {
    lib: {
      entry: resolvePath("./packages/index.ts"),
      name: "one-components",
      fileName: (format) => `one-components.${format}.js`,
    },
    rollupOptions: {
      external: ["vue", "element-plus"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});

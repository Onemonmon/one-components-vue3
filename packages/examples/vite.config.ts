import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import md from "./plugins/md-to-component";
import { visualizer } from "rollup-plugin-visualizer";

const resolvePath = (path: string) => resolve(__dirname, path);

export default ({ mode }) => {
  const __ANALYZER__ = mode === "analyzer";
  return defineConfig({
    resolve: {
      alias: {
        "@": resolvePath("src"),
      },
    },
    plugins: [
      md(),
      vue({ include: [/\.vue$/, /\.md$/] }),
      __ANALYZER__ && visualizer(),
    ],
    build: {
      outDir: "../../docs",
      rollupOptions: {},
    },
    base: "/one-components-vue3-docs",
  });
};

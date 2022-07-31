import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import md from "./plugins/md-to-component";
import { visualizer } from "rollup-plugin-visualizer";
import ElementPlus from "unplugin-element-plus/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

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
      ElementPlus(),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      __ANALYZER__ && visualizer(),
    ],
    build: {
      outDir: "../../docs",
      rollupOptions: {},
    },
    base: "/one-components-vue3-docs",
  });
};

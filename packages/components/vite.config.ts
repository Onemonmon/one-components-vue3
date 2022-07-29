import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

const resolvePath = (path: string) => resolve(__dirname, path);

export default ({ mode }: any) => {
  const __ANALYZER__ = mode === "analyzer";
  return defineConfig({
    resolve: {
      alias: {
        "@components": resolvePath("src"),
      },
    },
    plugins: [vue(), dts({ include: "src" })],
    build: {
      lib: {
        entry: resolvePath("src/index.ts"),
        name: "one-components",
        fileName: (format) => `one-components.${format}.js`,
      },
      rollupOptions: {
        input: "src/index.ts",
        external: ["vue", "element-plus"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    },
  });
};

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import md from "./plugins/md-to-component";

const resolvePath = (path: string) => resolve(__dirname, path);

export default ({ mode }) => {
  const __DEV__ = mode === "development";
  const __DOCS__ = mode === "docs";
  const lib = {
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
  };
  const docs = {
    build: {
      outDir: "docs",
      rollupOptions: {},
    },
  };
  return defineConfig({
    resolve: {
      alias: {
        "@": resolvePath("src"),
        "@components": resolvePath("packages"),
      },
    },
    plugins: [
      md(),
      vue({ include: [/\.vue$/, /\.md$/] }),
      !__DOCS__ && dts({ include: "packages" }),
    ],
    base: __DEV__
      ? "/"
      : __DOCS__
      ? "/one-components-vue3-docs"
      : "/one-components-vue3",
    ...(__DOCS__ ? docs : lib),
  });
};

import { defineConfig } from "vite";
import { resolve } from "path";

const resolvePath = (path: string) => resolve(__dirname, path);

export default () => {
  return defineConfig({
    build: {
      lib: {
        entry: resolvePath("src/index.js"),
        name: "one-components-resolver",
        fileName: (format) => `one-components-resolver.${format}.js`,
      },
    },
  });
};

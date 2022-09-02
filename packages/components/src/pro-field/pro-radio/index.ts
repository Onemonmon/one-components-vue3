import type { App } from "vue";
import ProRadio from "./src/ProRadio.vue";

ProRadio.install = function (app: App) {
  app.component("ProRadio", ProRadio);
};

export { ProRadio };

export * from "./src/ProRadio";

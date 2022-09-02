import type { App } from "vue";
import ProText from "./src/ProText.vue";

ProText.install = function (app: App) {
  app.component("ProText", ProText);
};

export { ProText };

export * from "./src/ProText";

import type { App } from "vue";
import ProCheckbox from "./src/ProCheckbox.vue";

ProCheckbox.install = function (app: App) {
  app.component("ProCheckbox", ProCheckbox);
};

export { ProCheckbox };

export * from "./src/ProCheckbox";

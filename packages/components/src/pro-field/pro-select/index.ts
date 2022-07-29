import type { App } from "vue";
import ProSelect from "./src/ProSelect.vue";

ProSelect.install = function (app: App) {
  app.component("ProSelect", ProSelect);
};

export { ProSelect };
export * from "./src/ProSelect";

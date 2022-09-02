import type { App } from "vue";
import ProInput from "./src/ProInput.vue";

ProInput.install = function (app: App) {
  app.component("ProInput", ProInput);
};

export { ProInput };

export * from "./src/ProInput";

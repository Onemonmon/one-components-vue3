import type { App } from "vue";
import ProFormItem from "./src/ProFormItem.vue";

ProFormItem.install = function (app: App) {
  app.component("ProFormItem", ProFormItem);
};

export { ProFormItem };

export * from "./src/ProFormItem";

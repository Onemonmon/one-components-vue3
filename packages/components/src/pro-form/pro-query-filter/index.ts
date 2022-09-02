import type { App } from "vue";
import ProQueryFilter from "./src/ProQueryFilter.vue";

ProQueryFilter.install = function (app: App) {
  app.component("ProQueryFilter", ProQueryFilter);
};

export { ProQueryFilter };

export * from "./src/ProQueryFilter";

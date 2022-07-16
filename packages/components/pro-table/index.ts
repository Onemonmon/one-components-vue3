import type { App } from "vue";
import ProTable from "./src/ProTable.vue";

ProTable.install = function (app: App) {
  app.component("ProTable", ProTable);
};

export { ProTable };

export * from "./src/ProTable";

import type { App } from "vue";
import CustomRender from "./src/CustomRender.vue";

CustomRender.install = function (app: App) {
  app.component("CustomRender", CustomRender);
};

export { CustomRender };

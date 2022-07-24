import { App } from "vue";
import {
  CustomRender,
  ProTable,
  ProQueryFilter,
  ProInput,
  ProRadio,
  ProCheckbox,
  ProSelect,
  ProText,
} from "./components";

const components: Record<string, any> = {
  CustomRender,
  ProTable,
  ProQueryFilter,
  ProInput,
  ProRadio,
  ProCheckbox,
  ProSelect,
  ProText,
};
function install(app: App) {
  Object.keys(components).forEach((n) => app.component(n, components[n]));
}

export * from "./components";
export * from "./shared/src";
export default { install };

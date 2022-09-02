import { CustomRender } from "./common";
import {
  ProInput,
  ProRadio,
  ProCheckbox,
  ProSelect,
  ProText,
} from "./pro-field";
import { ProTable } from "./pro-table";
import { ProQueryFilter } from "./pro-form";
import type { App } from "vue";

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

export * from "./common";
export * from "./pro-field";
export * from "./pro-table";
export * from "./pro-form";
export * from "./shared";
export default { install };

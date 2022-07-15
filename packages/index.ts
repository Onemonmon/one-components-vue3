import { App } from "vue";
import { ProInput, ProRadio, ProSelect, ProText } from "./components";

const components: Record<string, any> = {
  ProInput,
  ProRadio,
  ProSelect,
  ProText,
};
function install(app: App) {
  Object.keys(components).forEach((n) => app.component(n, components[n]));
}

export * from "./components";
export * from "./shared/src";
export default { install };

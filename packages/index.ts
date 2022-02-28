import { App } from "vue";
import { ProInput } from "./pro-field";

const components: Record<string, any> = {
  ProInput,
};
function install(app: App) {
  Object.keys(components).forEach((n) => app.component(n, components[n]));
}

export * from "./pro-field";
export default { install };

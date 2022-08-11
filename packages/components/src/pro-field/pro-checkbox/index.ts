import { withInstall, WithInstallType } from "@components/shared";
import _ProCheckbox from "./src/ProCheckbox.vue";

const ProCheckbox: WithInstallType<typeof _ProCheckbox> =
  withInstall(_ProCheckbox);

export { ProCheckbox, ProCheckbox as default };

export * from "./src/ProCheckbox";

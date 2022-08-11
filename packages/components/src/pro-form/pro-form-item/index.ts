import { withInstall, WithInstallType } from "@components/shared";
import _ProFormItem from "./src/ProFormItem.vue";

const ProFormItem: WithInstallType<typeof _ProFormItem> =
  withInstall(_ProFormItem);

export { ProFormItem, ProFormItem as default };

export * from "./src/ProFormItem";

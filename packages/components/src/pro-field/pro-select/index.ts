import { withInstall, WithInstallType } from "@components/shared";
import _ProSelect from "./src/ProSelect.vue";

const ProSelect: WithInstallType<typeof _ProSelect> = withInstall(_ProSelect);

export { ProSelect, ProSelect as default };

export * from "./src/ProSelect";

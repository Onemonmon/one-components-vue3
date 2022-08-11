import { withInstall, WithInstallType } from "@components/shared";
import _ProInput from "./src/ProInput.vue";

const ProInput: WithInstallType<typeof _ProInput> = withInstall(_ProInput);

export { ProInput, ProInput as default };
export * from "./src/ProInput";

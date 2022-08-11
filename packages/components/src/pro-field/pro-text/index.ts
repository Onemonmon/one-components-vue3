import { withInstall, WithInstallType } from "@components/shared";
import _ProText from "./src/ProText.vue";

const ProText: WithInstallType<typeof _ProText> = withInstall(_ProText);

export { ProText, ProText as default };

export * from "./src/ProText";

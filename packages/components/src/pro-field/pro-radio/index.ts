import { withInstall, WithInstallType } from "@components/shared";
import _ProRadio from "./src/ProRadio.vue";

const ProRadio: WithInstallType<typeof _ProRadio> = withInstall(_ProRadio);

export { ProRadio, ProRadio as default };

export * from "./src/ProRadio";

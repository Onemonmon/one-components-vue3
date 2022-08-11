import { withInstall, WithInstallType } from "@components/shared";
import _ProQueryFilter from "./src/ProQueryFilter.vue";

const ProQueryFilter: WithInstallType<typeof _ProQueryFilter> =
  withInstall(_ProQueryFilter);

export { ProQueryFilter, ProQueryFilter as default };

export * from "./src/ProQueryFilter";

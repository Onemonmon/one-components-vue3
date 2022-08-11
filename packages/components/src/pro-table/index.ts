import { withInstall, WithInstallType } from "@components/shared";
import _ProTable from "./src/ProTable.vue";

const ProTable: WithInstallType<typeof _ProTable> = withInstall(_ProTable);

export { ProTable, ProTable as default };

export * from "./src/ProTable";
export * from "./src/ProTableColumn";

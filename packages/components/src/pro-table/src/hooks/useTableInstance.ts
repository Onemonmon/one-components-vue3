import { nextTick, onMounted, Ref } from "vue";
import type { ProTableInstance, ProTablePropsType } from "../ProTable";

const useTableInstance = (
  props: ProTablePropsType,
  innerTableRef: Ref<ProTableInstance | null>,
  columnParmas: Ref<any>,
  getTableDataByParams: () => Promise<void>
) => {
  // 清楚过滤条件
  const handleClear = () => {
    if (innerTableRef.value) {
      innerTableRef.value.clearFilter();
      innerTableRef.value.clearSort();
      innerTableRef.value.clearSelection();
    }
    if (Object.keys(columnParmas.value).length) {
      columnParmas.value = {};
    }
  };
  onMounted(() => {
    innerTableRef.value!.reloadData = getTableDataByParams;
    innerTableRef.value!.clear = handleClear;
    nextTick(() => {
      if (props.getTableRef) {
        props.getTableRef(innerTableRef.value!);
      }
    });
  });
};

export default useTableInstance;

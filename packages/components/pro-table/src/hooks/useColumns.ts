import { ref, watch } from "vue";
import cloneDeep from "lodash/cloneDeep";
import type { ProTablePropsType } from "../ProTable";
import type { InnerProTableColumnPropsType } from "../ProTableColumn";

/**
 * 解析表格列 { prop, label, valueType, ... } 转换成 { columnProps: { prop, label, ... }, valueType, ... }
 */
const parseColumns = (columns: any[], parentEditable: boolean = true) => {
  for (let i = 0; i < columns.length; i++) {
    const {
      valueType = "text",
      fieldProps,
      options,
      params,
      request,
      editable = true,
      formatConfig,
      columnHeaderSlotName,
      columnDefaultSlotName,
      children,
      operations,
      ...columnProps
    } = columns[i];
    if (columnProps.prop === undefined) {
      console.error("表格列的prop为必填属性");
      return [];
    }
    if (children && children.length) {
      parseColumns(children, editable);
    }
    columns[i] = {
      valueType,
      fieldProps,
      options,
      params,
      request,
      editable: editable !== false && parentEditable !== false,
      formatConfig,
      columnHeaderSlotName,
      columnDefaultSlotName,
      children,
      columnProps,
      operations,
    } as InnerProTableColumnPropsType;
  }
  return columns;
};

const useColumns = (props: ProTablePropsType) => {
  const innerColumns = ref<any[]>([]);

  watch(
    () => props.columns,
    (val) => {
      const cloneColumns = cloneDeep(val);
      innerColumns.value = parseColumns(cloneColumns);
      console.log("props.columns", innerColumns.value);
    },
    { immediate: true, deep: true }
  );

  return innerColumns;
};

export default useColumns;

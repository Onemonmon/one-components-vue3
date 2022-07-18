import { ref, watch } from "vue";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import type { ProTablePropsType } from "../ProTable";
import type { InnerProTableColumnPropsType } from "../ProTableColumn";

/**
 * 解析表格列 { prop, label, valueType, ... } 转换成 { columnProps: { prop, label, ... }, valueType, ... }
 */
const notNeedFlatProps = ["selection", "index", "expand", "operations"];
const notNeedKeys = ["selection", "expand"];
const parseColumns = (
  columns: any[],
  flatColumns: any[],
  settingKeys: string[], // 获取列设置中的所有key
  defaultCheckedKeys: string[],
  parentEditable: boolean = true,
  parentHideBySetting: boolean = false
) => {
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
      hideInTable,
      hideBySetting,
      children,
      operations,
      ...columnProps
    } = columns[i];
    if (columnProps.prop === undefined) {
      console.error("表格列的prop为必填属性");
      return [];
    }
    if (children && children.length) {
      parseColumns(
        children,
        flatColumns,
        settingKeys,
        defaultCheckedKeys,
        editable,
        hideBySetting
      );
    }
    const newColumn = {
      label: columnProps.label,
      prop: columnProps.prop,
      valueType,
      fieldProps,
      options,
      params,
      request,
      editable: editable !== false && parentEditable !== false,
      formatConfig,
      columnHeaderSlotName,
      columnDefaultSlotName,
      hideInTable,
      // 没传入label和prop、不在表格中展示，则不展示在列设置中
      hideInSetting: !columnProps.label || !columnProps.prop || hideInTable,
      // 点击列设置中的节点后会设置为true，然后隐藏对应表格列
      hideBySetting: hideBySetting || parentHideBySetting,
      children,
      columnProps,
      operations,
    } as InnerProTableColumnPropsType;
    // 这些列不需要扁平
    if (!notNeedFlatProps.includes(columnProps.type)) {
      flatColumns.push(newColumn);
    }
    if (!notNeedKeys.includes(columnProps.type) && !hideInTable) {
      settingKeys.push(columnProps.prop);
      // 注：当父级没设置hideBySetting，但子级设置了hideBySetting=true，那么父级不应被选中
      if (!newColumn.hideBySetting) {
        if (
          !newColumn.children ||
          (newColumn.children &&
            newColumn.children.filter((n) => n.hideBySetting).length === 0)
        ) {
          defaultCheckedKeys.push(columnProps.prop);
        }
      }
    }
    columns[i] = newColumn;
  }
  return columns;
};

const useColumns = (props: ProTablePropsType) => {
  const innerColumns = ref<any[]>([]);
  // 将列扁平化
  const flatColumns = ref<any[]>([]);
  // 列设置所有树节点的keys
  const settingKeys = ref<string[]>([]);
  // 默认展示的列集合
  const defaultCheckedKeys = ref<string[]>([]);
  watch(
    () => props.columns,
    (val) => {
      const cloneColumns = cloneDeep(val);
      const _flatColumns: any[] = [];
      const _settingKeys: string[] = [];
      const _defaultCheckedKeys: string[] = [];
      innerColumns.value = parseColumns(
        cloneColumns,
        _flatColumns,
        _settingKeys,
        _defaultCheckedKeys
      );
      flatColumns.value = _flatColumns;
      if (!isEqual(settingKeys.value, _settingKeys)) {
        settingKeys.value = _settingKeys;
      }
      if (!isEqual(defaultCheckedKeys.value, _defaultCheckedKeys)) {
        defaultCheckedKeys.value = _defaultCheckedKeys;
      }
    },
    { immediate: true, deep: true }
  );

  return { innerColumns, flatColumns, settingKeys, defaultCheckedKeys };
};

export default useColumns;

import { capitalize, ref, watch } from "vue";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import type { ProTablePropsType } from "../ProTable";
import type {
  InnerProTableColumnPropsType,
  ProTableColumnPropsType,
} from "../ProTableColumn";
import type { FormItemRule } from "element-plus";
import { stringify } from "querystring";

/**
 * 解析表格列 { prop, label, valueType, ... } 转换成 { columnProps: { prop, label, ... }, valueType, ... }
 */
const notNeedFlatProps = ["selection", "index", "expand", "operations"];
const notNeedKeys = ["selection", "expand"];
const parseColumns = (
  columns: any[],
  flatColumns: any[],
  validatorRules: Record<string, FormItemRule[]>,
  settingKeys: string[], // 获取列设置中的所有key
  defaultCheckedKeys: string[],
  propToRequestPropMap: Map<string, string>,
  parentEditable: boolean = true,
  parentHideBySetting: boolean = false
) => {
  for (let i = 0; i < columns.length; i++) {
    const {
      requestProp,
      valueType = "text",
      fieldProps,
      formProps, // 这边应该要收集需要表单校验的项和表单校验内容
      tip,
      copyable,
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
      // 以下参数只有过滤器用到
      qfLabelSlotName,
      qfDefaultSlotName,
      qfSpan,
      qfHideInForm,
      ...columnProps
    } = columns[i] as ProTableColumnPropsType;
    if (columnProps.prop === undefined) {
      console.error("表格列的prop为必填属性");
      return [];
    }
    if (requestProp) {
      propToRequestPropMap.set(columnProps.prop, requestProp);
    }
    // 收集表格内部的校验规则
    if (!hideInTable && formProps && formProps.rules) {
      validatorRules[columnProps.prop] = Array.isArray(formProps.rules)
        ? formProps.rules
        : [formProps.rules];
    }
    if (children && children.length) {
      parseColumns(
        children,
        flatColumns,
        validatorRules,
        settingKeys,
        defaultCheckedKeys,
        propToRequestPropMap,
        editable,
        hideBySetting
      );
    }
    const newColumn = {
      label: columnProps.label,
      prop: columnProps.prop,
      requestProp,
      valueType,
      fieldProps,
      formProps,
      tip,
      copyable,
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
      columnProps,
      operations,
    } as InnerProTableColumnPropsType;
    children && (newColumn.children = children);
    // 这些列不需要扁平
    const columnType = columnProps.type || "";
    if (!notNeedFlatProps.includes(columnType) && !children) {
      // qf开头的参数只有过滤器用到
      const qfProps: any = {
        prop: requestProp || columnProps.prop,
        labelSlotName: qfLabelSlotName,
        defaultSlotName: qfDefaultSlotName,
        span: qfSpan,
        hideInForm: qfHideInForm,
      };
      flatColumns.push({ ...newColumn, ...qfProps });
    }
    if (!notNeedKeys.includes(columnType) && !hideInTable) {
      settingKeys.push(columnProps.prop);
      // 注：当父级没设置hideBySetting，但子级设置了hideBySetting=true，那么父级不应被选中
      if (!newColumn.hideBySetting) {
        if (
          !children ||
          (children && children.filter((n) => n.hideBySetting).length === 0)
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
  // 将列扁平化,顾过滤器使用
  const flatColumns = ref<any[]>([]);
  // 表格字段校验规则
  const validatorRules = ref<Record<string, FormItemRule[]>>({});
  // 列设置所有树节点的keys
  const settingKeys = ref<string[]>([]);
  // 默认展示的列集合
  const defaultCheckedKeys = ref<string[]>([]);
  const propToRequestPropMap: Map<string, string> = new Map();
  watch(
    () => props.columns,
    (val) => {
      const cloneColumns = cloneDeep(val);
      const _flatColumns: any[] = [];
      const _validatorRules: Record<string, FormItemRule[]> = {};
      const _settingKeys: string[] = [];
      const _defaultCheckedKeys: string[] = [];
      innerColumns.value = parseColumns(
        cloneColumns,
        _flatColumns,
        _validatorRules,
        _settingKeys,
        _defaultCheckedKeys,
        propToRequestPropMap
      );
      flatColumns.value = _flatColumns;
      if (!isEqual(validatorRules.value, _validatorRules)) {
        validatorRules.value = _validatorRules;
      }
      if (!isEqual(settingKeys.value, _settingKeys)) {
        settingKeys.value = _settingKeys;
      }
      if (!isEqual(defaultCheckedKeys.value, _defaultCheckedKeys)) {
        defaultCheckedKeys.value = _defaultCheckedKeys;
      }
    },
    { immediate: true, deep: true }
  );

  return {
    innerColumns,
    flatColumns,
    validatorRules,
    settingKeys,
    defaultCheckedKeys,
    propToRequestPropMap,
  };
};

export default useColumns;

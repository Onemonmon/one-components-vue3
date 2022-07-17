<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
import {
  getValueByComplexKey,
  Data,
  getComponentByType,
  ValueType,
  propsHasOptions,
  setValueByComplexKey,
  FormatConfigType,
} from "@components/shared/src";
import type { ProFieldPropsType } from "@components/components/pro-field";
import type { InnerEditableConfigType } from "./ProTable";

const props = defineProps({
  /**
   * 当前行数据
   */
  row: {
    type: Object as PropType<Data>,
    defalut: () => ({}),
    required: true,
  },
  /**
   * 当前列字段
   */
  prop: {
    type: String,
    required: true,
  },
  /**
   * 当前表头列的单元格渲染的组件类型
   */
  valueType: {
    type: String as PropType<ValueType>,
    default: "text",
  },
  /**
   * valueType对应的组件的原生入参
   */
  fieldProps: {
    type: Object as PropType<ProFieldPropsType>,
  },
  /**
   * 当前表头列数据是否可编辑
   */
  editable: {
    type: Boolean,
  },
  /**
   * 只读态的配置
   */
  formatConfig: {
    type: Object as PropType<FormatConfigType>,
    default: () => ({}),
  },
  /**
   * 编辑表格配置
   */
  editableConfig: {
    type: Object as PropType<InnerEditableConfigType>,
    default: () => ({}),
  },
  ...propsHasOptions,
});

const ComponentName = getComponentByType(props.valueType);
const rowProxy = new Proxy(props.row, {
  get(target, key) {
    if (key === "__v_isRef") {
      return target.__v_isRef;
    }
    return getValueByComplexKey(target, key as string);
  },
  set(target, key, value) {
    setValueByComplexKey(target, key as string, value);
    props.editableConfig.onValuesChange(target, key as string, value);
    return true;
  },
});
</script>

<template>
  <component
    v-model="rowProxy[prop]"
    :fieldProps="fieldProps"
    :editable="editable && editableConfig.editableKeys.has(row.$rowKey)"
    :formatConfig="formatConfig"
    :options="options"
    :params="params"
    :request="request"
    :is="ComponentName"
  />
</template>

<style lang="scss" scoped></style>

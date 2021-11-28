<template>
  <el-select
    :loading="innerOptions.loading"
    class="pro-select"
    v-model="value"
    v-bind="innerFieldProps"
    v-if="editable"
  >
    <template v-for="option in innerOptions.options">
      <el-option-group
        :label="option.label"
        :disabled="option.disabled"
        :key="option.label"
        v-if="option.children && option.children.length"
      >
        <el-option
          v-bind="cOption"
          :key="cOption.value"
          v-for="cOption in option.children"
        />
      </el-option-group>
      <el-option v-bind="option" v-else :key="option.value" />
    </template>
  </el-select>
  <ProText
    :value="value"
    :options="innerOptions.options"
    :format-config="formatConfig"
    v-else
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import ProText from "./ProText.vue";
import { useModelValue, useOptions } from "./hooks";
import type { FormatConfigType } from "./type";
import type { OptionNodeType, RequestOptionsFunctionType } from "../type";
import type { ComponentSize, SelectPropsType } from "../element-type";

type ValueType = string | number | boolean | string[] | number[] | boolean[];
export default defineComponent({
  name: "ProSelect",
  components: { ProText },
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array] as PropType<ValueType>,
    },
    fieldProps: {
      type: Object as PropType<SelectPropsType>,
    },
    options: {
      type: Array as PropType<OptionNodeType[]>,
    },
    params: {
      type: Object,
    },
    request: {
      type: Function as PropType<RequestOptionsFunctionType>,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    formatConfig: {
      type: Object as PropType<FormatConfigType>,
    },
  },
  setup(props, context) {
    const value = useModelValue<ValueType>(props, context);
    const innerFieldProps = computed(() => ({
      placeholder: "请选择",
      size: "small" as ComponentSize,
      clearable: true,
      collapseTags: true,
      ...props.fieldProps,
    }));
    const innerOptions = useOptions(props);
    return { value, innerFieldProps, innerOptions };
  },
});
</script>

<style lang="scss" scoped></style>

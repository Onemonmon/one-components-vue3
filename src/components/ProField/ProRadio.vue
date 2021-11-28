<template>
  <el-radio-group
    class="pro-radio"
    v-model="value"
    v-bind="innerFieldProps.radioGroupProps"
    v-if="editable"
  >
    <component
      v-bind="{ ...option, label: option.value, ...innerFieldProps.radioProps }"
      v-for="option in innerOptions.options"
      :key="option.value"
      :is="
        innerFieldProps.radioProps.type === 'radioButton'
          ? 'el-radio-button'
          : 'el-radio'
      "
    >
      {{ option.label }}
    </component>
  </el-radio-group>
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
import type { ProRadioFieldPropsType, FormatConfigType } from "./type";
import type { OptionNodeType, RequestOptionsFunctionType } from "../type";
import type { ComponentSize } from "../element-type";

type ValueType = string | number | boolean;

export default defineComponent({
  name: "ProSelect",
  components: { ProText },
  props: {
    modelValue: {
      type: [String, Number, Boolean] as PropType<ValueType>,
    },
    fieldProps: {
      type: Object as PropType<ProRadioFieldPropsType>,
      default: () => ({}),
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
      radioGroupProps: {
        size: "small" as ComponentSize,
        ...props.fieldProps.radioGroupProps,
      },
      radioProps: {
        type: "radio",
        ...props.fieldProps.radioProps,
      },
    }));
    const innerOptions = useOptions(props);
    return { value, innerFieldProps, innerOptions };
  },
});
</script>

<style lang="scss">
.pro-radio {
  min-height: 32px;
  .el-radio {
    margin-right: 10px;
  }
  .el-radio__label {
    padding-left: 4px;
  }
}
</style>

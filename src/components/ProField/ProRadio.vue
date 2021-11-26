<template>
  <el-radio-group
    class="pro-radio"
    v-model="value"
    v-bind="innerFieldProps"
    v-if="editable"
  >
    <el-radio
      v-bind="{ ...option, label: option.value }"
      v-for="option in innerOptions.options"
      :key="option.value"
    >
      {{ option.label }}
    </el-radio>
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
import type {
  FormatConfigType,
  OptionNodeType,
  RequestOptionsFunctionType,
  RadioGroupPropsType,
  ComponentSize,
} from "./type";

export default defineComponent({
  name: "ProSelect",
  components: { ProText },
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array],
    },
    fieldProps: {
      type: Object as PropType<RadioGroupPropsType>,
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
    const value = useModelValue<any>(props, context);
    const innerFieldProps = computed(() => ({
      size: "small" as ComponentSize,
      ...props.fieldProps,
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

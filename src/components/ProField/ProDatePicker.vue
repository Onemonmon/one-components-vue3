<template>
  <component
    v-model="value"
    class="pro-date-picker"
    v-bind="innerFieldProps"
    :is="innerFieldProps.type === 'time' ? 'el-time-picker' : 'el-date-picker'"
    v-if="editable"
  />
  <ProText v-else :value="value" :format-config="formatConfig" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import ProText from "./ProText.vue";
import { useModelValue } from "./hooks";
import type { FormatConfigType } from "./type";
import type {
  ComponentSize,
  DatePickerPropsType,
  DatePickerType,
} from "../element-type";

type ValueType = string | Date | Date[];
const formatMaps: Record<DatePickerType, string> = {
  year: "YYYY",
  month: "MM",
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm:ss",
  week: "",
  daterange: "YYYY-MM-DD",
  datetimerange: "YYYY-MM-DD HH:mm:ss",
  monthrange: "MM",
  time: "HH:mm:ss",
};
export default defineComponent({
  name: "ProInput",
  components: { ProText },
  props: {
    modelValue: {
      type: [String, Date, Array] as PropType<ValueType>,
    },
    fieldProps: {
      type: Object as PropType<DatePickerPropsType>,
      default: () => ({}),
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
    const innerFieldProps = computed<DatePickerPropsType>(() => ({
      size: "small" as ComponentSize,
      clearable: true,
      placeholder: "请选择",
      startPlaceholder: "请选择",
      endPlaceholder: "请选择",
      ...props.fieldProps,
    }));
    return { value, innerFieldProps };
  },
});
</script>

<style lang="scss" scoped></style>

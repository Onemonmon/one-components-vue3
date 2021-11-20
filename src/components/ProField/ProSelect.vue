<template>
  <el-select v-if="editable" v-model="value" v-bind="innerFieldProps">
    <el-option v-for="option in options" :key="option.value" v-bind="option" />
  </el-select>
  <ProText
    v-else
    :value="value"
    :options="options"
    :format-config="formatConfig"
  />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import ProText from "./ProText.vue";
import { useModelValue } from "./hooks";
import type { FormatConfig, OptionNode, RequestOptions } from "./type";

export default defineComponent({
  name: "ProSelect",
  components: { ProText },
  props: {
    modelValue: {
      type: [String, Number, Boolean, Array],
    },
    fieldProps: {
      type: Object,
    },
    options: {
      type: Array as PropType<OptionNode[]>,
      required: true,
    },
    params: {
      type: Object,
    },
    request: {
      type: Function as PropType<RequestOptions>,
    },
    editable: {
      type: Boolean,
      default: true,
    },
    formatConfig: {
      type: Object as PropType<FormatConfig>,
    },
  },
  setup(props, context) {
    const value = useModelValue<any>(props, context);
    const innerFieldProps = computed(() => ({
      placeholder: "请选择",
      clearable: true,
      collapseTags: true,
      ...props.fieldProps,
    }));
    return { value, innerFieldProps };
  },
});
</script>

<style lang="less" scoped></style>

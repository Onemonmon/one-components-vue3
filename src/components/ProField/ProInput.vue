<template>
  <el-input v-if="editable" v-model="value" v-bind="innerFieldProps" />
  <ProText v-else :value="value" :format-config="formatConfig" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import ProText from "./ProText.vue";
import { useModelValue } from "./hooks";
import type { FormatConfig } from "./type";

export default defineComponent({
  name: "ProInput",
  components: { ProText },
  props: {
    modelValue: {
      type: [String, Number],
    },
    fieldProps: {
      type: Object,
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
    const value = useModelValue<string | number>(props, context);
    const innerFieldProps = computed(() => ({
      placeholder: "请输入",
      clearable: true,
      ...props.fieldProps,
    }));
    return { value, innerFieldProps };
  },
});
</script>

<style lang="less" scoped></style>

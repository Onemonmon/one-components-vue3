<script lang="ts" setup>
import { computed } from "vue";
import { ElInput, ElInputNumber } from "element-plus";
import { useModelValue } from "@components/shared";
import { useValidate } from "../../hooks";
import { ProText } from "../../pro-text";
import proInputProps, { ProInputValueType } from "./ProInput";

const props = defineProps(proInputProps);
const emits = defineEmits(["update:modelValue"]);
const innerValue = useModelValue<ProInputValueType>({ props, emits });
const { handleInput, handleBlur } = useValidate(props, innerValue);
const innerFieldProps = computed<any>(() => ({
  type: "text",
  placeholder: "请输入",
  clearable: true,
  controlsPosition: "right",
  ...props.fieldProps,
}));
const ComponentName = computed(() =>
  innerFieldProps.value.type === "number" ? ElInputNumber : ElInput
);
</script>

<template>
  <component
    v-model="innerValue"
    class="pro-input-container"
    v-bind="innerFieldProps"
    :onInput="handleInput"
    :onBlur="handleBlur"
    :is="ComponentName"
    v-if="editable"
  >
    <template #prefix v-if="$slots.prefix">
      <slot name="prefix"></slot>
    </template>
    <template #suffix v-if="$slots.suffix">
      <slot name="suffix"></slot>
    </template>
    <template #prepend v-if="$slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <template #append v-if="$slots.append">
      <slot name="append"></slot>
    </template>
  </component>
  <pro-text :value="innerValue" :format-config="formatConfig" v-else />
</template>

<style lang="scss" scoped>
.pro-input-container {
  &.el-input-number.is-controls-right {
    :deep(.el-input__inner) {
      text-align: left;
    }
  }
}
</style>

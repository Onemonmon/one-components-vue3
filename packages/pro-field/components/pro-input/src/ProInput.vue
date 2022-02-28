<script lang="ts" setup>
import { computed } from "vue";
import { useModelValue } from "../../../../hooks";
import proInputProps from "./ProInput";
import { ProText } from "../../pro-text";
import type { ProInputValueType } from "./ProInput";

const props = defineProps(proInputProps);
const emits = defineEmits(["update:modelValue"]);
const innerValue = useModelValue<ProInputValueType>(props, emits);
const innerFieldValue = computed<any>(() => ({
  placeholder: "请输入",
  clearable: true,
  ...props.fieldProps,
}));
</script>

<template>
  <el-input v-model="innerValue" v-bind="innerFieldValue" v-if="editable" />
  <pro-text :value="innerValue" :format-config="formatConfig" v-else />
</template>

<style lang="scss" scoped></style>

<script lang="ts">
export default { name: "ProRadio" };
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { ElRadio, ElRadioButton, ElRadioGroup } from "element-plus";
import { useModelValue } from "@components/shared";
import { ProText } from "../../pro-text";
import proRadioProps, { ProRadioValueType } from "./ProRadio";
import { useOptions } from "../../hooks";

const props = defineProps(proRadioProps);
const emits = defineEmits(["update:modelValue"]);
const innerValue = useModelValue<ProRadioValueType>({ props, emits });
const innerFieldProps = computed<any>(() => ({
  type: props.fieldProps.type,
  radio: props.fieldProps.radio,
  radioGroup: props.fieldProps.radioGroup,
}));
const requestOptions = useOptions(props);
const ComponentName = computed(() =>
  innerFieldProps.value.type === "button" ? ElRadioButton : ElRadio
);
</script>

<template>
  <el-radio-group
    class="pro-radio-container"
    v-model="innerValue"
    v-bind="innerFieldProps.radioGroup"
    v-if="editable"
  >
    <component
      v-bind="innerFieldProps.radio"
      :label="option.value"
      :is="ComponentName"
      :key="option.value"
      v-for="option in requestOptions.options"
    >
      {{ option.label }}
    </component>
  </el-radio-group>
  <pro-text
    :value="innerValue"
    :options="requestOptions.options"
    :format-config="formatConfig"
    v-else
  />
</template>

<style lang="scss" scoped>
.pro-radio-container {
  display: flex;
  .el-radio {
    margin-right: 24px;
  }
}
</style>

<script lang="ts" setup>
import { computed, reactive, watch } from "vue";
import { useModelValue } from "@components/shared";
import { ProText } from "../../pro-text";
import proCheckboxProps, { ProCheckboxValueType } from "./ProCheckbox";
import { useOptions, useValidate } from "../../hooks";

const props = defineProps(proCheckboxProps);
const emits = defineEmits(["update:modelValue"]);
const innerValue = useModelValue<ProCheckboxValueType>({ props, emits });
const checkAllStatus = reactive({ checked: false, indeterminate: false });
const innerFieldProps = computed<any>(() => ({
  type: props.fieldProps.type,
  checkAll: props.fieldProps.checkAll,
  checkbox: props.fieldProps.checkbox,
  checkboxGroup: props.fieldProps.checkboxGroup,
}));
const { handleChange } = useValidate(props, innerValue);
const requestOptions = useOptions(props);
const allValue = computed(() => requestOptions.options.map((n) => n.value));
// 选项改变
watch(
  innerValue,
  (val) => {
    if (innerFieldProps.value.checkAll) {
      checkAllStatus.checked = val.length === requestOptions.options.length;
      checkAllStatus.indeterminate =
        val.length > 0 && val.length < requestOptions.options.length;
    }
  },
  { immediate: true }
);
// 全选
const handleCheckAllChange = (value: any) => {
  checkAllStatus.checked = value;
  checkAllStatus.indeterminate = false;
  innerValue.value = value ? allValue.value : [];
  handleChange();
};
</script>

<template>
  <div class="pro-checkbox-container" v-if="editable">
    <el-checkbox
      v-model="checkAllStatus.checked"
      :indeterminate="checkAllStatus.indeterminate"
      :onChange="handleCheckAllChange"
      v-if="innerFieldProps.checkAll"
    >
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="innerValue"
      v-bind="innerFieldProps.checkboxGroup"
      :onChange="handleChange"
    >
      <component
        v-bind="innerFieldProps.checkbox"
        :label="option.value"
        :is="
          innerFieldProps.type === 'button'
            ? 'el-checkbox-button'
            : 'el-checkbox'
        "
        :key="option.value"
        v-for="option in requestOptions.options"
      >
        {{ option.label }}
      </component>
    </el-checkbox-group>
  </div>
  <pro-text
    :value="innerValue"
    :options="requestOptions.options"
    :format-config="formatConfig"
    v-else
  />
</template>

<style lang="scss" scoped>
.pro-checkbox-container {
  display: flex;
  .el-checkbox {
    margin-right: 24px;
  }
}
</style>

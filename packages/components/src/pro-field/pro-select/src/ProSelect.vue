<script lang="ts">
export default { name: "ProSelect" };
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { ElSelect, ElOption, ElOptionGroup } from "element-plus";
import { useModelValue } from "@components/shared";
import { ProText } from "../../pro-text";
import proSelectProps, {
  ProSelectValueType,
  ProSelectFieldPropsType,
} from "./ProSelect";
import { useOptions, useValidate } from "../../hooks";

const props = defineProps(proSelectProps);
const emits = defineEmits(["update:modelValue"]);
const innerValue = useModelValue<ProSelectValueType>({ props, emits });
const innerFieldProps = computed<ProSelectFieldPropsType>(() => ({
  type: "default",
  placeholder: "请选择",
  clearable: true,
  collapseTags: true,
  collapseTagsTooltip: true,
  ...props.fieldProps,
}));
const { handleChange } = useValidate(props, innerValue);
const requestOptions = useOptions(props);
</script>

<template>
  <el-select
    class="pro-select-container"
    v-model="innerValue"
    v-bind="innerFieldProps"
    :onChange="handleChange"
    :loading="requestOptions.loading"
    v-if="editable"
  >
    <el-option-group
      :key="group.label"
      :label="group.label"
      v-for="group in requestOptions.options"
      v-if="innerFieldProps.type === 'group'"
    >
      <el-option
        v-bind="option"
        :key="option.value"
        v-for="option in group.children"
      />
    </el-option-group>
    <template v-else>
      <el-option
        v-bind="option"
        :key="option.value"
        v-for="option in requestOptions.options"
      />
    </template>
  </el-select>
  <pro-text
    :value="innerValue"
    :options="requestOptions.options"
    :format-config="formatConfig"
    v-else
  />
</template>

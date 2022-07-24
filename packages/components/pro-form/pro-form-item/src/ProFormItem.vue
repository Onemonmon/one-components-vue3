<script lang="ts" setup>
import { onUnmounted } from "vue";
import { getComponentByType, hasOwn } from "@components/shared/src";
import proFormItemProps from "./ProFormItem";
import { InfoFilled } from "@element-plus/icons-vue";

const props = defineProps(proFormItemProps);

const ComponentName = getComponentByType(props.valueType);

onUnmounted(() => {
  if (hasOwn(props.model!, props.prop!)) {
    props.model![props.prop!] = undefined;
  }
});
</script>

<template>
  <el-form-item
    v-bind="formProps"
    :label="tip ? undefined : label"
    :prop="prop"
    :key="prop"
  >
    <template #label v-if="tip">
      {{ label }}
      <el-tooltip raw-content :content="tip" placement="top">
        <el-icon class="column-header-tip-icon"><InfoFilled /></el-icon>
      </el-tooltip>
    </template>
    <component
      v-model="model![prop!]"
      :fieldProps="fieldProps"
      :formatConfig="formatConfig"
      :editable="editable"
      :options="options"
      :params="params"
      :request="request"
      :is="ComponentName"
    />
  </el-form-item>
</template>

<style lang="scss" scoped>
.pro-input-container,
.pro-select-container {
  width: 100%;
}
.column-header-tip-icon {
  align-self: center;
  cursor: pointer;
}
</style>

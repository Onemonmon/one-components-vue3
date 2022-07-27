<script lang="ts" setup>
import { watch, onUnmounted, computed } from "vue";
import { getComponentByType, hasOwn } from "@components/shared/src";
import { InfoFilled } from "@element-plus/icons-vue";
import proFormItemProps from "./ProFormItem";
import CustomRender from "../../../common/custom-render/src/CustomRender.vue";

const props = defineProps(proFormItemProps);

const ComponentName = getComponentByType(props.valueType);

const innerParams = computed(() => {
  const dep: any = {};
  props.dependencies &&
    props.dependencies.forEach((n) => (dep[n] = props.model![n]));
  return { ...dep, ...props.params };
});
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
    <template #label v-if="labelSlotName">
      <custom-render :slot="slots[labelSlotName!]" :scope="{ model, prop }" />
    </template>
    <template #label v-else-if="tip">
      {{ label }}
      <el-tooltip raw-content :content="tip" placement="top">
        <el-icon class="column-header-tip-icon"><InfoFilled /></el-icon>
      </el-tooltip>
    </template>
    <template #default v-if="defaultSlotName">
      <custom-render :slot="slots[defaultSlotName!]" :scope="{ model, prop }" />
    </template>
    <template #default v-else>
      <component
        v-model="model![prop!]"
        :fieldProps="fieldProps"
        :formatConfig="formatConfig"
        :editable="editable"
        :options="options"
        :params="innerParams"
        :request="request"
        :is="ComponentName"
      />
    </template>
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

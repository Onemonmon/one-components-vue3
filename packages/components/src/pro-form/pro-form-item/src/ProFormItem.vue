<script lang="ts" setup>
import { watch, onUnmounted, computed } from "vue";
import { extend, getComponentByType } from "@components/shared";
import { ElFormItem, ElTooltip, ElIcon } from "element-plus";
import { InfoFilled } from "@element-plus/icons-vue";
import proFormItemProps from "./ProFormItem";
import CustomRender from "../../../common/custom-render/src/CustomRender.vue";
import isEqual from "lodash/isEqual";

const props = defineProps(proFormItemProps);

const ComponentName = getComponentByType(props.valueType);

const innerParams = computed(() => {
  if (props.dependencies) {
    const dep: any = {};
    props.dependencies.forEach((n) => (dep[n] = props.model[n]));
    return extend(dep, props.params);
  }
  return props.params;
});

if (props.dependencies) {
  const dependencies = props.dependencies || [];
  const computedModel = computed(() => ({ ...props.model }));
  watch(computedModel, (newValue, oldValue) => {
    const changedKeys = [];
    for (let key in newValue) {
      if (!isEqual(newValue[key], oldValue[key])) {
        changedKeys.push(key);
      }
    }
    if (
      !changedKeys.includes(props.prop) &&
      new Set(changedKeys.concat(dependencies)).size <
        changedKeys.length + dependencies.length
    ) {
      delete props.model[props.prop];
    }
  });
}

onUnmounted(() => {
  delete props.model[props.prop];
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
      <custom-render
        :slot="slots[defaultSlotName!]"
        :scope="{ model, prop, editable, options }"
      />
    </template>
    <template #default v-else>
      <component
        v-model="model[prop]"
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

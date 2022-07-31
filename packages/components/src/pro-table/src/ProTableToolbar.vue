<script lang="ts" setup>
import { computed, nextTick, PropType, reactive, ref, unref, watch } from "vue";
import { Refresh, Brush, Setting } from "@element-plus/icons-vue";
import {
  ClickOutside as vClickOutside,
  ElTree,
  ElCheckbox,
  ElTooltip,
  ElPopover,
  ElIcon,
  ElButton,
} from "element-plus";
import type { ProTableColumnPropsType } from "./ProTableColumn";

const props = defineProps({
  /**
   * 表格列配置
   */
  columns: {
    type: Array as PropType<ProTableColumnPropsType[]>,
    default: () => [],
  },
  /**
   * 所有列的key
   */
  settingKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * 默认展示列
   */
  defaultCheckedKeys: {
    type: Array as PropType<string[]>,
  },
});
const emits = defineEmits(["reload-data", "clear"]);
// 树实例
const treeRef = ref();
// 列设置触发按钮实例
const csTriggerRef = ref();
// 列设置popper实例
const columnSettingRef = ref();
const onClickOutside = () => {
  unref(columnSettingRef).popperRef?.delayHide?.();
};
// 列设置全选
const checkAllStatus = reactive({ checked: true, indeterminate: false });
// 列设置全选
const setCheckAllStatus = () => {
  const checkedKeys = treeRef.value?.getCheckedKeys();
  checkAllStatus.checked = checkedKeys.length === props.settingKeys.length;
  checkAllStatus.indeterminate =
    checkedKeys.length > 0 && checkedKeys.length < props.settingKeys.length;
};
const innerDefaultCheckedKeys = computed(
  () => props.defaultCheckedKeys || props.settingKeys
);
watch(
  innerDefaultCheckedKeys,
  (val) => {
    nextTick(() => {
      treeRef.value?.setCheckedKeys(val);
      treeRef.value?.filter();
      setCheckAllStatus();
    });
  },
  { immediate: true }
);
// 去除一些不必展示的列，如type = selection | expand
const filterNode = (value: string, node: any) => {
  return !node.hideInSetting;
};
// 节点选中
const handleCheckChange = (
  node: any,
  checked: boolean,
  hasChildrenChecked: boolean
) => {
  const hideBySetting = !checked && !hasChildrenChecked;
  setCheckAllStatus();
  if (node.hideBySetting !== hideBySetting) {
    node.hideBySetting = hideBySetting;
  }
};
// 全选选中
const handleCheckAllChange = (checked: any) => {
  treeRef.value?.setCheckedKeys(checked ? props.settingKeys : []);
};
// 重置
const handleReset = () => {
  treeRef.value?.setCheckedKeys(innerDefaultCheckedKeys.value);
};
</script>

<template>
  <el-tooltip content="刷新" placement="top">
    <el-icon class="toolbar-icon" @click="emits('reload-data')">
      <Refresh />
    </el-icon>
  </el-tooltip>
  <el-tooltip content="清除过滤条件" placement="top">
    <el-icon class="toolbar-icon" @click="emits('clear')">
      <Brush />
    </el-icon>
  </el-tooltip>
  <el-tooltip content="列设置" placement="top">
    <el-icon
      class="toolbar-icon"
      ref="csTriggerRef"
      v-click-outside="onClickOutside"
    >
      <Setting />
    </el-icon>
  </el-tooltip>
  <el-popover
    popper-class="pro-table-setting"
    ref="columnSettingRef"
    trigger="click"
    virtual-triggering
    :virtual-ref="csTriggerRef"
    :hide-after="0"
  >
    <div class="pro-table-setting-header">
      <el-checkbox
        v-model="checkAllStatus.checked"
        :indeterminate="checkAllStatus.indeterminate"
        :onChange="handleCheckAllChange"
      >
        列设置
      </el-checkbox>
      <el-button link type="primary" @click="handleReset">重置</el-button>
    </div>
    <el-tree
      ref="treeRef"
      node-key="prop"
      show-checkbox
      default-expand-all
      :data="columns"
      :filter-node-method="filterNode"
      :onCheck-change="handleCheckChange"
    />
  </el-popover>
</template>

<style lang="scss" scoped>
.toolbar-icon {
  margin-left: 12px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>

<style lang="scss">
.el-popover.el-popper.pro-table-setting {
  padding: 0;
  .pro-table-setting-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 12px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    font-weight: 500;

    .el-checkbox .el-checkbox__label {
      line-height: unset;
    }
  }
  .el-tree {
    padding: 8px 4px;
  }
}
</style>

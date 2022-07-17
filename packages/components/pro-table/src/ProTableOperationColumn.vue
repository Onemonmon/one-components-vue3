<script lang="ts" setup>
import { computed, isReactive, PropType, ref, watch } from "vue";
import cloneDeep from "lodash/cloneDeep";
import type { TableColumnPropsType } from "@components/shared/src";
import type { ProTableOperationColumnPropsType } from "./ProTableColumn";
import type { InnerEditableConfigType } from "./ProTable";

const props = defineProps({
  /**
   * el-table-column 的入参
   */
  columnProps: {
    type: Object as PropType<TableColumnPropsType>,
    default: () => ({}),
  },
  /**
   * 操作栏
   */
  operations: {
    type: Function as PropType<
      (row: any) => ProTableOperationColumnPropsType[]
    >,
    required: true,
  },
  /**
   * 编辑表格配置
   */
  editableConfig: {
    type: Object as PropType<InnerEditableConfigType>,
    required: true,
  },
});

const backupMap = new Map();
const innerOperationsFn = ref<(row: any) => ProTableOperationColumnPropsType[]>(
  () => []
);
const saveLoading = ref(false);

const handleEdit = (row: any) => {
  props.editableConfig.editableKeys.add(row.$rowKey);
  backupMap.set(row.$rowKey, cloneDeep(row));
};
const handleCancel = (row: any) => {
  Object.assign(row, backupMap.get(row.$rowKey));
  props.editableConfig.editableKeys.delete(row.$rowKey);
};
const handleSave = async (row: any) => {
  saveLoading.value = true;
  await props.editableConfig.onSave(row);
  saveLoading.value = false;
  props.editableConfig.editableKeys.delete(row.$rowKey);
  backupMap.delete(row.$rowKey);
};

watch(
  () => props.editableConfig,
  (val) => {
    const { editable, editableKeys } = val;
    if (editable) {
      innerOperationsFn.value = (row: any) => {
        const isEditing = editableKeys.has(row.$rowKey);
        const rawOperations = isEditing ? [] : props.operations(row);
        const editableOperations: ProTableOperationColumnPropsType[] = [
          ...rawOperations,
          {
            key: "edit",
            label: "编辑",
            hide: isEditing,
            onClick: () => handleEdit(row),
          },
          {
            key: "save",
            label: "保存",
            hide: !isEditing,
            loading: saveLoading.value,
            onClick: () => handleSave(row),
          },
          {
            key: "cancel",
            label: "取消",
            hide: !isEditing,
            onClick: () => handleCancel(row),
          },
        ];
        return editableOperations;
      };
    } else {
      innerOperationsFn.value = props.operations;
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <el-table-column v-bind="columnProps">
    <template #default="{ row }">
      <template
        :key="operation.key"
        v-for="operation in innerOperationsFn(row)"
      >
        <el-button
          class="operation-btn"
          link
          type="primary"
          v-bind="operation"
          v-if="
            typeof operation.hide === 'function'
              ? !operation.hide()
              : !operation.hide
          "
        >
          {{ operation.label }}
        </el-button>
      </template>
    </template>
  </el-table-column>
</template>

<style lang="scss" scoped>
.operation-btn {
  padding: 0;
}
</style>

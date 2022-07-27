<script lang="ts" setup>
import { inject, PropType, Ref, ref, watch } from "vue";
import cloneDeep from "lodash/cloneDeep";
import Schema from "async-validator";
import {
  getValueByComplexKey,
  TableColumnPropsType,
} from "@components/shared/src";
import { ElMessage, FormItemRule } from "element-plus";
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
});

const sourceData = inject("sourceData", { data: [] as any[] });
const editableConfig = inject("editableConfig", {} as InnerEditableConfigType);
const validatorRules = inject(
  "validatorRules",
  {} as Ref<Record<string, FormItemRule[]>>
);

const backupMap = new Map();
const innerOperationsFn = ref<(row: any) => ProTableOperationColumnPropsType[]>(
  () => []
);

const handleEdit = (row: any) => {
  editableConfig.editableKeys.add(row.$rowKey);
  backupMap.set(row.$rowKey, cloneDeep(row));
};
const handleCancel = (row: any) => {
  if (row.$isNew) {
    sourceData.data = sourceData.data.filter((n) => n.$rowKey !== row.$rowKey);
  } else {
    Object.assign(row, backupMap.get(row.$rowKey));
  }
  editableConfig.editableKeys.delete(row.$rowKey);
};
// 获取需要校验的值
const getValidatorFieldValues = (row: any) => {
  let fieldValues: any = undefined;
  for (const key in validatorRules.value) {
    fieldValues = fieldValues || {};
    fieldValues[key] = getValueByComplexKey(row, key);
  }
  return fieldValues;
};
const handleSave = async (row: any) => {
  const fieldValues = getValidatorFieldValues(row);
  // 校验值
  if (fieldValues) {
    const validator = new Schema(validatorRules.value);
    try {
      await new Promise((resolve, reject) => {
        validator.validate(fieldValues, (error: any) => {
          error ? reject(error) : resolve("");
        });
      });
    } catch (error: any) {
      // 校验有错误，组装错误信息
      let errorMessage = `<div style="line-height: 20px">`;
      error.forEach((n: any) => {
        row[`$${n.field}Error`] = true;
        errorMessage += `<p>${n.message}</p>`;
      });
      errorMessage += "</div>";
      ElMessage({
        dangerouslyUseHTMLString: true,
        message: errorMessage,
        type: "warning",
      });
      return;
    }
  }
  try {
    row.$loading = true;
    if (editableConfig.onSave) {
      await editableConfig.onSave(row);
    }
    delete row.$isNew;
    editableConfig.editableKeys.delete(row.$rowKey);
    backupMap.delete(row.$rowKey);
  } finally {
    delete row.$loading;
  }
};

watch(
  () => editableConfig,
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
            loading: row.$loading,
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

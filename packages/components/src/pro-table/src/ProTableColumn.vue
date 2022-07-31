<script lang="ts">
export default { name: "ProTableColumn" };
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { ElTableColumn } from "element-plus";
import ProTableFormItem from "./ProTableFormItem.vue";
import proTableColumnProps from "./ProTableColumn";
import ProTableOperationColumn from "./ProTableOperationColumn.vue";
import CustomRender from "../../common/custom-render/src/CustomRender.vue";
import { InfoFilled } from "@element-plus/icons-vue";
import { getValueByComplexKey, TableColumnPropsType } from "@components/shared";

const props = defineProps(proTableColumnProps);
const isColumnHide = computed(() => props.hideInTable || props.hideBySetting);
const handleDefaultFilter = (
  value: any,
  row: any,
  column: TableColumnPropsType
) => {
  const property = column.property as string;
  return getValueByComplexKey(row, property) === value;
};
const elTableColumnProps = computed(() => ({
  columnKey: props.prop,
  filterMethod:
    props.columnProps.filters && !props.requestOnColumnChange
      ? handleDefaultFilter
      : undefined,
  ...props.columnProps,
}));
</script>

<template>
  <template v-if="!isColumnHide">
    <pro-table-operation-column
      :columnProps="columnProps"
      :operations="operations"
      v-if="columnProps.type === 'operations' && operations"
    />
    <el-table-column
      :index="
        (number) => number + 1 + (pageParams.pageNum - 1) * pageParams.pageSize
      "
      v-bind="columnProps"
      v-else-if="columnProps.type === 'index'"
    />
    <el-table-column
      v-bind="columnProps"
      v-else-if="columnProps.type === 'selection'"
    />
    <el-table-column v-bind="elTableColumnProps" :key="prop" v-else>
      <template #header="scope" v-if="columnHeaderSlotName">
        <custom-render
          :slot="slots[columnHeaderSlotName!]"
          :scope="{ ...scope, prop: columnProps.prop }"
        />
      </template>
      <template #header v-else-if="tip">
        {{ label }}
        <el-tooltip raw-content :content="tip" placement="top">
          <el-icon class="column-header-tip-icon"><InfoFilled /></el-icon>
        </el-tooltip>
      </template>
      <template #default="scope" v-if="columnDefaultSlotName">
        <custom-render
          :slot="slots[columnDefaultSlotName!]"
          :scope="{
            ...scope,
            prop: columnProps.prop,
            value: getValueByComplexKey(scope.row, columnProps.prop),
          }"
        />
      </template>
      <template #default="{ row }" v-else>
        <template v-if="children && children.length">
          <pro-table-column
            v-bind="column"
            :pageParams="pageParams"
            :slots="slots"
            :requestOnColumnChange="requestOnColumnChange"
            :key="column.prop"
            v-for="column in children"
          />
        </template>
        <pro-table-form-item
          :row="row"
          :prop="columnProps.prop"
          :valueType="valueType"
          :fieldProps="fieldProps"
          :copyable="copyable"
          :editable="editable"
          :formatConfig="formatConfig"
          :options="options"
          :params="params"
          :request="request"
          v-else
        />
      </template>
    </el-table-column>
  </template>
</template>

<style lang="scss" scoped>
.column-header-tip-icon {
  vertical-align: -2px;
  cursor: pointer;
}
</style>

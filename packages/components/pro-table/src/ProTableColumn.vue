<script lang="ts">
export default { name: "ProTableColumn" };
</script>

<script lang="ts" setup>
import { onUpdated, ref } from "vue";
import ProTableFormItem from "./ProTableFormItem.vue";
import proTableColumnProps from "./ProTableColumn";
import ProTableOperationColumn from "./ProTableOperationColumn.vue";
import CustomRender from "../../common/custom-render/src/CustomRender.vue";
import { getValueByComplexKey } from "@components/shared/src";

const props = defineProps(proTableColumnProps);
</script>

<template>
  <pro-table-operation-column
    :columnProps="columnProps"
    :operations="operations"
    :editableConfig="editableConfig"
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
  <el-table-column v-bind="columnProps" v-else>
    <template #header="scope" v-if="columnHeaderSlotName">
      <custom-render
        :slot="slots[columnHeaderSlotName!]"
        :scope="{ ...scope, prop: columnProps.prop }"
      />
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
    <template #default="{ row }">
      <template v-if="children && children.length">
        <pro-table-column
          v-bind="column"
          :pageParams="pageParams"
          :slots="slots"
          :editableConfig="editableConfig"
          :key="column.prop"
          v-for="column in children"
        />
      </template>
      <pro-table-form-item
        :row="row"
        :prop="columnProps.prop"
        :valueType="valueType"
        :fieldProps="fieldProps"
        :editable="editable"
        :editableConfig="editableConfig"
        :formatConfig="formatConfig"
        :options="options"
        :params="params"
        :request="request"
        :columnHeaderSlotName="columnHeaderSlotName"
        :columnDefaultSlotName="columnDefaultSlotName"
        v-else
      />
    </template>
  </el-table-column>
</template>

<style lang="scss" scoped></style>

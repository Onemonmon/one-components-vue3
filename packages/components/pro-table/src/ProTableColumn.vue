<script lang="ts">
export default { name: "ProTableColumn" };
</script>

<script lang="ts" setup>
import { onUpdated, ref } from "vue";
import ProTableFormItem from "./ProTableFormItem.vue";
import proTableColumnProps from "./ProTableColumn";

const props = defineProps(proTableColumnProps);

onUpdated(() => {});
</script>

<template>
  <el-table-column v-bind="columnProps">
    <template #default="{ row }">
      <template v-if="children && children.length">
        <pro-table-column
          v-bind="column"
          :key="column.prop"
          v-for="column in children"
        />
      </template>
      <pro-table-form-item :row="row" :prop="columnProps.prop" v-else />
    </template>
  </el-table-column>
</template>

<style lang="scss" scoped></style>

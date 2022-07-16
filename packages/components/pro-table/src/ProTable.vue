<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import ProTableColumn from "./ProTableColumn.vue";
import proTableProps, { ProTablePropsType } from "./ProTable";
import useColumns from "./hooks/useColumns";
import useSourceData from "./hooks/useSourceData";

const props = defineProps(proTableProps);

const { sourceData, pageParams, innerPaginationProps } = useSourceData(props);

/**
 * 解析处理表格表头
 */
const innerColumns = useColumns(props);

onMounted(() => {});
function a() {
  console.log(11);
}
</script>

<template>
  <div class="pro-table-container" v-if="innerColumns.length">
    <div class="pro-table__header"></div>
    <div class="pro-table__body" v-loading="sourceData.loading">
      <el-table :data="sourceData.data">
        <pro-table-column
          v-bind="column"
          :key="column.columnProps.prop"
          v-for="column in innerColumns"
        />
      </el-table>
    </div>
    <div class="pro-table__footer" v-if="paginationProps !== false">
      <el-pagination
        v-bind="innerPaginationProps"
        v-model:current-page="pageParams.pageNum"
        v-model:page-size="pageParams.pageSize"
        @update:page-size=""
        @update:current-page=""
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pro-table-container {
  .pro-table__body {
  }
}
</style>

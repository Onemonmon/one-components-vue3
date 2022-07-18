<script lang="ts" setup>
import { computed, onMounted, ref, useSlots, watch } from "vue";
import ProTableColumn from "./ProTableColumn.vue";
import proTableProps from "./ProTable";
import ProTabaleToolbar from "./ProTabaleToolbar.vue";
import useColumns from "./hooks/useColumns";
import useSourceData from "./hooks/useSourceData";
import useEditable from "./hooks/useEditable";
import type { TablePropsType } from "@components/shared/src";

const props = defineProps(proTableProps);
const slots = useSlots();

const innerTableProps = computed<TablePropsType>(() => ({
  size: "large",
  ...props.tableProps,
  rowKey: "$rowKey",
}));

/**
 * 获取处理表格数据
 */
const { sourceData, pageParams, innerPaginationProps } = useSourceData(props);
/**
 * 解析处理表格表头
 */
const { innerColumns, flatColumns, settingKeys, defaultCheckedKeys } =
  useColumns(props);
/**
 * 处理编辑表格
 */
const innerEditableConfig = useEditable(props);
</script>

<template>
  <div class="pro-table-container" v-if="innerColumns.length">
    <div class="pro-table__header">
      <div class="pro-table__header-title">表格标题</div>
      <div class="pro-table__header-toolbar">
        <slot name="toolbar"></slot>
        <pro-tabale-toolbar
          :columns="innerColumns"
          :settingKeys="settingKeys"
          :defaultCheckedKeys="defaultCheckedKeys"
        />
      </div>
    </div>
    <div class="pro-table__body" v-loading="sourceData.loading">
      <el-table v-bind="innerTableProps" :data="sourceData.data">
        <pro-table-column
          v-bind="column"
          :pageParams="pageParams"
          :slots="slots"
          :editableConfig="innerEditableConfig"
          :key="column.prop"
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
  .pro-table__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;

    &-title {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 500;
      font-size: 16px;
    }

    &-toolbar {
      display: flex;
      align-items: center;
    }
  }
  .pro-table__body {
    :deep(.el-table) {
      .el-table-column--selection {
        .cell {
          line-height: 1;
          font-size: 0;
        }
      }
      .el-table__column-filter-trigger {
        display: inline-flex;
        vertical-align: -2px;
      }
      .caret-wrapper {
        vertical-align: -3px;
      }
      .el-input-number {
        width: 100%;
      }
    }
  }
  .pro-table__footer {
    padding: 20px 0;
    .el-pagination {
      justify-content: flex-end;
      padding: 0;
      :deep(.is-last) {
        margin-right: 0;
      }
    }
  }
}
</style>

<style lang="scss">
.el-table-filter__checkbox-group {
  .el-checkbox__label {
    line-height: unset;
  }
}
</style>

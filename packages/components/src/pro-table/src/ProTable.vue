<script lang="ts" setup>
import { computed, provide, ref, useSlots } from "vue";
import { ProQueryFilter } from "../../pro-form";
import ProTableColumn from "./ProTableColumn.vue";
import proTableProps, { ProTableInstance } from "./ProTable";
import ProTableToolbar from "./ProTableToolbar.vue";
import useColumns from "./hooks/useColumns";
import useSourceData from "./hooks/useSourceData";
import useEditable from "./hooks/useEditable";
import useTableInstance from "./hooks/useTableInstance";
import type { TablePropsType } from "@components/shared";

const props = defineProps(proTableProps);
const slots = useSlots();
const innerTableRef = ref<ProTableInstance | null>(null);
/**
 * 解析处理表格表头
 */
const {
  innerColumns,
  flatColumns,
  validatorRules,
  settingKeys,
  defaultCheckedKeys,
  propToRequestPropMap,
} = useColumns(props);
/**
 * 获取处理表格数据
 */
const {
  sourceData,
  pageParams,
  columnParmas,
  innerProQueryFilterProps,
  innerPaginationProps,
  getTableDataByParams,
  handleSortChange,
  handleFilterChange,
} = useSourceData(props, propToRequestPropMap);
/**
 * 处理编辑表格
 */
const { innerEditableConfig, handleAddNewRow } = useEditable(props, sourceData);
/**
 * 处理表格实例
 */
useTableInstance(props, innerTableRef, columnParmas, getTableDataByParams);

const innerTableProps = computed<TablePropsType>(() => ({
  size: "large",
  "onSort-change": handleSortChange,
  "onFilter-change": handleFilterChange,
  ...props.tableProps,
  rowKey: "$rowKey",
}));

// provide
provide("sourceData", sourceData);
provide("validatorRules", validatorRules);
provide("editableConfig", innerEditableConfig);
</script>

<template>
  <div class="pro-table-container" v-if="innerColumns.length">
    <pro-query-filter
      v-bind="innerProQueryFilterProps"
      :columns="flatColumns"
      :slots="slots"
      v-if="proQueryFilterProps !== false"
    />
    <div class="pro-table__header">
      <div class="pro-table__header-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="pro-table__header-toolbar">
        <slot name="toolbar"></slot>
        <pro-table-toolbar
          :columns="innerColumns"
          :settingKeys="settingKeys"
          :defaultCheckedKeys="defaultCheckedKeys"
          @reload-data="() => innerTableRef && innerTableRef.reloadData()"
          @clear="() => innerTableRef && innerTableRef.clear()"
          v-if="toolbarConfig !== false"
        />
      </div>
    </div>
    <div class="pro-table__body" v-loading="sourceData.loading">
      <el-table
        ref="innerTableRef"
        v-bind="innerTableProps"
        :data="sourceData.data"
      >
        <pro-table-column
          v-bind="column"
          :pageParams="pageParams"
          :slots="slots"
          :requestOnColumnChange="requestOnColumnChange"
          :key="column.prop"
          v-for="column in innerColumns"
        />
      </el-table>
      <div
        class="create-button-wrapper"
        v-if="
          innerEditableConfig.editable && innerEditableConfig.showCreateButton
        "
      >
        <el-button size="large" @click="handleAddNewRow">
          新增一行数据
        </el-button>
      </div>
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
      thead th.el-table__cell {
        background-color: var(--el-fill-color-light);
      }
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
      .cell {
        display: flex;
        align-items: center;
        .pro-text-container {
          display: contents;
        }
      }
      .cell.el-tooltip {
        .pro-text-container {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .create-button-wrapper {
      margin-top: 10px;
      .el-button {
        width: 100%;
        border-style: dashed;
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

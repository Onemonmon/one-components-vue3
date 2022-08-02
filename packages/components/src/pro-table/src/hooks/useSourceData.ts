import {
  extend,
  getRandomKey,
  getValueByComplexKey,
  isArray,
} from "@components/shared";
import { cloneDeep } from "lodash-es";
import { computed, reactive, ref, toRaw, watch } from "vue";
import type { ProTablePropsType } from "../ProTable";
import type { ProQueryFilterPropsType } from "../../../pro-form";

const DEFAULT_PAGE_SIZE = 10;

// 获取特定范围的数据
const getTableDataByRange = (
  data: any[],
  start: number = 0,
  length: number = DEFAULT_PAGE_SIZE
) => {
  return data.slice(start, start + length);
};

const getRealProp = (
  propToRequestPropMap: Map<string, string>,
  prop: string
) => {
  return propToRequestPropMap.has(prop)
    ? (propToRequestPropMap.get(prop) as string)
    : prop;
};

const useSourceData = (
  props: ProTablePropsType,
  propToRequestPropMap: Map<string, string>
) => {
  const sourceData = reactive({ data: [] as any[], total: 0, loading: false });
  // 原生表格数据
  const rawSourceData = ref<any[]>();
  // 处理分页
  const pageParams = reactive({ pageNum: 1, pageSize: DEFAULT_PAGE_SIZE });
  const innerPaginationProps = computed(() => ({
    background: true,
    layout: "total, prev, pager, next, jumper, sizes",
    total: sourceData.total,
    pageSizes: [10, 20, 30, 50],
    ...props.paginationProps,
  }));
  // 处理过滤条件产生的参数
  const columnParmas = ref<any>({});
  const handleSortChange = ({ column, prop, order }: any) => {
    if (props.requestOnColumnChange) {
      const newProp = getRealProp(propToRequestPropMap, prop);
      columnParmas.value = { sortProp: newProp, sortOrder: order };
      if (props.tableProps && props.tableProps["onSort-change"]) {
        props.tableProps["onSort-change"]({ column, prop, order });
      }
    }
  };
  const handleFilterChange = (filters: any) => {
    if (props.requestOnColumnChange) {
      const prop = Object.keys(filters)[0];
      const newProp = getRealProp(propToRequestPropMap, prop);
      columnParmas.value = { ...columnParmas.value, [newProp]: filters[prop] };
      if (props.tableProps && props.tableProps["onFilter-change"]) {
        props.tableProps["onFilter-change"](filters);
      }
    }
  };
  const innerProQueryFilterProps = reactive<ProQueryFilterPropsType>({
    ...props.proQueryFilterProps,
    async onSubmit(model) {
      qureyFilterParams.value = model;
      await getTableDataByParams();
    },
  });
  // 筛选表单参数
  const qureyFilterParams = ref<any>(innerProQueryFilterProps.initialValues);
  // 处理参数 外部入参params + 内部分页pageParams
  const requestParams = computed(() => {
    const newParams = extend({}, props.params);
    if (props.requestOnColumnChange) {
      extend(newParams, columnParmas.value);
    }
    if (props.paginationProps === false) {
      return newParams;
    }
    return extend(newParams, pageParams);
  });
  // 获取$rowKey
  const getRowKey = (row: any) => {
    const rowKey = props.tableProps && props.tableProps.rowKey;
    if (rowKey) {
      let rowKeyValue: string;
      if (typeof rowKey === "function") {
        rowKeyValue = rowKey(row);
      } else {
        rowKeyValue = getValueByComplexKey(row, rowKey);
      }
      return rowKeyValue;
    }
    return getRandomKey();
  };
  // 设置$rowKey
  const setRowKey = (data: any[] = []) => {
    data.forEach((n) => (n.$rowKey = getRowKey(n)));
    return data;
  };
  // 处理原生表格数据 tableProps.data
  watch(
    () => props.tableProps && props.tableProps.data,
    (val) => {
      const data = (rawSourceData.value = cloneDeep(val));
      if (data && isArray(data)) {
        setRowKey(data);
        sourceData.data = getTableDataByRange(data, 0, pageParams.pageSize);
        sourceData.total = data.length;
        // 重新获取静态表格数据时，页码重置
        if (props.paginationProps !== false) {
          pageParams.pageNum = 1;
        }
      }
    },
    { immediate: true }
  );
  // 通过request获取表格数据
  async function getTableDataByParams() {
    if (!props.request || rawSourceData.value) {
      return;
    }
    sourceData.loading = true;
    try {
      const params = { ...qureyFilterParams.value, ...requestParams.value };
      const res = await props.request(params);
      setRowKey(res.data);
      sourceData.data = res.data;
      sourceData.total = res.total || 0;
    } finally {
      sourceData.loading = false;
    }
  }
  // 1.重新获取远程数据 2.重新切割本地数据
  watch(
    requestParams,
    (newVal, oldVal = {}) => {
      const { pageNum, pageSize } = newVal;
      if (
        rawSourceData.value &&
        isArray(rawSourceData.value) &&
        props.paginationProps !== false
      ) {
        sourceData.data = getTableDataByRange(
          rawSourceData.value,
          0 + (pageNum - 1) * pageSize,
          pageSize
        );
        return;
      }
      const { pageNum: prevPageNum, pageSize: prevPageSize } = oldVal;
      // 当请求参数改变（非pageParams改变引起，则需要重置pageNum）
      if (
        pageNum === prevPageNum &&
        pageNum !== 1 &&
        pageSize === prevPageSize
      ) {
        pageParams.pageNum = 1;
        return;
      }
      getTableDataByParams();
    },
    { immediate: true, deep: true }
  );
  return {
    sourceData,
    pageParams,
    columnParmas,
    innerProQueryFilterProps,
    innerPaginationProps,
    getTableDataByParams,
    handleSortChange,
    handleFilterChange,
  };
};

export default useSourceData;

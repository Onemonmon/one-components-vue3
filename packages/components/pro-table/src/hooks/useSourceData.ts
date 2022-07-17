import {
  getRandomKey,
  getValueByComplexKey,
  hasOwn,
  isArray,
} from "@components/shared/src";
import cloneDeep from "lodash/cloneDeep";
import {
  computed,
  effectScope,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import type { ProTablePropsType, RequestTableDataFunction } from "../ProTable";

const DEFAULT_PAGE_SIZE = 10;

// 获取特定范围的数据
const getTableDataByRange = (
  data: any[],
  start: number = 0,
  length: number = DEFAULT_PAGE_SIZE
) => {
  return data.slice(start, start + length);
};

const useSourceData = (props: ProTablePropsType) => {
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
  // 处理参数 外部入参params + 内部分页pageParams
  const getRequestParams = () => {
    if (props.paginationProps === false) {
      return { ...props.params };
    }
    return { ...props.params, ...pageParams };
  };
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
      }
    },
    { immediate: true }
  );
  // 通过request获取表格数据
  const getTableDataByParams = async () => {
    if (!props.request || rawSourceData.value) {
      return;
    }
    const requestParams = getRequestParams();
    sourceData.loading = true;
    try {
      const res = await props.request(requestParams);
      setRowKey(res.data);
      sourceData.data = res.data;
      sourceData.total = res.total || 0;
    } finally {
      sourceData.loading = false;
    }
  };
  watch(
    () => props.params,
    () => getTableDataByParams(),
    { immediate: true, deep: true }
  );
  // 分页改变 1.重新获取远程数据 2.重新切割本地数据
  watch(pageParams, ({ pageNum, pageSize }) => {
    if (rawSourceData.value && isArray(rawSourceData.value)) {
      sourceData.data = getTableDataByRange(
        rawSourceData.value,
        0 + (pageNum - 1) * pageSize,
        pageSize
      );
    } else {
      getTableDataByParams();
    }
  });
  return {
    sourceData,
    pageParams,
    innerPaginationProps,
  };
};

export default useSourceData;

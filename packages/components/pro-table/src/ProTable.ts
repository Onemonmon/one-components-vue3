import type { ExtractPropTypes, PropType } from "vue";
import type {
  ElPaginationPropsType,
  TablePropsType,
  WithOtherAttrs,
} from "@components/shared/src";
import type { ProTableColumnPropsType } from "./ProTableColumn";

export type RequestTableDataFunction = (
  params?: any
) => Promise<{ data: any[]; total?: number }>;

const proTableProps = {
  /**
   * 表格列配置
   */
  columns: {
    type: Array as PropType<ProTableColumnPropsType[]>,
    default: () => [],
  },
  /**
   * 自动请求表格数据的方法，params改变时会重新触发
   */
  request: {
    type: Function as PropType<RequestTableDataFunction>,
  },
  /**
   * 请求表格数据的方法的入参，改变时会重新触发request
   */
  params: {
    type: Object,
  },
  /**
   * el-table入参，el-table的事件也是通过它传入
   */
  tableProps: {
    type: Object as PropType<TablePropsType>,
  },
  /**
   * 表格分页配置，传入false则取消分页功能
   */
  paginationProps: {
    type: [Object, Boolean] as PropType<false | ElPaginationPropsType>,
    default: undefined,
  },
  /**
   * 是否可编辑
   */
  editable: {
    type: Boolean,
    default: true,
  },
};

export type ProTablePropsType = WithOtherAttrs<
  ExtractPropTypes<typeof proTableProps>
>;

export default proTableProps;

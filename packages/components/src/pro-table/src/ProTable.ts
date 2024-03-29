import type { ExtractPropTypes, PropType, Ref } from "vue";
import type {
  ElPaginationPropsType,
  TablePropsType,
  WithOtherAttrs,
} from "@components/shared";
import type { ProQueryFilterPropsType } from "../../pro-form";
// import type { ProTableColumnPropsType } from "./ProTableColumn";

export type RequestTableDataFunction = (
  params?: any
) => Promise<{ data: any[]; total?: number }>;

export type ProTableInstance = {
  clearSelection: () => void;
  getSelectionRows: () => any[];
  toggleRowSelection: (row: any, selected: boolean) => void;
  toggleAllSelection: () => void;
  toggleRowExpansion: (row: any, expanded: boolean) => void;
  setCurrentRow: (row: any) => void;
  clearSort: () => void;
  clearFilter: (columnKeys?: string[]) => void;
  doLayout: () => void;
  sort: (prop: string, order: string) => void;
  scrollTo: (options: ScrollToOptions | number, yCoord?: number) => void;
  setScrollTop: (top: number) => void;
  setScrollLeft: (left: number) => void;
  reloadData: () => Promise<void>;
  clear: () => void;
};

/**
 * 表格编辑态配置
 */
export type EditableKeyType = string | number;
export type InnerEditableConfigType = {
  /**
   * 当前表格是否可编辑
   */
  editable: boolean;
  /**
   * 当前可编辑行的rowKey的Set集合
   */
  editableKeys: Set<EditableKeyType>;
  /**
   * 新增一行时的默认数据
   */
  defaultCreateRow?: Record<string, any>;
  /**
   * 是否展示新增一行按钮
   */
  showCreateButton?: boolean;
  /**
   * editableKeys改变时触发
   */
  onEditableKeysChange?: (editableKeys: EditableKeyType[]) => void;
  /**
   * 点击保存时触发
   */
  onSave?: (row: any) => Promise<any> | any;
  /**
   * 当前可编辑行数据变化时触发
   */
  onValuesChange?: (row: any, prop: string, value: any) => void;
};
export type EditableConfigType = Partial<
  Omit<InnerEditableConfigType, "editableKeys">
> & {
  /**
   * 当前可编辑行的rowKey的集合
   */
  editableKeys?: EditableKeyType[];
};

const proTableProps = {
  /**
   * 表格标题
   */
  title: { type: String },
  /**
   * 表格列配置
   */
  columns: {
    type: Array as PropType<any[]>, // ProTableColumnPropsType
    default: () => [],
  },
  /**
   * 自动请求表格数据的方法，params改变时会重新触发
   */
  request: {
    type: Function as PropType<RequestTableDataFunction>,
  },
  /**
   * 当表头排序、过滤改变时触发request
   */
  requestOnColumnChange: {
    type: Boolean,
  },
  /**
   * 请求表格数据的方法的入参，改变时会重新触发request
   */
  params: {
    type: Object,
  },
  /**
   * 获取表格实例
   */
  getTableRef: {
    type: Function as PropType<(ref: ProTableInstance) => void>,
  },
  /**
   * el-table入参，el-table的事件也是通过它传入
   */
  tableProps: {
    type: Object as PropType<TablePropsType>,
  },
  /**
   * pro-query-filer入参
   */
  proQueryFilterProps: {
    type: [Object, Boolean] as PropType<ProQueryFilterPropsType | false>,
    default: undefined,
  },
  /**
   * 表格分页配置，传入false则取消分页功能
   */
  paginationProps: {
    type: [Object, Boolean] as PropType<ElPaginationPropsType | false>,
    default: undefined,
  },
  /**
   * 表格自带工具栏配置
   */
  toolbarConfig: {
    type: [Object, Boolean] as PropType<any | false>,
    default: () => ({}),
  },
  /**
   * 编辑表格配置
   */
  editableConfig: {
    type: Object as PropType<EditableConfigType>,
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

import type { ExtractPropTypes, PropType } from "vue";
import {
  ButtonPropsType,
  FormatConfigType,
  propsHasOptions,
  TableColumnPropsType,
  ValueType,
  WithOtherAttrs,
} from "@components/shared/src";
import type { ProFieldPropsType } from "@components/components/pro-field";
import type { InnerEditableConfigType } from "./ProTable";

// 某些valueType对应的组件需要选项
const proTableCustomColumnProps = {
  /**
   * 当前表头列的单元格渲染的组件类型
   */
  valueType: {
    type: String as PropType<ValueType>,
    default: "text",
  },
  /**
   * valueType对应的组件的原生入参
   */
  fieldProps: {
    type: Object as PropType<ProFieldPropsType>,
  },
  /**
   * 当前表头列数据是否可编辑
   */
  editable: {
    type: Boolean,
  },
  /**
   * 只读态的配置
   */
  formatConfig: {
    type: Object as PropType<FormatConfigType>,
    default: () => ({}),
  },
  /**
   * 表头插槽名称
   */
  columnHeaderSlotName: {
    type: String,
  },
  /**
   * 列内容插槽名称
   */
  columnDefaultSlotName: {
    type: String,
  },
  /**
   * 子表头
   */
  children: {
    type: Array as PropType<any[]>,
  },
  /**
   * 操作栏
   */
  operations: {
    type: Function as PropType<
      (row: any) => ProTableOperationColumnPropsType[]
    >,
  },
  ...propsHasOptions,
};

// 操作栏
export type ProTableOperationColumnPropsType = {
  key: string;
  label?: string; // 文本
  hide?: boolean | (() => boolean); // 按钮是否隐藏
} & ButtonPropsType;

// 除去el-table-column的入参
export type ProTableCustomColumnPropsType = Omit<
  ExtractPropTypes<typeof proTableCustomColumnProps>,
  "children"
> & {
  children?: ProTableColumnPropsType[];
};

export type ProTableColumnPropsType = WithOtherAttrs<
  ProTableCustomColumnPropsType & Omit<TableColumnPropsType, "class" | "style">
>;

const proTableColumnProps = {
  /**
   * el-table-column 的入参
   */
  columnProps: {
    type: Object as PropType<TableColumnPropsType>,
    default: () => ({}),
  },
  /**
   * 表格分页参数，type=index时使用
   */
  pageParams: {
    type: Object as PropType<{ pageNum: number; pageSize: number }>,
    default: () => ({ pageNum: 1, pageSize: 10 }),
  },
  /**
   * 表格插槽
   */
  slots: {
    type: Object,
    default: () => ({}),
  },
  /**
   * 编辑表格配置
   */
  editableConfig: {
    type: Object as PropType<InnerEditableConfigType>,
    default: () => ({}),
  },
  ...proTableCustomColumnProps,
};

export type InnerProTableColumnPropsType = ExtractPropTypes<
  typeof proTableColumnProps
>;

export default proTableColumnProps;

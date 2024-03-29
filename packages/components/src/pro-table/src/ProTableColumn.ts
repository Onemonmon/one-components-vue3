import type { ExtractPropTypes, PropType } from "vue";
import {
  ButtonPropsType,
  FormatConfigType,
  FormItemPropsType,
  propsHasOptions,
  TableColumnPropsType,
  ValueType,
  WithOtherAttrs,
} from "@components/shared";
import type { ProFieldPropsType } from "@components/pro-field";

// 某些valueType对应的组件需要选项
const proTableCustomColumnProps = {
  /**
   * 当请求接口的参数字段与表格prop不同时使用
   */
  requestProp: {
    type: String,
  },
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
   * el-form-item入参，为筛选表单 和 编辑表格校验服务
   */
  formProps: {
    type: Object as PropType<FormItemPropsType>,
  },
  /**
   * 表头提示信息
   */
  tip: {
    type: String,
  },
  /**
   * 表格内容是否可复制粘贴
   */
  copyable: {
    type: Boolean,
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
   * 在 Table 中不展示此列
   */
  hideInTable: {
    type: Boolean,
  },
  /**
   * 在 Table 中不展示此列，在列设置中选中后可展示
   */
  hideBySetting: {
    type: Boolean,
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
  // 以下参数只有过滤器用到
  /**
   * 筛选表单列label插槽名称
   */
  qfLabelSlotName: {
    type: String,
  },
  /**
   * 筛选表单列内容插槽名称
   */
  qfDefaultSlotName: {
    type: String,
  },
  /**
   * 筛选表单列所占列数
   */
  qfSpan: {
    type: Number,
    default: 8,
  },
  /**
   * 在筛选表单中不显示
   */
  qfHideInForm: {
    type: [Function, Boolean] as PropType<
      boolean | ((...args: any[]) => boolean)
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

export type ProTableColumnPropsType = Partial<
  WithOtherAttrs<
    ProTableCustomColumnPropsType &
      Omit<TableColumnPropsType, "class" | "style">
  >
>;

const proTableColumnProps = {
  /**
   * 列prop，作为唯一key
   */
  prop: { type: String, required: true },
  /**
   * 列名
   */
  label: { type: String },
  /**
   * 在列设置中不展示此列
   */
  hideInSetting: {
    type: Boolean,
  },
  /**
   * el-table-column 的入参
   */
  columnProps: {
    type: Object as PropType<TableColumnPropsType>,
    default: () => ({}),
  },
  ...proTableCustomColumnProps,
};

export type InnerProTableColumnPropsType = ExtractPropTypes<
  typeof proTableColumnProps
>;

export default proTableColumnProps;

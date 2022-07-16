import type { ExtractPropTypes, PropType } from "vue";
import {
  extend,
  propsHasOptions,
  TableColumnPropsType,
  ValueType,
  WithOtherAttrs,
} from "@components/shared/src";

// 某些valueType对应的组件需要选项
const proTableCustomColumnProps = extend(
  {
    /**
     * 当前表头列的单元格渲染的组件类型
     */
    valueType: {
      type: String as PropType<ValueType>,
      default: "text",
    },
    /**
     * 当前表头列数据是否可编辑
     */
    editable: {
      type: Boolean,
    },
    /**
     * 子表头
     */
    children: {
      type: Array as PropType<any[]>,
    },
  },
  propsHasOptions
);

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

const proTableColumnProps = extend(
  {
    /**
     * el-table-column 的入参
     */
    columnProps: {
      type: Object as PropType<TableColumnPropsType>,
      default: () => ({}),
    },
  },
  proTableCustomColumnProps
);

export type InnerProTableColumnPropsType = ExtractPropTypes<
  typeof proTableColumnProps
>;

export default proTableColumnProps;

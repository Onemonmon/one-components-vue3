import type { ExtractPropTypes, PropType, Ref } from "vue";
import {
  Data,
  FormatConfigType,
  FormItemPropsType,
  propsHasOptions,
  ValueType,
  WithOtherAttrs,
} from "@components/shared/src";
import type { ProFieldPropsType } from "../../../pro-field";

const proFormItemProps = {
  /**
   * 当前表单数据
   */
  model: {
    type: Object as PropType<Data>,
    defalut: () => ({}),
    required: true,
  },
  /**
   * 当前列字段
   */
  prop: {
    type: String,
    required: true,
  },
  /**
   * 列名
   */
  label: {
    type: String,
  },
  /**
   * 当前列的单元格渲染的组件类型
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
   * el-form-item入参
   */
  formProps: {
    type: Object as PropType<FormItemPropsType>,
  },
  /**
   * 提示信息
   */
  tip: {
    type: String,
  },
  /**
   * 当前表头列数据是否可编辑
   */
  editable: {
    type: Boolean,
    default: true,
  },
  /**
   * 只读态的配置
   */
  formatConfig: {
    type: Object as PropType<FormatConfigType>,
    default: () => ({}),
  },
  ...propsHasOptions,
};

export type ProFormItemPropsType = WithOtherAttrs<
  Partial<ExtractPropTypes<typeof proFormItemProps>>
>;

export default proFormItemProps;

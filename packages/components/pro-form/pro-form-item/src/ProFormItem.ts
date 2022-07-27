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
    default: () => ({}),
  },
  /**
   * 表单项字段
   */
  prop: {
    type: String,
    default: "",
    required: true,
  },
  /**
   * 表单项名称
   */
  label: {
    type: String,
  },
  /**
   * 表单项渲染的组件类型
   */
  valueType: {
    type: String as PropType<ValueType>,
    default: "text",
  },
  /**
   * 表单项依赖的其他表单项
   */
  dependencies: {
    type: Array as PropType<string[]>,
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
   * el-form-item label插槽名称
   */
  labelSlotName: {
    type: String,
  },
  /**
   * el-form-item default插槽名称
   */
  defaultSlotName: {
    type: String,
  },
  /**
   * 表单项是否可编辑
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
  /**
   * 表单插槽
   */
  slots: {
    type: Object,
    default: () => ({}),
  },
  ...propsHasOptions,
};

export type ProFormItemPropsType = WithOtherAttrs<
  Partial<Omit<ExtractPropTypes<typeof proFormItemProps>, "model" | "slots">>
>;

export default proFormItemProps;

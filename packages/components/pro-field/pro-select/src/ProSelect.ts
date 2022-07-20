import type { ExtractPropTypes, PropType } from "vue";
import {
  SelectPropsType,
  WithOtherAttrs,
  FormatConfigType,
  propsHasOptions,
} from "@components/shared/src";

export type ProSelectValueType = string | number | string[] | number[];

export type ProSelectFieldPropsType = SelectPropsType & {
  type?: "default" | "group";
};

const proSelectProps = {
  /**
   * v-model
   */
  modelValue: {
    type: [String, Number, Array] as PropType<ProSelectValueType>,
  },
  /**
   * el-select 内置的props
   * type 类型：default | group分组
   */
  fieldProps: {
    type: Object as PropType<ProSelectFieldPropsType>,
    default: () => ({}),
  },
  /**
   * 是否可编辑
   */
  editable: {
    type: Boolean,
    default: true,
  },
  /**
   * 只读态的配置，editable = false 时生效
   */
  formatConfig: {
    type: Object as PropType<FormatConfigType>,
  },
  /**
   * 触发校验
   */
  onValidate: {
    type: Function as PropType<(trigger: string, value: any) => void>,
  },
  ...propsHasOptions,
};

export type ProSelectPropsType = Partial<
  WithOtherAttrs<ExtractPropTypes<typeof proSelectProps>>
>;

export default proSelectProps;

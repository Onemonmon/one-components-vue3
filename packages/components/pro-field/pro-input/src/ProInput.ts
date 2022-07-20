import type { ExtractPropTypes, PropType } from "vue";
import type {
  InputPropsType,
  WithOtherAttrs,
  FormatConfigType,
  InputNumberPropsType,
} from "@components/shared/src";

export type ProInputValueType = string | number;

export type ProInputFieldPropsType =
  | InputPropsType
  | InputNumberPropsType
  | { maxlength?: number };

const proInputProps = {
  /**
   * v-model
   */
  modelValue: {
    type: [String, Number] as PropType<ProInputValueType>,
  },
  /**
   * el-input 内置的props
   */
  fieldProps: {
    type: Object as PropType<ProInputFieldPropsType>,
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
};

export type ProInputPropsType = Partial<
  WithOtherAttrs<ExtractPropTypes<typeof proInputProps>>
>;

export default proInputProps;

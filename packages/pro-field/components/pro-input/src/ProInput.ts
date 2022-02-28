import type { ExtractPropTypes, PropType } from "vue";
import type {
  InputPropsType,
  WithOtherAttrs,
} from "../../../../element-com-type";
import type { FormatConfigType } from "../../../../type";

export type ProInputValueType = string | number;

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
    type: Object as PropType<InputPropsType>,
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
};

export type ProInputPropsType = Partial<
  WithOtherAttrs<ExtractPropTypes<typeof proInputProps>>
>;

export default proInputProps;

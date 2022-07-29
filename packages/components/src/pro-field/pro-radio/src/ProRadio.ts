import type { ExtractPropTypes, PropType } from "vue";
import {
  RadioGroupPropsType,
  RadioPropsType,
  WithOtherAttrs,
  FormatConfigType,
  propsHasOptions,
} from "@components/shared";

export type ProRadioValueType = string | number | boolean;

export type ProRadioFieldPropsType = {
  type?: "radio" | "button";
  radio?: RadioPropsType;
  radioGroup?: RadioGroupPropsType;
};

const proRadioProps = {
  /**
   * v-model
   */
  modelValue: {
    type: [String, Number] as PropType<ProRadioValueType>,
  },
  /**
   * el-radio 内置的props
   */
  fieldProps: {
    type: Object as PropType<ProRadioFieldPropsType>,
    default: () => ({
      type: "radio",
      radio: {},
      radioGroup: {},
    }),
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

export type ProRadioPropsType = Partial<
  WithOtherAttrs<ExtractPropTypes<typeof proRadioProps>>
>;

export default proRadioProps;

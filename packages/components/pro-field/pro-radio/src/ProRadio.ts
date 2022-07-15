import type { ExtractPropTypes, PropType } from "vue";
import {
  RadioGroupPropsType,
  RadioPropsType,
  WithOtherAttrs,
  FormatConfigType,
  propsHasOption,
  extend,
} from "@components/shared/src";

export type ProRadioValueType = string | number | boolean;

export type ProRadioFieldPropsType = {
  radio?: RadioPropsType;
  radioGroup?: RadioGroupPropsType;
};

const proRadioProps = extend(propsHasOption, {
  /**
   * v-model
   */
  modelValue: {
    type: [String, Number] as PropType<ProRadioValueType>,
  },
  /**
   * radio 或 radio-button
   */
  type: {
    type: String as PropType<"radio" | "button">,
    default: "radio",
  },
  /**
   * el-radio 内置的props
   */
  fieldProps: {
    type: Object as PropType<ProRadioFieldPropsType>,
    default: () => ({
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
});

export type ProRadioPropsType = Partial<
  WithOtherAttrs<ExtractPropTypes<typeof proRadioProps>>
>;

export default proRadioProps;

import type { ExtractPropTypes, PropType } from "vue";
import {
  CheckboxGroupPropsType,
  CheckboxPropsType,
  WithOtherAttrs,
  FormatConfigType,
  propsHasOptions,
} from "@components/shared/src";

export type ProCheckboxValueType = (string | number)[];

export type ProCheckboxFieldPropsType = {
  type?: "checkbox" | "button";
  checkAll?: boolean;
  checkbox?: CheckboxPropsType;
  checkboxGroup?: CheckboxGroupPropsType;
};

const proCheckboxProps = {
  /**
   * v-model
   */
  modelValue: {
    type: Array as PropType<ProCheckboxValueType>,
  },
  /**
   * el-checkbox 内置的props
   */
  fieldProps: {
    type: Object as PropType<ProCheckboxFieldPropsType>,
    default: () => ({
      type: "checkbox",
      checkAll: false, // 是否支持全选
      checkbox: {},
      checkboxGroup: {},
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

export type ProCheckboxPropsType = Partial<
  WithOtherAttrs<ExtractPropTypes<typeof proCheckboxProps>>
>;

export default proCheckboxProps;

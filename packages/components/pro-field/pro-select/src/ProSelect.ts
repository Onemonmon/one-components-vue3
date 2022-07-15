import type { ExtractPropTypes, PropType } from "vue";
import {
  SelectPropsType,
  WithOtherAttrs,
  FormatConfigType,
  propsHasOption,
  extend,
} from "@components/shared/src";

export type ProSelectValueType = string | number | string[] | number[];

const proSelectProps = extend(propsHasOption, {
  /**
   * v-model
   */
  modelValue: {
    type: [String, Number, Array] as PropType<ProSelectValueType>,
  },
  /**
   * 类型：default | group分组
   */
  type: {
    type: String as PropType<"default" | "group">,
    default: "default",
  },
  /**
   * el-select 内置的props
   */
  fieldProps: {
    type: Object as PropType<SelectPropsType>,
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
});

export type ProSelectPropsType = Partial<
  WithOtherAttrs<ExtractPropTypes<typeof proSelectProps>>
>;

export default proSelectProps;

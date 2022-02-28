import type { ExtractPropTypes, PropType } from "vue";
import type { FormatConfigType, OptionNodeType } from "../../../../type";

export type ProTextValueType = string | number | Date;

const proTextProps = {
  /**
   * v-model
   */
  value: {
    type: [String, Number, Date, Array] as PropType<
      ProTextValueType | ProTextValueType[]
    >,
    default: "",
  },
  /**
   * 选项列表，结合value和options可直接展示对应的label
   */
  options: {
    type: Array as PropType<OptionNodeType[]>,
  },
  /**
   * 只读态的配置
   */
  formatConfig: {
    type: Object as PropType<FormatConfigType>,
    default: () => ({}),
  },
};

export type ProTextPropsType = Partial<ExtractPropTypes<typeof proTextProps>>;

export default proTextProps;

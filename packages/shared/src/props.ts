import type { ExtractPropTypes, PropType } from "vue";
import type { OptionNodeType } from "./type";

/**
 * 带有获取选项功能的入参
 */
export const propsHasOption = {
  /**
   * 选项数据
   */
  options: {
    type: Array as PropType<OptionNodeType[]>,
  },
  /**
   * 获取选项数据的request入参，改变时会重新触发request
   */
  params: {
    type: Object,
  },
  /**
   * 获取选项数据的方法
   */
  request: {
    type: Function as PropType<
      (params: any) => OptionNodeType[] | Promise<OptionNodeType[]>
    >,
  },
};

export type PropsHasOptionType = ExtractPropTypes<typeof propsHasOption>;

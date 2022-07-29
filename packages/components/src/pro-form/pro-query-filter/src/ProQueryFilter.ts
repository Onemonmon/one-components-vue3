import type { ExtractPropTypes, PropType, Ref } from "vue";
import type {
  WithOtherAttrs,
  PropsHasOptionType,
  FormPropsType,
} from "@components/shared";
import type { FormInstance } from "element-plus";
import type { ProFormItemPropsType } from "../../pro-form-item";

export type ProFormInstance = FormInstance & {};

export type ProQueryFilterColumnPropsType = {
  /**
   * 当前列字段
   */
  prop: string;
  /**
   * 所占列数
   */
  span?: number;
  /**
   * 在筛选表单中不显示
   */
  hideInForm?: boolean | ((...args: any[]) => boolean);
} & Omit<ProFormItemPropsType, "prop">;

const proQueryFilterProps = {
  /**
   * 表格列配置
   */
  columns: {
    type: Array as PropType<ProQueryFilterColumnPropsType[]>,
    default: () => [],
  },
  /**
   * 表单初始值
   */
  initialValues: {
    type: Object,
    default: () => ({}),
  },
  /**
   * el-form 原生入参
   */
  formProps: {
    type: Object as PropType<FormPropsType>,
  },
  /**
   * 表单提交
   */
  onSubmit: {
    type: Function as PropType<(model: any) => Promise<any>>,
  },
  /**
   * 表单重置
   */
  onReset: {
    type: Function as PropType<() => void>,
  },
  /**
   * 表单值改变
   */
  onValuesChange: {
    type: Function as PropType<(newValue: any, oldValue: any) => void>,
  },
  /**
   * 插槽
   */
  slots: {
    type: Object,
  },
};

export type ProQueryFilterPropsType = WithOtherAttrs<
  Partial<ExtractPropTypes<typeof proQueryFilterProps>>
>;

export default proQueryFilterProps;

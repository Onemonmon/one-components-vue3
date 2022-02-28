import type { CSSProperties } from "vue";
import type { ProTextValueType } from "./pro-field/components/pro-text/src/ProText";

/**
 * 只读态的配置
 */
export type FormatConfigType = {
  /**
   * 文本前是否展示圆点
   */
  dot?: true | { style?: CSSProperties };
  /**
   * 文本（圆点）的默认颜色
   */
  color?: string;
  /**
   * 文本是否超出隐藏
   */
  ellipsis?: boolean;
  /**
   * 内置的格式化类型
   */
  formatType?: "digit" | "percent" | "money";
  /**
   * numeral 的格式化配置
   */
  numeralFormat?: string;
  /**
   * 自定义格式化的函数
   */
  textFormat?: (text: ProTextValueType) => any;
  /**
   * 默认的空文本
   */
  defaultEmptyText?: string;
};

/**
 * emits事件类型
 */
export type EmitsType<T = any> = (event: T, ...args: any[]) => void;

/**
 * 默认选项类型
 */
export type OptionNodeType = {
  label: string;
  value: string | number;
  children?: OptionNodeType[];
};

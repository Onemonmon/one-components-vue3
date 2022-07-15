import type { CSSProperties } from "vue";

/**
 * 内置的格式化类型
 */
export type FormatType = "digit" | "percent" | "money";

/**
 * 只读态的配置
 */
export type FormatConfigType = {
  /**
   * 文本前是否展示圆点
   */
  dot?: boolean | { style?: CSSProperties };
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
  formatType?: FormatType;
  /**
   * toLocaleString 的格式化配置
   */
  toLocaleStringOptions?: any;
  /**
   * 自定义格式化的函数
   */
  textFormat?: (text: any) => any;
  /**
   * 默认的空文本
   */
  defaultEmptyText?: string;
  /**
   * 文本为数组时的间隔符
   */
  textSpacer?: string;
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
  value: any;
  children?: OptionNodeType[];
};

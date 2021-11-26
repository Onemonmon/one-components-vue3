import type { CSSProperties } from "vue";

export interface OptionNodeType {
  label: string;
  text?: string;
  value: string;
  disabled?: boolean;
}

export type RequestOptionsFunctionType = (
  params?: Record<string, any>
) => Promise<OptionNodeType[]>;

export type RequestOptionsType = {
  loading: boolean;
  options?: OptionNodeType[];
};

export type FormatConfigType = {
  dot?: {
    style?: CSSProperties;
  };
  color?: string;
  ellipsis?: boolean;
  textFormat?: (text: string) => string;
};

export type ComponentSize = "small" | "large" | "medium" | "mini";

export type RadioGroupPropsType = {
  fill?: string;
  textColor?: string;
  size?: ComponentSize;
  disabled?: boolean;
};

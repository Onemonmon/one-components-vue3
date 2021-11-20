import type { CSSProperties } from "vue";

export interface OptionNode {
  label: string;
  text?: string;
  value: string;
  disabled?: boolean;
}

export type RequestOptions = (
  params?: Record<string, any>
) => Promise<OptionNode[]>;

export type FormatConfig = {
  dot?: {
    style?: CSSProperties;
  };
  color?: string;
  ellipsis?: boolean;
  textFormat?: (text: string) => string;
};

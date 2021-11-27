import type { CSSProperties } from "vue";
import type { ValueType, RequestOptionsWithParamsType } from "../type";

export interface OptionNodeType {
  label: string;
  text?: string;
  value: string;
  disabled?: boolean;
  children?: OptionNodeType[];
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

export type RadioPropsType = {
  label?: string | number | boolean;
  disabled?: boolean;
  border?: boolean;
  size?: ComponentSize;
  name?: string;
};

export type SelectPropsType = {
  multiple?: boolean;
  disabled?: boolean;
  valueKey?: string;
  size?: ComponentSize;
  clearable?: boolean;
  collapseTags?: boolean;
  multipleLimit?: number;
  name?: string;
  autocomplete?: string;
  placeholder?: string;
  filterable?: boolean;
  allowCreate?: boolean;
  filterMethod?: (query: string) => void;
  remote?: boolean;
  remoteMethod?: (query: string) => void;
  loading?: boolean;
  loadingText?: string;
  noMatchText?: string;
  noDataText?: string;
  popperClass?: string;
  reserveKeyword?: boolean;
  defaultFirstOption?: boolean;
  popperAppendToBody?: boolean;
  automaticDropdown?: boolean;
  clearIcon?: string;
  fitInputWidth?: boolean;
};

export type ProRadioFieldPropsType = {
  radioGroupProps?: RadioGroupPropsType;
  radioProps?: RadioPropsType & { type?: "radio" | "radioButton" };
};

export type ProSelectPropsType = RequestOptionsWithParamsType & {
  modelValue?: ValueType;
  fieldProps?: SelectPropsType;
  editable?: boolean;
  formatConfig?: FormatConfigType;
};

export type ProRadioPropsType = RequestOptionsWithParamsType & {
  modelValue?: ValueType;
  fieldProps?: SelectPropsType;
  editable?: boolean;
  formatConfig?: FormatConfigType;
};

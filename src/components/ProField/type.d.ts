import type { CSSProperties } from "vue";
import type {
  ProValueType,
  RequestOptionsWithParamsType,
  OptionNodeType,
} from "../type";
import type { RadioGroupPropsType, RadioPropsType } from "../element-type";

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

export type ProRadioFieldPropsType = {
  radioGroupProps?: RadioGroupPropsType;
  radioProps?: RadioPropsType & { type?: "radio" | "radioButton" };
};

export type ProSelectPropsType = RequestOptionsWithParamsType & {
  modelValue?: ProValueType;
  fieldProps?: SelectPropsType;
  editable?: boolean;
  formatConfig?: FormatConfigType;
};

export type ProRadioPropsType = RequestOptionsWithParamsType & {
  modelValue?: ProValueType;
  fieldProps?: SelectPropsType;
  editable?: boolean;
  formatConfig?: FormatConfigType;
};

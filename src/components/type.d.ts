import type {
  OptionNodeType,
  RequestOptionsFunctionType,
} from "./ProField/type";

export type ValueType = "select" | "radio" | "text";
export type ProFieldComponentType = "ProSelect" | "ProRadio" | "ProInput";

export type RequestOptionsWithParamsType = {
  options?: OptionNodeType[];
  params?: Record<string, any>;
  request?: RequestOptionsFunctionType;
};

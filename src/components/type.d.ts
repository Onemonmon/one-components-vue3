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

export type ProValueType = "select" | "radio" | "text" | "date";

export type ProFieldComponentType =
  | "ProSelect"
  | "ProRadio"
  | "ProInput"
  | "ProDatePicker";

export type RequestOptionsWithParamsType = {
  options?: OptionNodeType[];
  params?: Record<string, any>;
  request?: RequestOptionsFunctionType;
};

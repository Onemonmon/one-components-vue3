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

export type ProValueType = "select" | "radio" | "text";

export type ProFieldComponentType = "ProSelect" | "ProRadio" | "ProInput";

export type RequestOptionsWithParamsType = {
  options?: OptionNodeType[];
  params?: Record<string, any>;
  request?: RequestOptionsFunctionType;
};

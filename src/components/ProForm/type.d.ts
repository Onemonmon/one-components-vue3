import type { FormItemRule } from "element-plus/es/components/form/src/form.type";
import type { ButtonPropsType } from "../element-type";
import type {
  ComponentSize,
  SelectPropsType,
  ProRadioFieldPropsType,
} from "../ProField/type";
import type { ValueType, RequestOptionsWithParamsType } from "../type";

export type FormItemPropsType = {
  prop: string;
  label?: string;
  labelWidth?: string | number;
  required?: boolean;
  rules?: FormItemRule | FormItemRule[];
  error?: string;
  inlineMessage?: boolean;
  showMessage?: boolean;
  size?: ComponentSize;
};

export type FormPropsType = {
  inline?: boolean;
  rules?: Record<string, FormItemRule | FormItemRule[]>;
  labelPosition?: "left" | "right" | "top";
  labelWidth?: string | number;
  labelSuffix?: string;
  hideRequiredAsterisk?: boolean;
  showMessage?: boolean;
  inlineMessage?: boolean;
  statusIcon?: boolean;
  validateOnRuleChange?: boolean;
  size?: ComponentSize;
  disabled?: boolean;
  scrollToError?: boolean;
};

export type ProFormItemPropsType = FormItemPropsType &
  RequestOptionsWithParamsType & {
    valueType?: ValueType;
    fieldProps?: SelectPropsType | ProRadioFieldPropsType;
  };

export type ProFormPropsType = {
  initialValues?: Record<string, any>;
  formProps?: FormPropsType;
  columns?: ProFormItemPropsType[];
  submitButtonProps?: ButtonPropsType | false;
  resetButtonProps?: ButtonPropsType | false;
  onFinish?: (values: any) => Promise<void>;
  onReset?: (e: MouseEvent) => void;
};

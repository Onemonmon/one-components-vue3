import type { FormItemRule } from "element-plus/es/components/form/src/form.type";
import type {
  ButtonPropsType,
  ComponentSize,
  SelectPropsType,
} from "../element-type";
import type { ProRadioFieldPropsType } from "../ProField/type";
import type { ProValueType, RequestOptionsWithParamsType } from "../type";

export type FormItemPropsType = {
  labelWidth?: string | number;
  required?: boolean;
  rules?: FormItemRule | FormItemRule[];
  error?: string;
  inlineMessage?: boolean;
  showMessage?: boolean;
  size?: ComponentSize;
};

export type FormPropsType = {
  // inline?: boolean;
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

export type PureProFormItemPropsType = RequestOptionsWithParamsType & {
  prop: string;
  label?: string;
  valueType?: ProValueType;
  fieldProps?: SelectPropsType | ProRadioFieldPropsType;
  formProps?: FormItemPropsType;
  editable?: boolean;
};

export type ProFormItemPropsTypeWithSpan = PureProFormItemPropsType & {
  span?: number;
};

export type ProFormItemPropsType = ProFormItemPropsTypeWithSpan & {
  children?: ProFormItemPropsTypeWithSpan[];
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

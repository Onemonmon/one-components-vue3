import type { ComponentSize } from "./ProField/type";

export type ButtonType =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "info"
  | "danger"
  | "text"
  | "";

export type ComponentSize = "small" | "large" | "medium" | "mini";

export type ButtonPropsType = {
  size?: ComponentSize;
  type?: ButtonType;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  loading?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  icon?: string;
  autoInsert?: boolean;
  nativeType?: "button" | "submit" | "reset";
  autoInsertSpace?: boolean;
};

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

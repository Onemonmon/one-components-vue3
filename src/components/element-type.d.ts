import type { CSSProperties } from "vue";

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

export type DatePickerType =
  | "year"
  | "month"
  | "date"
  | "week"
  | "datetime"
  | "datetimerange"
  | "daterange"
  | "monthrange"
  | "time";

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

export type InputPropsType = {
  type?: "text" | "textarea";
  maxlength?: string | number;
  showWordLimit?: boolean;
  placeholder?: string;
  clearable?: boolean;
  showPassword?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  prefixIcon?: string;
  suffixIcon?: string;
  rows?: number;
  autosize?: boolean | { minRows?: number; maxRows?: number };
  resize?: "none" | "both" | "horizontal" | "vertical";
  label?: string;
  tabindex?: string | number;
  validateEvent?: boolean;
  inputStyle?: CSSProperties;
};

export type DatePickerPropsType = {
  readonly?: boolean;
  disabled?: boolean;
  size?: ComponentSize;
  editable?: boolean;
  clearable?: boolean;
  placeholder?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
  type?: DatePickerType;
  format?: string;
  popperClass?: string;
  rangeSeparator?: string;
  defaultValue?: Date | Date[];
  defaultTime?: Date | Date[];
  valueFormat?: string;
  unlinkPanels?: boolean;
  prefixIcon?: string;
  clearIcon?: string;
  validateEvent?: boolean;
  shortcuts?: { text: string; value: Date | (() => Date) }[];
  disabledDate?: (date: Date) => boolean;
  isRange?: boolean;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour: number) => number[];
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  disabledDate?: (date: Date) => boolean;
  arrowControl?: boolean;
};

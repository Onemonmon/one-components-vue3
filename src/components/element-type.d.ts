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

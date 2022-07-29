import type { ProInputFieldPropsType } from "./pro-input";
import type { ProRadioFieldPropsType } from "./pro-radio";
import type { ProSelectFieldPropsType } from "./pro-select";

export type ProFieldPropsType =
  | ProInputFieldPropsType
  | ProRadioFieldPropsType
  | ProSelectFieldPropsType;

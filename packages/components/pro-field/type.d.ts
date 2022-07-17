import type { SelectPropsType } from "@components/shared/src";
import type { ProInputFieldPropsType } from "./pro-input";
import type { ProRadioFieldPropsType } from "./pro-radio";

export type ProFieldPropsType =
  | ProInputFieldPropsType
  | ProRadioFieldPropsType
  | SelectPropsType;

import {
  ElInput,
  ElInputNumber,
  ElRadio,
  ElRadioGroup,
  ElSelect,
} from "element-plus";

export type WithOtherAttrs<T> = T &
  Record<string, any> & {
    style?: CSSCounterStyleRule;
    className?: string;
  };

export type InputPropsType = InstanceType<typeof ElInput>["$props"];

export type InputNumberPropsType = InstanceType<typeof ElInputNumber>["$props"];

export type RadioPropsType = InstanceType<typeof ElRadio>["$props"];

export type RadioGroupPropsType = InstanceType<typeof ElRadioGroup>["$props"];

export type SelectPropsType = InstanceType<typeof ElSelect>["$props"];

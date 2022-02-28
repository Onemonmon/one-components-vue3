import { ElInput } from "element-plus";

type WithOtherAttrs<T> = T &
  Record<string, any> & {
    style?: CSSCounterStyleRule;
    className?: string;
  };

export type InputPropsType = InstanceType<typeof ElInput>["$props"];

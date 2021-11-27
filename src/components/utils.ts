import type { ValueType, ProFieldComponentType } from "./type";

export function getComponentByValueType(
  valueType: ValueType = "text"
): ProFieldComponentType {
  const components: Record<ValueType, ProFieldComponentType> = {
    select: "ProSelect",
    radio: "ProRadio",
    text: "ProInput",
  };
  return components[valueType];
}

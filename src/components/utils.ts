import type { ProValueType, ProFieldComponentType } from "./type";

export function getComponentByValueType(
  valueType: ProValueType = "text"
): ProFieldComponentType {
  const components: Record<ProValueType, ProFieldComponentType> = {
    select: "ProSelect",
    radio: "ProRadio",
    text: "ProInput",
  };
  return components[valueType];
}

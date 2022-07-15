import { ref, watch } from "vue";
import type { EmitsType } from "./type";

/**
 * 组件自定义v-model
 */
export const useModelValue = <T>({
  props,
  emits,
  initialValue,
}: {
  props: any;
  emits: EmitsType;
  initialValue?: T;
}) => {
  const innerValue = ref<T>(initialValue || props.modelValue);
  watch(innerValue, (val) => emits("update:modelValue", val));
  watch(
    () => props.modelValue,
    (val) => (innerValue.value = val)
  );
  return innerValue;
};

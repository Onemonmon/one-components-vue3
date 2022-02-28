import { ref, watch } from "vue";
import type { EmitsType } from "./type";

/**
 * 组件自定义v-model
 */
export const useModelValue = <T>(props: any, emits: EmitsType) => {
  const innerValue = ref<T>(props.modelValue);
  watch(innerValue, (val) => emits("update:modelValue", val));
  watch(
    () => props.modelValue,
    (val) => (innerValue.value = val)
  );
  return innerValue;
};

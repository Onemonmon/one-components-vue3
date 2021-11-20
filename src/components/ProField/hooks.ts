import { computed, ComputedRef, ref, watch } from "vue";
import type { Ref, SetupContext, UnwrapRef } from "vue";
import type { OptionNode } from "./type";

export function useModelValue<T>(
  props: Record<string, any>,
  context: SetupContext<Record<string, any>>
): Ref<UnwrapRef<T>> {
  const innerValue = ref<T>(props.modelValue);
  watch(innerValue, (newValue) => {
    context.emit("update:modelValue", newValue);
  });
  watch(
    () => props.modelValue,
    (newValue) => {
      innerValue.value = newValue;
    }
  );
  return innerValue;
}

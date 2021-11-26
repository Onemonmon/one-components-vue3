import { onMounted, reactive, ref, watch } from "vue";
import type { Ref, SetupContext, UnwrapRef } from "vue";
import type { OptionNodeType, RequestOptionsType } from "./type";

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

export function useOptions(props: Record<string, any>): RequestOptionsType {
  const requestOptions = reactive<RequestOptionsType>({
    loading: false,
    options: props.options,
  });
  async function getOptions(params: any) {
    if (props.request && !props.options) {
      requestOptions.loading = true;
      const res = await props.request(params);
      requestOptions.options = res;
      requestOptions.loading = false;
    }
  }
  watch(
    () => props.params,
    (val) => getOptions(val),
    { deep: true }
  );
  onMounted(() => getOptions(props.params));
  return requestOptions;
}

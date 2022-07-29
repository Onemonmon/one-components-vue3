import { reactive, Ref, watch } from "vue";
import type { PropsHasOptionType } from "@components/shared";

/**
 * 获取选项数据
 */
export const useOptions = (props: PropsHasOptionType) => {
  const requestOptions = reactive({
    loading: false,
    options: props.options || [],
  });
  /**
   * 监听options改变
   */
  watch(
    () => props.options,
    (val) => val && (requestOptions.options = val),
    { deep: true }
  );
  /**
   * params改变会重新触发request
   */
  watch(
    () => props.params,
    async (val) => {
      if (props.request && !props.options) {
        try {
          requestOptions.loading = true;
          const res = await props.request(val);
          requestOptions.options = res;
        } finally {
          requestOptions.loading = false;
        }
      }
    },
    {
      immediate: true,
      deep: true,
    }
  );
  return requestOptions;
};

/**
 * 触发校验
 */
const createValidate = (props: any, trigger: string, innerValue: Ref<any>) => {
  return () => {
    props.onValidate &&
      props.onValidate(trigger, innerValue && innerValue.value);
  };
};
export const useValidate = (props: any, innerValue: Ref<any>) => {
  const handleChange = createValidate(props, "change", innerValue);
  const handleInput = createValidate(props, "change", innerValue);
  const handleBlur = createValidate(props, "blur", innerValue);
  const handleClear = createValidate(props, "change", innerValue);
  return { handleChange, handleInput, handleBlur, handleClear };
};

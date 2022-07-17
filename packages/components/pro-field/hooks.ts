import { reactive, toRefs, watch } from "vue";
import type { PropsHasOptionType } from "@components/shared/src";

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

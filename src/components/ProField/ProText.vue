<template>
  <template v-if="formatConfig.dot">
    <div
      v-for="item in displayValue"
      :key="`${item}`"
      class="pro-text-item pro-text-item-flex"
    >
      <div
        class="pro-text-dot"
        :style="{
          backgroundColor: formatConfig.color,
          ...formatConfig.dot.style,
        }"
      />
      <div
        :class="{ 'pro-text-value': true, ellipsis: formatConfig.ellipsis }"
        :style="{ color: formatConfig.color }"
      >
        {{ item }}
      </div>
    </div>
  </template>
  <div
    v-else
    :class="{ 'pro-text-item': true, ellipsis: formatConfig.ellipsis }"
    :style="{ color: formatConfig.color }"
  >
    {{ displayValue?.join(" ") }}
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import type { FormatConfigType } from "./type";
import type { OptionNodeType } from "../type";

type ValueType = string | number | boolean | Date | undefined;

function findlabelInValue(
  result: string[],
  values: ValueType[],
  options: OptionNodeType[]
) {
  options.forEach((n) => {
    values.includes(n.value) && result.push(n.text || n.label);
    if (n.children && n.children.length) {
      findlabelInValue(result, values, n.children);
    }
  });
}
export default defineComponent({
  name: "ProText",
  props: {
    value: {
      type: [String, Number, Boolean, Date, Array] as PropType<
        ValueType | ValueType[]
      >,
    },
    options: {
      type: Array as PropType<OptionNodeType[]>,
    },
    formatConfig: {
      type: Object as PropType<FormatConfigType>,
      default: () => ({}),
    },
  },
  setup(props) {
    const displayValue = computed(() => {
      const newValue: ValueType[] = Array.isArray(props.value)
        ? props.value
        : [props.value];
      if (props.options) {
        const result: string[] = [];
        findlabelInValue(result, newValue, props.options);
        return result;
      }
      return newValue;
    });
    return { displayValue };
  },
});
</script>

<style lang="scss" scoped>
.pro-text-item {
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.pro-text-item-flex {
  display: flex;
  align-items: center;
}
.pro-text-dot {
  width: 8px;
  min-width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 4px;
  background-color: #999;
}
.pro-text-value {
  flex-grow: 1;
}
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<script lang="ts" setup>
import { computed, ref } from "vue";
import proTextProps, { ProTextValueType } from "./ProText";
import { isNumber, OptionNodeType } from "@components/shared";

const props = defineProps(proTextProps);
const default_empty_text = "-";
/**
 * 判断文本是否为空
 */
const isTextEmpty = (text: ProTextValueType | ProTextValueType[]) => {
  const emptyText = props.formatConfig.defaultEmptyText || default_empty_text;
  const isEmpty = (val: ProTextValueType) =>
    val === null || val === undefined || val === "" || val === emptyText;
  return Array.isArray(text)
    ? !text.length || !text.filter((n) => !isEmpty(n)).length
    : isEmpty(text);
};
/**
 * 从options中找到value对应的label
 */
const findLabelInValue = (
  result: string[],
  values: ProTextValueType[],
  options: OptionNodeType[]
) => {
  options.forEach((n) => {
    values.includes(n.value) && result.push(n.label);
    n.children &&
      n.children.length &&
      findLabelInValue(result, values, n.children);
  });
};
/**
 * 获取最终展示的文本数组
 */
const displayValues = computed((n) => {
  let newValue: ProTextValueType[] = Array.isArray(props.value)
    ? props.value
    : [props.value];
  if (props.options) {
    const result: string[] = [];
    findLabelInValue(result, newValue, props.options);
    newValue = result;
  }
  if (isTextEmpty(newValue)) {
    return props.formatConfig.defaultEmptyText || default_empty_text;
  }
  return newValue
    .map((n) => formatText(n))
    .join(props.formatConfig.textSpacer || " ");
});
/**
 * 格式化数据
 *  1. 根据formatConfig.textFormat格式化数据
 *  2. 根据formatType格式化数据
 */
const formatText = (text: ProTextValueType) => {
  const { textFormat, formatType } = props.formatConfig;
  if (textFormat) {
    return textFormat(text);
  }
  if (isNumber(text) && formatType) {
    return formatByType(text as number);
  }
  return text;
};
/**
 * 根据formatType格式化数据
 */
const formatByType = (text: number) => {
  const { toLocaleStringOptions, formatType } = props.formatConfig;
  const innerToLocaleStringOptions = {
    maximumFractionDigits: 2,
    ...toLocaleStringOptions,
  };
  switch (formatType) {
    case "percent":
      return text.toLocaleString("zh", {
        style: "percent",
        ...innerToLocaleStringOptions,
      });
    case "money":
      return text.toLocaleString("zh", {
        style: "currency",
        currency: "CNY",
        ...innerToLocaleStringOptions,
      });
    case "digit":
      return text.toLocaleString("zh", {
        ...innerToLocaleStringOptions,
      });
    default:
      return text;
  }
};
</script>

<template>
  <div
    class="pro-text-container"
    :style="isTextEmpty(value) ? {} : { color: formatConfig.color }"
  >
    <i
      class="dot"
      :style="{
        backgroundColor: formatConfig.color,
        ...(formatConfig.dot !== true ? formatConfig.dot.style : {}),
      }"
      v-if="formatConfig.dot && !isTextEmpty(value)"
    />{{ displayValues }}
  </div>
</template>

<style lang="scss" scoped>
.pro-text-container {
  display: flex;
  align-items: center;
  font-size: 14px;

  .dot {
    display: inline-block;
    width: 10px;
    min-width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 4px;
    background-color: #999;
  }
}
</style>

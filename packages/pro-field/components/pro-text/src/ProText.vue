<script lang="ts" setup>
import { computed, ref } from "vue";
import proTextProps, { ProTextValueType } from "./ProText";
import numeral from "numeral";
import type { OptionNodeType } from "../../../../type";

const props = defineProps(proTextProps);
const defaultEmptyText = "-";
/**
 * 判断文本是否为空
 */
const isTextEmpty = (text: ProTextValueType) => {
  const emptyText = props.formatConfig.defaultEmptyText || defaultEmptyText;
  const isEmpty = (val: ProTextValueType) =>
    val === null || val === undefined || val === "" || val === emptyText;
  return (
    isEmpty(text) ||
    (Array.isArray(text) &&
      (!text.length || !text.filter((n) => !isEmpty(n)).length))
  );
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
  !newValue.length && newValue.push("");
  return newValue.map((n) => formatText(n));
});
/**
 * 格式化数据
 *  1. 根据formatConfig.textFormat格式化数据
 *  2. 根据formatType格式化数据
 */
const formatText = (text: ProTextValueType) => {
  if (props.formatConfig.textFormat) {
    return props.formatConfig.textFormat(text);
  }
  return formatByType(text);
};
/**
 * 根据formatType格式化数据
 */
const formatByType = (text: ProTextValueType) => {
  const { numeralFormat } = props.formatConfig;
  switch (props.formatConfig.formatType) {
    case "percent":
      return numeral(text).format(numeralFormat || "0.00 %");
    case "money":
      return numeral(text).format(numeralFormat || "$ 0,0.00");
    case "digit":
      return numeral(text).format(numeralFormat || "0,0");
    default:
      return isTextEmpty(text)
        ? props.formatConfig.defaultEmptyText || defaultEmptyText
        : text;
  }
};
</script>

<template>
  {{ displayValues }}
</template>

<style lang="scss" scoped></style>

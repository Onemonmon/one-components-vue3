<script lang="ts" setup>
import { ref } from "vue";
import type { OptionNodeType } from "one-components-vue3";

const inputValue = ref("01");
const options: OptionNodeType[] = [
  {
    label: "爱好",
    value: "hobby",
    children: [
      { label: "抽烟", value: "01" },
      { label: "喝酒", value: "02" },
      { label: "烫头", value: "03" },
    ],
  },
];
</script>

<template>
  <pro-select v-model="inputValue" type="group" :options="options" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { OptionNodeType } from "one-components-vue3";

const inputValue1 = ref("01");
const inputValue2 = ref(["01", "02"]);
const options: OptionNodeType[] = [
  { label: "抽烟", value: "01" },
  { label: "喝酒", value: "02" },
  { label: "烫头", value: "03" },
];
</script>

<template>
  <el-space>
    <pro-select v-model="inputValue1" :options="options" />
    <pro-select
      v-model="inputValue2"
      :options="options"
      :field-props="{ multiple: true }"
    />
  </el-space>
</template>

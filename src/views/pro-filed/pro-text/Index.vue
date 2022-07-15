<script lang="ts" setup>
import DemoContainer from "@/components/DemoContainer.vue";
import BasicVue from "./ProTextBasic.vue";
import DotVue from "./ProTextDot.vue";
import FormatVue from "./ProTextFormat.vue";
import OptionsVue from "./ProTextOptions.vue";
</script>

<template>
  <demo-container title="基础用法">
    <basic-vue />
  </demo-container>
  <demo-container title="展示圆点">
    <dot-vue />
  </demo-container>
  <demo-container title="格式化">
    <format-vue />
  </demo-container>
  <demo-container title="从options中获取展示文本">
    <options-vue />
  </demo-container>
</template>

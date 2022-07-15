<script lang="ts" setup>
import DemoContainer from "@/components/DemoContainer.vue";
import BasicVue from "./ProRadioBasic.vue";
import ButtonVue from "./ProRadioButton.vue";
import BorderVue from "./ProRadioBorder.vue";
import RequestVue from "./ProRadioRequest.vue";
</script>

<template>
  <demo-container title="基础用法">
    <basic-vue />
  </demo-container>
  <demo-container
    title="按钮样式"
    description="颜色属性只能在button类型的单选里生效"
  >
    <button-vue />
  </demo-container>
  <demo-container title="边框样式">
    <border-vue />
  </demo-container>
  <demo-container title="自动请求选项数据" description="修改参数params.id">
    <request-vue />
  </demo-container>
</template>

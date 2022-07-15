<script lang="ts" setup>
import DemoContainer from "@/components/DemoContainer.vue";
import BasicVue from "./ProSelectBasic.vue";
import GroupVue from "./ProSelectGroup.vue";
import RequestVue from "./ProSelectRequest.vue";
</script>

<template>
  <demo-container title="基础用法">
    <basic-vue />
  </demo-container>
  <demo-container title="选项分组">
    <group-vue />
  </demo-container>
  <demo-container title="自动请求选项数据" description="修改参数params.id">
    <request-vue />
  </demo-container>
</template>

<script lang="ts" setup>
import DemoContainer from "@/components/DemoContainer.vue";
import BasicVue from "./ProInputBasic.vue";
import SlotVue from "./ProInputSlot.vue";
import TypeVue from "./ProInputType.vue";
</script>

<template>
  <demo-container title="基础用法">
    <basic-vue />
  </demo-container>
  <demo-container title="插槽" description="与el-input的插槽使用相同">
    <slot-vue />
  </demo-container>
  <demo-container
    title="输入框类型"
    description="type=number时将会使用el-input-number组件以及对应的fieldProps"
  >
    <type-vue />
  </demo-container>
</template>

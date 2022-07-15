<script lang="ts" setup>
import { ref } from "vue";

const inputValue1 = ref("我是一个粉刷匠");
const inputValue2 = ref(["我是一个粉刷匠", "粉刷本领强"]);
</script>

<template>
  <pro-text :value="inputValue1" />
  <pro-text :value="inputValue2" :formatConfig="{ textSpacer: ',' }" />
</template>

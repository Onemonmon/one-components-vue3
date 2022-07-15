<script lang="ts" setup>
import { ref } from "vue";

const inputValue1 = ref(1);
const inputValue2 = ref("我是一个粉刷匠");
</script>

<template>
  <pro-input
    v-model="inputValue1"
    :style="{ marginBottom: '10px' }"
    :field-props="{
      type: 'number',
      max: 10,
      min: 1,
      step: 0.5,
      precision: 2,
    }"
  />
  <pro-input
    v-model="inputValue2"
    :field-props="{
      type: 'textarea',
      maxlength: 100,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 },
    }"
  />
</template>

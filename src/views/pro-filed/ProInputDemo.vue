<script lang="ts" setup>
import { ref } from "vue";

const value = ref("lalalala");
</script>

<template>
  ProInputDemo

  <pro-input v-model="value" :editable="false" />
</template>

<style lang="scss" scoped></style>

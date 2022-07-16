<script lang="ts" setup>
import { computed, PropType, ref } from "vue";
import { getValueByComplexKey, Data } from "@components/shared/src";

const props = defineProps({
  row: {
    type: Object as PropType<Data>,
    defalut: () => ({}),
    required: true,
  },
  prop: {
    type: String,
    required: true,
  },
});
</script>

<template>
  {{ getValueByComplexKey(row, prop) }}
</template>

<style lang="scss" scoped></style>

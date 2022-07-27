<script lang="ts" setup>
import { ref } from "vue";

defineProps<{
  title: string;
  data: {
    prop: string;
    desc: string;
    type: string;
    choose: string;
    default: string;
  }[];
}>();
const columns = ref<any[]>([
  {
    prop: "prop",
    label: "属性",
    minWidth: 100,
  },
  {
    prop: "desc",
    label: "说明",
    minWidth: 200,
  },
  {
    prop: "type",
    label: "类型",
    minWidth: 200,
  },
  {
    prop: "choose",
    label: "可选值",
    minWidth: 100,
  },
  {
    prop: "default",
    label: "默认值",
    minWidth: 100,
  },
]);
</script>

<template>
  <pro-table
    class="props-table"
    :title="title"
    :columns="columns"
    :tableProps="{ data }"
    :proQueryFilterProps="false"
    :paginationProps="false"
    :toolbarConfig="false"
  />
</template>

<style lang="scss" scoped>
.props-table {
  margin-bottom: 40px;
}
</style>

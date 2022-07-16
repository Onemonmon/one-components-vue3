### 基本使用

```vue
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";

const options = ref([]);

const editable = ref(false);

const columns = computed(() => [
  {
    prop: "index",
    label: "序号",
    width: 60,
  },
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "info",
    label: "信息",
    children: [
      {
        prop: "info.age",
        label: "年龄",
        width: 80,
      },
      {
        prop: "info.gender",
        label: "性别",
        editable: editable.value,
        width: 80,
      },
    ],
  },
  {
    prop: "major",
    label: "专业",
    options: options.value,
    width: 100,
  },
]);

const params = reactive({ id: "001" });
const tableProps = reactive({});
const getTableData = async ({ pageNum, pageSize, id }) => {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(10).fill(0).map((n, i) => ({
        id: i + "",
        index: (pageNum - 1) * pageSize + i + 1,
        name: "张三" + id,
        info: { age: 22, gender: "男" },
        major: "程序员",
      }));
      resolve(data);
    }, 1000);
  });
  return {
    data: res,
    total: 20,
  };
};

onMounted(async () => {
  setTimeout(() => {
    // editable.value = true;
    // options.value = [
    //   { label: "抽烟", value: "01" },
    //   { label: "喝酒", value: "02" },
    //   { label: "烫头", value: "03" },
    // ];
    // tableProps.rowKey = "name";
    params.id = "002";
  }, 1000);
});
</script>

<template>
  <pro-table
    :columns="columns"
    :params="params"
    :tableProps="tableProps"
    :request="getTableData"
  />
</template>
```

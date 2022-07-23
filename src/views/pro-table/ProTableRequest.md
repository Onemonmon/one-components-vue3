### 基本使用 2

当传入 request 函数时，表格会自动调用 request 请求数据，同时会为 request 传入分页参数、params 参数、表头过滤参数（requestOnColumnChange=true 时）

```vue
<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import type { ProTableInstance } from "one-components-vue3";

const options = ref([
  { label: "抽烟", value: "01" },
  { label: "喝酒", value: "02" },
  { label: "烫头", value: "03" },
]);
const columns = computed(() => [
  {
    prop: "selection",
    type: "selection",
    width: 50,
  },
  {
    prop: "index",
    type: "index",
    label: "序号",
    width: 80,
  },
  {
    prop: "name",
    label: "姓名",
    tip: "<span style='color: red;'>这是姓名鸭！</span>",
    formatConfig: { textFormat: (text) => "我是" + text },
    showOverflowTooltip: true,
  },
  {
    prop: "address",
    label: "地址",
    width: 80,
  },
  {
    prop: "info",
    label: "信息",
    children: [
      {
        prop: "info.age",
        label: "年龄",
        sortable: "custom",
        width: 100,
      },
      {
        prop: "info.money",
        label: "余额",
        formatConfig: { formatType: "money" },
        copyable: true,
        width: 160,
      },
      {
        prop: "info.gender",
        label: "性别",
        request: () => [
          { label: "男", value: "male" },
          { label: "女", value: "female" },
        ],
        filters: [
          { text: "男", value: "male" },
          { text: "女", value: "female" },
        ],
        valueType: "radio",
        width: 100,
      },
      {
        prop: "info.hobby",
        label: "爱好",
        options: options.value,
        valueType: "checkbox",
        width: 120,
      },
    ],
  },
  {
    prop: "major",
    label: "专业",
    formatConfig: { color: "green", dot: true },
    options: options.value,
    valueType: "select",
    width: 100,
  },
  {
    prop: "operations",
    type: "operations",
    label: "操作",
    fixed: "right",
    operations: (row) => [
      {
        key: "detail",
        label: "查看",
        onClick() {
          ElMessage({ message: row.name });
        },
      },
      {
        key: "delete",
        label: "删除",
        type: "danger",
        hide: () => row.id < 7,
      },
    ],
    width: 120,
  },
]);

const params = reactive({ outterParam: "001" });
const getTableData = async (params) => {
  console.log("获取表格数据，参数：", params);
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(10).fill(0).map((n, i) => {
        const random = Math.random();
        return {
          id: i,
          name: "张三" + i + (i === 0 ? "很长很长很长很长很长很长的姓名" : ""),
          address: "深圳" + i,
          info: {
            age: Math.floor(random * 100),
            gender: random > 0.5 ? "female" : "male",
            money: 10000 + Math.floor(random * 10000),
            hobby: ["01", "02"],
          },
          major: random > 0.5 ? "01" : "02",
        };
      });
      resolve(data);
    }, 1000);
  });
  return {
    data: res,
    total: Math.floor(Math.random() * 100),
  };
};
const handleChangeParams = () => {
  params.outterParam = `${Math.floor(Math.random() * 100)}`;
};
</script>

<template>
  <pro-table
    title="表格标题"
    :columns="columns"
    :params="params"
    :request="getTableData"
    :requestOnColumnChange="true"
  >
    <template #toolbar>
      <el-button type="primary" @click="handleChangeParams">
        重新获取数据
      </el-button>
    </template>
  </pro-table>
</template>
```

### 基本使用

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
const hideInTable = ref(false);

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
    formatConfig: { textFormat: (text) => "我是" + text },
    width: 140,
  },
  {
    prop: "address",
    label: "地址",
    columnDefaultSlotName: "address",
    width: 120,
  },
  {
    prop: "info",
    label: "信息",
    columnHeaderSlotName: "info",
    children: [
      {
        prop: "info.age",
        label: "年龄",
        editable: false,
        sortable: "custom",
        width: 100,
      },
      {
        prop: "info.money",
        label: "余额",
        formatConfig: { formatType: "money" },
        fieldProps: { type: "number" },
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
        fieldProps: { type: "button" },
        valueType: "radio",
        width: 140,
      },
      {
        prop: "info.hobby",
        label: "爱好",
        options: options.value,
        fieldProps: { checkAll: true },
        valueType: "checkbox",
        width: 330,
      },
    ],
  },
  {
    prop: "major",
    label: "专业",
    formatConfig: { color: "green", dot: true },
    options: options.value,
    valueType: "select",
    width: 120,
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
          console.log(row);
        },
      },
      {
        key: "delete",
        label: "删除",
        type: "danger",
        hide: () => row.id < 7,
      },
    ],
    width: 180,
  },
]);

const params = reactive({ id: "001" });
const tableProps = reactive({});
const tableRef = ref<ProTableInstance | null>(null);
const editableConfig = reactive({
  editable: true,
  async onSave(row) {
    await new Promise((resolve) => setTimeout(() => resolve(""), 1000));
    ElMessage({ message: "保存成功", type: "success" });
  },
  onValuesChange(row, key, value) {
    console.log(row, key, value);
  },
});
const getTableData = async (params) => {
  console.log("获取表格数据，参数：", params);
  console.log("表格实例：", tableRef);
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(10).fill(0).map((n, i) => ({
        id: i,
        name: "张三" + i,
        address: "深圳" + i + params.id,
        info: {
          age: Math.floor(Math.random() * 100),
          gender: Math.random() > 0.5 ? "female" : "male",
          money: 1314520,
          hobby: ["01", "02"],
        },
        major: "01",
      }));
      resolve(data);
    }, 1000);
  });
  return {
    data: res,
    total: 30,
  };
};

onMounted(async () => {
  setTimeout(() => {
    // params.id = "002";
  }, 2000);
});
</script>

<template>
  <pro-table
    :columns="columns"
    :params="params"
    :request="getTableData"
    :requestOnColumnChange="true"
    :tableProps="tableProps"
    :getTableRef="(ref) => (tableRef = ref)"
    :editableConfig="editableConfig"
  >
    <template #toolbar>
      <el-button type="primary">重新获取数据</el-button>
      <el-button type="primary">管理</el-button>
    </template>
    <template #info>
      <el-tag type="success">信息</el-tag><el-tag type="success">信息</el-tag>
    </template>
    <template #address="{ value }">
      <el-button type="primary" size="small">{{ value }}</el-button>
    </template>
  </pro-table>
</template>
```

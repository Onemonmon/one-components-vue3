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
    tip: "<span style='color: red;'>这是姓名鸭！</span>",
    formatConfig: { textFormat: (text) => "我是" + text },
    formProps: { rules: { required: true, message: "请输入姓名！" } },
    // copyable: true,
    showOverflowTooltip: true,
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
        formProps: {
          rules: [
            { type: "number", required: true, message: "请输入余额！" },
            {
              type: "number",
              min: 100,
              max: 100000,
              message: "余额需在100到100000之间！",
            },
          ],
        },
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
        fieldProps: { type: "button" },
        valueType: "radio",
        width: 140,
      },
      {
        prop: "info.hobby",
        label: "爱好",
        options: options.value,
        fieldProps: { checkAll: true },
        formProps: {
          rules: {
            type: "array",
            required: true,
            message: "请选择至少一个爱好！",
          },
        },
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
    formProps: { rules: { required: true, message: "请选择专业！" } },
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
      const data = new Array(10).fill(0).map((n, i) => {
        const random = Math.random();
        return {
          id: i,
          name: "张三" + params.id + Math.floor(random * 100),
          address: "深圳" + i + params.id,
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
    total: 30,
  };
};

const handleChangeParams = () => {
  params.id = "002";
};
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
      <el-button type="primary" @click="handleChangeParams"
        >重新获取数据</el-button
      >
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

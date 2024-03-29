### 表格插槽

```vue
<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
import type { ProTableColumnPropsType } from "one-components-vue3";

const options = ref([
  { label: "抽烟", value: "01" },
  { label: "喝酒", value: "02" },
  { label: "烫头", value: "03" },
]);
const columns = computed<ProTableColumnPropsType[]>(() => [
  {
    prop: "name",
    label: "姓名",
    tip: "<span style='color: red;'>这是姓名鸭！</span>",
    formatConfig: { textFormat: (text) => "我是" + text },
    qfLabelSlotName: "nameLabel",
    qfDefaultSlotName: "nameDefault",
    showOverflowTooltip: true,
  },
  {
    prop: "address",
    label: "地址",
    columnHeaderSlotName: "addressHeader",
    columnDefaultSlotName: "addressDefault",
    qfHideInForm: true,
    width: 160,
  },
  {
    prop: "age",
    label: "年龄",
    editable: false,
    sortable: true,
    qfHideInForm: true,
    width: 100,
  },
  {
    prop: "money",
    label: "余额",
    formatConfig: { formatType: "money" },
    copyable: true,
    width: 160,
  },
  {
    prop: "gender",
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
    prop: "hobby",
    label: "爱好",
    options: options.value,
    valueType: "checkbox",
    width: 120,
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
const getTableData = async (params: any) => {
  console.log("获取表格数据，参数：", params);
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(10).fill(0).map((n, i) => {
        const random = Math.random();
        return {
          id: i,
          name: "张三" + i + (i === 0 ? "很长很长很长很长很长很长的姓名" : ""),
          address: "深圳" + i,
          age: Math.floor(random * 100),
          gender: random > 0.5 ? "female" : "male",
          money: 10000 + Math.floor(random * 10000),
          hobby: ["01", "02"],
          major: random > 0.5 ? "01" : "02",
        };
      });
      resolve(data);
    }, 1000);
  });
  return {
    data: res,
    total: 100,
  };
};
const handleChangeParams = () => {
  params.outterParam = `${Math.floor(Math.random() * 100)}`;
};
</script>

<template>
  <pro-table
    :columns="columns"
    :params="params"
    :request="getTableData"
    :tableProps="{ rowKey: 'id' }"
  >
    <template #title>
      <el-badge :value="12">
        <el-button link>自定义表格标题</el-button>
      </el-badge>
    </template>
    <template #toolbar>
      <el-button type="primary" @click="handleChangeParams">
        重新获取数据
      </el-button>
    </template>
    <template #nameLabel>姓名插槽</template>
    <template #nameDefault="{ model, prop }">
      <pro-input v-model="model[prop]">
        <template #prepend>Http://</template>
        <template #append>.com</template>
      </pro-input>
    </template>
    <template #addressHeader>
      <el-link type="primary" :underline="false">自定义表头名称</el-link>
    </template>
    <template #addressDefault="{ value }">
      <el-button type="primary" size="small">地址是：{{ value }}</el-button>
    </template>
  </pro-table>
</template>
```
